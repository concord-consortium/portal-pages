var Component = require('../helpers/component');

var ResourceLightbox = require('./resource-lightbox');
var GradeLevels = require("./grade-levels");

var fadeIn = require("../helpers/fade-in");
var shuffleArray = require("../helpers/shuffle-array");
var sortByName = require("../helpers/sort-by-name");
var pluralize = require("../helpers/pluralize");
var randomSubset = require("../helpers/random-subset");
var filters = require("../helpers/filters");

var div = React.DOM.div;
var img = React.DOM.img;
var a = React.DOM.a;
var i = React.DOM.i;

var StemFinderResult = Component({
  getInitialState: function () {
    return {
      hovering: false,
      favorited: this.props.resource.is_favorite,
      lightbox: false
    };
  },

  handleMouseOver: function () {
    if (this.state.lightbox) {
      return;
    }
    this.setState({hovering: true});
  },

  handleMouseOut: function () {
    if (this.state.lightbox) {
      return;
    }
    this.setState({hovering: false});
  },

  toggleLightbox: function (e) {
    e.preventDefault();
    e.stopPropagation();
    var lightbox = !this.state.lightbox;

    // TODO: add pushstate
    this.setState({
      lightbox: lightbox,
      hovering: false
    });

    // mount/unmount lightbox outside of homepage content
    var mountPointId = "stem-finder-result-lightbox-mount";
    var mountPoint = document.getElementById(mountPointId);
    if (lightbox) {
      if (!mountPoint) {
        mountPoint = document.createElement("DIV");
        mountPoint.id = mountPointId;
        document.body.appendChild(mountPoint);
      }
      jQuery('html, body').css('overflow', 'hidden');
      ReactDOM.render(ResourceLightbox({resource: this.props.resource, toggleLightbox: this.toggleLightbox}), mountPoint);
      jQuery('<div class="portal-pages-resource-lightbox-background"></div>').insertBefore('#stem-finder-result-lightbox-mount');
      jQuery('.portal-pages-resource-lightbox-background').click(function() {
        ResourceLightbox.handleClose(); // this doesn't work
      });
      jQuery('.home-page-content').addClass('blurred');
      jQuery('.portal-pages-resource-lightbox-background, #stem-finder-result-lightbox-mount').fadeIn();
    }
    else {
      jQuery('html, body').css('overflow', 'auto');
      ReactDOM.unmountComponentAtNode(mountPoint);
      jQuery('.portal-pages-resource-lightbox-background').remove();
      jQuery('.home-page-content').removeClass('blurred');
      jQuery('.portal-pages-resource-lightbox-background, #stem-finder-result-lightbox-mount').fadeOut();
    }
  },

  toggleFavorite: function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!Portal.currentUser.isLoggedIn || !Portal.currentUser.isTeacher) {
      // is there a better, non-jQuery way to do this?
      var mouse_x = e.pageX, mouse_y = e.pageY, tooltip_timer;
      jQuery('body').append('<div class="portal-pages-favorite-tooltip">Log in or sign up to save resources for quick access!</div>');
      jQuery('.portal-pages-favorite-tooltip').css({'left': mouse_x + 'px', 'top': mouse_y + 'px'}).fadeIn('fast');
      tooltip_timer = setTimeout("jQuery('.portal-pages-favorite-tooltip').fadeOut('slow', function() { jQuery(this).remove(); });", 3000);
      return;
    }

    var resource = this.props.resource;
    var done = function () {
      resource.is_favorite = !resource.is_favorite;
      this.setState({favorited: resource.is_favorite});
    }.bind(this);
    if (resource.is_favorite) {
      jQuery.post('/api/v1/materials/remove_favorite', {favorite_id: resource.favorite_id}, done);
    }
    else {
      jQuery.post('/api/v1/materials/add_favorite', {id: resource.id, type: resource.class_name_underscored}, done);
    }
  },

  renderLightbox: function () {
    if (!this.state.lightbox) {
      return null;
    }
    return ResourceLightbox({resource: this.props.resource, toggleLightbox: this.toggleLightbox});
  },

  renderFavoriteStar: function () {
    var active = this.state.favorited ? " portal-pages-finder-result-favorite-active" : "";
    return div({className: "portal-pages-finder-result-favorite" + active, onClick: this.toggleFavorite},
      i({className: "icon-favorite"})
    );
  },

  render: function () {
    var resource = this.props.resource;
    var options = {href: resource.stem_resource_url};

    if (this.state.hovering || this.state.lightbox) {
      return div({className: "portal-pages-finder-result col-4", onClick: this.toggleLightbox, onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut},
        a(options,
          div({className: "portal-pages-finder-result-description"}, resource.filteredDescription),
          this.renderFavoriteStar(),
        ),
        GradeLevels({resource: resource}),
        this.renderFavoriteStar()
      );
    }
    return div({className: "portal-pages-finder-result col-4", onClick: this.toggleLightbox, onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut},
      a(options,
        img({alt: resource.name, src: resource.icon.url}),
        div({className: "portal-pages-finder-result-name"}, resource.name),
        this.renderFavoriteStar()
      ),
      GradeLevels({resource: resource})
    );
  }
});

module.exports = StemFinderResult;

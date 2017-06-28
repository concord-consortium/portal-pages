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
  },

  toggleFavorite: function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!Portal.currentUser.isLoggedIn || !Portal.currentUser.isTeacher) {
      alert("Sorry, only logged in teachers can favorite resources.");
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
    var star = this.state.favorited ? "&#x2605;" : "&#x2606;";
    var active = this.state.favorited ? " portal-pages-finder-result-favorite-active" : "";
    return div({className: "portal-pages-finder-result-favorite" + active, dangerouslySetInnerHTML: {__html: star}, onClick: this.toggleFavorite});
  },

  render: function () {
    var resource = this.props.resource;
    var options = {href: resource.stem_resource_url, onClick: this.toggleLightbox};

    if (this.state.hovering || this.state.lightbox) {
      return div({className: "portal-pages-finder-result col-4", onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut},
        a(options,
          div({className: "portal-pages-finder-result-description"}, resource.filteredDescription),
          GradeLevels({resource: resource}),
          this.renderFavoriteStar(),
          this.renderLightbox()
        )
      );
    }
    return div({className: "portal-pages-finder-result col-4", onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut},
      a(options,
        img({alt: resource.name, src: resource.icon.url}),
        div({className: "portal-pages-finder-result-name"}, resource.name),
        GradeLevels({resource: resource}),
        this.renderFavoriteStar(),
        this.renderLightbox()
      )
    );
  }
});

module.exports = StemFinderResult;

var Component = require('../helpers/component');

var ResourceLightbox = require('./resource-lightbox');

var fadeIn = require("../helpers/fade-in");
var shuffleArray = require("../helpers/shuffle-array");
var sortByName = require("../helpers/sort-by-name");
var pluralize = require("../helpers/pluralize");
var randomSubset = require("../helpers/random-subset");

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
    this.setState({
      lightbox: lightbox,
      hovering: false
    });
  },

  renderGradeLevels: function (resource) {
    var levels = this.props.gradeFilters.reduce(function (levelAcc, gradeFilter) {
      var matching = gradeFilter.grades.reduce(function (matchingAcc, grade) {
        debugger;
        if (resource.grade_levels.indexOf(grade) !== -1) {
          matchingAcc.push(grade);
        }
        return matchingAcc;
      }, []);
      if (matching.length > 0) {
        levelAcc.push(gradeFilter.label);
      }
      return levelAcc;
    }, []);

    if (levels.length === 0) {
      levels = ["Informal Learning"];
    }

    return div({className: "stem-finder-result-grade-levels"},
      levels.map(function (level, index) {
        return div({key: index, className: "stem-finder-result-grade-level"}, level);
      })
    );
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
      jQuery.get('/api/v1/materials/remove_favorite', {favorite_id: resource.favorite_id}, done);
    }
    else {
      jQuery.get('/api/v1/materials/add_favorite', {id: resource.id, type: resource.class_name_underscored}, done);
    }
  },

  renderLightbox: function () {
    if (!this.state.lightbox) {
      return null;
    }
    // TODO: remove when added to search results
    this.props.resource.related_resources = [
      this.props.resource, this.props.resource
    ];
    return ResourceLightbox({resource: this.props.resource, toggleLightbox: this.toggleLightbox, gradeFilters: this.props.gradeFilters});
  },

  renderFavoriteStar: function () {
    var star = this.state.favorited ? "&#x2605;" : "&#x2606;";
    var active = this.state.favorited ? " stem-finder-result-favorite-active" : "";
    return div({className: "stem-finder-result-favorite" + active, dangerouslySetInnerHTML: {__html: star}, onClick: this.toggleFavorite});
  },

  render: function () {
    var resource = this.props.resource;
    var options = {className: "stem-finder-result", href: resource.stem_resource_url, onClick: this.toggleLightbox, onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut};

    if (this.state.hovering || this.state.lightbox) {
      return a(options,
        div({className: "stem-finder-result-description"}, resource.filteredDescription),
        this.renderGradeLevels(resource),
        this.renderFavoriteStar(),
        this.renderLightbox()
      );
    }
    return a(options,
      img({alt: resource.name, src: resource.icon.url}),
      div({className: "stem-finder-result-name"}, resource.name),
      this.renderGradeLevels(resource),
      this.renderFavoriteStar(),
      this.renderLightbox()
    );
  }
});

module.exports = StemFinderResult;
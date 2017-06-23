var Component = require('../helpers/component');

var div = React.DOM.div;
var img = React.DOM.img;

var RelatedResourceResult = Component({
  getInitialState: function () {
    return {
      hovering: false
    };
  },

  handleMouseOver: function () {
    this.setState({hovering: true});
  },

  handleMouseOut: function () {
    this.setState({hovering: false});
  },

  renderGradeLevels: function (resource) {
    var levels = this.props.gradeFilters.reduce(function (levelAcc, gradeFilter) {
      var matching = gradeFilter.grades.reduce(function (matchingAcc, grade) {
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

  render: function () {
    var resource = this.props.resource;
    var options = {className: "stem-finder-result", onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut};

    if (this.state.hovering) {
      return div(options,
        div({className: "stem-finder-result-description"}, resource.filteredDescription),
        this.renderGradeLevels(resource)
      );
    }
    return div(options,
      img({alt: resource.name, src: resource.icon.url}),
      div({className: "stem-finder-result-name"}, resource.name),
      this.renderGradeLevels(resource)
    );
  }
});

module.exports = RelatedResourceResult;

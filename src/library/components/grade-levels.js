var Component = require('../helpers/component');
var filters = require("../helpers/filters");

var div = React.DOM.div;

var GradeLevels = Component({

  render: function () {
    var resource = this.props.resource;
    var levels = filters.gradeFilters.reduce(function (levelAcc, gradeFilter) {
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
      return null;
    }

    return div({className: this.props.className || "portal-pages-finder-result-grade-levels"},
      levels.map(function (level, index) {
        return div({key: index, className: "portal-pages-finder-result-grade-level"}, level);
      })
    );
  }
});

module.exports = GradeLevels;
var div = React.DOM.div;

var fadeIn = function (component, duration) {
  var interval = 10,
      increment = interval / duration,
      animateOpacity = function () {
        var opacity = Math.min(component.state.opacity + increment, 1);
        component.setState({opacity: opacity});
        if (opacity === 1) {
          clearInterval(animation);
        }
      },
      animation = setInterval(animateOpacity, interval);
};

var Component = function (options) {
  return React.createFactory(React.createClass(options));
};

var UserAuth = Component({
  render: function () {
    return div({}, "UserAuth");
  }
});

var StemFinder = Component({
  getInitialState: function () {
    return {
      opacity: 0
    };
  },

  componentDidMount: function () {
    fadeIn(this, 1000);
  },

  renderSubjectAreas: function () {
    return div({className: "stem-finder-form-subject-areas"}, "Subject Areas...");
  },

  renderFilters: function () {
    return div({className: "stem-finder-form-filters"}, "Filters");
  },

  renderSearch: function () {
    return div({className: "stem-finder-form-search"}, "Search");
  },

  renderForm: function () {
    return div({className: "stem-finder-form"},
      div({className: "stem-finder-form-inner", style: {opacity: this.state.opacity}},
        this.renderSubjectAreas(),
        this.renderFilters(),
        this.renderSearch()
      )
    );
  },

  render: function () {
    return div({},
      this.renderForm()
    );
  }
});

var CollectionCards = Component({
  getInitialState: function () {
    return {
      opacity: 0
    };
  },

  componentDidMount: function () {
    fadeIn(this, 1000);
  },

  render: function () {
    return div({style: {opacity: this.state.opacity}}, "CollectionCards");
  }
});


ReactDOM.render(UserAuth({}), jQuery('#stem-nav-auth')[0]);
ReactDOM.render(StemFinder({}), jQuery('#stem-finder')[0]);
ReactDOM.render(CollectionCards({}), jQuery('#stem-collections-cards')[0]);
var DISPLAY_LIMIT_INCREMENT = 6;

var div = React.DOM.div;
var button = React.DOM.button;
var a = React.DOM.a;
var svg = React.DOM.svg;
var circle = React.DOM.circle;
var text = React.DOM.text;
var input = React.DOM.input;
var span = React.DOM.span;
var form = React.DOM.form;
var pre = React.DOM.pre;
var img = React.DOM.img;

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

var sortByName = function (a, b) {
  var aName = a.name.toUpperCase();
  var bName = b.name.toUpperCase();
  return ((aName > bName) - (bName > aName));
};

var pluralize = function (count, singular, plural) {
  plural = plural || singular + "s";
  return count === 1 ? singular : plural;
};

// from https://stackoverflow.com/a/12646864
var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

/*** React Functions ***/

var Component = function (options) {
  return React.createFactory(React.createClass(options));
};

var UserAuth = Component({
  getInitialState: function () {
    return {
      loggedIn: Portal.currentUser.isLoggedIn,
      opacity: 0,
      userId: 0
    };
  },

  componentDidMount: function () {
    fadeIn(this, 1000);

    if (this.state.loggedIn) {
      var self = this;
      jQuery.ajax({
        url: '/auth/user',
        dataType: 'json'
      }).done(function (data) {
        self.setState({userId: data.id});
      });
    }
  },

  handleLogginButton: function () {
    Portal.showModal("#log-in");
  },

  handleRegisterButton: function () {
    Portal.openSignupModal();
  },

  renderLoggedIn: function () {
    var prefsUrl = this.state.userId ? "/users/" + this.state.userId + "/preferences" : "#";
    return div({},
      div({}, "Welcome " + Portal.currentUser.firstName + " " + Portal.currentUser.lastName),
      div({},
        a({href: "/help", target: "_blank"}, "Help"),
        " | ",
        a({href: prefsUrl}, "My Preferences"),
        " | ",
        a({href: "/users/sign_out"}, "Logout")
      )
    );
  },

  renderLoggedOut: function () {
    return div({style: {opacity: this.state.opacity}},
      button({className: "stem-auth-login-button", onClick: this.handleLogginButton}, "Log In"),
      button({className: "stem-auth-register-button", onClick: this.handleRegisterButton}, "Register")
    );
  },

  render: function () {
    return this.state.loggedIn ? this.renderLoggedIn() : this.renderLoggedOut();
  }
});

var StemFinder = Component({
  getInitialState: function () {
    return {
      opacity: 0,
      subjectAreas: [
        {id: 1, title: "Physics & Chemistry", searchAreas: ["Chemistry", "Physics"]},
        {id: 2, title: "Life Science", searchAreas: ["Biology"]},
        {id: 3, title: "Engineering & Tech", searchAreas: ["Engineering"]},
        {id: 4, title: "Earth & Space", searchAreas: ["Earth and Space Science"]},
        {id: 5, title: "Mathematics", searchAreas: ["Mathematics"]}
      ],
      featureFilters: [
        {id: 1, title: "Sequence", searchMaterialType: "Investigation"},
        {id: 2, title: "Model (TODO)"},
        {id: 3, title: "Browser-Based", searchMaterialProperty: "Runs in browser"},
        {id: 4, title: "Activity", searchMaterialType: "Activity"},
        {id: 5, title: "Sensor-Based (TODO)"},
      ],
      gradeFilters: [
        {id: "elementary-school", title: "Elementary", grades: ["K", 1, 2, 3, 4, 5, 6], label: "K-6", searchGroups: ["K-2", "3-4", "5-6"]},
        {id: "middle-school", title: "Middle School", grades: [7, 8], label: "7-8", searchGroups: ["7-8"]},
        {id: "high-school", title: "High School", grades: [9, 10, 11, 12], label: "9-12", searchGroups: ["9-12"]},
        {id: "higher-education", title: "University", grades: ["Higher Ed"], label: "University", searchGroups: ["Higher Ed"]},
        {id: "informal-learning", title: "Informal Learning (TODO)", grades: [], label: "Informal Learning"},
      ],
      subjectAreasSelected: [],
      featureFiltersSelected: [],
      gradeFiltersSelected: [],
      resources: [],
      numTotalResources: 0,
      displayLimit: DISPLAY_LIMIT_INCREMENT,
      searchPage: 1,
      firstSearch: true,
      searching: false,
      noResourcesFound: false
    };
  },

  componentWillMount: function () {
    this.search();
  },

  search: function (incremental) {

    var resources = incremental ? this.state.resources.slice(0) : [];
    var searchPage = incremental ? this.state.searchPage + 1 : 1;
    var displayLimit = incremental ? this.state.displayLimit + DISPLAY_LIMIT_INCREMENT : DISPLAY_LIMIT_INCREMENT;

    var keyword = (this.refs.keyword ? this.refs.keyword.value : "") || "";
    var query = [
      "search_term=",
      encodeURIComponent(keyword),
      "&sort_order=Alphabetical",
      "&include_official=1",
      "&model_types=All",
      "&investigation_page=",
      searchPage,
      "&activity_page=",
      searchPage,
      "&interactive_page=",
      searchPage,
      "&per_page=",
      DISPLAY_LIMIT_INCREMENT
    ];

    // subject areas
    this.state.subjectAreasSelected.forEach(function (subjectArea) {
      subjectArea.searchAreas.forEach(function (searchArea) {
        query.push("&subject_areas[]=");
        query.push(encodeURIComponent(searchArea));
      });
    });

    // features
    this.state.featureFiltersSelected.forEach(function (featureFilter) {
      if (featureFilter.searchMaterialType) {
        query.push("&material_types[]=");
        query.push(encodeURIComponent(featureFilter.searchMaterialType));
      }
      if (featureFilter.searchMaterialProperty) {
        query.push("&material_properties[]=");
        query.push(encodeURIComponent(featureFilter.searchMaterialProperty));
      }
      // TODO: model and sensor-based
    });

    // grade
    this.state.gradeFiltersSelected.forEach(function (gradeFilter) {
      if (gradeFilter.searchGroups) {
        gradeFilter.searchGroups.forEach(function (searchGroup) {
          query.push("&grade_level_groups[]=");
          query.push(encodeURIComponent(searchGroup));
        });
      }
      // TODO: informal learning?
    });

    this.setState({
      searching: true,
      noResourcesFound: false,
      resources: resources
    });

    jQuery.ajax({
      url: '/api/v1/search/search',
      data: query.join(""),
      dataType: 'json'
    }).done(function (result) {
      var numTotalResources = 0;
      var results = result.results;
      var descriptionFilter = document.createElement("DIV");

      results.forEach(function (result) {
        result.materials.forEach(function (material) {
          descriptionFilter.innerHTML = material.description;
          material.filteredDescription = descriptionFilter.innerText;
          resources.push(material);
        });
        numTotalResources += result.pagination.total_items;
      });

      resources.sort(sortByName);

      if (this.state.firstSearch) {
        fadeIn(this, 1000);
      }

      this.setState({
        firstSearch: false,
        resources: resources,
        numTotalResources: numTotalResources,
        searchPage: searchPage,
        displayLimit: displayLimit,
        searching: false,
        noResourcesFound: numTotalResources === 0
      });

    }.bind(this));
  },

  renderLogo: function (subjectArea) {
    var size = 40;
    var selected = this.state.subjectAreasSelected.indexOf(subjectArea) !== -1;
    var clicked = function () {
      var subjectAreasSelected = this.state.subjectAreasSelected.slice();
      var index = subjectAreasSelected.indexOf(subjectArea);
      if (index === -1) {
        subjectAreasSelected.push(subjectArea);
      }
      else {
        subjectAreasSelected.splice(index, 1);
      }
      this.setState({subjectAreasSelected: subjectAreasSelected}, this.search);
    }.bind(this);
    return div({key: subjectArea.id, className: "stem-finder-form-subject-areas-logo", onClick: clicked},
      svg({height: size * 2, width: size * 2},
        circle({cx: size, cy: size, r: size, fill: selected ? "#0592AF" : "#fff"}),
        text({x: size, y: size + 5, textAnchor: "middle", fill: selected ? "#fff" : "#000"}, "Icon Here")
      ),
      div({className: "stem-finder-form-subject-areas-logo-label"}, subjectArea.title)
    );
  },

  renderSubjectAreas: function () {
    return div({className: "stem-finder-form-subject-areas"},
      this.state.subjectAreas.map(function (subjectArea) {
        return this.renderLogo(subjectArea);
      }.bind(this))
    );
  },

  renderFilters: function (type, title) {
    return div({className: "stem-finder-form-filters"},
      div({className: "stem-finder-form-filters-title"}, title),
      div({className: "stem-finder-form-filters-options"},
        this.state[type].map(function (filter) {
          var selectedKey = type + "Selected";
          var handleChange = function () {
            var selectedFilters = this.state[selectedKey].slice();
            var index = selectedFilters.indexOf(filter);
            if (index === -1) {
              selectedFilters.push(filter);
            }
            else {
              selectedFilters.splice(index, 1);
            }
            var state = {};
            state[selectedKey] = selectedFilters;
            this.setState(state, this.search);
          }.bind(this);
          var checked = this.state[selectedKey].indexOf(filter) !== -1;
          return div({key: filter.id, className: "stem-finder-form-filters-option"},
            input({type: "checkbox", onChange: handleChange, checked: checked}),
            span({}, filter.title)
          );
        }.bind(this))
      )
    );
  },

  renderSearch: function () {
    var search = function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.search();
    }.bind(this);
    return div({className: "stem-finder-form-search"},
      div({className: "stem-finder-form-search-title"}, "Search by keyword:"),
      form({onSubmit: search},
        input({ref: "keyword", placeholder: "Type search term here"})
      )
    );
  },

  renderForm: function () {
    return div({className: "stem-finder-form"},
      div({className: "stem-finder-form-inner", style: {opacity: this.state.opacity}},
        this.renderSubjectAreas(),
        this.renderFilters("featureFilters", "Filter by Feature:"),
        this.renderFilters("gradeFilters", "Filter by Grade:"),
        this.renderSearch()
      )
    );
  },

  renderResultsHeader: function () {
    if (this.state.noResourcesFound || this.state.searching) {
      return div({className: "stem-finder-header"},
        div({className: "stem-finder-header-resource-count"},
          span({}, this.state.noResourcesFound ? "No Resources Found" : "Searching...")
        )
      );
    }

    var showingAll = this.state.displayLimit >= this.state.numTotalResources;
    var multipleResources = this.state.numTotalResources > 1;
    var resourceCount = showingAll ? this.state.numTotalResources : this.state.displayLimit + " of " + this.state.numTotalResources;
    return div({className: "stem-finder-header"},
      div({className: "stem-finder-header-resource-count"},
        showingAll && multipleResources ? "Showing All " : "Showing ",
        span({}, resourceCount + " " + pluralize(resourceCount, "Resource") + ":")
      )
    );
  },

  renderLoadMore: function () {
    var handleLoadAll = function () {
      if (!this.state.searching) {
        this.search(true);
      }
    }.bind(this);
    if ((this.state.resources.length === 0) || (this.state.displayLimit >= this.state.numTotalResources)) {
      return null;
    }
    return div({className: "stem-finder-load-all", onClick: handleLoadAll},
      button({}, this.state.searching ? "Loading..." : "Load More")
    );
  },

  renderResults: function () {
    if (this.state.firstSearch) {
      return null;
    }
    var resources = this.state.resources.slice(0, this.state.displayLimit);
    return div({className: "stem-finder-results", style: {opacity: this.state.opacity}},
      div({className: "stem-finder-results-inner"},
        this.renderResultsHeader(),
        resources.map(function (resource, index) {
          return StemFinderResult({key: index, resource: resource, gradeFilters: this.state.gradeFilters});
        }.bind(this)),
        this.renderLoadMore()
      )
    );
  },

  render: function () {
    return div({},
      this.renderForm(),
      this.renderResults()
    );
  }
});

var StemFinderResult = Component({
  getInitialState: function () {
    return {
      hovering: false,
      favorited: this.props.resource.favorited
    };
  },

  handleMouseOver: function () {
    this.setState({hovering: true});
  },

  handleMouseOut: function () {
    this.setState({hovering: false});
  },

  renderGradeLevels: function (resource) {
    return null;

    var levels = this.props.gradeFilters.reduce(function (levelAcc, gradeFilter) {
      var matching = gradeFilter.grades.reduce(function (matchingAcc, grade) {
        if (resource.grades.indexOf(grade) !== -1) {
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

  toggleFavorite: function () {
    // TODO: do api call to favorite resource
    this.props.resource.favorited = !this.props.resource.favorited;
    this.setState({favorited: this.props.resource.favorited});
  },

  renderFavoriteStar: function () {
    var star = this.state.favorited ? "&#x2605;" : "&#x2606;";
    var active = this.state.favorited ? " stem-finder-result-favorite-active" : "";
    return div({className: "stem-finder-result-favorite" + active, dangerouslySetInnerHTML: {__html: star}, onClick: this.toggleFavorite});
  },

  render: function () {
    var resource = this.props.resource;
    var options = {className: "stem-finder-result", onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut};

    if (this.state.hovering) {
      return div(options,
        div({className: "stem-finder-result-description"}, resource.filteredDescription),
        this.renderGradeLevels(resource),
        this.renderFavoriteStar()
      );
    }
    return div(options,
      img({alt: resource.name, src: resource.icon.url}),
      div({className: "stem-finder-result-name"}, resource.name),
      this.renderGradeLevels(resource),
      this.renderFavoriteStar()
    );
  }
});

var CollectionCards = Component({
  getInitialState: function () {
    return {
      opacity: 0,
      collections: []
    };
  },

  componentDidMount: function () {
    jQuery.ajax({
      url: "/api/v1/projects",
      dataType: "json"
    }).done(function (data) {
      var collections = data.reduce(function (collections, collection) {
        if (collection.public && collection.landing_page_slug) {
          collections.push(collection);
        }
        return collections;
      }, []);
      this.setState({collections: shuffleArray(collections).slice(0, 3)});
      fadeIn(this, 1000);
    }.bind(this));
  },

  render: function () {
    if (this.state.collections.length === 0) {
      return null;
    }
    return div({style: {opacity: this.state.opacity}},
      this.state.collections.map(function (collection) {
        return div({key: collection.landing_page_slug, className: "stem-collections-card"},
          a({href: "/" + collection.landing_page_slug},
            img({alt: collection.name, src: collection.project_card_image_url}),
            div({className: "stem-collections-card-name"}, collection.name),
            div({className: "stem-collections-card-description"}, collection.project_card_description)
          )
        );
      })
    );
  }
});


ReactDOM.render(UserAuth({}), document.getElementById('stem-nav-auth'));
ReactDOM.render(StemFinder({}), document.getElementById('stem-finder'));
ReactDOM.render(CollectionCards({}), document.getElementById('stem-collections-cards'));
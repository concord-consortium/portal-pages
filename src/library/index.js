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
var h1 = React.DOM.h1;

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

var randomSubset = function (array) {
  var count = Math.round(Math.random() * array.length);
  var subset = array.slice(0, count);
  return shuffleArray(subset);
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
        {key: "physics-chemistry", title: "Physics & Chemistry", searchAreas: ["Chemistry", "Physics"]},
        {key: "life-sciences", title: "Life Science", searchAreas: ["Biology"]},
        {key: "engineering-tech", title: "Engineering & Tech", searchAreas: ["Engineering"]},
        {key: "earth-space", title: "Earth & Space", searchAreas: ["Earth and Space Science"]},
        {key: "mathematics", title: "Mathematics", searchAreas: ["Mathematics"]}
      ],
      featureFilters: [
        {key: "sequence", title: "Sequence", searchMaterialType: "Investigation"},
        {key: "model", title: "Model", searchMaterialType: "Interactive"},
        {key: "browser-based", title: "Browser-Based", searchMaterialProperty: "Runs in browser"},
        {key: "activity", title: "Activity", searchMaterialType: "Activity"},
        {key: "sensor-based", title: "Sensor-Based (TODO)"},
      ],
      gradeFilters: [
        {key: "elementary-school", title: "Elementary", grades: ["K", 1, 2, 3, 4, 5, 6], label: "K-6", searchGroups: ["K-2", "3-4", "5-6"]},
        {key: "middle-school", title: "Middle School", grades: [7, 8], label: "7-8", searchGroups: ["7-8"]},
        {key: "high-school", title: "High School", grades: [9, 10, 11, 12], label: "9-12", searchGroups: ["9-12"]},
        {key: "higher-education", title: "Higher Education", grades: ["Higher Ed"], label: "Higher Education", searchGroups: ["Higher Ed"]}
        //{key: "informal-learning", title: "Informal Learning (TODO)", grades: [], label: "Informal Learning"},
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
      noResourcesFound: false,
      lastSearchResultCount: 0,
    };
  },

  componentWillMount: function () {
    this.search();
  },

  search: function (incremental) {

    var displayLimit = incremental ? this.state.displayLimit + DISPLAY_LIMIT_INCREMENT : DISPLAY_LIMIT_INCREMENT;

    // short circuit further incremental searches when all data has been downloaded
    if (incremental && (this.state.lastSearchResultCount === 0)) {
      this.setState({
        displayLimit: displayLimit
      });
      return;
    }

    var resources = incremental ? this.state.resources.slice(0) : [];
    var searchPage = incremental ? this.state.searchPage + 1 : 1;

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
      var lastSearchResultCount = 0;

      results.forEach(function (result) {
        result.materials.forEach(function (material) {
          descriptionFilter.innerHTML = material.description;
          material.filteredDescription = descriptionFilter.innerText;

          // fake grades for now until present in search results
          material.grades = randomSubset(["K", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "Higher Ed"]);

          resources.push(material);
          lastSearchResultCount++;
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
        noResourcesFound: numTotalResources === 0,
        lastSearchResultCount: lastSearchResultCount
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
    return div({key: subjectArea.key, className: "stem-finder-form-subject-areas-logo", onClick: clicked},
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

  clearFilters: function () {
    this.refs.keyword.value = "";
    this.setState({
      subjectAreasSelected: [],
      featureFiltersSelected: [],
      gradeFiltersSelected: []
    }, this.search);
  },

  clearKeyword: function () {
    this.refs.keyword.value = "";
    this.search();
  },

  toggleFilter: function (type, filter) {
    var selectedKey = type + "Selected";
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
  },

  renderFilters: function (type, title) {
    return div({className: "stem-finder-form-filters"},
      div({className: "stem-finder-form-filters-title"}, title),
      div({className: "stem-finder-form-filters-options"},
        this.state[type].map(function (filter) {
          var selectedKey = type + "Selected";
          var handleChange = function () {
            this.toggleFilter(type, filter);
          }.bind(this);
          var checked = this.state[selectedKey].indexOf(filter) !== -1;
          return div({key: filter.key, className: "stem-finder-form-filters-option"},
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

  renderResultsHeaderFilters: function () {
    var keyword = jQuery.trim((this.refs.keyword ? this.refs.keyword.value : "") || "");
    if (keyword.length + this.state.subjectAreasSelected.length + this.state.featureFiltersSelected.length + this.state.gradeFiltersSelected.length === 0) {
      return null;
    }

    var filters = [];
    this.state.subjectAreasSelected.forEach(function (subjectArea) {
      filters.push(HeaderFilter({key: subjectArea.key, type: "subjectAreas", filter: subjectArea, toggleFilter: this.toggleFilter}));
    }.bind(this));
    this.state.featureFiltersSelected.forEach(function (featureFilter) {
      filters.push(HeaderFilter({key: featureFilter.key, type: "featureFilters", filter: featureFilter, toggleFilter: this.toggleFilter}));
    }.bind(this));
    this.state.gradeFiltersSelected.forEach(function (gradeFilter) {
      filters.push(HeaderFilter({key: gradeFilter.key, type: "gradeFilters", filter: gradeFilter, toggleFilter: this.toggleFilter}));
    }.bind(this));

    if (keyword.length > 0) {
      filters.push(div({className: "stem-finder-header-filter"},
        "Keyword: " + keyword,
        span({onClick: this.clearKeyword}, "X")
      ));
    }

    filters.push(div({key: "clear", className: "stem-finder-header-filters-clear", onClick: this.clearFilters}, "Clear Filters"));

    return div({className: "stem-finder-header-filters"}, filters);
  },

  renderResultsHeader: function () {
    if (this.state.noResourcesFound || this.state.searching) {
      return div({className: "stem-finder-header"},
        div({className: "stem-finder-header-resource-count"},
          span({}, this.state.noResourcesFound ? "No Resources Found" : "Searching...")
        ),
        this.renderResultsHeaderFilters()
      );
    }

    var showingAll = this.state.displayLimit >= this.state.numTotalResources;
    var multipleResources = this.state.numTotalResources > 1;
    var resourceCount = showingAll ? this.state.numTotalResources : this.state.displayLimit + " of " + this.state.numTotalResources;
    return div({className: "stem-finder-header"},
      div({className: "stem-finder-header-resource-count"},
        showingAll && multipleResources ? "Showing All " : "Showing ",
        span({}, resourceCount + " " + pluralize(resourceCount, "Resource") + ":")
      ),
      this.renderResultsHeaderFilters()
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

var HeaderFilter = Component({
  handleClear: function () {
    this.props.toggleFilter(this.props.type, this.props.filter);
  },

  render: function () {
    return div({className: "stem-finder-header-filter"},
      this.props.filter.title,
      span({onClick: this.handleClear}, "X")
    );
  }
});

var StemFinderResult = Component({
  getInitialState: function () {
    return {
      hovering: false,
      favorited: this.props.resource.favorited,
      lightbox: false
    };
  },

  handleMouseOver: function () {
    this.setState({hovering: true});
  },

  handleMouseOut: function () {
    this.setState({hovering: false});
  },

  toggleLightbox: function () {
    var lightbox = !this.state.lightbox;
    this.setState({
      lightbox: lightbox,
      hovering: false
    });
  },

  renderGradeLevels: function (resource) {
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

  toggleFavorite: function (e) {
    e.preventDefault();
    e.stopPropagation();
    // TODO: do api call to favorite resource
    this.props.resource.favorited = !this.props.resource.favorited;
    this.setState({favorited: this.props.resource.favorited});
  },

  renderLightbox: function () {
    if (!this.state.lightbox) {
      return null;
    }
    return ResourceLightbox({resource: this.props.resource, toggleLightbox: this.toggleLightbox});
  },

  renderFavoriteStar: function () {
    var star = this.state.favorited ? "&#x2605;" : "&#x2606;";
    var active = this.state.favorited ? " stem-finder-result-favorite-active" : "";
    return div({className: "stem-finder-result-favorite" + active, dangerouslySetInnerHTML: {__html: star}, onClick: this.toggleFavorite});
  },

  render: function () {
    var resource = this.props.resource;
    var options = {className: "stem-finder-result", onClick: this.toggleLightbox, onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut};

    if (this.state.hovering) {
      return div(options,
        div({className: "stem-finder-result-description"}, resource.filteredDescription),
        this.renderGradeLevels(resource),
        this.renderFavoriteStar(),
        this.renderLightbox()
      );
    }
    return div(options,
      img({alt: resource.name, src: resource.icon.url}),
      div({className: "stem-finder-result-name"}, resource.name),
      this.renderGradeLevels(resource),
      this.renderFavoriteStar(),
      this.renderLightbox()
    );
  }
});

var ResourceLightbox = Component({
  handleClose: function () {
    this.props.toggleLightbox();
  },

  renderRequirements: function () {
    var runsInBrowser = true; // TODO: get from search results when they become available
    if (runsInBrowser) {
      return div({className: "stem-resource-lightbox-requirements"},
        "This activity runs entirely in a Web browser. Preferred browsers are: ",
        a({href: "http://www.google.com/chrome/", title:"Get Google\'s Chrome Web Browser"}, "Google Chrome"),
        " (versions 30 and above), ",
        a({href: "http://www.apple.com/safari/", title:"Get Apple\'s Safari Web Browser"}, "Safari"),
        " (versions 7 and above), ",
        a({href: "http://www.firefox.com/", title:"Get the Firefox Web Browser"}, "Firefox"),
        " (version 30 and above), ",
        a({href: "http://www.microsoft.com/ie/", title:"Get Microsoft\'s Internet Explorer Web Browser"}, "Internet Explorer"),
        " (version 10 or higher), and ",
        a({href: "https://www.microsoft.com/en-us/windows/microsoft-edge#f7x5cdShtkSvrROV.97", title:"Get Microsoft\'s Edge Web Browser"}, "Microsoft Edge"),
        "."
      );
    }
    //this.requirements = '<p>This resource requires Java. You can download Java for free from <a href="http://java.com/" title="Get Java">java.com</a>.</p><p>Using OS X 10.9 or newer? You\'ll also need to install our launcher app. <a href="http://static.concord.org/installers/cc_launcher_installer.dmg" title="Download the CCLauncher installer">Download the launcher installer</a>, open the .dmg file and drag the CCLauncher app to your Applications folder, then return to this page and launch the resource.</p>';
  },

  render: function () {
    var resource = this.props.resource;
    return div({className: "stem-resource-lightbox"},
      div({className: "stem-resource-lightbox-background", onClick: this.handleClose}),
      div({className: "stem-resource-lightbox-background-close"}, "X"),
      div({className: "stem-resource-lightbox-modal"},
        div({className: "stem-resource-lightbox-modal-content"},
          img({src: resource.icon.url}),
          h1({}, resource.name),
          div({className: "stem-resource-lightbox-description"}, resource.filteredDescription),
          div({},
            button({className: "stem-resource-lightbox-launch-button"}, "Launch Activity"),
            button({className: "stem-resource-lightbox-assign-button"}, "Assign Activity")
          ),
          this.renderRequirements()
        )
      )
    )
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

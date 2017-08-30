var Component = require('../helpers/component');
var StemFinderResult = require("../components/stem-finder-result");
var HeaderFilter = require("../components/header-filter");

var DISPLAY_LIMIT_INCREMENT = 6;

var randomSubset = require("../helpers/random-subset");
var sortByName = require("../helpers/sort-by-name");
var fadeIn = require("../helpers/fade-in");
var pluralize = require("../helpers/pluralize");
var waitForAutoShowingLightboxToClose = require("../helpers/wait-for-auto-lightbox-to-close");
var filters = require("../helpers/filters");

var a = React.DOM.a;
var div = React.DOM.div;
var button = React.DOM.button;
var svg = React.DOM.svg;
var circle = React.DOM.circle;
var image = React.DOM.image;
var text = React.DOM.text;
var input = React.DOM.input;
var span = React.DOM.span;
var strong = React.DOM.strong;
var form = React.DOM.form;
var label = React.DOM.label;

var StemFinder = Component({
  getInitialState: function () {
    return {
      opacity: 0,
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
    waitForAutoShowingLightboxToClose(function () {
      this.search();
    }.bind(this));
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
      "&include_related=4",
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
      url: Portal.API_V1.SEARCH,
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
    //var size = 40;
    var selected = this.state.subjectAreasSelected.indexOf(subjectArea) !== -1;
    var clicked = function () {
      var subjectAreasSelected = this.state.subjectAreasSelected.slice();
      var index = subjectAreasSelected.indexOf(subjectArea);
      if (index === -1) {
        subjectAreasSelected.push(subjectArea);
        jQuery('#' + subjectArea.key).addClass('selected');
      }
      else {
        subjectAreasSelected.splice(index, 1);
        jQuery('#' + subjectArea.key).removeClass('selected');
      }
      this.setState({subjectAreasSelected: subjectAreasSelected}, this.search);
    }.bind(this);
    return div({key: subjectArea.key, id: subjectArea.key, className: "portal-pages-finder-form-subject-areas-logo col-2", onClick: clicked},
      div({className: "portal-pages-finder-form-subject-areas-logo-inner"}),
      div({className: "portal-pages-finder-form-subject-areas-logo-label"}, subjectArea.title)
    );
  },

  renderSubjectAreas: function () {
    return div({className: "portal-pages-finder-form-subject-areas col-12"},
      div({className: "col-1 spacer"}),
      filters.subjectAreas.map(function (subjectArea) {
        return this.renderLogo(subjectArea);
      }.bind(this))
    );
  },

  clearFilters: function () {
    jQuery('.portal-pages-finder-form-subject-areas-logo').removeClass('selected');
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
      jQuery('#' + filter.key).addClass('selected');
    }
    else {
      selectedFilters.splice(index, 1);
      jQuery('#' + filter.key).removeClass('selected');
    }
    var state = {};
    state[selectedKey] = selectedFilters;
    this.setState(state, this.search);
  },

  renderFilters: function (type, title) {
    return div({className: "portal-pages-finder-form-filters col-3"},
      div({className: "portal-pages-finder-form-filters-title"}, title),
      div({className: "portal-pages-finder-form-filters-options"},
        filters[type].map(function (filter) {
          var selectedKey = type + "Selected";
          var handleChange = function () {
            this.toggleFilter(type, filter);
          }.bind(this);
          var checked = this.state[selectedKey].indexOf(filter) !== -1;
          return div({key: filter.key, className: "portal-pages-finder-form-filters-option"},
            input({type: "checkbox", id: filter.key, name: filter.key, onChange: handleChange, checked: checked}),
            label({htmlFor: filter.key}, filter.title)
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
    return div({className: "portal-pages-finder-form-search col-4"},
      div({className: "portal-pages-finder-form-search-title"}, "Search by keyword"),
      form({onSubmit: search},
        div({className: 'portal-pages-search-input-container'},
          input({ref: "keyword", placeholder: "Type search term here"}),
          a({href: "/search"}, "Advanced Search")
        )
      )
    );
  },

  renderForm: function () {
    return div({className: "portal-pages-finder-form"},
      div({className: "portal-pages-finder-form-inner cols", style: {opacity: this.state.opacity}},
        this.renderSubjectAreas(),
        div({className: "col-1 spacer"}),
        div({className: "mobile-filter-toggle"}, "More Filters"),
        this.renderFilters("featureFilters", "Filter by Type"),
        this.renderFilters("gradeFilters", "Filter by Grade"),
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
      filters.push(div({className: "portal-pages-finder-header-filter"},
        "Keyword: " + keyword,
        span({onClick: this.clearKeyword})
      ));
    }

    filters.push(div({key: "clear", className: "portal-pages-finder-header-filters-clear", onClick: this.clearFilters}, "Clear Filters"));

    return div({className: "portal-pages-finder-header-filters"}, filters);
  },

  renderResultsHeader: function () {
    if (this.state.noResourcesFound || this.state.searching) {
      return div({className: "portal-pages-finder-header"},
        div({className: "portal-pages-finder-header-resource-count"}, this.state.noResourcesFound ? "No Resources Found" : "Searching..."),
        this.renderResultsHeaderFilters()
      );
    }

    var showingAll = this.state.displayLimit >= this.state.numTotalResources;
    var multipleResources = this.state.numTotalResources > 1;
    var resourceCount = showingAll ? this.state.numTotalResources : this.state.displayLimit + " of " + this.state.numTotalResources;
    return div({className: "portal-pages-finder-header"},
      div({className: "portal-pages-finder-header-resource-count"},
        showingAll && multipleResources ? "Showing All " : "Showing ",
        strong({}, resourceCount + " " + pluralize(resourceCount, "Resource"))
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
    return div({className: "portal-pages-finder-load-all col-6 center", onClick: handleLoadAll},
      button({}, this.state.searching ? "Loading..." : "Load More")
    );
  },

  renderResults: function () {
    if (this.state.firstSearch) {
      return null;
    }
    var resources = this.state.resources.slice(0, this.state.displayLimit);
    return div({className: "portal-pages-finder-results-inner"},
      this.renderResultsHeader(),
      div({className: 'portal-pages-finder-results-cards'},
        resources.map(function (resource, index) {
          return StemFinderResult({key: index, resource: resource});
        }.bind(this))
      ),
      this.renderLoadMore()
    );
  },

  render: function () {
    return div({},
      this.renderForm(),
      div({className: "portal-pages-finder-results cols", style: {opacity: this.state.opacity}},
        this.renderResults()
      )
    );
  }
});

module.exports = StemFinder;

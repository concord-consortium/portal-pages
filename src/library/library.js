var CollectionCards = require("./components/collection-cards");
var HeaderFilter = require("./components/header-filter");
var ResourceLightbox = require("./components/resource-lightbox");
var StemFinderResult = require("./components/stem-finder-result");
var StemFinder = require("./components/stem-finder");
var PageHeader = require("./components/page-header");
var UserAuth = require("./components/user-auth");
var MaterialsCollection = require("./components/materials-collection");
var GradeLevels = require("./components/grade-levels");

var render = function (component, id) {
  ReactDOM.render(component, document.getElementById(id));
};

var renderComponentFn = function (ComponentClass) {
  return function (options, id) {
    render(ComponentClass(options), id);
  };
};

window.PortalPages = {
  settings: {},  // default to empty, used to set flags from portal templates

  render: render,

  CollectionCards: CollectionCards,
  renderCollectionCards: renderComponentFn(CollectionCards),

  HeaderFilter: HeaderFilter,
  renderHeaderFilter: renderComponentFn(HeaderFilter),

  ResourceLightbox: ResourceLightbox,
  renderResourceLightbox: renderComponentFn(ResourceLightbox),

  StemFinderResult: StemFinderResult,
  renderStemFinderResult: renderComponentFn(StemFinderResult),

  StemFinder: StemFinder,
  renderStemFinder: renderComponentFn(StemFinder),

  PageHeader: PageHeader,
  renderPageHeader: renderComponentFn(PageHeader),

  UserAuth: UserAuth,
  renderUserAuth: renderComponentFn(UserAuth),

  GradeLevels: GradeLevels,
  renderGradeLevels: renderComponentFn(GradeLevels),

  MaterialsCollection: MaterialsCollection,
  // this is a different format to match to existing project pages which had 2 formats itself
  renderMaterialsCollection: function (collectionId, selectorOrElement, limitOrOptions) {
    var options = limitOrOptions || {};
    if (typeof limitOrOptions === "number") {
      options = {limit: limitOrOptions};
    }
    options.collection = collectionId;
    ReactDOM.render(MaterialsCollection(options), jQuery(selectorOrElement)[0]);
  }
};

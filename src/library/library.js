var CollectionCards = require("./components/collection-cards");
var HeaderFilter = require("./components/header-filter");
var ResourceLightbox = require("./components/resource-lightbox");
var StemFinderResult = require("./components/stem-finder-result");
var StemFinder = require("./components/stem-finder");
var UserAuth = require("./components/user-auth");

var render = function (component, id) {
  ReactDOM.render(component, document.getElementById(id));
};

var renderComponentFn = function (ComponentClass) {
  return function (options, id) {
    render(ComponentClass(options), id);
  };
};

window.PortalPages = {
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

  UserAuth: UserAuth,
  renderUserAuth: renderComponentFn(UserAuth)
};

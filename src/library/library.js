var CollectionCards = require("./components/collection-cards");
var HeaderFilter = require("./components/header-filter");
var ResourceLightbox = require("./components/resource-lightbox");
var StemFinderResult = require("./components/stem-finder-result");
var StemFinder = require("./components/stem-finder");
var PageHeader = require("./components/page-header");
var PageFooter = require("./components/page-footer");
var UserAuth = require("./components/user-auth");
var MaterialsCollection = require("./components/materials-collection");
var GradeLevels = require("./components/grade-levels");

var signup_functions    = require("./components/signup/signup_functions");

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

  PageFooter: PageFooter,
  renderPageFooter: renderComponentFn(PageFooter),

  UserAuth: UserAuth,
  renderUserAuth: renderComponentFn(UserAuth),

  GradeLevels: GradeLevels,
  renderGradeLevels: renderComponentFn(GradeLevels),

  //
  // How do clients know which div ID to pass here?
  // Also these are React Classes converted from the .js.coffee code
  // in portal. These will need to be instantiated differently than
  // the other components in here.
  // SignupModal: SignupModal,
  // renderSignupModal: renderComponentFn(SignupModal),
  //
  renderSignupModal: function(properties) {
    signup_functions.openSignupModal(properties);
  },
  renderLoginModal: function(properties) {
    signup_functions.openLoginModal(properties);
  },

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

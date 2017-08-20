var CollectionsPage = require("./components/collections-page");
var CollectionCards = require("./components/collection-cards");
var HeaderFilter = require("./components/header-filter");
var ResourceLightbox = require("./components/resource-lightbox");
var StemFinderResult = require("./components/stem-finder-result");
var StemFinder = require("./components/stem-finder");
var PageHeader = require("./components/page-header");
var PageFooter = require("./components/page-footer");
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

  CollectionsPage: CollectionsPage,
  renderCollectionsPage: renderComponentFn(CollectionsPage),

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

  GradeLevels: GradeLevels,
  renderGradeLevels: renderComponentFn(GradeLevels),

  //
  // Render modal popups for login and signup.
  // Unlike other PortalPages methods, these methods do not take a
  // DOM id as parameter. A DOM element will be dynamically generated
  // for these method.
  //
  // Params
  //    properties  - A properties object. E.g. { oauthProviders: [ ... ] }
  //
  renderSignupModal: function(properties) {
    signup_functions.openSignupModal(properties);
  },
  renderLoginModal: function(properties) {
    signup_functions.openLoginModal(properties);
  },

  //
  // Render a signup form to the specified DOM id.
  //
  // Params
  //    properties  - The properties.   E.g. { oauthProviders: [ ... ] }
  //    id          - The DOM id.       E.g. "#test-embedded-signup-form"
  //
  renderSignupForm: signup_functions.renderSignupForm,

  MaterialsCollection: MaterialsCollection,
  // this is a different format to match to existing project pages which had 2 formats itself
  renderMaterialsCollection: function (collectionId, selectorOrElement, limitOrOptions) {
    var options = limitOrOptions || {};
    if (typeof limitOrOptions === "number") {
      options = {limit: limitOrOptions};
    }
    options.collection = collectionId;
    ReactDOM.render(MaterialsCollection(options), jQuery(selectorOrElement)[0]);
  },

  //
  // Log out the current user
  //
  logout: function(successFunc, failFunc, redirectAfter) {

      console.log("INFO logging out...");

      jQuery.get("/api/v1/users/sign_out").done(function(data) {

        console.log("INFO logout success", data);

        if(successFunc) {
            successFunc();
        }
        
        if(redirectAfter) {
            console.log("INFO redirecting to " + redirectAfter);
            location.href = redirectAfter;
        } else {
            location.reload(true);
        }

      }).fail(function(err) {

        console.log("ERROR logout error", err);

        if(err.responseText) {
            var response = jQuery.parseJSON(err.responseText);
            console.log("ERROR logout error responseText", response.message);
        } 

        if(failFunc) {
            failFunc();
        }

      });
  }

};

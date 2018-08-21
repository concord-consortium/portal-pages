import './library.scss'
import CollectionsPage from './components/collections-page'
import CollectionCards from './components/collection-cards'
import HeaderFilter from './components/header-filter'
import ResourceLightbox from './components/resource-lightbox'
import StemFinderResult from './components/stem-finder-result'
import StemFinder from './components/stem-finder'
import PageHeader from './components/page-header'
import PageFooter from './components/page-footer'
import MaterialsCollection from './components/materials-collection'
import GradeLevels from './components/grade-levels'
import Tooltip from './components/tooltip.js'
import ParseQueryString from './helpers/parse-query-string'
import signupFunctions from './components/signup/signup_functions'
import RecentActivity from './components/recent-activity'
import Assignments from './components/assigments'
import Navigation from './components/navigation'
import UnitTestExample from './components/unit-test-example'
import RunWithCollaborators from './components/run-with-collaborators'

const render = function (component, id) {
  ReactDOM.render(component, document.getElementById(id))
}

const renderComponentFn = function (ComponentClass) {
  return function (options, id) {
    render(ComponentClass(options), id)
  }
}

window.PortalPages = {
  settings: {}, // default to empty, used to set flags from portal templates

  ParseQueryString: ParseQueryString,
  render: render,

  CollectionsPage: CollectionsPage,
  renderCollectionsPage: renderComponentFn(CollectionsPage),

  RecentActivity: RecentActivity,
  renderRecentActivity: function (options, id) {
    render(React.createElement(RecentActivity, options), id)
  },

  Assignments: Assignments,
  renderAssignments: function (options, id) {
    render(React.createElement(Assignments, options), id)
  },

  Navigation: Navigation,
  renderNavigation: function (options, id) {
    render(React.createElement(Navigation, options), id)
  },

  UnitTestExample: UnitTestExample,
  renderUnitTestExample: function (options, id) {
    render(React.createElement(UnitTestExample, options), id)
  },

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
  renderSignupModal: function (properties) {
    signupFunctions.openSignupModal(properties)
  },
  renderLoginModal: function (properties) {
    signupFunctions.openLoginModal(properties)
  },
  renderForgotPasswordModal: function (properties) {
    signupFunctions.openForgotPasswordModal(properties)
  },

  //
  // Render a signup form to the specified DOM id.
  //
  // Params
  //    properties  - The properties.   E.g. { oauthProviders: [ ... ] }
  //    id          - The DOM id.       E.g. "#test-embedded-signup-form"
  //
  renderSignupForm: signupFunctions.renderSignupForm,

  MaterialsCollection: MaterialsCollection,
  // this is a different format to match to existing project pages which had 2 formats itself
  renderMaterialsCollection: function (collectionId, selectorOrElement, limitOrOptions) {
    let options = limitOrOptions || {}
    if (typeof limitOrOptions === 'number') {
      options = {limit: limitOrOptions}
    }
    options.collection = collectionId
    ReactDOM.render(MaterialsCollection(options), jQuery(selectorOrElement)[0])
  },

  Tooltip: Tooltip,
  renderTooltip: renderComponentFn(Tooltip),

  RunWithCollaborators: RunWithCollaborators,
  renderRunWithCollaborators: renderComponentFn(RunWithCollaborators)
}

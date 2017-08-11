var SignupModal     = require('./signup_modal');
var Signup          = require('./signup');
var LoginModal      = require('./login_modal');

//
// Map modal to CSS classes
//
var modalClasses = {}
modalClasses[LoginModal]    = "login-default-modal";
modalClasses[SignupModal]   = "signup-default-modal";

//
// Render signup form with the specfiied properties to the specified DOM id.
//
// Params
//  properties          - The properties
//  selectorOrElement   - DOM element selector
//
renderSignupForm = function(properties, selectorOrElement) {
  if (properties == null) {
    properties = {};
  }
  var comp = React.createFactory( Signup() );

  ReactDOM.render(comp(properties), jQuery(selectorOrElement)[0]);
};

var openModal = function(type, properties) {
  var modalContainer, modalContainerId, modalContainerSelector;
  modalContainerId = modalClasses[type];
  modalContainerSelector = '#' + modalContainerId;
  modalContainer = jQuery(modalContainerSelector);
  if (modalContainer.length === 0) {
    modalContainer = jQuery("<div id='" + modalContainerId + "'>").appendTo('body');
  }
  ReactDOM.unmountComponentAtNode(modalContainer[0]);
  var comp = React.createFactory( type() );
  console.log("INFO creating modal with props", properties);
  ReactDOM.render(comp(properties), modalContainer[0]);
  return Portal.showModal(modalContainerSelector);
};

var openLoginModal = function(properties) {
  openModal(LoginModal, properties);
};

var openSignupModal = function(properties) {
  openModal(SignupModal, properties);
};

module.exports.openSignupModal 	= openSignupModal;
module.exports.openLoginModal 	= openLoginModal;
module.exports.renderSignupForm = renderSignupForm;


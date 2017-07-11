
var SignupClass     = require('./signup');
var SideInfoClass   = require('./sideinfo');
var SignupModal     = require('./signup_modal');

renderSignupForm = function(selectorOrElement, properties) {
  var Signup;
  if (properties == null) {
    properties = {};
  }
  Signup = React.createFactory( Signup() );

  return ReactDOM.render(Signup(properties), jQuery(selectorOrElement)[0]);
};

var openSignupModal = function(properties) {
  var modalContainer, modalContainerId, modalContainerSelector;
  modalContainerId = 'signup-default-modal';
  modalContainerSelector = '#' + modalContainerId;
  modalContainer = jQuery(modalContainerSelector);
  if (modalContainer.length === 0) {
    modalContainer = jQuery("<div id='" + modalContainerId + "'>").appendTo('body');
  }
  ReactDOM.unmountComponentAtNode(modalContainer[0]);
  SignupModal = React.createFactory( SignupModal() );
  ReactDOM.render(SignupModal(properties), modalContainer[0]);
  return Portal.showModal(modalContainerSelector);
};

module.exports.openSignupModal 	= openSignupModal;
module.exports.renderSignupForm = renderSignupForm;


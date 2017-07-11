var div, li, p, ref, ul;

ref = React.DOM, div = ref.div, p = ref.p, ul = ref.ul, li = ref.li;

var SignupClass     = require('./signup').reactClass;
var SideInfoClass   = require('./sideinfo').reactClass;

var reactClass = function() {

  // console.log("INFO creating signup_modal");

  var SideInfo, Signup;
  Signup = React.createFactory(SignupClass());
  SideInfo = React.createFactory(SideInfoClass());
  return React.createClass({
    displayName: 'SignupModal',
    render: function() {
      // console.log("INFO rendering signup modal", this.props);
      return div({
        className: 'signup-default-modal-content'
      }, Signup( { oauthProviders: this.props.oauthProviders } ) );
    }
  });
};

var openSignupModal = function(properties) {
  var SignupModal, modalContainer, modalContainerId, modalContainerSelector;
  modalContainerId = 'signup-default-modal';
  modalContainerSelector = '#' + modalContainerId;
  modalContainer = jQuery(modalContainerSelector);
  if (modalContainer.length === 0) {
    modalContainer = jQuery("<div id='" + modalContainerId + "'>").appendTo('body');
  }
  ReactDOM.unmountComponentAtNode(modalContainer[0]);
  SignupModal = React.createFactory( reactClass() );
  ReactDOM.render(SignupModal(properties), modalContainer[0]);
  return Portal.showModal(modalContainerSelector);
};

module.exports.reactClass       = reactClass
module.exports.openSignupModal  = openSignupModal


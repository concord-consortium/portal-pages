var div, li, p, ref, ul;

ref = React.DOM, div = ref.div, p = ref.p, ul = ref.ul, li = ref.li;

var SignupClass     = require('./signup');
var SideInfoClass   = require('./sideinfo');

var SignupModal = function() {

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
      }, Signup( this.props ) );
    }
  });
};

module.exports = SignupModal;


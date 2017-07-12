var a, div, p, ref;

ref = React.DOM, div = ref.div, p = ref.p, a = ref.a;

var TeacherRegistrationComplete = function() {
  return React.createClass({
    displayName: 'TeacherRegistrationComplete',
    render: function() {
      var anonymous;
      anonymous = this.props.anonymous;
      return div({
        className: 'registration-complete'
      }, p({
        className: 'reg-header'
      }, 'Thanks for signing up!'), anonymous ? p({}, 'We\'re sending you an email with your activation code. Click the "Confirm Account" link ' + 'in the email to complete the process.') : p({}, a({
        href: '/'
      }, 'Start using the site.')));
    }
  });
};


module.exports = TeacherRegistrationComplete;

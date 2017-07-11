var a, div, p, ref, span;

ref = React.DOM, div = ref.div, span = ref.span, p = ref.p, a = ref.a;

var reactClass = function() {
  return React.createClass({
    displayName: 'StudentRegistrationComplete',
    render: function() {
      var anonymous, data, first_name, last_name, login, ref1;
      ref1 = this.props, anonymous = ref1.anonymous, data = ref1.data;
      first_name = data.first_name, last_name = data.last_name, login = data.login;
      return div({
        className: 'registration-complete student'
      }, anonymous ? div({}, p({}, 'Success! Your username is: ', span({
        className: 'login'
      }, login)), p({}, 'Use your new account to sign in here ', span({
        className: 'arrow'
      }, String.fromCharCode(0x2192)))) : p({}, a({
        href: '/'
      }, 'Start using the site.')));
    }
  });
};

module.exports.reactClass = reactClass;


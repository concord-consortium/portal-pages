var a, div, ref;

ref = React.DOM, a = ref.a, div = ref.div;

var PrivacyPolicy = function() {
  return React.createClass({
    displayName: 'PrivacyPolicy',
    render: function() {
      return div({
        className: 'privacy-policy'
      }, 'By clicking Register!, you agree to our ', a({
        href: 'https://concord.org/privacy-policy',
        target: '_blank'
      }, 'privacy policy.'));
    }
  });
};

module.exports = PrivacyPolicy;

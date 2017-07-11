var dd, div, dl, dt, form, input, ref;

ref = React.DOM, div = ref.div, dd = ref.dd, dt = ref.dt, dl = ref.dl, form = ref.form, input = ref.input;

var reactClass = function() {
  return React.createClass({
    displayName: 'StudentRegistrationCompleteSideInfo',
    componentDidMount: function() {
      var authToken;
      authToken = jQuery('meta[name="csrf-token"]').attr('content');
      return jQuery('form[method="post"]').each(function() {
        var $form, hiddenField;
        $form = jQuery(this);
        hiddenField = "<input type='hidden' name='authenticity_token' value='" + authToken + "'/>";
        if ($form.find('input[name="authenticity_token"]').length === 0) {
          return $form.prepend(hiddenField);
        }
      });
    },
    render: function() {
      return div({}, div({
        className: 'side-info-header'
      }, 'Sign In'), form({
        method: 'post',
        action: '/users/sign_in',
        className: 'ng-pristine ng-valid'
      }, dl({}, dt({}, 'Username'), dd({}, input({
        name: 'user[login]'
      })), dt({}, 'Password'), dd({}, input({
        type: 'password',
        name: 'user[password]'
      }))), input({
        className: 'button',
        type: 'submit',
        value: 'Log In'
      })));
    }
  });
};

module.exports.reactClass = reactClass;


var ref = React.DOM, button = ref.button, dd = ref.dd, dl = ref.dl, dt = ref.dt,
  div = ref.div, span = ref.span, p = ref.p, a = ref.a;
var TextInputClass  = require('./text_input');

var StudentRegistrationComplete = function() {
  var TextInput     = React.createFactory(TextInputClass());
  var FormsyForm    = React.createFactory(Formsy.Form);
  return React.createClass({
    displayName: 'StudentRegistrationComplete',
    submit: function(data) {
      if(this.props.afterSigninPath) {
        data.after_sign_in_path = this.props.afterSigninPath;
      }

      jQuery.post("/api/v1/users/sign_in", data).done(function(response) {
    console.log("INFO login success", response);
        if(response.redirect_path) {
          window.location = response.redirect_path;
        } else {
          window.location.reload(true);
        }
      }).fail(function(err) {
    console.log("INFO login error", err);
    console.log("INFO login error responseText", err.responseText);
        var response = jQuery.parseJSON(err.responseText);
        //
        // TODO use some kind of styled modal dialog here.....
        //
        window.alert("Error: " + response.message);
      });

    },
    render: function() {
      var ref1 = this.props, anonymous = ref1.anonymous, data = ref1.data,
        first_name = data.first_name, last_name = data.last_name, login = data.login;
        ga('send', 'event', 'Registration', 'Form', 'Final Step Completed - Student');
      return div({
        className: 'registration-complete student'
      }, anonymous ? div({}, p({style: {marginBottom: '30px'}}, 'Success! Your username is: ', span({
        className: 'login'
      }, login)), p({style: {marginBottom: '30px'}}, 'Use your new account to sign in below.')) : p({}, a({
        href: '/'
      }, 'Start using the site.')),
        FormsyForm({className: 'signup-form', onValidSubmit: this.submit },
          dl({},
            dt({}, "Username"),
            dd({},
              TextInput({
                name: 'user[login]',
                placeholder: '',
                required: true })
            ),
            dt({}, "Password"),
            dd({},
              TextInput({
                name: 'user[password]',
                placeholder: '',
                type: 'password',
                required: true })
            )
          ),
          div({className: 'submit-button-container'},
            button({className: 'submit-btn', type: 'submit',}, 'Log In!')
          )
        )
      );
    }
  });
};

module.exports = StudentRegistrationComplete;

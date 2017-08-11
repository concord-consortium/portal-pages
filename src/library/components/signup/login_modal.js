var button          = React.DOM.button;
var dd              = React.DOM.dd;
var dl              = React.DOM.dl;
var dt              = React.DOM.dt;
var footer          = React.DOM.footer;
var strong          = React.DOM.strong;
var span            = React.DOM.span;
var a               = React.DOM.a;
var div             = React.DOM.div;
var h2              = React.DOM.h2;
var li              = React.DOM.li;
var p               = React.DOM.p;
var ul              = React.DOM.ul;
var footer          = React.DOM.footer;

var TextInputClass  = require('./text_input');

var enableAuthProviders = true;

var LoginModal = function() {

  // console.log("INFO Creating LoginModal class");

  var TextInput     = React.createFactory(TextInputClass());
  var FormsyForm    = React.createFactory(Formsy.Form);

  return React.createClass({

    displayName: 'LoginModal',

    submit: function(data) {
      jQuery.post("/users/sign_in", data).done(function(data) {
		console.log("INFO login success");
        window.location.href = "/getting_started";
      }).fail(function(err) {
		console.log("INFO login error");
        window.location.href = "/users/sign_in";
      });

    },

    render: function() {

      // console.log("INFO rendering LoginModal with props", this.props);

      var providerComponents = [];

      if(enableAuthProviders && this.props.oauthProviders) {

        providers = this.props.oauthProviders;
        for(var i = 0; i < providers.length; i++) {
          providerComponents.push(
            a({
              className: "badge",
              id: providers[i].name,
              href: providers[i].directPath

            }, 'Sign in with ' + providers[i].display_name )
          );
        }
      }

      return FormsyForm({
        className: 'signup-form',
        onValidSubmit: this.submit },

        h2({},
          strong({}, 'Log in'),
          ' to the Learn Portal'),
        dl({},
          dt({}, "Username"),
          dd({},
            TextInput({
              name: 'user[login]',
              placeholder: '',
              required: true }),
          ),
          dt({}, "Password"),
          dd({},
            TextInput({
              name: 'user[password]',
              placeholder: '',
              type: 'password',
              required: true }),
          ),
        ),
        div({className: 'third-party-login-options'},
          p({}, 'Or, sign in with: '),
          providerComponents,
        ),
        div({className: 'submit-button-container'},
          a({ href: "/forgot_password", title: "Click this link if you forgot your username and/or password."}, "Forgot your username or password?"),
          button({
            className: 'submit-btn',
            type: 'submit',
          }, 'Log In!' ),
        ),

        footer({},
          p({},
            "Don't have an account? ",
            a( {href: "#", onclick: "Portal.openSignupModal(); return false;"},
              "Sign up for free" ),
            " to create classes, assign activities, save student work, track student progress, and more!"
          )
        )

      );
    }
  });
};

module.exports = LoginModal;

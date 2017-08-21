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
      if(this.props.afterSigninPath) {
        data.after_sign_in_path = this.props.afterSigninPath;
      }

      jQuery.post("/api/v1/users/sign_in", data).done(function(response) {
		console.log("INFO login success", response);
        if(response.redirect_path) {
          window.location = response.redirect_path;
        } else {
          location.reload(true);
        }
      }).fail(function(err) {
		console.log("INFO login error", err);
		console.log("INFO login error responseText", err.responseText);
        var response = jQuery.parseJSON(err.responseText);
        //
        // TODO use some kind of styled modal dialog here.....
        //
        alert("Error: " + response.message);
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

      _this = this;

      return div({className: 'login-default-modal-content'},
        FormsyForm({
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
          div({className: 'third-party-login-options'},
            p({}, 'Or, sign in with: '),
            providerComponents
          ),
          div({className: 'submit-button-container'},
            a({ href: "/forgot_password", title: "Click this link if you forgot your username and/or password."}, "Forgot your username or password?"),
            button({
              className: 'submit-btn',
              type: 'submit',
            }, 'Log In!')
          ),

          footer({},
            p({},
              "Don't have an account? ",
              a(
                {     href: "#",
                      onClick: function(e) {
                          e.preventDefault();
                          PortalPages.renderSignupModal( { oauthProviders: _this.props.oauthProviders } );
                      }
                },
                "Sign up for free" ),
              " to create classes, assign activities, save student work, track student progress, and more!"
            )
          )
        )
      );
    }
  });
};

module.exports = LoginModal;

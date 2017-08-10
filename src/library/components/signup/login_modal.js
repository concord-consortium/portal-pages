var button          = React.DOM.button;
var strong          = React.DOM.strong;
var span            = React.DOM.span;
var a               = React.DOM.a;
var div             = React.DOM.div;
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
      jQuery.post("/api/v1/users/sign_in", data).done(function(data) {
		console.log("INFO login success", data);
        window.location.href = "/getting_started";
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

        //
        // Push separator field
        //
        providerComponents.push(
          div( {className: "or-separator"}, 
            span( {className: "or-separator-text"}, "or" )
          )
        );

        providers = this.props.oauthProviders;
        for(var i = 0; i < providers.length; i++) {
          providerComponents.push(
            a({
              className: "submit-btn",
              href: providers[i].directPath,
              style: {  width: "100%",
                        display: "block",
                        padding: "5px" }

            }, "Log in with " + providers[i].display_name )
          );
        }
      }

      return FormsyForm({ 
        className: 'signup-form',
        onValidSubmit: this.submit },

        div({}, 
          div({ className: 'modal-title' }, 'Log In' ),
        ),

        div({className: "login-left-form"}, 

          div({}, "Username"),
          TextInput({
            name: 'user[login]',
            placeholder: 'login',
            required: true }),

          div({}, "Password"),
          TextInput({
            name: 'user[password]',
            placeholder: 'Password',
            type: 'password',
            required: true }),

          button({
            className: 'submit-btn',
            type: 'submit',
          }, "Login" ),

          div({className: "submit-button-container"},
            a({ href: "/forgot_password", title: "Click this link if you forgot your username and/or password."}, "Forgot your username or password?" )
          ),

          providerComponents,

        ),

        div({className: "login-modal-side-info"},
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


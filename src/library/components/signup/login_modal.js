import React from 'react'
var button = React.DOM.button
var dd = React.DOM.dd
var dl = React.DOM.dl
var dt = React.DOM.dt
var strong = React.DOM.strong
var a = React.DOM.a
var div = React.DOM.div
var h2 = React.DOM.h2
var p = React.DOM.p
var footer = React.DOM.footer

var TextInputClass = require('./text_input')

var enableAuthProviders = true

var LoginModal = function () {
  // console.log("INFO Creating LoginModal class");

  var TextInput = React.createFactory(TextInputClass())
  var FormsyForm = React.createFactory(Formsy.Form)

  return React.createClass({

    displayName: 'LoginModal',

    getDefaultProps: function () {
      return {
        siteName: (Portal && Portal.siteName) || 'Portal'
      }
    },

    submit: function (data) {
      if (this.props.afterSigninPath) {
        data.after_sign_in_path = this.props.afterSigninPath
      }

      jQuery.post('/api/v1/users/sign_in', data).done(function (response) {
        // console.log("INFO login success", response);
        if (response.redirect_path) {
          window.location = response.redirect_path
        } else {
          window.location.reload(true)
        }
      }).fail(function (err) {
        // console.log("INFO login error", err);
        // console.log("INFO login error responseText", err.responseText);
        if (err && err.responseText) {
          var response = jQuery.parseJSON(err.responseText)
          var message = response.message
          if (response.error) {
            message = response.error
          }

          //
          // TODO use some kind of styled modal dialog here.....
          //
          window.alert('Error: ' + message)
        }
      })
    },

    handleForgotPassword: function (e) {
      e.preventDefault()
      PortalPages.renderForgotPasswordModal()
    },

    render: function () {
      // console.log("INFO rendering LoginModal with props", this.props);

      var providerComponents = []

      if (enableAuthProviders && this.props.oauthProviders) {
        var providers = this.props.oauthProviders
        providers.sort(function (a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) }) // sort providers alphabetically by name
        for (var i = 0; i < providers.length; i++) {
          providerComponents.push(
            a({
              className: 'badge',
              id: providers[i].name,
              href: providers[i].directPath

            }, 'Sign in with ' + providers[i].display_name)
          )
        }
      }

      var _this = this

      return div({className: 'login-default-modal-content'},
        FormsyForm({
          className: 'signup-form',
          onValidSubmit: this.submit },

        h2({},
          strong({}, 'Log in'),
          ' to the ' + this.props.siteName),
        dl({},
          dt({}, 'Username'),
          dd({},
            TextInput({
              name: 'user[login]',
              placeholder: '',
              required: true })
          ),
          dt({}, 'Password'),
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
          a({ href: '/forgot_password', onClick: this.handleForgotPassword, title: 'Click this link if you forgot your username and/or password.' }, 'Forgot your username or password?'),
          button({
            className: 'submit-btn',
            type: 'submit'
          }, 'Log In!')
        ),

        footer({},
          p({},
            "Don't have an account? ",
            a(
              { href: '#',
                onClick: function (e) {
                  e.preventDefault()
                  PortalPages.renderSignupModal({ oauthProviders: _this.props.oauthProviders })
                }
              },
              'Sign up for free'),
            ' to create classes, assign activities, save student work, track student progress, and more!'
          )
        )
        )
      )
    }
  })
}

module.exports = LoginModal

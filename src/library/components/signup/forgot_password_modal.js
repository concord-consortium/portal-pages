import React from 'react'
var button = React.DOM.button
var dd = React.DOM.dd
var dl = React.DOM.dl
var dt = React.DOM.dt
var footer = React.DOM.footer
var strong = React.DOM.strong
var a = React.DOM.a
var div = React.DOM.div
var h2 = React.DOM.h2
var p = React.DOM.p

var TextInputClass = require('./text_input')

var ForgotPasswordModal = function () {
  // console.log("INFO Creating LoginModal class");

  var TextInput = React.createFactory(TextInputClass())
  var FormsyForm = React.createFactory(Formsy.Form)

  return React.createClass({

    displayName: 'ForgotPasswordModal',

    getDefaultProps: function () {
      return {
        siteName: (Portal && Portal.siteName) || 'Portal'
      }
    },

    submit: function (loginData) {
      var login = loginData.user.login
      var data = { login_or_email: login }
      jQuery.post('/api/v1/passwords/reset_password', data).done(function (response) {
        console.log(response)
        jQuery('.forgot-password-form p, .forgot-password-form dl, .forgot-password-form div').fadeOut(300)
        jQuery('.forgot-password-form footer').fadeOut(300, function () {
          jQuery('.forgot-password-form').append('<p>' + response.message + '</p>')
        })
      }).fail(function (err) {
        if (err && err.responseText) {
          var response = jQuery.parseJSON(err.responseText)
          var message = response.message
          if (response.error) {
            message = response.error
          }

          //
          // TODO use some kind of styled modal dialog here.....
          //
          jQuery('.input-error').text('Error: ' + message)
          jQuery('.input-error').css('color', '#ea6d2f').fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200)
        }
      })
    },

    render: function () {
      // console.log("INFO rendering LoginModal with props", this.props);

      var _this = this

      return div({ className: 'forgot-password-default-modal-content' },
        FormsyForm({
          className: 'forgot-password-form',
          onValidSubmit: this.submit },

        h2({},
          strong({}, 'Forgot'),
          ' your login information?'),
        p({},
          strong({}, 'Students: '),
          'Ask your teacher for help.'
        ),
        p({},
          strong({}, 'Teachers: '),
          'Enter your username or email address below.'
        ),
        dl({},
          dt({}, 'Username or Email Address'),
          dd({},
            TextInput({
              name: 'user[login]',
              placeholder: '',
              required: true })
          )
        ),
        div({ className: 'submit-button-container' },
          button({
            className: 'submit-btn',
            type: 'submit'
          }, 'Submit')
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

module.exports = ForgotPasswordModal

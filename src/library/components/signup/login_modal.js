import React from 'react'

const TextInputClass = require('./text_input')

let enableAuthProviders = true

const LoginModal = function () {
  // console.log("INFO Creating LoginModal class");

  const TextInput = React.createFactory(TextInputClass())
  const FormsyForm = React.createFactory(Formsy.Form)

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
          let response = jQuery.parseJSON(err.responseText)
          let message = response.message
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
      PortalPages.renderForgotPasswordModal({ oauthProviders: this.props.oauthProviders })
    },

    handleRegister: function (e) {
      e.preventDefault()
      PortalPages.renderSignupModal({ oauthProviders: this.props.oauthProviders })
    },

    render: function () {
      // console.log("INFO rendering LoginModal with props", this.props);

      let providerComponents = []

      if (enableAuthProviders && this.props.oauthProviders) {
        let providers = this.props.oauthProviders
        providers.sort(function (a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) }) // sort providers alphabetically by name
        for (let i = 0; i < providers.length; i++) {
          if (this.props.afterSigninPath) {
            providers[i].directPath += '?after_sign_in_path=' + encodeURIComponent(this.props.afterSigninPath)
          }
          providerComponents.push(
            <a className={'badge'} id={providers[i].name} href={providers[i].directPath}>
              Sign in with {providers[i].display_name}
            </a>
          )
        }
      }

      const _this = this

      return (
        <div className={'login-default-modal-content' }>
          <Formsy.Form className={'signup-form'} onValidSubmit={this.submit}>
            <h2>
              <strong>
                Log in
              </strong>
              {' '}
              to the {this.props.siteName}
            </h2>
            <div className={'third-party-login-options'}>
              <p>
                Sign in with:
              </p>
              {providerComponents}
            </div>
            <div className={'or-separator'}>
              <span className={'or-separator-text'}>
                Or
              </span>
            </div>
            <dl>
              <dt>
                Username
              </dt>
              <dd>
                <TextInput name={'user[login]'} placeholder={''} required={true} />
              </dd>
              <dt>
                Password
              </dt>
              <dd>
                <TextInput name={'user[password]'} placeholder={''} type={'password'} required={true} />
              </dd>
            </dl>
            <div className={'submit-button-container'}>
              <a href={'/forgot_password'} onClick={this.handleForgotPassword} title={'Click this link if you forgot your username and/or password.'}>
                Forgot your username or password?
              </a>
              <button className={'submit-btn'} type={'submit'}>
                Log In!
              </button>
            </div>
            <footer>
              <p>
                Don't have an account?
                {' '}
                <a href={'#'} onClick={this.handleRegister}>
                  Sign up for free
                </a>
                {' '}
                to create classes, assign activities, save student work, track student progress, and more!
              </p>
            </footer>
          </Formsy.Form>
        </div>
      )
    }
  })
}

module.exports = LoginModal

import React from 'react'
import TextInputClass from './text_input'

let INVALID_FIRST_NAME
let INVALID_LAST_NAME
let PASS_NOT_MATCH
let PASS_TOO_SHORT

PASS_TOO_SHORT = 'Password is too short'
PASS_NOT_MATCH = 'Passwords do not match'
INVALID_FIRST_NAME = 'Invalid first name. Use only letters and numbers.'
INVALID_LAST_NAME = 'Invalid last name. Use only letters and numbers.'

const Formsy = window.Formsy

const enableAuthProviders = true

const BasicDataForm = function () {
  // console.log("INFO creating basic_data_form");

  const TextInput = TextInputClass()
  const nameValidator = function (value) {
    return jQuery.get(Portal.API_V1.NAME_VALID + '?name=' + value)
  }

  return React.createClass({
    displayName: 'BasicDataForm',
    getInitialState: function () {
      return {
        canSubmit: false,
        password: ''
      }
    },
    enableButton: function () {
      return this.setState({
        canSubmit: true
      })
    },
    disableButton: function () {
      return this.setState({
        canSubmit: false
      })
    },
    onChange: function (model) {
      return this.setState({
        password: model.password
      })
    },
    onBasicFormValid: function () {
      let anonymous
      anonymous = this.props.anonymous
      return this.setState({
        canSubmit: !anonymous || (this.refs.firstName.isValidAsync() && this.refs.lastName.isValidAsync())
      })
    },
    onBasicFormInvalid: function () {
      return this.setState({
        canSubmit: false
      })
    },
    submit: function (model) {
      ga('send', 'event', 'User Registration', 'Form', 'Step 2 Completed')
      return this.props.onSubmit(model)
    },

    render: function () {
      let anonymous
      anonymous = this.props.anonymous

      let providerComponents = []
      if (enableAuthProviders && this.props.oauthProviders) {
        const providers = this.props.oauthProviders
        providers.sort(function (a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) }) // sort providers alphabetically by name
        for (let i = 0; i < providers.length; i++) {
          if (i === 0) {
            providerComponents.push(
              <p>Sign up with:</p>
            )
          }
          // console.log("INFO adding provider direct path " + providers[i].directPath);
          // console.log("INFO adding provider auth check path " + providers[i].authCheckPath);

          providerComponents.push(
            <a className='badge' id={providers[i].name} href={providers[i].directPath}>Sign up with {providers[i].display_name}</a>
          )
        }
        if (providers.length > 0) {
          providerComponents.push(
            //
            // Push separator bar
            //
            <div className='or-separator'>
              <span className='or-separator-text'>Or, create an account</span>
            </div>
          )
        }
      }

      return (
        <Formsy.Form onValidSubmit={this.submit} onValid={this.onBasicFormValid} onInvalid={this.onBasicFormInvalid} onChange={this.onChange}>
          <div className='third-party-login-options testy'>
            {providerComponents}
          </div>
          {
            anonymous &&
              <div>
                <dl>
                  <dt className='two-col'>First Name</dt>
                  <dd className='name_wrapper first-name-wrapper two-col'><TextInput ref='firstName' name='first_name' placeholder='' required asyncValidation={nameValidator} asyncValidationError={INVALID_FIRST_NAME} /></dd>
                  <dt className='two-col'>Last Name</dt>
                  <dd className='name_wrapper last-name-wrapper two-col'><TextInput ref='lastName' name='last_name' placeholder='' required asyncValidation={nameValidator} asyncValidationError={INVALID_LAST_NAME} /></dd>
                  <dt>Password</dt>
                  <dd><TextInput name='password' placeholder='' type='password' required validations='minLength:6' validationError={PASS_TOO_SHORT} /></dd>
                  <dt>Confirm Password</dt>
                  <dd><TextInput name='password_confirmation' placeholder='' type='password' required validations={'equals:' + this.state.password} validationError={PASS_NOT_MATCH} /></dd>
                </dl>
              </div>
          }
          <div className='submit-button-container'>
            <button className='submit-btn' type='submit' disabled={!this.state.canSubmit}>{this.props.signupText}</button>
          </div>
        </Formsy.Form>
      )
    }
  })
}

module.exports = BasicDataForm

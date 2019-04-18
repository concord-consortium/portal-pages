import React from 'react'
var invalidZipcode
var newSchoolWarning
var ref = React.DOM
var button = ref.button
var a = ref.a
var div = ref.div
var dd = ref.dd
var dl = ref.dl
var dt = ref.dt

var LOGIN_TOO_SHORT = 'Login is too short'
var LOGIN_INVALID = 'Invalid login. This name is either already taken or does not use only letters, numbers and the characters .+-_@'
var EMAIL_REGEXP = 'Email doesn\'t appear to be a valid email'
var EMAIL_TAKEN = 'Email belongs to an existing user'
var CANT_FIND_SCHOOL = 'I can\'t find my school in the list.'
var GO_BACK_TO_LIST = 'Go back to the school list.'

newSchoolWarning = function (zipOrPostal) {
  return 'You are adding a new school / institution. Please make sure that the ' + (zipOrPostal + ' and school / institution name are correct!')
}

invalidZipcode = function (zipOrPostal) {
  return 'Incorrect ' + zipOrPostal
}

var TextInputClass = require('./text_input')
var CheckboxInputClass = require('./checkbox_input')
var SelectInputClass = require('./select_input')
var SchoolInputClass = require('./school_input')
var PrivacyPolicyClass = require('./privacy_policy')

var TeacherForm = function () {
  var FormsyForm, PrivacyPolicy, SchoolInput, CheckboxInput, SelectInput, TextInput, emailAvailableValidator, getCountries, isUS, loginValidValidator, registerTeacher
  TextInput = React.createFactory(TextInputClass())
  CheckboxInput = React.createFactory(CheckboxInputClass())
  SelectInput = React.createFactory(SelectInputClass())
  SchoolInput = React.createFactory(SchoolInputClass())
  PrivacyPolicy = React.createFactory(PrivacyPolicyClass())
  FormsyForm = React.createFactory(Formsy.Form)
  loginValidValidator = function (value) {
    return jQuery.get(Portal.API_V1.LOGIN_VALID + '?username=' + value)
  }
  emailAvailableValidator = function (value) {
    return jQuery.get(Portal.API_V1.EMAILS + '?email=' + value)
  }
  getCountries = function () {
    return jQuery.get(Portal.API_V1.COUNTRIES)
  }
  registerTeacher = function (params) {
    return jQuery.post(Portal.API_V1.TEACHERS, params)
  }
  isUS = function (name) {
    return name === 'United States' || name === 'US' || name === 'USA'
  }
  return React.createClass({
    displayName: 'TeacherForm',
    getInitialState: function () {
      return {
        canSubmit: false,
        currentCountry: null,
        currentZipcode: null,
        isUSSelected: false,
        registerNewSchool: false,
        showZipcodeHelp: false
      }
    },
    onBasicFormValid: function () {
      var valid
      valid = true
      if (this.refs.login && !this.refs.login.isValidAsync()) {
        valid = false
      }
      if (this.refs.email && !this.refs.email.isValidAsync()) {
        valid = false
      }
      return this.setState({
        canSubmit: valid
      })
    },
    onBasicFormInvalid: function () {
      return this.setState({
        canSubmit: false
      })
    },
    submit: function (data, resetForm, invalidateForm) {
      var ref1 = this.props
      var basicData = ref1.basicData
      var onRegistration = ref1.onRegistration
      var params = jQuery.extend({}, basicData, data)
      this.setState({
        canSubmit: false
      })
      return registerTeacher(params).done(function (data) {
        console.log('INFO Registered teacher.', data)
        return onRegistration(data)
      }).fail(function (err) {
        var serverErrors
        serverErrors = JSON.parse(err.responseText).message
        return invalidateForm(serverErrors)
      })
    },
    onChange: function (currentValues) {
      var countryId = currentValues.country_id
      var zipcode = currentValues.zipcode
      var ref1 = this.state
      var currentZipcode = ref1.currentZipcode
      var registerNewSchool = ref1.registerNewSchool
      var zipcodeValid = this.refs.zipcode && this.refs.zipcode.isValidValue(zipcode)
      return this.setState({
        currentCountry: countryId,
        currentZipcode: (zipcodeValid && zipcode) || null,
        registerNewSchool: registerNewSchool && zipcode === currentZipcode
      })
    },
    getCountries: function (input, callback) {
      getCountries().done(function (data) {
        return callback(null, {
          options: data.map(function (country) {
            return {
              label: country.name,
              value: country.id
            }
          }),
          complete: true
        })
      })
      return void 0
    },
    addNewSchool: function () {
      return this.setState({
        registerNewSchool: true
      })
    },
    goBackToSchoolList: function () {
      return this.setState({
        registerNewSchool: false
      })
    },
    showZipcodeHelp: function () {
      return this.setState({
        showZipcodeHelp: true
      })
    },
    checkIfUS: function (option) {
      return this.setState({
        isUSSelected: isUS(option.label)
      })
    },
    zipcodeValidation: function (values, value) {
      var isUSSelected
      isUSSelected = this.state.isUSSelected
      if (!isUSSelected) {
        return true
      }
      return value && value.match(/\d{5}/)
    },
    zipOrPostal: function () {
      var isUSSelected
      isUSSelected = this.state.isUSSelected
      if (isUSSelected) {
        return 'ZIP code'
      } else {
        return 'postal code'
      }
    },
    render: function () {
      var anonymous = this.props.anonymous
      var ref1 = this.state
      var canSubmit = ref1.canSubmit
      var currentCountry = ref1.currentCountry
      var currentZipcode = ref1.currentZipcode
      var registerNewSchool = ref1.registerNewSchool
      var showZipcode = currentCountry !== null
      var showSchool = (currentCountry !== null) && (currentZipcode !== null)
      var showEnewsSubscription = !!Portal.enewsSubscriptionEnabled
      return FormsyForm({
        ref: 'form',
        onValidSubmit: this.submit,
        onValid: this.onBasicFormValid,
        onInvalid: this.onBasicFormInvalid,
        onChange: this.onChange
      }, anonymous ? div({},
        dl({},
          dt({}, 'Username'),
          dd({},
            TextInput({
              ref: 'login',
              name: 'login',
              placeholder: '',
              required: true,
              validations: {
                minLength: 3
              },
              validationErrors: {
                minLength: LOGIN_TOO_SHORT
              },
              asyncValidation: loginValidValidator,
              asyncValidationError: LOGIN_INVALID
            })
          ),
          dt({}, 'Email'),
          dd({},
            TextInput({
              ref: 'email',
              name: 'email',
              placeholder: '',
              required: true,
              validations: {
                isEmail: true
              },
              validationErrors: {
                isEmail: EMAIL_REGEXP
              },
              asyncValidation: emailAvailableValidator,
              asyncValidationError: EMAIL_TAKEN
            })
          ),
          showEnewsSubscription ? dd({},
            CheckboxInput({
              ref: 'email_subscribed',
              name: 'email_subscribed',
              required: false,
              defaultChecked: true,
              label: 'Send me updates about educational technology resources.'
            })
          ) : void 0
        )
      ) : void 0,
      dl({},
        dt({}, 'Country'),
        dd({},
          SelectInput({
            name: 'country_id',
            placeholder: '',
            loadOptions: this.getCountries,
            required: true,
            onChange: this.checkIfUS
          })
        )
      ),
      showZipcode ? dl({},
        dt({}, 'ZIP Code'),
        dd({},
          div({},
            TextInput({
              ref: 'zipcode',
              name: 'zipcode',
              placeholder: 'School / Institution ' + (this.zipOrPostal()),
              required: true,
              validations: {
                zipcode: this.zipcodeValidation
              },
              validationErrors: {
                zipcode: invalidZipcode(this.zipOrPostal())
              },
              processValue: function (val) {
                return val.replace(/\s/g, '')
              }
            })
          )
        )
      ) : void 0,
      dl({},
        showSchool && !registerNewSchool
          ? dt({}, 'School') : void 0,
        showSchool && !registerNewSchool
          ? dd({className: 'signup-form-school-select'},
            SchoolInput({
              name: 'school_id',
              placeholder: 'School / Institution',
              country: currentCountry,
              zipcode: currentZipcode,
              onAddNewSchool: this.addNewSchool,
              required: true
            })
          ) : void 0,
        dd({},
          showSchool && !registerNewSchool ? a({
            className: 'signup-form-add-school-link',
            onClick: this.addNewSchool
          }, CANT_FIND_SCHOOL) : void 0,
          showSchool && registerNewSchool ? div({},
            TextInput({
              name: 'school_name',
              placeholder: 'School / Institution Name',
              required: true
            }), div({
              className: 'help-text'
            }, newSchoolWarning(this.zipOrPostal())
            )
          ) : void 0,
          showSchool && registerNewSchool ? a({
            onClick: this.goBackToSchoolList
          }, GO_BACK_TO_LIST) : void 0
        )
      ),
      !anonymous && showEnewsSubscription ? div({className: 'signup-form-enews-optin-standalone'},
        CheckboxInput({
          ref: 'email_subscribed',
          name: 'email_subscribed',
          required: false,
          defaultChecked: true,
          label: 'Send me updates about educational technology resources.'
        })
      ) : void 0,
      PrivacyPolicy({}),
      div({className: 'submit-button-container'},
        button({
          className: 'submit-btn',
          type: 'submit',
          disabled: !canSubmit
        }, 'Register!')
      )
      )
    }
  })
}

module.exports = TeacherForm

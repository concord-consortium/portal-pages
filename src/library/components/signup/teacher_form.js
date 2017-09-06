var CANT_FIND_SCHOOL, EMAIL_REGEXP, EMAIL_TAKEN, GO_BACK_TO_LIST, LOGIN_INVALID, LOGIN_TOO_SHORT, a, button, div, i, invalidZipcode, newSchoolWarning, ref, zipcodeHelp;

ref = React.DOM, button = ref.button, a = ref.a, i = ref.i, div = ref.div, dd = ref.dd, dl = ref.dl, dt = ref.dt;

LOGIN_TOO_SHORT = 'Login is too short';
LOGIN_INVALID = 'Invalid login. This name is either already taken or does not use only letters, numbers and the characters .+-_@';
EMAIL_REGEXP = 'Email doesn\'t appear to be a valid email';
EMAIL_TAKEN = 'Email belongs to an existing user';
CANT_FIND_SCHOOL = 'I can\'t find my school in the list.';
GO_BACK_TO_LIST = 'Go back to the school list.';

newSchoolWarning = function(zipOrPostal) {
  return 'You are adding a new school / institution. Please make sure that the ' + (zipOrPostal + " and school / institution name are correct!");
};

zipcodeHelp = function(zipOrPostal) {
  return "Not sure which " + zipOrPostal + " to use? Please enter the " + zipOrPostal + " of your school or institution.";
};

invalidZipcode = function(zipOrPostal) {
  return "Incorrect " + zipOrPostal;
};

var TextInputClass = require("./text_input");
var SelectInputClass = require("./select_input");
var SchoolInputClass = require("./school_input");
var PrivacyPolicyClass = require("./privacy_policy");

var TeacherForm = function() {
  var FormsyForm, PrivacyPolicy, SchoolInput, SelectInput, TextInput, emailAvailableValidator, getCountries, isUS, loginValidValidator, registerTeacher;
  TextInput = React.createFactory(TextInputClass());
  SelectInput = React.createFactory(SelectInputClass());
  SchoolInput = React.createFactory(SchoolInputClass());
  PrivacyPolicy = React.createFactory(PrivacyPolicyClass());
  FormsyForm = React.createFactory(Formsy.Form);
  loginValidValidator = function(value) {
    return jQuery.get(Portal.API_V1.LOGIN_VALID + "?username=" + value);
  };
  emailAvailableValidator = function(value) {
    return jQuery.get(Portal.API_V1.EMAILS + "?email=" + value);
  };
  getCountries = function() {
    return jQuery.get(Portal.API_V1.COUNTRIES);
  };
  registerTeacher = function(params) {
    return jQuery.post(Portal.API_V1.TEACHERS, params);
  };
  isUS = function(name) {
    return name === 'United States' || name === 'US' || name === 'USA';
  };
  return React.createClass({
    displayName: 'TeacherForm',
    getInitialState: function() {
      return {
        canSubmit: false,
        currentCountry: null,
        currentZipcode: null,
        isUSSelected: false,
        registerNewSchool: false,
        showZipcodeHelp: false
      };
    },
    onBasicFormValid: function() {
      var valid;
      valid = true;
      if (this.refs.login && !this.refs.login.isValidAsync()) {
        valid = false;
      }
      if (this.refs.email && !this.refs.email.isValidAsync()) {
        valid = false;
      }
      return this.setState({
        canSubmit: valid
      });
    },
    onBasicFormInvalid: function() {
      return this.setState({
        canSubmit: false
      });
    },
    submit: function(data, resetForm, invalidateForm) {
      var basicData, onRegistration, params, ref1;
      ref1 = this.props, basicData = ref1.basicData, onRegistration = ref1.onRegistration;
      params = jQuery.extend({}, basicData, data);
      this.setState({
        canSubmit: false
      });
      return registerTeacher(params).done(function(data) {
        console.log("INFO Registered teacher.", data);
        return onRegistration(data);
      }).fail(function(err) {
        var serverErrors;
        serverErrors = JSON.parse(err.responseText).message;
        return invalidateForm(serverErrors);
      });
    },
    onChange: function(currentValues) {
      var country_id, currentZipcode, ref1, registerNewSchool, zipcode, zipcodeValid;
      country_id = currentValues.country_id, zipcode = currentValues.zipcode;
      ref1 = this.state, currentZipcode = ref1.currentZipcode, registerNewSchool = ref1.registerNewSchool;
      zipcodeValid = this.refs.zipcode && this.refs.zipcode.isValidValue(zipcode);
      return this.setState({
        currentCountry: country_id,
        currentZipcode: zipcodeValid && zipcode || null,
        registerNewSchool: registerNewSchool && zipcode === currentZipcode
      });
    },
    getCountries: function(input, callback) {
      getCountries().done(function(data) {
        return callback(null, {
          options: data.map(function(country) {
            return {
              label: country.name,
              value: country.id
            };
          }),
          complete: true
        });
      });
      return void 0;
    },
    addNewSchool: function() {
      return this.setState({
        registerNewSchool: true
      });
    },
    goBackToSchoolList: function() {
      return this.setState({
        registerNewSchool: false
      });
    },
    showZipcodeHelp: function() {
      return this.setState({
        showZipcodeHelp: true
      });
    },
    checkIfUS: function(option) {
      return this.setState({
        isUSSelected: isUS(option.label)
      });
    },
    zipcodeValidation: function(values, value) {
      var isUSSelected;
      isUSSelected = this.state.isUSSelected;
      if (!isUSSelected) {
        return true;
      }
      return value && value.match(/\d{5}/);
    },
    zipOrPostal: function() {
      var isUSSelected;
      isUSSelected = this.state.isUSSelected;
      if (isUSSelected) {
        return 'ZIP code';
      } else {
        return 'postal code';
      }
    },
    render: function() {
      var anonymous, canSubmit, currentCountry, currentZipcode, ref1, registerNewSchool, showSchool, showZipcode, showZipcodeHelp;
      anonymous = this.props.anonymous;
      ref1 = this.state, canSubmit = ref1.canSubmit, currentCountry = ref1.currentCountry, currentZipcode = ref1.currentZipcode, registerNewSchool = ref1.registerNewSchool, showZipcodeHelp = ref1.showZipcodeHelp;
      showZipcode = currentCountry != null;
      showSchool = (currentCountry != null) && (currentZipcode != null);
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
          )
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
              placeholder: "School / Institution " + (this.zipOrPostal()),
              required: true,
              validations: {
                zipcode: this.zipcodeValidation
              },
              validationErrors: {
                zipcode: invalidZipcode(this.zipOrPostal())
              },
              processValue: function(val) {
                return val.replace(/\s/g, '');
              }
            })
          )
        )
      ) : void 0,
      dl({},
        showSchool && !registerNewSchool ?
          dt({}, 'School') : void 0,
        showSchool && !registerNewSchool ?
          dd({className: 'signup-form-school-select'},
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
      PrivacyPolicy({}),
      div({className: 'submit-button-container'},
        button({
          className: 'submit-btn',
          type: 'submit',
          disabled: !canSubmit
        }, 'Register!')
      )
      );
    }
  });
};


module.exports = TeacherForm;

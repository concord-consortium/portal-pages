var INVALID_FIRST_NAME, INVALID_LAST_NAME, PASS_NOT_MATCH, PASS_TOO_SHORT, button, div, ref;

ref = React.DOM, button = ref.button, div = ref.div;

var a       = React.DOM.a;
var link    = React.DOM.link;
var br      = React.DOM.br;

PASS_TOO_SHORT = 'Password is too short';
PASS_NOT_MATCH = 'Passwords do not match';
INVALID_FIRST_NAME = 'Invalid first name. Use only letters and numbers.';
INVALID_LAST_NAME = 'Invalid last name. Use only letters and numbers.';

var TextInputClass  = require("./text_input").reactClass;
var RadioInputClass = require("./radio_input").reactClass;

var reactClass = function() {

  // console.log("INFO creating basic_data_form");

  var FormsyForm, RadioInput, TextInput, nameValidator;
  TextInput = React.createFactory(TextInputClass());
  RadioInput = React.createFactory(RadioInputClass());
  FormsyForm = React.createFactory(Formsy.Form);
  nameValidator = function(value) {
    return jQuery.get(Portal.API_V1.NAME_VALID + "?name=" + value);
  };
  return React.createClass({
    displayName: 'BasicDataForm',
    getInitialState: function() {
      return {
        canSubmit: false,
        password: ''
      };
    },
    enableButton: function() {
      return this.setState({
        canSubmit: true
      });
    },
    disableButton: function() {
      return this.setState({
        canSubmit: false
      });
    },
    onChange: function(model) {
      return this.setState({
        password: model.password
      });
    },
    onBasicFormValid: function() {
      var anonymous;
      anonymous = this.props.anonymous;
      return this.setState({
        canSubmit: !anonymous || (this.refs.firstName.isValidAsync() && this.refs.lastName.isValidAsync())
      });
    },
    onBasicFormInvalid: function() {
      return this.setState({
        canSubmit: false
      });
    },
    submit: function(model) {
      return this.props.onSubmit(model);
    },
    render: function() {
      var anonymous;
      anonymous = this.props.anonymous;

      providers = this.props.oauthProviders;
      providerLinks = [];
      for(var i = 0; i < providers.length; i++) {
        providerLinks.push(
          a({
              className: "submit-btn",
              href: providers[i].url,
              style: {  width: "100%",
                        padding: "20px" }

          }, 'Sign in with '+providers[i].name )
        );
        providerLinks.push( br({}) );
        providerLinks.push( br({}) );
      }

      return FormsyForm({
        onValidSubmit: this.submit,
        onValid: this.onBasicFormValid,
        onInvalid: this.onBasicFormInvalid,
        onChange: this.onChange
      }, 
      providerLinks,
      anonymous ? div({}, div({
        className: 'name_wrapper'
      }, TextInput({
        ref: 'firstName',
        name: 'first_name',
        placeholder: 'First Name',
        required: true,
        asyncValidation: nameValidator,
        asyncValidationError: INVALID_FIRST_NAME
      })), div({
        className: 'name_wrapper'
      }, TextInput({
        ref: 'lastName',
        name: 'last_name',
        placeholder: 'Last Name',
        required: true,
        asyncValidation: nameValidator,
        asyncValidationError: INVALID_LAST_NAME
      })), TextInput({
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        required: true,
        validations: 'minLength:6',
        validationError: PASS_TOO_SHORT
      }), TextInput({
        name: 'password_confirmation',
        placeholder: 'Confirm Password',
        type: 'password',
        required: true,
        validations: "equals:" + this.state.password,
        validationError: PASS_NOT_MATCH
      })) : void 0, 
      RadioInput({
        name: 'type',
        title: 'I am a ',
        required: true,
        options: [
          {
            label: 'Teacher',
            value: 'teacher'
          }, {
            label: 'Student',
            value: 'student'
          }
        ]
      }), button({
        className: 'submit-btn',
        type: 'submit',
        disabled: !this.state.canSubmit
      }, this.props.signupText));
    }
  });
};

module.exports.reactClass = reactClass;


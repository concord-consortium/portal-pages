var INVALID_FIRST_NAME, INVALID_LAST_NAME, PASS_NOT_MATCH, PASS_TOO_SHORT, button, div, ref;

ref = React.DOM, button = ref.button, div = ref.div;

var a       = React.DOM.a;
var dd      = React.DOM.dd;
var dl      = React.DOM.dl;
var dt      = React.DOM.dt;
var footer  = React.DOM.footer;
var link    = React.DOM.link;
var br      = React.DOM.br;
var p       = React.DOM.p;
var span    = React.DOM.span;

PASS_TOO_SHORT = 'Password is too short';
PASS_NOT_MATCH = 'Passwords do not match';
INVALID_FIRST_NAME = 'Invalid first name. Use only letters and numbers.';
INVALID_LAST_NAME = 'Invalid last name. Use only letters and numbers.';

var TextInputClass  = require("./text_input");
var RadioInputClass = require("./radio_input");

var enableAuthProviders = true;

var BasicDataForm = function() {

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

    getStepNumber: function() {
      var basicData, ref, studentData, teacherData;
      ref = this.state, basicData = ref.basicData, studentData = ref.studentData, teacherData = ref.teacherData;

      // console.log("INFO getStepNumber", this.props, basicData);

      if (!this.props.omniauth && !basicData) {
        return 1;
      }
      if (this.props.omniauth || (basicData && !studentData && !teacherData)) {
        return 2;
      }
      return 3;
    },

    render: function() {

      var step = this.getStepNumber();
      var stepText = "Step " + step;

      if(step > 1) {
        if(this.props.omniauth) {
          stepText += " of 2";
        } else {
          stepText += " of 3";
        }
      }

      var anonymous;
      anonymous = this.props.anonymous;

      providerComponents = [];
      if(enableAuthProviders && this.props.oauthProviders) {
        providers = this.props.oauthProviders;
        providers.sort(function(a,b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); } ); // sort providers alphabetically by name 
        for(var i = 0; i < providers.length; i++) {
          // console.log("INFO adding provider direct path " + providers[i].directPath);
          // console.log("INFO adding provider auth check path " + providers[i].authCheckPath);

          providerComponents.push(
            a({
                className: "badge",
                id: providers[i].name,
                href: providers[i].directPath

            }, "Sign up with " + providers[i].display_name )
          );
        }
        if(providers.length > 0) {
          providerComponents.push(
            //
            // Push separator bar
            //
            div( {className: "or-separator" },

              span( {className: "or-separator-text" }, "Or, create an account:" )
            )
          );
        }
      }

      return FormsyForm({
        onValidSubmit: this.submit,
        onValid: this.onBasicFormValid,
        onInvalid: this.onBasicFormInvalid,
        onChange: this.onChange
      },
      div({className: 'third-party-login-options'},
        p({}, 'Sign up with: '),
        providerComponents
      ),
      anonymous ? div({},
        dl({},
          dt({className: 'two-col'}, 'First Name'),
          dd({className: 'name_wrapper first-name-wrapper two-col'},
            TextInput({
              ref: 'firstName',
              name: 'first_name',
              placeholder: '',
              required: true,
              asyncValidation: nameValidator,
              asyncValidationError: INVALID_FIRST_NAME
            })
          ),
          dt({className: 'two-col'}, 'Last Name'),
          dd({className: 'name_wrapper last-name-wrapper two-col'},
            TextInput({
              ref: 'lastName',
              name: 'last_name',
              placeholder: '',
              required: true,
              asyncValidation: nameValidator,
              asyncValidationError: INVALID_LAST_NAME
            })
          ),
          dt({}, 'Password'),
          dd({},
            TextInput({
              name: 'password',
              placeholder: '',
              type: 'password',
              required: true,
              validations: 'minLength:6',
              validationError: PASS_TOO_SHORT
            })
          ),
          dt({}, 'Confirm Password'),
          dd({},
            TextInput({
              name: 'password_confirmation',
              placeholder: '',
              type: 'password',
              required: true,
              validations: "equals:" + this.state.password,
              validationError: PASS_NOT_MATCH
            })
          )
        )
      ) : void 0,
      div({className: 'submit-button-container'},
        span({className: 'step'}, stepText),
        button({
          className: 'submit-btn',
          type: 'submit',
          disabled: !this.state.canSubmit
        }, this.props.signupText))
      )
    }
  });
};

module.exports = BasicDataForm;

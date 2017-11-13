var ref = React.DOM, button = ref.button, div = ref.div, dd = ref.dd, dl = ref.dl, dt = ref.dt,
  INVALID_CLASS_WORD = 'You must enter a valid class word';

var TextInputClass = require("./text_input");
var PrivacyPolicyClass = require("./privacy_policy");

var StudentForm = function() {

  var FormsyForm, PrivacyPolicy, TextInput, classWordValidator, registerStudent;
  TextInput = React.createFactory(TextInputClass());
  PrivacyPolicy = React.createFactory(PrivacyPolicyClass());
  FormsyForm = React.createFactory(Formsy.Form);
  classWordValidator = function(value) {
    return jQuery.get(Portal.API_V1.CLASSWORD + "?class_word=" + value);
  };
  registerStudent = function(params) {
    return jQuery.post(Portal.API_V1.STUDENTS, params);
  };
  return React.createClass({
    displayName: 'StudentForm',
    getInitialState: function() {
      return {
        canSubmit: false
      };
    },
    onBasicFormValid: function() {
      return this.setState({
        canSubmit: this.refs.classWord.isValidAsync()
      });
    },
    onBasicFormInvalid: function() {
      return this.setState({
        canSubmit: false
      });
    },
    submit: function(data, resetForm, invalidateForm) {
      var ref1 = this.props, basicData = ref1.basicData, onRegistration = ref1.onRegistration,
        params = jQuery.extend({}, basicData, data);
      this.setState({
        canSubmit: false
      });
      return registerStudent(params).done(function(data) {
        return onRegistration(data);
      }).fail(function(err) {
        var serverErrors;
        serverErrors = JSON.parse(err.responseText).message;
        return invalidateForm(serverErrors);
      });
    },
    render: function() {
      var canSubmit;
      canSubmit = this.state.canSubmit;
      return FormsyForm({
        ref: 'form',
        onValidSubmit: this.submit,
        onValid: this.onBasicFormValid,
        onInvalid: this.onBasicFormInvalid
      },
      dl({},
        dt({}, 'Class Word'),
        dd({},
          TextInput({
            ref: 'classWord',
            name: 'class_word',
            placeholder: 'Class Word (not case sensitive)',
            required: true,
            asyncValidation: classWordValidator,
            asyncValidationError: INVALID_CLASS_WORD
          })
        )
      ),
      PrivacyPolicy({}),
      div({className: 'submit-button-container'},
        button({
          className: 'submit-btn',
          type: 'submit',
          disabled: !canSubmit
        }, 'Sign Up!')
      )
      );
    }
  });
};

module.exports = StudentForm;

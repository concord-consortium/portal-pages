var ref = React.DOM, div = ref.div, input = ref.input,
  TIMEOUT = 350;

var AsyncValidationMixin = require("./async_validation_mixin");

var TextInput = function() {
  return React.createClass({
    displayName: 'TextInput',
    mixins: [Formsy.Mixin, AsyncValidationMixin()],
    getDefaultProps: function() {
      return {
        type: 'text'
      };
    },
    getInitialState: function() {
      return {
        inputVal: ''
      };
    },
    onChange: function(event) {
      var delay, newVal, processValue;
      processValue = this.props.processValue;
      newVal = event.currentTarget.value;
      this.setState({
        inputVal: newVal
      });
      if (this.timeoutID) {
        window.clearTimeout(this.timeoutID);
      }
      delay = this.isValidValue(newVal) ? 0 : TIMEOUT;
      this.timeoutID = window.setTimeout((function(_this) {
        return function() {
          if (processValue) {
            newVal = processValue(newVal);
          }
          return _this.setValue(newVal);
        };
      })(this), delay);
      if (this.isValidValue(newVal)) {
        return this.validateAsync(newVal);
      }
    },
    render: function() {
      var ref1 = this.props, placeholder = ref1.placeholder, disabled = ref1.disabled,
        inputVal = this.state.inputVal,
        className = "text-input " + this.props.name;
      if (this.showRequired() && !this.isPristine()) {
        className += ' required';
      }
      if (this.showError()) {
        className += ' error';
      }
      if (this.isValidAsync()) {
        className += ' valid';
      }
      if (disabled) {
        className += ' disabled';
      }
      return div({
        className: className
      }, input({
        type: this.props.type,
        onChange: this.onChange,
        value: inputVal,
        placeholder: placeholder,
        disabled: disabled
      }), div({
        className: 'input-error'
      }, this.getErrorMessage()));
    }
  });
};

module.exports = TextInput;

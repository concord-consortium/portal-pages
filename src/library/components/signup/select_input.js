var div, input, label, ref;

ref = React.DOM, div = ref.div, input = ref.input, label = ref.label;

var reactClass = function() {

  // console.log("INFO creating select_input");

  var SelectAsync;
  SelectAsync = React.createFactory(Select.Async);
  return React.createClass({
    displayName: 'SelectInput',
    mixins: [Formsy.Mixin],
    changeValue: function(option) {
      this.setValue(option && option.value);
      return this.props.onChange(option);
    },
    render: function() {
      var className, disabled, loadOptions, placeholder, ref1;
      ref1 = this.props, placeholder = ref1.placeholder, loadOptions = ref1.loadOptions, disabled = ref1.disabled;
      className = 'select-input';
      if (this.getValue()) {
        className += ' valid';
      }
      return div({
        className: className
      }, SelectAsync({
        placeholder: placeholder,
        loadOptions: loadOptions,
        disabled: disabled,
        value: this.getValue() || '',
        onChange: this.changeValue,
        clearable: false
      }), div({
        className: 'input-error'
      }, this.getErrorMessage()));
    }
  });
};

module.exports.reactClass = reactClass;


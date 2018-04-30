import React from 'react'
var ref = React.DOM
var div = ref.div

var SelectInput = function () {
  // console.log("INFO creating select_input");

  var SelectAsync
  SelectAsync = React.createFactory(Select.Async)
  return React.createClass({
    displayName: 'SelectInput',
    mixins: [Formsy.Mixin],
    changeValue: function (option) {
      this.setValue(option && option.value)
      return this.props.onChange(option)
    },
    render: function () {
      var ref1 = this.props
      var placeholder = ref1.placeholder
      var loadOptions = ref1.loadOptions
      var disabled = ref1.disabled
      var className = 'select-input'
      if (this.getValue()) {
        className += ' valid'
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
      }, this.getErrorMessage()))
    }
  })
}

module.exports = SelectInput

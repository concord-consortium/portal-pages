import React from 'react'
var ref = React.DOM
var div = ref.div
var input = ref.input
var label = ref.label

var RadioInput = function () {
  return React.createClass({
    displayName: 'RadioInput',
    mixins: [Formsy.Mixin],
    changeValue: function (event) {
      console.log('INFO RadioInput changeValue', event)
      if (this.props.handleChange) {
        this.props.handleChange(event)
      }
      return this.setValue(event.currentTarget.value)
    },
    render: function () {
      var option
      return div({
        className: 'radio-input stacked'
      }, div({className: 'title inline'}, this.props.title), (function () {
          var i, len, ref1, results
          ref1 = this.props.options
          results = []
          for (i = 0, len = ref1.length; i < len; i++) {
            option = ref1[i]
            results.push(label({
              key: option.value,
            }, input({
              type: 'radio',
              onChange: this.changeValue,
              value: option.value,
              checked: this.getValue() === option.value
            }), option.label))
          }
          return results
        }.call(this)))
    }
  })
}

module.exports = RadioInput

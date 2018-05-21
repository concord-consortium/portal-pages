var ref = React.DOM
var div = ref.div
var input = ref.input
var label = ref.label

var CheckboxInput = function () {
  return React.createClass({
    displayName: 'CheckboxInput',
    mixins: [Formsy.Mixin],
    render: function () {
      return div({
        className: 'checkbox-input'
      }, label({className: 'checkbox-label'},
        input({
          type: 'checkbox',
          value: this.props.value,
          defaultChecked: this.props.defaultChecked
        }),
        this.props.label
      ))
    }
  })
}

module.exports = CheckboxInput

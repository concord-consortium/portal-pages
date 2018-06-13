var ref = React.DOM
var div = ref.div
var input = ref.input
var label = ref.label

var CheckboxInput = function () {
  return React.createClass({
    displayName: 'CheckboxInput',
    mixins: [Formsy.Mixin],
    componentDidMount: function() {
      return this.setValue(this.props.defaultChecked);
    },
    changeValue: function(event) {
      return this.setValue(event.target.checked);
    },
    render: function () {
      return div({
        className: 'checkbox-input ' + this.props.name
      }, label({className: 'checkbox-label'},
        input({
          type: 'checkbox',
          onChange: this.changeValue,
          defaultChecked: this.props.defaultChecked
        }),
        this.props.label
      ))
    }
  })
}

module.exports = CheckboxInput

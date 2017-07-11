var div, input, label, ref;

ref = React.DOM, div = ref.div, input = ref.input, label = ref.label;

var RadioInput = function() {
  return React.createClass({
    displayName: 'RadioInput',
    mixins: [Formsy.Mixin],
    changeValue: function(event) {
      return this.setValue(event.currentTarget.value);
    },
    render: function() {
      var option;
      return div({
        className: 'radio-input'
      }, this.props.title, (function() {
        var i, len, ref1, results;
        ref1 = this.props.options;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          option = ref1[i];
          results.push(label({
            key: option.value
          }, option.label, input({
            type: 'radio',
            onChange: this.changeValue,
            value: option.value,
            checked: this.getValue() === option.value
          })));
        }
        return results;
      }).call(this));
    }
  });
};

module.exports = RadioInput;



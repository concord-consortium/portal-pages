var div, p, ref;

ref = React.DOM, div = ref.div, p = ref.p;

var reactClass = function() {
  return React.createClass({
    displayName: 'StudentFormSideInfo',
    render: function() {
      return div({}, p({}, 'Enter the class word your teacher gave you. If you don\'t know what the class word is, ask your teacher.'));
    }
  });
};

module.exports.reactClass = reactClass;


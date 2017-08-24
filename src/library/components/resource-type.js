var Component = require('../helpers/component');

var div = React.DOM.div;

var ResourceType = Component({

  render: function () {
    var resource = this.props.resource;

    // for now we're only tagging investigations (aka sequences)
    if (!resource.has_activities) {
      return null;
    }

    return div({className: this.props.className || "portal-pages-finder-result-resource-types"},
      div({className: "portal-pages-finder-result-resource-type"}, 'Sequence')
    );
  }
});

module.exports = ResourceType;

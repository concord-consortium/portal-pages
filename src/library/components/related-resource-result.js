var GradeLevels = require("./grade-levels");
var Component = require('../helpers/component');
var filters = require("../helpers/filters");

var div = React.DOM.div;
var img = React.DOM.img;

var RelatedResourceResult = Component({
  getInitialState: function () {
    return {
      hovering: false
    };
  },

  componentWillMount: function () {
    // filter the description if not already done
    var resource = this.props.resource;
    if (!resource.filteredDescription) {
      var descriptionFilter = document.createElement("DIV");
      descriptionFilter.innerHTML = resource.description;
      resource.filteredDescription = descriptionFilter.innerText;
    }
  },

  handleClick: function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.replaceResource(this.props.resource);
  },

  handleMouseOver: function () {
    this.setState({hovering: true});
  },

  handleMouseOut: function () {
    this.setState({hovering: false});
  },

  render: function () {
    var resource = this.props.resource;
    var options = {className: "portal-pages-finder-result", onClick: this.handleClick, onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut};

    if (this.state.hovering) {
      return div(options,
        div({className: "portal-pages-finder-result-description"}, resource.filteredDescription),
        GradeLevels({resource: resource})
      );
    }
    return div(options,
      img({alt: resource.name, src: resource.icon.url}),
      div({className: "portal-pages-finder-result-name"}, resource.name),
      GradeLevels({resource: resource})
    );
  }
});

module.exports = RelatedResourceResult;

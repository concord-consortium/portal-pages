var GradeLevels = require('./grade-levels');

var Component = require('../helpers/component');
var shuffleArray = require('../helpers/shuffle-array');
var filters = require("../helpers/filters");

var div = React.DOM.div;
var span = React.DOM.span;
var pre = React.DOM.pre;
var img = React.DOM.img;
var h2 = React.DOM.h2;
var button = React.DOM.button;

var MaterialsCollectionItem = Component({
  render: function () {
    var item = this.props.item;
    return div({className: "stem-finder-materials-collection-item"},
      div({className: "stem-finder-materials-collection-item-icon"},
        img({src: item.icon.url})
      ),
      div({className: "stem-finder-materials-collection-item-info"},
        h2({}, item.name),
        div({className: "stem-finder-materials-collection-item-description", dangerouslySetInnerHTML: {__html: item.description}}),
        div({className: "stem-finder-materials-collection-item-footer"},
          GradeLevels({resource: item, className: "stem-finder-materials-collection-item-grade-levels"})
        )
      )
      //pre({}, JSON.stringify(this.props.item, null, 2))
    );
  }
});

var MaterialsCollection = Component({
  getInitialState: function () {
    return {
      materials: []
    };
  },

  componentWillMount: function () {
    jQuery.ajax({
      url: Portal.API_V1.MATERIALS_BIN_COLLECTIONS,
      data: {id: this.props.collection},
      dataType: 'json',
      success: function (data) {
        materials = data[0].materials;
        if (this.props.randomize) {
          materials = shuffleArray(materials);
        }
        if (this.onDataLoad) {
          this.onDataLoad(materials);
        }
        this.setState({materials: materials});
      }.bind(this)
    });
  },

  render: function () {
    if (this.state.materials.length === 0) {
      return null;
    }

    return div({className: "stem-finder-materials-collection"},
      this.state.materials.map(function (material, i) {
        return MaterialsCollectionItem({key: i, item: material});
      })
    );
  }
});

module.exports = MaterialsCollection;
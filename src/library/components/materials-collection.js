var Component = require('../helpers/component');
var ResourceLightbox = require('./resource-lightbox');
var shuffleArray = require('../helpers/shuffle-array');
var filters = require("../helpers/filters");
var Lightbox = require ("../helpers/lightbox");
var ResourceType = require("./resource-type");

var a = React.DOM.a;
var div = React.DOM.div;
var span = React.DOM.span;
var pre = React.DOM.pre;
var img = React.DOM.img;
var h3 = React.DOM.h2;
var button = React.DOM.button;

var MaterialsCollectionItem = Component({

  getInitialState: function () {
    return {
      hovering: false,
      lightbox: false
    };
  },

  handleMouseOver: function () {
    if (this.state.lightbox) {
      return;
    }
    this.setState({hovering: true});
  },

  handleMouseOut: function () {
    if (this.state.lightbox) {
      return;
    }
    this.setState({hovering: false});
  },

  toggleLightbox: function (e) {
    e.preventDefault();
    e.stopPropagation();
    var lightbox = !this.state.lightbox;

    this.setState({
      lightbox: lightbox,
      hovering: false
    });

    // mount/unmount lightbox outside of homepage content
    if (lightbox) {
      var resourceLightbox =
        ResourceLightbox({resource: this.props.item, toggleLightbox: this.toggleLightbox});
      Lightbox.open(resourceLightbox);
    }
    else {
      Lightbox.close();
    }
  },

  render: function () {
    var item = this.props.item;
    return div({className: "portal-pages-finder-materials-collection-item"},
      div({className: "portal-pages-finder-materials-collection-item__image col-4"},
        a({href: '#', onClick: this.toggleLightbox},
          img({src: item.icon.url}),
          ResourceType({resource: item})
        )
      ),
      div({className: "portal-pages-finder-materials-collection-item-info col-8"},
        h3({className: "portal-pages-finder-materials-collection-item__title"},
          a({href: '#', onClick: this.toggleLightbox},
            item.name
          )
        ),
        div({className: "portal-pages-finder-materials-collection-item__description", dangerouslySetInnerHTML: {__html: item.description}})
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

    return div({className: "portal-pages-finder-materials-collection"},
      this.state.materials.map(function (material, i) {
        return MaterialsCollectionItem({key: i, item: material});
      })
    );
  }
});

module.exports = MaterialsCollection;

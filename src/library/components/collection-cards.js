var Component = require('../helpers/component');

var fadeIn = require("../helpers/fade-in");
var sortByName = require("../helpers/sort-by-name");
var shuffleArray = require("../helpers/shuffle-array");

var div = React.DOM.div;
var a = React.DOM.a;
var img = React.DOM.img;

var CollectionCards = Component({
  getInitialState: function () {
    return {
      opacity: 0,
      collections: []
    };
  },

  componentDidMount: function () {
    jQuery.ajax({
      url: "/api/v1/projects",
      dataType: "json"
    }).done(function (data) {
      var collections = data.reduce(function (collections, collection) {
        if (collection.public && collection.landing_page_slug) {
          collections.push(collection);
        }
        return collections;
      }, []);

      if (this.props.shuffle) {
        collections = shuffleArray(collections);
      }
      else {
        collections.sort(sortByName);
      }

      if (this.props.count) {
        collections = collections.slice(0, this.props.count);
      }

      this.setState({collections: collections});

      fadeIn(this, 1000);
    }.bind(this));
  },

  render: function () {
    if (this.state.collections.length === 0) {
      return null;
    }
    return div({style: {opacity: this.state.opacity}},
      this.state.collections.map(function (collection) {
        return div({key: collection.landing_page_slug, className: "stem-collections-card"},
          a({href: "/" + collection.landing_page_slug},
            img({alt: collection.name, src: collection.project_card_image_url}),
            div({className: "stem-collections-card-name"}, collection.name),
            div({className: "stem-collections-card-description"}, collection.project_card_description)
          )
        );
      })
    );
  }
});

module.exports = CollectionCards;

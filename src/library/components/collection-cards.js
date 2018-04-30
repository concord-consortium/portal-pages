import React from 'react'
var Component = require('../helpers/component')

var fadeIn = require('../helpers/fade-in')
var sortByName = require('../helpers/sort-by-name')
var shuffleArray = require('../helpers/shuffle-array')
var waitForAutoShowingLightboxToClose = require('../helpers/wait-for-auto-lightbox-to-close')
var portalObjectHelpers = require('../helpers/portal-object-helpers')

var div = React.DOM.div
var a = React.DOM.a
var h3 = React.DOM.h3
var img = React.DOM.img
var p = React.DOM.p

var CollectionCards = Component({
  getInitialState: function () {
    return {
      opacity: 0,
      collections: []
    }
  },

  componentDidMount: function () {
    waitForAutoShowingLightboxToClose(function () {
      jQuery.ajax({
        url: '/api/v1/projects', // TODO: replace with Portal.API_V1 constant when available
        dataType: 'json'
      }).done(function (data) {
        var collections = data.reduce(function (collections, collection) {
          if (collection.landing_page_slug) {
            collection.filteredDescription = portalObjectHelpers.textOfHtml(collection.project_card_description)
            collections.push(collection)
          }
          return collections
        }, [])

        if (this.props.shuffle) {
          collections = shuffleArray(collections)
        } else {
          collections.sort(sortByName)
        }

        if (this.props.count) {
          collections = collections.slice(0, this.props.count)
        }

        this.setState({collections: collections})

        fadeIn(this, 1000)
      }.bind(this))
    }.bind(this))
  },

  render: function () {
    if (this.state.collections.length === 0) {
      return null
    }
    return div({style: {opacity: this.state.opacity}},
      this.state.collections.map(function (collection) {
        return div({key: collection.landing_page_slug, className: 'portal-pages-collections-card col-4'},
          a({href: '/' + collection.landing_page_slug},
            div({className: 'portal-pages-collections-card-image-preview'},
              img({alt: collection.name, src: collection.project_card_image_url})
            ),
            h3({className: 'portal-pages-collections-card-name'}, collection.name),
            p({className: 'portal-pages-collections-card-description'}, collection.filteredDescription)
          )
        )
      })
    )
  }
})

module.exports = CollectionCards

import React from 'react'
const Component = require('../helpers/component')
const ResourceLightbox = require('./resource-lightbox')
const shuffleArray = require('../helpers/shuffle-array')
const portalObjectHelpers = require('../helpers/portal-object-helpers')
const Lightbox = require('../helpers/lightbox')
const ResourceType = require('./resource-type')

const MaterialsCollectionItem = Component({

  getInitialState: function () {
    return {
      hovering: false,
      lightbox: false
    }
  },

  componentWillMount: function () {
    const item = this.props.item
    portalObjectHelpers.processResource(item)
  },

  handleMouseOver: function () {
    if (this.state.lightbox) {
      return
    }
    this.setState({ hovering: true })
  },

  handleMouseOut: function () {
    if (this.state.lightbox) {
      return
    }
    this.setState({ hovering: false })
  },

  toggleLightbox: function (e) {
    e.preventDefault()
    e.stopPropagation()
    let lightbox = !this.state.lightbox

    this.setState({
      lightbox: lightbox,
      hovering: false
    })

    // mount/unmount lightbox outside of homepage content
    if (lightbox) {
      let resourceLightbox =
        ResourceLightbox({ resource: this.props.item, toggleLightbox: this.toggleLightbox, showTeacherResourcesButton: this.props.showTeacherResourcesButton })
      Lightbox.open(resourceLightbox)
    } else {
      Lightbox.close()
    }
  },

  render: function () {
    const item = this.props.item
    return (
      <div className={'portal-pages-finder-materials-collection-item'}>
        <div className={'portal-pages-finder-materials-collection-item__image col-4'}>
          <a href={'#'} onClick={this.toggleLightbox}>
            <img src={item.icon.url} />
            {ResourceType({ resource: item })}
          </a>
        </div>
        <div className={'portal-pages-finder-materials-collection-item-info col-8'}>
          <h3 className={'portal-pages-finder-materials-collection-item__title'}>
            <a href={'#'} onClick={this.toggleLightbox}>
              {item.name}
            </a>
          </h3>
        </div>
        <div className={'portal-pages-finder-materials-collection-item__description'} dangerouslySetInnerHTML={{ __html: item.longDescription }} />
      // pre({}, JSON.stringify(this.props.item, null, 2))
      </div>
    )
  }
})

const MaterialsCollection = Component({
  getInitialState: function () {
    return {
      materials: []
    }
  },

  getDefaultProps: function () {
    return {
      showTeacherResourcesButton: true
    }
  },

  componentWillMount: function () {
    jQuery.ajax({
      url: Portal.API_V1.MATERIALS_BIN_COLLECTIONS,
      data: { id: this.props.collection,
        skip_lightbox_reloads: true
      },
      dataType: 'json',
      success: function (data) {
        let materials = data[0].materials
        if (this.props.randomize) {
          materials = shuffleArray(materials)
        }
        if (this.props.featured) {
          // props.featured is the ID of the material we
          // wish to insert at the start of the list
          let featuredID = this.props.featured
          let sortFeatured = function (a, b) {
            if (a.id === featuredID) return -1
            if (b.id === featuredID) return 1
            return 0
          }
          materials.sort(sortFeatured)
        }
        this.setState({ materials: materials })
        if (this.props.onDataLoad) {
          this.props.onDataLoad(materials)
        }
      }.bind(this)
    })
  },

  render: function () {
    const showTeacherResourcesButton = this.props.showTeacherResourcesButton

    if (this.state.materials.length === 0) {
      return null
    }

    return (
      <div className={'portal-pages-finder-materials-collection'}>
        {this.state.materials.map(function (material, i) {
          return MaterialsCollectionItem({ key: i, item: material, showTeacherResourcesButton: showTeacherResourcesButton })
        })}
      </div>
    )
  }
})

module.exports = MaterialsCollection

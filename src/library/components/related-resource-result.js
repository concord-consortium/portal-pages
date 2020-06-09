import React from 'react'
var GradeLevels = require('./grade-levels')
var Component = require('../helpers/component')
var portalObjectHelpers = require('../helpers/portal-object-helpers')

var div = React.DOM.div
var img = React.DOM.img

var RelatedResourceResult = Component({
  getInitialState: function () {
    return {
      hovering: false
    }
  },

  UNSAFE_componentWillMount: function () {
    // process the related resource
    var resource = this.props.resource
    portalObjectHelpers.processResource(resource)
  },

  handleClick: function (e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.replaceResource(this.props.resource)
  },

  handleMouseOver: function () {
    if (!('ontouchstart' in document.documentElement)) {
      this.setState({ hovering: true })
    }
  },

  handleMouseOut: function () {
    this.setState({ hovering: false })
  },

  render: function () {
    var resource = this.props.resource
    var options = { className: 'portal-pages-finder-result col-6', onClick: this.handleClick, onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut }

    if (this.state.hovering) {
      return div(options,
        div({ className: 'portal-pages-finder-result-description' }, resource.filteredShortDescription),
        GradeLevels({ resource: resource })
      )
    }
    return div(options,
      div({ className: 'portal-pages-finder-result-image-preview' },
        img({ alt: resource.name, src: resource.icon.url })
      ),
      div({ className: 'portal-pages-finder-result-name' }, resource.name),
      GradeLevels({ resource: resource })
    )
  }
})

module.exports = RelatedResourceResult

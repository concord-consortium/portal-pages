import React from 'react'
const Component = require('../helpers/component')

const ResourceType = Component({

  render: function () {
    const resource = this.props.resource

    // for now we're only tagging investigations (aka sequences)
    if (!resource.has_activities) {
      return null
    }

    return (
      <div className={this.props.className || 'portal-pages-finder-result-resource-types'}>
        <div className={'portal-pages-finder-result-resource-type'}>
          Sequence
        </div>
      </div>
    )
  }
})

module.exports = ResourceType

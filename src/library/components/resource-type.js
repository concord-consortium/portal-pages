import React from 'react'
const Component = require('../helpers/component')

const ResourceType = Component({

  render: function () {
    const resource = this.props.resource
    const resourceType = resource.materialType

    if (resource.materialType === 'activity') {
      return null
    }

    return (
      <div className={this.props.className || 'portal-pages-finder-result-resource-types'}>
        <div className={'portal-pages-finder-result-resource-type'}>
          {resourceType}
        </div>
      </div>
    )
  }
})

module.exports = ResourceType

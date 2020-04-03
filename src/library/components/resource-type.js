import React from 'react'
const Component = require('../helpers/component')

const ResourceType = Component({

  render: function () {
    const resource = this.props.resource
    const materialTypeLabels = {
      'Interactive': 'model',
      'Activity': 'activity',
      'Investigation': 'sequence',
      'Project': 'collection'
    }
    const resourceType = materialTypeLabels[resource.material_type]

    if (resourceType === 'activity' || !resourceType) {
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

import React from 'react'
import ReactDOM from 'react-dom'

var Component = require('../helpers/component')

var div = ReactDOM.div
var span = ReactDOM.span

var HeaderFilter = Component({
  handleClear: function () {
    this.props.toggleFilter(this.props.type, this.props.filter)
  },

  render: function () {
    return div({ className: 'portal-pages-finder-header-filter' },
      this.props.filter.title,
      span({ onClick: this.handleClear })
    )
  }
})

module.exports = HeaderFilter

import React from 'react'

var Component = function (options) {
  return React.createFactory(React.createClass(options))
}

module.exports = Component

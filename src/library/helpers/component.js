import React from 'react'

import createFactory from "./create-factory"

var Component = function (options) {
  return createFactory(React.createClass(options))
}

module.exports = Component

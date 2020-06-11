import React from 'react'
import createClass from 'create-react-class'

import createFactory from './create-factory'

var Component = function (options) {
  return createFactory(createClass(options))
}

module.exports = Component

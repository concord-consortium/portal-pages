import React from 'react'
var ref = React.DOM
var div = ref.div
var p = ref.p

var StudentFormSideInfo = function () {
  return React.createClass({
    displayName: 'StudentFormSideInfo',
    render: function () {
      return div({}, p({}, 'Enter the class word your teacher gave you. If you don\'t know what the class word is, ask your teacher.'))
    }
  })
}

module.exports = StudentFormSideInfo

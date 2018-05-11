import React from 'react'
var ref = React.DOM
var div = ref.div
var li = ref.li
var p = ref.p
var ul = ref.ul

var SideInfo = function () {
  // console.log("INFO creating sideinfo");

  return React.createClass({
    displayName: 'SideInfo',
    render: function () {
      return div({}, div({
        className: 'side-info-header'
      }, 'Why sign up?'), p({}, 'It\'s free and you get access to several key features:'), ul({}, li({}, 'Create classes for your students and assign them activities'), li({}, 'Save student work'), li({}, 'Track student progress through activities')))
    }
  })
}

module.exports = SideInfo

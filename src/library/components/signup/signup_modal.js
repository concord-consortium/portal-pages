import React from 'react'
var ref = React.DOM
var div = ref.div

var SignupClass = require('./signup')

var SignupModal = function () {
  // console.log("INFO creating signup_modal");

  var Signup = React.createFactory(SignupClass())
  return React.createClass({
    displayName: 'SignupModal',
    render: function () {
      // console.log("INFO rendering signup modal", this.props);
      return div({
        className: 'signup-default-modal-content'
      }, Signup(this.props))
    }
  })
}

module.exports = SignupModal

import React from 'react'

var button = React.DOM.button
var div = React.DOM.div
var strong = React.DOM.strong

const UserTypeSelector = () => {
  const FormsyForm = React.createFactory(Formsy.Form)

  return React.createClass({

    displayName: 'UserTypeSelector',

    getInitialState () {
      return {
        userType: null
      }
    },

    handleClick (event) {
      let value = event.currentTarget.value
      console.log('INFO changing type', value)
      return this.props.onUserTypeSelect(value)
      // ga('send', 'event', 'Registration', 'Form', 'Step 2 Completed - ' + value.charAt(0).toUpperCase() + value.slice(1))
    },

    render () {
      console.log('INFO UserTypeSelector rendering')

      let typeButtons = div({className: 'user-type-select'},
        button({onClick: this.handleClick, name: 'type', value: 'teacher'}, 'I am a ',
          strong({}, 'Teacher')
        ),
        button({onClick: this.handleClick, name: 'type', value: 'student'}, 'I am a ',
          strong({}, 'Student')
        )
      )

      return FormsyForm({}, typeButtons)
    }

  })
}

module.exports = UserTypeSelector

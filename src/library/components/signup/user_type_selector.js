import React from 'react'

const UserTypeSelector = () => {
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
      ga('send', 'event', 'User Registration', 'Form', 'Step 1 Completed - ' + value.charAt(0).toUpperCase() + value.slice(1))
      return this.props.onUserTypeSelect(value)
    },

    render () {
      console.log('INFO UserTypeSelector rendering')

      return (
        <div className='user-type-select'>
          <button onClick={this.handleClick} name='type' value='teacher'>
            I am a <strong>Teacher</strong>
          </button>
          <button onClick={this.handleClick} name='type' value='student'>
            I am a <strong>Student</strong>
          </button>
        </div>
      )
    }

  })
}

module.exports = UserTypeSelector

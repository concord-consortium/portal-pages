import React from 'react'

const TeacherRegistrationComplete = function () {
  return React.createClass({
    displayName: 'TeacherRegistrationComplete',
    componentDidMount: function () {
      ga('send', 'event', 'User Registration', 'Form', 'Final Step Completed - Teacher')
    },
    render: function () {
      let anonymous
      anonymous = this.props.anonymous

      let successMessage = anonymous ? <p>We're sending you an email with your activation code. Click the "Confirm Account" link in the email to complete the process.</p> : <p><a href='/'>Start using the site.</a></p>

      return (
        <div className='registration-complete'>
          <p className='reg-header'>Thanks for signing up!</p>
          {successMessage}
        </div>
      )
    }
  })
}

module.exports = TeacherRegistrationComplete

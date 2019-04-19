import React from 'react'
var div = React.DOM.div
var footer = React.DOM.footer
var h2 = React.DOM.h2
var p = React.DOM.p
var strong = React.DOM.strong

var BasicDataFormClass = require('./basic_data_form')
var StudentRegistrationCompleteClass = require('./student_registration_complete')
var TeacherRegistrationCompleteClass = require('./teacher_registration_complete')
var UserTypeSelectorClass = require('./user_type_selector')

var Signup = function () {
  // console.log("INFO creating Signup");

  var BasicDataForm, StudentRegistrationComplete, TeacherRegistrationComplete
  BasicDataForm = React.createFactory(BasicDataFormClass())
  StudentRegistrationComplete = React.createFactory(StudentRegistrationCompleteClass())
  TeacherRegistrationComplete = React.createFactory(TeacherRegistrationCompleteClass())

  var UserTypeSelector = React.createFactory(UserTypeSelectorClass())

  return React.createClass({
    displayName: 'SignUp',
    getInitialState: function () {
      return {
        basicData: null,
        studentData: null,
        teacherData: null,
        oauthProviders: this.props.oauthProviders,
        closeable: this.props.closeable
      }
    },

    getDefaultProps: function () {
      return {
        siteName: (Portal && Portal.siteName) || 'Portal',
        signupText: 'Next',
        anonymous: Portal.currentUser.isAnonymous
      }
    },
    onBasicDataSubmit: function (data) {
      data.sign_up_path = window.location.pathname
      return this.setState({
        basicData: data
      })
    },

    onStudentRegistration: function (data) {
      return this.setState({
        studentData: data
      })
    },
    onTeacherRegistration: function (data) {
      return this.setState({
        teacherData: data
      })
    },

    getStepNumber: function () {
      var ref = this.state
      var basicData = ref.basicData
      var studentData = ref.studentData
      var teacherData = ref.teacherData

      // console.log("INFO getStepNumber", this.props, basicData);

      if (!this.props.omniauth && !basicData) {
        return 1
      }
      if (this.props.omniauth || (basicData && !studentData && !teacherData)) {
        return 2
      }
      return 3
    },

    render: function () {
      console.log('INFO rendering signup', this.props)

      var ref = this.props
      var signupText = ref.signupText
      var oauthProviders = ref.oauthProviders
      var anonymous = ref.anonymous
      var ref1 = this.state
      var basicData = ref1.basicData
      var studentData = ref1.studentData
      var teacherData = ref1.teacherData

      var form

      //
      // For omniauth final step, simply redirect to omniauth_origin
      //
      if ((studentData || teacherData) && this.props.omniauth) {
        console.log('INFO omniauth final step, redirect.', this.props)
        var data = this.state.studentData ? this.state.studentData : this.state.teacherData
        window.location.href = data.omniauth_origin
        return null
      }

      if (studentData) {
        //
        // Display completion step
        //
        form = StudentRegistrationComplete({
          anonymous: anonymous,
          data: studentData
        })
      } else if (teacherData) {
        //
        // Display completion step
        //
        form = TeacherRegistrationComplete({
          anonymous: anonymous
        })
      } else if (!basicData && !this.props.omniauth) {
        // console.log("INFO signup form creating basic data selector step");

        form = [
          BasicDataForm({
            anonymous: anonymous,
            signupText: signupText,
            oauthProviders: oauthProviders,
            onSubmit: this.onBasicDataSubmit
          })
        ]
      } else {
        // console.log("INFO signup form creating type selector step");

        var select = UserTypeSelector({
          studentReg: this.onStudentRegistration,
          teacherReg: this.onTeacherRegistration,
          basicData: basicData,
          anonymous: anonymous
        })

        form = [ select ]
      }

      return div({},
        h2({},
          anonymous
            ? [strong({}, 'Register'), ' for the ' + this.props.siteName]
            : [strong({}, 'Finish'), ' Signing Up']
        ),
        div({className: 'signup-form'}, form),
        footer({className: 'reg-footer'},
          p({},
            strong({}, 'Why sign up?'),
            " It's free and you get access to several key features, like creating classes for your students, assigning activities, saving work, tracking student progress, and more!"
          )
        )
      )
    }
  })
}

module.exports = Signup

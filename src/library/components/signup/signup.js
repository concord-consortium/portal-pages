import React from 'react'
import StudentFormClass from './student_form'
import TeacherFormClass from './teacher_form'

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

  var BasicDataForm, StudentRegistrationComplete, TeacherRegistrationComplete, UserTypeSelector, StudentForm, TeacherForm
  BasicDataForm = React.createFactory(BasicDataFormClass())
  StudentRegistrationComplete = React.createFactory(StudentRegistrationCompleteClass())
  TeacherRegistrationComplete = React.createFactory(TeacherRegistrationCompleteClass())
  UserTypeSelector = React.createFactory(UserTypeSelectorClass())
  StudentForm = React.createFactory(StudentFormClass())
  TeacherForm = React.createFactory(TeacherFormClass())

  return React.createClass({
    displayName: 'SignUp',
    getInitialState: function () {
      return {
        userType: null,
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

    onUserTypeSelect: function (data) {
      let newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?userType=' + data;
      window.history.pushState({path: newUrl}, '', newUrl);
      return this.setState({
        userType: data
      })
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
      var userType = ref.userType
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
      var userType = ref1.userType
      var basicData = ref1.basicData
      var studentData = ref1.studentData
      var teacherData = ref1.teacherData

      var form

      var currentPath = window.location.pathname

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
      // } else if (!basicData && !this.props.omniauth) {
      } else if (currentPath.search('teacher_form') > -1) {
        form = [
          TeacherForm({
            anonymous: this.props.anonymous,
            basicData: basicData,
            onRegistration: this.onTeacherRegistration
          })
        ]
      } else if (currentPath.search('student_form') > -1) {
        form = [
          StudentForm({
            basicData: basicData,
            onRegistration: this.onStudentRegistration
          })
        ]
      } else if (!userType) {
        // console.log("INFO signup form creating type selector step");

        var select = UserTypeSelector({
          // studentReg: this.onStudentRegistration,
          // teacherReg: this.onTeacherRegistration,
          anonymous: anonymous,
          onUserTypeSelect: this.onUserTypeSelect
        })

        form = [ select ]
      } else if (basicData) {
        if (userType === 'teacher') {
          form = [
            TeacherForm({
              anonymous: this.props.anonymous,
              basicData: basicData,
              onRegistration: this.onTeacherRegistration
            })
          ]
        } else {
          form = [
            StudentForm({
              basicData: basicData,
              onRegistration: this.onStudentRegistration
            })
          ]
        }
      } else {
        // console.log("INFO signup form creating basic data selector step");
        form = [
          BasicDataForm({
            anonymous: anonymous,
            userType: userType,
            signupText: signupText,
            oauthProviders: oauthProviders,
            onSubmit: this.onBasicDataSubmit
          })
        ]
      }

      let formTitleIntro = 'Register'
      if (this.state.userType != null) {
        formTitleIntro = 'Register as a ' + userType.charAt(0).toUpperCase() + userType.slice(1)
      }

      return div({},
        h2({},
          anonymous
            ? [strong({}, formTitleIntro), ' for the ' + this.props.siteName]
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

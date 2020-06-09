import React from 'react'
import StudentFormClass from './student_form'
import TeacherFormClass from './teacher_form'
import ParseQueryString from '../../helpers/parse-query-string'
import createFactory from "./../../helpers/create-factory"

const BasicDataFormClass = require('./basic_data_form')
const StudentRegistrationCompleteClass = require('./student_registration_complete')
const TeacherRegistrationCompleteClass = require('./teacher_registration_complete')
const UserTypeSelectorClass = require('./user_type_selector')

const Signup = function () {
  // console.log("INFO creating Signup");

  const BasicDataForm = createFactory(BasicDataFormClass())
  const StudentRegistrationComplete = createFactory(StudentRegistrationCompleteClass())
  const TeacherRegistrationComplete = createFactory(TeacherRegistrationCompleteClass())
  const UserTypeSelector = createFactory(UserTypeSelectorClass())
  const StudentForm = createFactory(StudentFormClass())
  const TeacherForm = createFactory(TeacherFormClass())

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
      let newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname
      let queryString = '?'

      if (window.location.search) {
        let params = ParseQueryString()
        let paramKeys = Object.keys(params)
        for (let i = 0; i < paramKeys.length; i++) {
          if (paramKeys[i] !== 'userType') {
            queryString = queryString + paramKeys[i] + '=' + params[paramKeys[i]] + '&'
          }
        }
      }
      queryString = queryString + 'userType=' + data
      newUrl = newUrl + queryString

      window.history.pushState({ path: newUrl }, '', newUrl)
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
      const ref = this.state
      let basicData = ref.basicData
      let studentData = ref.studentData
      let teacherData = ref.teacherData

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

      const ref = this.props
      let signupText = ref.signupText
      let oauthProviders = ref.oauthProviders
      let anonymous = ref.anonymous
      let omniauthOrigin = ref.omniauth_origin
      let ref1 = this.state
      let userType = ref1.userType
      let basicData = ref1.basicData
      let studentData = ref1.studentData
      let teacherData = ref1.teacherData

      let form

      //
      // For omniauth final step, simply redirect to omniauth_origin
      //
      if ((studentData || teacherData) && this.props.omniauth) {
        console.log('INFO omniauth final step, redirect.', this.props)
        let data = this.state.studentData ? this.state.studentData : this.state.teacherData
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
      } else if (omniauthOrigin != null) {
        if (omniauthOrigin.search('teacher') > -1) {
          form = [
            TeacherForm({
              anonymous: this.props.anonymous,
              basicData: basicData,
              onRegistration: this.onTeacherRegistration
            })
          ]
        } else if (omniauthOrigin.search('student') > -1) {
          form = [
            StudentForm({
              basicData: basicData,
              onRegistration: this.onStudentRegistration
            })
          ]
        }
      } else if (!userType) {
        // console.log("INFO signup form creating type selector step");

        let select = UserTypeSelector({
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

      let formTitle = anonymous ? <h2><strong>{formTitleIntro}</strong> for the {this.props.siteName}</h2> : <h2><strong>Finish</strong> Signing Up</h2>

      return (
        <div>
          {formTitle}
          <div className='signup-form'>
            {form}
          </div>
          <footer className='reg-footer'>
            <p><strong>Why sign up?</strong> It's free and you get access to several key features, like creating classes for your students, assigning activities, saving work, tracking student progress, and more!</p>
          </footer>
        </div>
      )
    }
  })
}

module.exports = Signup

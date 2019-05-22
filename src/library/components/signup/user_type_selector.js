import React from 'react'
import RadioInputClass from './radio_input'
import StudentFormClass from './student_form'
import TeacherFormClass from './teacher_form'

const UserTypeSelector = () => {
  const FormsyForm = React.createFactory(Formsy.Form)
  const RadioInput = React.createFactory(RadioInputClass())
  const StudentForm = React.createFactory(StudentFormClass())
  const TeacherForm = React.createFactory(TeacherFormClass())

  return React.createClass({

    displayName: 'UserTypeSelector',

    getInitialState () {
      return {
        show: null
      }
    },

    handleChange (event) {
      let value = event.currentTarget.value
      console.log('INFO changing type', value)
      this.setState({show: value})
      //ga('send', 'event', 'Registration', 'Form', 'Step 2 Completed - ' + value.charAt(0).toUpperCase() + value.slice(1))
    },

    render () {
      console.log('INFO UserTypeSelector rendering')
      console.log('Show', this.state.show)

      let radio =
        RadioInput({
          handleChange: this.handleChange,
          name: 'type',
          title: 'I am a ',
          required: true,
          options: [
            {
              label: 'Teacher',
              value: 'teacher'
            }, {
              label: 'Student',
              value: 'student'
            }
          ]
        })

      let form
      if (this.state.show === 'student') {
        console.log('INFO create StudentForm...')
        form = StudentForm({
          basicData: this.props.basicData,
          onRegistration: this.props.studentReg
        })
      }
      if (this.state.show === 'teacher') {
        console.log('INFO create TeacherForm...')
        form = TeacherForm({
          anonymous: this.props.anonymous,
          basicData: this.props.basicData,
          onRegistration: this.props.teacherReg
        })
      }

      return FormsyForm({}, radio, form)
    }

  })
}

module.exports = UserTypeSelector

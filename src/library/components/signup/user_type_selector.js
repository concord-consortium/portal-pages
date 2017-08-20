var div = React.DOM.div;
var a   = React.DOM.a;

var RadioInputClass     = require("./radio_input");
var StudentFormClass    = require("./student_form");
var TeacherFormClass    = require("./teacher_form");

var UserTypeSelector = function() {

  var FormsyForm    = React.createFactory(Formsy.Form);
  var RadioInput    = React.createFactory(RadioInputClass());
  var StudentForm   = React.createFactory(StudentFormClass());
  var TeacherForm   = React.createFactory(TeacherFormClass());

  return React.createClass({

    displayName: 'UserTypeSelector',

    getInitialState: function() {
      return {
        show: null
      };
    },

    handleChange: function(event) {
      var value = event.currentTarget.value;
      console.log("INFO changing type", value);
      this.setState({show: value});
    },

    render: function() {

      console.log("INFO UserTypeSelector rendering");
      console.log("Show", this.state.show);

      var radio = 
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
        });

      var form;
      if(this.state.show === "student") {
        console.log("INFO create StudentForm...");
        form = StudentForm({
          basicData:        this.props.basicData,
          onRegistration:   this.props.studentReg
        });
      }
      if(this.state.show === "teacher") {
        console.log("INFO create TeacherForm...");
        form = TeacherForm({
          anonymous:        this.props.anonymous,
          basicData:        this.props.basicData,
          onRegistration:   this.props.teacherReg
        });
      }

      return FormsyForm({}, radio, form);
    }

  });
};

module.exports = UserTypeSelector;


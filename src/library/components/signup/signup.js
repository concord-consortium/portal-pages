var div;

div = React.DOM.div;

var BasicDataFormClass                      = require("./basic_data_form");
var SideInfoClass                           = require("./sideinfo");
var StudentFormClass                        = require("./student_form");
var StudentFormSideInfoClass                = require("./student_form_sideinfo");
var TeacherFormClass                        = require("./teacher_form");
var StudentRegistrationCompleteClass        = require("./student_registration_complete");
var StudentRegistrationCompleteSideInfoClass = require("./student_registration_complete_sideinfo");
var TeacherRegistrationCompleteClass        = require("./teacher_registration_complete");
var UserTypeSelectorClass                   = require("./user_type_selector");

var Signup = function() {

  // console.log("INFO creating Signup");

  var BasicDataForm, SideInfo, StudentForm, StudentFormSideInfo, StudentRegistrationComplete, StudentRegistrationCompleteSideInfo, TeacherForm, TeacherRegistrationComplete;
  BasicDataForm = React.createFactory(BasicDataFormClass());
  SideInfo = React.createFactory(SideInfoClass());
  StudentForm = React.createFactory(StudentFormClass());
  StudentFormSideInfo = React.createFactory(StudentFormSideInfoClass());
  TeacherForm = React.createFactory(TeacherFormClass());
  StudentRegistrationComplete = React.createFactory(StudentRegistrationCompleteClass());
  StudentRegistrationCompleteSideInfo = React.createFactory(StudentRegistrationCompleteSideInfoClass());
  TeacherRegistrationComplete = React.createFactory(TeacherRegistrationCompleteClass());

  var UserTypeSelector = React.createFactory(UserTypeSelectorClass());

  return React.createClass({
    displayName: 'SignUp',
    getInitialState: function() {
      return {
        basicData: null,
        studentData: null,
        teacherData: null,
        oauthProviders: this.props.oauthProviders
      };
    },
    getDefaultProps: function() {
      return {
        signupText: "Sign Up for " + Portal.siteName + "!",
        anonymous: Portal.currentUser.isAnonymous
      };
    },
    onBasicDataSubmit: function(data) {
      data.sign_up_path = location.pathname;
      return this.setState({
        basicData: data
      });
    },

    onStudentRegistration: function(data) {
      return this.setState({
        studentData: data
      });
    },
    onTeacherRegistration: function(data) {
      return this.setState({
        teacherData: data
      });
    },

    getStepNumber: function() {
      var basicData, ref, studentData, teacherData;
      ref = this.state, basicData = ref.basicData, studentData = ref.studentData, teacherData = ref.teacherData;
      if (!basicData) {
        return 1;
      }
      if (basicData && !studentData && !teacherData) {
        return 2;
      }
      return 3;
    },

    render: function() {
      // console.log("INFO rendering signup", this.props);

      var anonymous, basicData, ref, ref1, signupText, studentData, teacherData;
      ref = this.props, signupText = ref.signupText, oauthProviders = ref.oauthProviders, anonymous = ref.anonymous;
      ref1 = this.state, basicData = ref1.basicData, studentData = ref1.studentData, teacherData = ref1.teacherData;

      var form;

      if (studentData) {

        form = StudentRegistrationComplete({
          anonymous: anonymous,
          data: studentData
        });

      } else if (teacherData) {

        form = TeacherRegistrationComplete({
          anonymous: anonymous
        });

      } else if (!basicData) {

        console.log("INFO signup form creating basic data selector step");

        form = [
          BasicDataForm({
            anonymous: anonymous,
            signupText: signupText,
            oauthProviders: oauthProviders,
            onSubmit: this.onBasicDataSubmit
          })
        ];

      } else {

        console.log("INFO signup form creating type selector step");

        var select = UserTypeSelector({ 
          studentReg:   this.onStudentRegistration,
          teacherReg:   this.onTeacherRegistration,
          basicData:    basicData,
          anonymous:    anonymous
        });

        form = [ select ];
      }

      var sideInfo;

      if (studentData) {

        // StudentRegistrationCompleteSideInfo contains a login form
        // If the student is already logged in because of the SSO path, 
        // don't show this form or anything else in the side info section.
        if (anonymous) {
          sideInfo = StudentRegistrationCompleteSideInfo({});
        }

      } else if (!basicData) {
        sideInfo = SideInfo({});

      } else if (basicData.type == 'student') {
        sideInfo = StudentFormSideInfo({});

      } else {
        sideInfo = SideInfo({});

      }
      
      return div({}, 
        div({
          className: 'modal-title'
        }, anonymous ? 'Sign Up' : 'Finish Signing Up'), 
        div({
          className: 'step'
        }, "Step " + (this.getStepNumber()) + " of 3"), 
        div({
          className: 'signup-form'
        }, 
        form),
        div({ className: 'side-info' }, sideInfo ) );

    }
  });
};

module.exports = Signup


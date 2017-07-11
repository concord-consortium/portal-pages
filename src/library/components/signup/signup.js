var div;

div = React.DOM.div;

var BasicDataFormClass = require("./basic_data_form").reactClass;
var SideInfoClass = require("./sideinfo").reactClass;
var StudentFormClass = require("./student_form").reactClass;
var StudentFormSideInfoClass = require("./student_form_sideinfo").reactClass;
var TeacherFormClass = require("./teacher_form").reactClass;
var StudentRegistrationCompleteClass = require("./student_registration_complete").reactClass;
var StudentRegistrationCompleteSideInfoClass = require("./student_registration_complete_sideinfo").reactClass;
var TeacherRegistrationCompleteClass = require("./teacher_registration_complete").reactClass;

var reactClass = function() {

  // console.log("INFO creating signup");

  var BasicDataForm, SideInfo, StudentForm, StudentFormSideInfo, StudentRegistrationComplete, StudentRegistrationCompleteSideInfo, TeacherForm, TeacherRegistrationComplete;
  BasicDataForm = React.createFactory(BasicDataFormClass());
  SideInfo = React.createFactory(SideInfoClass());
  StudentForm = React.createFactory(StudentFormClass());
  StudentFormSideInfo = React.createFactory(StudentFormSideInfoClass());
  TeacherForm = React.createFactory(TeacherFormClass());
  StudentRegistrationComplete = React.createFactory(StudentRegistrationCompleteClass());
  StudentRegistrationCompleteSideInfo = React.createFactory(StudentRegistrationCompleteSideInfoClass());
  TeacherRegistrationComplete = React.createFactory(TeacherRegistrationCompleteClass());
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
      var anonymous, basicData, ref, ref1, signupGoogle, signupText, studentData, teacherData;
      ref = this.props, signupText = ref.signupText, oauthProviders = ref.oauthProviders, anonymous = ref.anonymous;
      ref1 = this.state, basicData = ref1.basicData, studentData = ref1.studentData, teacherData = ref1.teacherData;
      return div({}, div({
        className: 'title'
      }, anonymous ? 'Sign Up' : 'Finish Signing Up'), div({
        className: 'step'
      }, "Step " + (this.getStepNumber()) + " of 3"), div({
        className: 'signup-form'
      }, studentData ? StudentRegistrationComplete({
        anonymous: anonymous,
        data: studentData
      }) : teacherData ? TeacherRegistrationComplete({
        anonymous: anonymous
      }) : !basicData ? BasicDataForm({
        anonymous: anonymous,
        signupText: signupText,
        oauthProviders: oauthProviders,
        onSubmit: this.onBasicDataSubmit
      }) : basicData.type === 'student' ? StudentForm({
        basicData: basicData,
        onRegistration: this.onStudentRegistration
      }) : basicData.type === 'teacher' ? TeacherForm({
        anonymous: anonymous,
        basicData: basicData,
        onRegistration: this.onTeacherRegistration
      }) : void 0), div({
        className: 'side-info'
      }, studentData ? anonymous ? StudentRegistrationCompleteSideInfo({}) : void 0 : !basicData ? SideInfo({}) : basicData.type === 'student' ? StudentFormSideInfo({}) : SideInfo({})));
    }
  });
};

renderSignupForm = function(selectorOrElement, properties) {
  var Signup;
  if (properties == null) {
    properties = {};
  }
  Signup = React.createFactory( reactClass() );

  return ReactDOM.render(Signup(properties), jQuery(selectorOrElement)[0]);
};

module.exports.reactClass       = reactClass
module.exports.renderSignupForm = renderSignupForm


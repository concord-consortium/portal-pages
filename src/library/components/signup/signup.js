var div;

div = React.DOM.div;
footer = React.DOM.footer;
h2 = React.DOM.h2;
p = React.DOM.p;
strong = React.DOM.strong;

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
        siteName: (Portal && Portal.siteName) || 'Portal',
        signupText: "Register!",
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

      // console.log("INFO getStepNumber", this.props, basicData);

      if (!this.props.omniauth && !basicData) {
        return 1;
      }
      if (this.props.omniauth || (basicData && !studentData && !teacherData)) {
        return 2;
      }
      return 3;
    },

    render: function() {

      console.log("INFO rendering signup", this.props);

      var anonymous, basicData, ref, ref1, signupText, studentData, teacherData;
      ref = this.props, signupText = ref.signupText, oauthProviders = ref.oauthProviders, anonymous = ref.anonymous;
      ref1 = this.state, basicData = ref1.basicData, studentData = ref1.studentData, teacherData = ref1.teacherData;

      var form;

      //
      // For omniauth final step, simply redirect to omniauth_origin
      //
      if((studentData || teacherData) && this.props.omniauth) {
        console.log("INFO omniauth final step, redirect.", this.props);
        var data = this.state.studentData ? this.state.studentData : this.state.teacherData;
        window.location.href = data.omniauth_origin;
        return null;
      }

      if (studentData) {

        //
        // Display completion step
        //
        form = StudentRegistrationComplete({
          anonymous: anonymous,
          data: studentData
        });

      } else if (teacherData) {

        //
        // Display completion step
        //
        form = TeacherRegistrationComplete({
          anonymous: anonymous
        });

      } else if (!basicData && !this.props.omniauth) {

        // console.log("INFO signup form creating basic data selector step");

        form = [
          BasicDataForm({
            anonymous: anonymous,
            signupText: signupText,
            oauthProviders: oauthProviders,
            onSubmit: this.onBasicDataSubmit
          })
        ];

      } else {

        // console.log("INFO signup form creating type selector step");

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

      var step = this.getStepNumber();
      var stepText = "Step " + step;

      // On the first step we don't know if the user is going to log in with a SSO provider
      // So we can't tell the user if there are going to be 2 steps or 3 steps.
      if(step > 1) {
        if(this.props.omniauth) {
          stepText += " of 2";
        } else {
          stepText += " of 3";
        }
      }

      return div({},
        h2({},
          anonymous ?
            [strong({},'Register'),  ' for the ' + this.props.siteName] :
            [strong({},'Finish'), ' Signing Up']
        ),
        div({className: 'signup-form'}, form),
        footer({className: "reg-footer"},
          p({},
            strong({}, 'Why sign up?'),
            " It's free and you get access to several key features, like creating classes for your students, assigning activities, saving work, tracking student progress, and more!"
          )
        )
      );

    }
  });
};

module.exports = Signup

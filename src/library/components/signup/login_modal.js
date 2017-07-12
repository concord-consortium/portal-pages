var div, li, p, ref, ul;

ref = React.DOM, div = ref.div, p = ref.p, ul = ref.ul, li = ref.li;

var TextInputClass  = require('./text_input');
var button          = React.DOM.button;
var strong          = React.DOM.strong;
var span            = React.DOM.span;

var LoginModal = function() {

  // console.log("INFO Creating LoginModal class");

  var TextInput     = React.createFactory(TextInputClass());
  var FormsyForm    = React.createFactory(Formsy.Form);

  return React.createClass({
    displayName: 'LoginModal',
    render: function() {
      return FormsyForm({},

        div({}, 
          div({ className: 'modal-title' }, 'Log In' ),
        ),

        div({}, "Username"),
        TextInput({
          name: 'login',
          placeholder: 'login',
          required: true }),

        div({}, "Password"),
        TextInput({
          name: 'password',
          placeholder: 'Password',
          type: 'password',
          required: true }),

        button({
          className: 'submit-btn',
          type: 'submit',
        }, "Login" ),

        div( {style: { width: "100%", height: "11px", borderBottom: "1px solid black", marginBottom: "20px", marginTop: "10px", textAlign: "center"}},

          span( {style: { backgroundColor: "#FFFFFF", padding: "0 10px"}}, "or" )
        ),

        button({
          className: 'submit-btn',
          type: 'submit',
        }, "Login with Google" )

      );
    }
  });
};

module.exports = LoginModal;


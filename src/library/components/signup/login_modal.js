var div, li, p, ref, ul;

ref = React.DOM, div = ref.div, p = ref.p, ul = ref.ul, li = ref.li;

var TextInputClass  = require('./text_input');
var button          = React.DOM.button;

var LoginModal = function() {

  // console.log("INFO Creating LoginModal class");

  var TextInput     = React.createFactory(TextInputClass());
  var FormsyForm    = React.createFactory(Formsy.Form);

  return React.createClass({
    displayName: 'LoginModal',
    render: function() {
      return FormsyForm({},

        TextInput({
          name: 'login',
          placeholder: 'login',
          required: true }),

        TextInput({
          name: 'password',
          placeholder: 'Password',
          type: 'password',
          required: true }),

        button({
          className: 'submit-btn',
          type: 'submit',
        }, "Login" )
      );
    }
  });
};

module.exports = LoginModal;


var Component = require('../helpers/component');

var fadeIn = require("../helpers/fade-in");

var div = React.DOM.div;
var button = React.DOM.button;
var a = React.DOM.a;

var UserAuth = Component({
  getInitialState: function () {
    return {
      loggedIn: Portal.currentUser.isLoggedIn,
      opacity: 0,
      userId: 0
    };
  },

  componentDidMount: function () {

    if (this.state.loggedIn) {
      var self = this;
      jQuery.ajax({
        url: '/auth/user',  // TODO: replace with Portal.API_V1 constant when available
        dataType: 'json'
      }).done(function (data) {
        self.setState({userId: data.id});
        fadeIn(this, 1000);
      }.bind(this));
    }
    else {
      fadeIn(this, 1000);
    }
  },

  handleLogginButton: function () {
    Portal.showModal("#log-in");
  },

  handleRegisterButton: function () {
    Portal.openSignupModal();
  },

  renderLoggedIn: function () {
    var prefsUrl = this.state.userId ? "/users/" + this.state.userId + "/preferences" : "#";
    return div({},
      div({}, "Welcome " + Portal.currentUser.firstName + " " + Portal.currentUser.lastName),
      div({},
        a({href: "/help", target: "_blank"}, "Help"),
        " | ",
        a({href: prefsUrl}, "My Preferences"),
        " | ",
        a({href: "/users/sign_out"}, "Logout")
      )
    );
  },

  renderLoggedOut: function () {
    return div({style: {opacity: this.state.opacity}},
      button({className: "portal-pages-primary-button", onClick: this.handleLogginButton}, "Log In"),
      button({className: "portal-pages-secondary-button", onClick: this.handleRegisterButton}, "Register")
    );
  },

  render: function () {
    return this.state.loggedIn ? this.renderLoggedIn() : this.renderLoggedOut();
  }
});

module.exports = UserAuth;
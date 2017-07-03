var Component = require('../helpers/component');

var fadeIn = require("../helpers/fade-in");

var a = React.DOM.a;
var button = React.DOM.button;
var div = React.DOM.div;
var i = React.DOM.i;
var li = React.DOM.li;
var nav = React.DOM.nav;
var span = React.DOM.span;
var ul = React.DOM.ul;

var PageHeader = Component({

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

  handleLogginButton: function (e) {
    e.preventDefault();
    Portal.showModal("#login-form");
  },

  handleRegisterButton: function (e) {
    e.preventDefault();
    Portal.openSignupModal();
  },

  renderLoggedIn: function () {
    var prefsUrl = this.state.userId ? "/users/" + this.state.userId + "/preferences" : "#";
    return div({},
      div({className: "portal-pages-umbrella"},
        div({className: "portal-pages-umbrella-contain cols"},
          div({className: "portal-pages-concord-link col-12"},
            a({href: "https://concord.org/", className: "portal-pages-concord-link__item"},
              "Learn about Concord Consortium at concord.org ",
              i({className: "icon-arrow-diagonal"}, "")
            )
          )
        )
      ),
      nav({className: "concord-navigation cols no-collapse"},
        div({className: "logo-contain col-3"},
          a({href: "/"},
            div({className: "concord-logo"},
              "Home"
            )
          )
        ),
        div({className: "portal-pages-main-nav col-9"},
          ul({className: "portal-pages-main-nav-contain"},
            li({className: "portal-pages-main-nav-item"},
              a({href: "/collections", className: "portal-pages-main-nav-item__link"},
                "Collections"
              )
            ),
            li({className: "portal-pages-main-nav-item"},
              a({href: "/about", className: "portal-pages-main-nav-item__link"},
                "About the Learn Portal"
              )
            ),
            li({className: "portal-pages-main-nav-item"},
              a({href: "/recent_activity", className: "portal-pages-main-nav-item__link button register"},
                i({clasName: 'icon-home'}),
                " My Classes"
              )
            ),
            li({className: "portal-pages-main-nav-item"},
              a({href: "/logout", className: "portal-pages-main-nav-item__link button log-in"},
                i({className: 'icon-login'}),
                " Log Out"
              )
            )
          )
        )
      )
    );
  },

  renderLoggedOut: function () {
    return div({},
      div({className: "portal-pages-umbrella"},
        div({className: "portal-pages-umbrella-contain cols"},
          div({className: "portal-pages-concord-link col-12"},
            a({href: "https://concord.org/", className: "portal-pages-concord-link__item"},
              "Learn about Concord Consortium at concord.org ",
              i({className: "icon-arrow-diagonal"}, "")
            )
          )
        )
      ),
      nav({className: "concord-navigation cols no-collapse"},
        div({className: "logo-contain col-3"},
          a({href: "/"},
            div({className: "concord-logo"},
              "Home"
            )
          )
        ),
        div({className: "portal-pages-main-nav col-9"},
          ul({className: "portal-pages-main-nav-contain"},
            li({className: "portal-pages-main-nav-item"},
              a({href: "/collections", className: "portal-pages-main-nav-item__link"},
                "Collections"
              )
            ),
            li({className: "portal-pages-main-nav-item"},
              a({href: "/about", className: "portal-pages-main-nav-item__link"},
                "About the Learn Portal"
              )
            ),
            li({className: "portal-pages-main-nav-item"},
              a({href: "/signup", className: "portal-pages-main-nav-item__link button register", onClick: this.handleRegisterButton},
                "Register"
              )
            ),
            li({className: "portal-pages-main-nav-item"},
              a({href: "/login", className: "portal-pages-main-nav-item__link button log-in", onClick: this.handleLogginButton},
                i({className: 'icon-login'}),
                " Log In"
              )
            )
          )
        )
      )
    );
  },

  render: function () {
    return this.state.loggedIn ? this.renderLoggedIn() : this.renderLoggedOut();
  }

});

module.exports = PageHeader;

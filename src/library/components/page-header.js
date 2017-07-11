var Component = require('../helpers/component');

var fadeIn = require("../helpers/fade-in");
// var signup = require("./signup/signup_functions");

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
      userId: 0,
      oauthProviders: this.props.oauthProviders
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

  handleLoginButton: function (e) {
    e.preventDefault();
    console.log("INFO calling renderLoginModal()");
    PortalPages.renderLoginModal();
  },

  handleRegisterButton: function (e) {
    e.preventDefault();
    PortalPages.renderSignupModal(
      { oauthProviders: this.props.oauthProviders },
      "signup-default-modal"
    );
  },

  renderLoggedIn: function () {
    var prefsUrl = this.state.userId ? "/users/" + this.state.userId + "/preferences" : "#";
    return div({},
      div({className: "portal-pages-umbrella"},
        div({className: "portal-pages-umbrella-contain cols"},
          div({className: "portal-pages-concord-link col-12"},
            a({href: "https://concord.org/", className: "portal-pages-concord-link__item"},
              "Learn about the Concord Consortium ",
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
            li({className: "portal-pages-main-nav-item" + (this.props.isCollections ? " current-menu-item" : "")},
              a({href: "/collections", className: "portal-pages-main-nav-item__link"},
                "Collections"
              )
            ),
            li({className: "portal-pages-main-nav-item" + (this.props.isAbout ? " current-menu-item" : "")},
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
          ),
          div({className: "mobile-nav-contain"},
            div({className: "mobile-nav-btn"},
              span({className: "opener"}, "Menu"),
              span({className: "closer"}, "Close"),
              div({className: "mobile-nav-icon"},
                span(),
                span(),
                span(),
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
              "Learn about the Concord Consortium ",
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
            li({className: "portal-pages-main-nav-item" + (this.props.isCollections ? " current-menu-item" : "")},
              a({href: "/collections", className: "portal-pages-main-nav-item__link"},
                "Collections"
              )
            ),
            li({className: "portal-pages-main-nav-item" + (this.props.isAbout ? " current-menu-item" : "")},
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
              a({href: "/login", className: "portal-pages-main-nav-item__link button log-in", onClick: this.handleLoginButton},
                i({className: 'icon-login'}),
                " Log In"
              )
            )
          ),
          div({className: "mobile-nav-contain"},
            div({className: "mobile-nav-btn"},
              span({className: "opener"}, "Menu"),
              span({className: "closer"}, "Close"),
              div({className: "mobile-nav-icon"},
                span(),
                span(),
                span(),
              )
            )
          )
        )
      )
    );
  },

  render: function () {
    // console.log("INFO state", this.state);
    return this.state.loggedIn ? this.renderLoggedIn() : this.renderLoggedOut();
  }

});

module.exports = PageHeader;

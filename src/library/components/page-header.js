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
      windowWidth: window.innerWidth,
      nav_menu_collapsed: true,
      loggedIn: Portal.currentUser.isLoggedIn,
      opacity: 0,
      userId: 0,
      oauthProviders: this.props.oauthProviders
    };
  },

  componentDidMount: function () {
    window.addEventListener('resize', this.handleResize.bind(this));
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

  handleResize: function (e) {
    this.setState({windowWidth: window.innerWidth});
  },

  handleLoginButton: function (e) {
    e.preventDefault();
    console.log("INFO calling renderLoginModal()");
    PortalPages.renderLoginModal(
      { oauthProviders: this.props.oauthProviders} );
  },

  handleRegisterButton: function (e) {
    e.preventDefault();
    PortalPages.renderSignupModal(
      { oauthProviders: this.props.oauthProviders },
      "signup-default-modal"
    );
  },

  handleNavMenuToggle: function (e) {
    var collapsed = !this.state.nav_menu_collapsed;
    this.setState({nav_menu_collapsed: collapsed});
    if (collapsed) {
      jQuery('body').attr('data-mobile-nav', 'closed');
    } else {
      jQuery('body').attr('data-mobile-nav', 'open');
    }
  },

  renderNavLinks: function (e) {
    var login_button_path = '/login';
    var login_button_text = 'Log In';
    if (this.state.loggedIn) {
      login_button_path = '/logout';
      login_button_text = 'Log Out';
    }

    return ul({className: "portal-pages-main-nav-contain"},
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
        a({href: login_button_path, className: "portal-pages-main-nav-item__link button log-in", onClick: this.handleLoginButton},
          i({className: 'icon-login'}),
          login_button_text
        )
      )
    );
  },

  renderHeader: function () {
    var nav_links = '';
    if (this.state.windowWidth > 950 || !this.state.nav_menu_collapsed) {
      nav_links = this.renderNavLinks();
    }
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
          nav_links,
          div({className: "mobile-nav-contain"},
            div({className: "mobile-nav-btn"},
              span({className: "opener"}, "Menu"),
              span({className: "closer"}, "Close"),
              div({className: "mobile-nav-icon", onClick: this.handleNavMenuToggle},
                span(),
                span(),
                span()
              )
            )
          )
        )
      )
    );
  },

  render: function () {
    return this.renderHeader();
  }

});

module.exports = PageHeader;

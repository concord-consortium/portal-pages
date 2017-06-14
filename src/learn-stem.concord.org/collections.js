var div = React.DOM.div;
var button = React.DOM.button;
var a = React.DOM.a;
var svg = React.DOM.svg;
var circle = React.DOM.circle;
var text = React.DOM.text;
var input = React.DOM.input;
var span = React.DOM.span;
var form = React.DOM.form;
var pre = React.DOM.pre;
var img = React.DOM.img;

var fadeIn = function (component, duration) {
  var interval = 10,
      increment = interval / duration,
      animateOpacity = function () {
        var opacity = Math.min(component.state.opacity + increment, 1);
        component.setState({opacity: opacity});
        if (opacity === 1) {
          clearInterval(animation);
        }
      },
      animation = setInterval(animateOpacity, interval);
};

var sortByName = function (a, b) {
  var aName = a.name.toUpperCase();
  var bName = b.name.toUpperCase();
  return ((aName > bName) - (bName > aName));
};

/*** React Functions ***/

var Component = function (options) {
  return React.createFactory(React.createClass(options));
};

var UserAuth = Component({
  getInitialState: function () {
    return {
      loggedIn: Portal.currentUser.isLoggedIn,
      opacity: 0,
      userId: 0
    };
  },

  componentDidMount: function () {
    fadeIn(this, 1000);

    if (this.state.loggedIn) {
      var self = this;
      jQuery.ajax({
        url: '/auth/user',
        dataType: 'json'
      }).done(function (data) {
        self.setState({userId: data.id});
      });
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
      button({className: "stem-auth-login-button", onClick: this.handleLogginButton}, "Log In"),
      button({className: "stem-auth-register-button", onClick: this.handleRegisterButton}, "Register")
    );
  },

  render: function () {
    return this.state.loggedIn ? this.renderLoggedIn() : this.renderLoggedOut();
  }
});

var CollectionCards = Component({
  getInitialState: function () {
    return {
      opacity: 0,
      collections: []
    };
  },

  componentDidMount: function () {
    jQuery.ajax({
      url: "/api/v1/projects",
      dataType: "json"
    }).done(function (data) {
      var collections = data.reduce(function (collections, collection) {
        if (collection.public && collection.landing_page_slug) {
          collections.push(collection);
        }
        return collections;
      }, []);
      collections.sort(sortByName);
      this.setState({collections: collections});
      fadeIn(this, 1000);
    }.bind(this));
  },

  render: function () {
    if (this.state.collections.length === 0) {
      return null;
    }
    return div({style: {opacity: this.state.opacity}},
      this.state.collections.map(function (collection) {
        return div({key: collection.landing_page_slug, className: "stem-collections-card"},
          a({href: "/" + collection.landing_page_slug},
            img({alt: collection.name, src: collection.project_card_image_url}),
            div({className: "stem-collections-card-name"}, collection.name),
            div({className: "stem-collections-card-description"}, collection.project_card_description)
          )
        );
      })
    );
  }
});

ReactDOM.render(UserAuth({}), document.getElementById('stem-nav-auth'));
ReactDOM.render(CollectionCards({}), document.getElementById('stem-collections-cards'));
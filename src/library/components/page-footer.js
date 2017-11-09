var Component = require('../helpers/component');

var fadeIn = require("../helpers/fade-in");

var a = React.DOM.a;
var br = React.DOM.br;
var div = React.DOM.div;
var p = React.DOM.p;
var script = React.DOM.script;
var span = React.DOM.span;

var PageFooter = Component({

  getInitialState: function () {
    return {
      loggedIn: Portal.currentUser.isLoggedIn,
      opacity: 0,
      userId: 0
    };
  },

  render: function () {
    return div({id: 'footer'},
      div({className: 'footer-inner'},
        p({},
          'Copyright ',
          span({className: 'copyright'},
            '©'
          ),
          '2017 ',
          a({href: "https://concord.org", id: "footer_cc_link"},
            'Concord Consortium'
          ),
          '. All rights reserved.',
          br({}),
          a({href: "https://concord.org/privacy-policy", id: "privacy-policy-link", target: "_blank"},
            'Privacy Policy'
          ),
          ' · Questions/Feedback: ',
          a({href: "mailto:help@concord.org?subject=STEM%20Resource%20Finder%20question"},
            'Send us an email'
          ),
          br({}),
          'Version: unknown'
        )
      )
    );
  }
});

module.exports = PageFooter;

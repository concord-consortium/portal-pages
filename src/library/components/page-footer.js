var Component = require('../helpers/component');

var fadeIn = require("../helpers/fade-in");

var a = React.DOM.a;
var button = React.DOM.button;
var div = React.DOM.div;
var form = React.DOM.form;
var i = React.DOM.i;
var input = React.DOM.input;
var li = React.DOM.li;
var nav = React.DOM.nav;
var span = React.DOM.span;
var ul = React.DOM.ul;

var PageFooter = Component({

  getInitialState: function () {
    return {
      loggedIn: Portal.currentUser.isLoggedIn,
      opacity: 0,
      userId: 0
    };
  },

  render: function () {
    return div({className: 'page-footer-inner'},
      div({className: "concord-footer-contain cols"},
        div({className: "footer-sitemap"},
          ul({className: "footer-sitemap-contain col-2"},
            div({className: "footer-link__heading"}, "About Us"),
            li({className: "footer-link__item"},
              a({href: "https://concord.org/about/history", title: "The History of the Concord Consortium"}, "History")
            ),
            li({className: "footer-link__item"},
              a({href: "https://concord.org/about/directors", title: "The Concord Consortium's Board of Directors"}, "Board")
            ),
            li({className: "footer-link__item"},
              a({href: "https://concord.org/about/our-partners", title: "The Concord Consortium's Partners and Funders"}, "Partnerships")
            ),
            li({className: "footer-link__item"},
              a({href: "https://concord.org/about/staff", title: "The Concord Consortium's Staff"}, "Staff")
            ),
            li({className: "footer-link__item"},
              a({href: "https://concord.org/about/newsletter", title: "The @Concord Newsletter"}, "Newsletter")
            ),
            li({className: "footer-link__item"},
              a({href: "https://concord.org/about/careers", title: "Job Openings at the Concord Consortium"}, "Careers")
            ),
            li({className: "footer-link__item"},
              a({href: "https://blog.concord.org/", title: "The Concord Consortium's Blog"}, "Blog")
            ),
            li({className: "footer-link__item"},
              a({href: "https://concord.org/about/contact", title: "How to Contact the Concord Consortium"}, "Contact")
            )
          ),
          ul({className: "footer-sitemap-contain col-2"},
            div({className: "footer-link__heading"}, "Our Work"),
            li({className: "footer-link__item"},
              a({href: "https://concord.org/our-work/focus-areas", title: "Focus Areas within Educational Technology"}, "Focus Areas")
            ),
            li({className: "footer-link__item"},
              a({href: "https://concord.org/our-work/research-projects", title: "Educational Teachnology Research Projects"}, "Research Projects")
            ),
            li({className: "footer-link__item"},
              a({href: "https://concord.org/our-work/publications", title: "Educational Technology Publications"}, "Publications")
            )
          ),
          ul({className: "footer-sitemap-contain col-2"},
            div({className: "footer-link__heading"}, "Resources"),
            li({className: "footer-link__item"},
              a({href: "https://codap.concord.org/", title: "Common Online Data Analysis Platform (CODAP)"}, "CODAP")
            ),
            li({className: "footer-link__item"},
              a({href: "https://energy.concord.org/energy2d", title: "Energy2D"}, "Energy2D")
            ),
            li({className: "footer-link__item"},
              a({href: "https://energy.concord.org/energysd", title: "Energy3D"}, "Energy3D")
            ),
            li({className: "footer-link__item"},
              a({href: "https://fathom.concord.org/", title: "Fathom Dynamic Data Software"}, "Fathom")
            ),
            li({className: "footer-link__item"},
              a({href: "http://mw.concord.org/", title: "Molecular Workbench"}, "Molecular Workbench")
            ),
            li({className: "footer-link__item"},
              a({href: "http://mw.concord.org/nextgen", title: "Next-Gen Molecular Workbench"}, "Next-Gen Molecular Workbench")
            )
          ),
          ul({className: "footer-sitemap-contain col-2"},
            div({className: "footer-link__heading"}, "Legal"),
            li({className: "footer-link__item"},
              a({href: "https://concord.org/privacy-policy", title: "Privacy Policy"}, "Privacy Policy")
            ),
            li({className: "footer-link__item"},
              a({href: "https://concord.org/licensing", title: "Licensing for the Concord Consortium's Resources"}, "Licensing")
            ),
            li({className: "footer-link__item"},
              a({href: "https://concord.org/copyright", title: "Concord Consortium Copyright"}, "Copyright")
            ),
            li({className: "footer-link__item"},
              a({href: "https://concord.org/logo-usage", title: "The Concord Consortium's Logo"}, "Logo Usage")
            )
          )
        ),
        div({className: "newsletter-social-contain col-4"},
          div({className: "footer-link__heading mobile-join-us"}, "Join Us!"),
          div({id: "mc_embed_signup", className: "footer-newsletter"},
            a({href: "https://concord.org/subscribe", className: "email footer-newsletter__link"}, "Subscribe to Our eNews")
          ),
          div({className: "footer-social-links"},
            a({href: "https://www.facebook.com/concordconsortium", title: "Like the Concord Consortium on Facebook"},
              div({className: "social-link__facebook"})
            ),
            a({href: "https://twitter.com/ConcordDotOrg", title: "Follow the Concord Consortium on Twitter"},
              div({className: "social-link__twitter"})
            ),
            a({href: "https://plus.google.com/+ConcordOrg", title: "Follow the Concord Consortium on Google+"},
              div({className: "social-link__google-plus"})
            )
          )
        )
      ),
      div({className: "sub-footer cols"},
        div({className: "sub-footer__copyright col-6"}, "© 2017 The Concord Consortium. All Rights Reserved")
      )
    );
  }
});

module.exports = PageFooter;

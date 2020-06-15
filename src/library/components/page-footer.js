import ReactDOM from 'react-dom'

var Component = require('../helpers/component')

var a = ReactDOM.a
var br = ReactDOM.br
var div = ReactDOM.div
var p = ReactDOM.p
var span = ReactDOM.span

var PageFooter = Component({

  getInitialState: function () {
    return {
      loggedIn: Portal.currentUser.isLoggedIn,
      opacity: 0,
      userId: 0
    }
  },

  render: function () {
    return div({ id: 'footer' },
      div({ className: 'footer-inner' },
        p({},
          'Copyright ',
          span({ className: 'copyright' },
            '©'
          ),
          '2017 ',
          a({ href: 'https://concord.org', id: 'footer_cc_link' },
            'Concord Consortium'
          ),
          '. All rights reserved.',
          br({}),
          a({ href: 'https://concord.org/privacy-policy', id: 'privacy-policy-link', target: '_blank' },
            'Privacy Policy'
          ),
          ' · Questions/Feedback: ',
          a({ href: 'mailto:help@concord.org?subject=STEM%20Resource%20Finder%20question' },
            'Send us an email'
          ),
          br({}),
          'Version: unknown'
        )
      )
    )
  }
})

module.exports = PageFooter

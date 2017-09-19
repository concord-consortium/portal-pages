var Component = require('../helpers/component');
var CollectionCards = require("./collection-cards");

var div = React.DOM.div;
var a = React.DOM.a;
var h1 = React.DOM.h1;
var p = React.DOM.p;
var span = React.DOM.span;
var section = React.DOM.section;

var CollectionsPage = Component({
  render: function () {
    return div({},
      div({ className: "cols" },
        div({ className: "portal-pages-collections-page-header col-12"},
          h1({}, "Collections"),
          p({ className: "portal-pages-collections-page-header-info"},
          'Many of our resources are part of collections that are created by our various research projects. Each collection has specific learning goals within the context of a larger subject area.'
          ),
          p({},
            a({ className: "special-link",
                href: "https://concord.org/projects/",
                target: "_blank"},
              "View ",
              span({ className: "complete"}, "all Concord Consortium"),
              " projects ",
              span({ className: "complete"}, "on concord.org")
            )
          )
        )
      ),
      div({ className: "portal-pages-collections-page-diagonal-spacer-2"}),
      section({ className: "portal-pages-collections-page-list skew top-only.mediumgray"},
        div({ className: "portal-pages-collections-page-list-inner cols skew-cancel"},
          CollectionCards({fadeIn: 1000})
        )
      )
    );
  }
});

module.exports = CollectionsPage;

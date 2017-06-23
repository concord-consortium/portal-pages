var Component = require('../helpers/component');
var RelatedResourceResult = require("./related-resource-result");
var pluralize = require("../helpers/pluralize");

var div = React.DOM.div;
var img = React.DOM.img;
var h1 = React.DOM.h1;
var h2 = React.DOM.h2;
var hr = React.DOM.hr;
var a = React.DOM.a;
var p = React.DOM.p;
var span = React.DOM.span;

var ResourceLightbox = Component({
  componentWillMount: function () {
    var titleSuffix = document.title.split("|")[1] || "";
    this.savedTitle = document.title;
    document.title = titleSuffix ? this.props.resource.name + " | " + titleSuffix : this.props.resource.name;
  },

  componentWillUnmount: function () {
    document.title = this.savedTitle;
  },

  handleClose: function () {
    this.props.toggleLightbox();
  },

  renderRequirements: function () {
    var runsInBrowser = true; // TODO: get from search results when they become available
    if (runsInBrowser) {
      return div({className: "stem-resource-lightbox-requirements"},
        "This activity runs entirely in a Web browser. Preferred browsers are: ",
        a({href: "http://www.google.com/chrome/", title:"Get Google\'s Chrome Web Browser"}, "Google Chrome"),
        " (versions 30 and above), ",
        a({href: "http://www.apple.com/safari/", title:"Get Apple\'s Safari Web Browser"}, "Safari"),
        " (versions 7 and above), ",
        a({href: "http://www.firefox.com/", title:"Get the Firefox Web Browser"}, "Firefox"),
        " (version 30 and above), ",
        a({href: "http://www.microsoft.com/ie/", title:"Get Microsoft\'s Internet Explorer Web Browser"}, "Internet Explorer"),
        " (version 10 or higher), and ",
        a({href: "https://www.microsoft.com/en-us/windows/microsoft-edge#f7x5cdShtkSvrROV.97", title:"Get Microsoft\'s Edge Web Browser"}, "Microsoft Edge"),
        "."
      );
    }
    return div({className: "stem-resource-lightbox-requirements"},
      "This resource requires Java. You can download Java for free from ",
      a({href: "http://java.com/", title: "Get Java"}, "java.com"),
      ".",
      p({},
        "Using OS X 10.9 or newer? You'll also need to install our launcher app. ",
        a({href:"http://static.concord.org/installers/cc_launcher_installer.dmg", title: "Download the CCLauncher installer"}, "Download the launcher installer"),
        ", open the .dmg file and drag the CCLauncher app to your Applications folder, then return to this page and launch the resource."
      )
    );
  },

  renderLearnMore: function () {
    if (this.props.resource.projects.length === 0) {
      return null;
    }
    var projects = this.props.resource.projects;
    var numProjects = projects.length;
    return div({},
      hr({}),
      h2({}, "Learn More"),
      div({className: "stem-resource-lightbox-learn-more"},
        "This resource is part of the Concord Consortium's ",
        projects.map(function (project, index) {
          return span({},
            project.landing_page_url ? a({href: project.landing_page_url}, project.name) : project.name,
            index !== numProjects - 1 ? " and " : ""
          );
        }),
        pluralize(numProjects, " project"),
        "."
      )
    );
  },

  renderRelatedContent: function () {
    if (this.props.resource.related_materials.length === 0) {
      return null;
    }
    return div({className: "stem-resource-lightbox-related-content"},
      h2({}, "You may also like:"),
      this.props.resource.related_materials.map(function (resource, i) {
        return RelatedResourceResult({key: i, resource: resource});
      }.bind(this))
    );
  },

  // TODO: add links
  renderSharing: function () {
    return div({className: "stem-resource-lightbox-modal-sharing"},
      div({}, "F"),
      div({}, "T"),
      div({}, "E"),
      div({}, "+")
    );
  },

  render404: function () {
    return div({className: "stem-resource-lightbox-modal-content"},
      div({className: "stem-resource-lightbox-not-found"}, "Sorry, the requested resource was not found."),
      div({},
        a({href: "#", onClick: this.handleClose}, "Click here"),
        " to close this lightbox and use the search box on this page to find another resource.")
    );
  },

  renderResource: function () {
    var resource = this.props.resource;
    return div({className: "stem-resource-lightbox-modal-content"},
      div({className: "stem-resource-lightbox-modal-content-top"},
        img({src: resource.icon.url}),
        h1({}, resource.name),
        div({className: "stem-resource-lightbox-description"}, resource.filteredDescription),
        div({},
          a({className: "stem-resource-lightbox-launch-button", href: resource.preview_url, target: "_blank"}, "Launch Activity"),
          Portal.currentUser.isTeacher ? a({className: "stem-resource-lightbox-assign-button", href: resource.assign_to_class_url}, "Assign Activity") : null
        ),
        hr({}),
        h2({}, "Requirements"),
        this.renderRequirements(),
        this.renderLearnMore()
      ),
      this.renderRelatedContent()
    );
  },

  render: function () {
    return div({className: "stem-resource-lightbox"},
      div({className: "stem-resource-lightbox-background", onClick: this.handleClose}),
      div({className: "stem-resource-lightbox-background-close"}, "X"),
      div({className: "stem-resource-lightbox-modal"},
        this.props.resource ? this.renderResource() : this.render404()
      ),
      this.props.resource ? this.renderSharing() : null
    );
  }
});

module.exports = ResourceLightbox;
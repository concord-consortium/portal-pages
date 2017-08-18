var Component = require('../helpers/component');
var RelatedResourceResult = require("./related-resource-result");
var pluralize = require("../helpers/pluralize");

var div = React.DOM.div;
var img = React.DOM.img;
var h1 = React.DOM.h1;
var h2 = React.DOM.h2;
var h3 = React.DOM.h3;
var hr = React.DOM.hr;
var a = React.DOM.a;
var li = React.DOM.li;
var p = React.DOM.p;
var span = React.DOM.span;
var ul = React.DOM.ul;

var ResourceLightbox = Component({
  getInitialState: function () {
    return {
      resource: this.props.resource
    };
  },

  componentWillMount: function () {
    this.savedUrl = location.toString();
    this.savedTitle = document.title;
    this.titleSuffix = document.title.split("|")[1] || "";
    this.replaceResource(this.props.resource);
  },

  componentWillUnmount: function () {
    document.title = this.savedTitle;
    try {
      history.replaceState({}, document.title, this.savedUrl);
    }
    catch (e) {}
  },

  replaceResource: function (resource) {
    document.title = this.titleSuffix ? resource.name + " | " + this.titleSuffix : resource.name;
    try {
      history.replaceState({}, document.title, resource.stem_resource_url);
    }
    catch (e) {}
    this.setState({resource: resource});
  },

  handleClose: function (e) {
    this.props.toggleLightbox(e);
  },

  renderRequirements: function () {
    var runsInBrowser = true; // TODO: get from search results when they become available
    if (runsInBrowser) {
      return div({className: "portal-pages-resource-lightbox-requirements"},
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
    return div({className: "portal-pages-resource-lightbox-requirements"},
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

  renderStandards: function () {
    var resource = this.state.resource;
    if (!resource.standard_statements || resource.standard_statements.length === 0) {
      return null;
    }
    var statements = resource.standard_statements;
    return div({className: "portal-pages-resource-lightbox-standards"},
      hr({}),
      h2({}, "Standards"),
      statements.map(function (statement) {
        return div({},
          h3({}, statement.notation),
          statement.description
        );
      })
    );
  },

  renderLearnMore: function () {
    var resource = this.state.resource;
    if (resource.projects.length === 0) {
      return null;
    }
    var projects = resource.projects;
    var numProjects = projects.length;
    return div({},
      hr({}),
      h2({}, "Learn More"),
      div({className: "portal-pages-resource-lightbox-learn-more"},
        "This resource is part of the Concord Consortium's ",
        projects.map(function (project, index) {
          return strong({},
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
    var resource = this.state.resource;
    if (resource.related_materials.length === 0) {
      return null;
    }
    return div({className: "portal-pages-resource-lightbox-related-content cols"},
      h2({}, "You may also like:"),
      resource.related_materials.map(function (resource, i) {
        if (i < 2) {
          return RelatedResourceResult({key: i, resource: resource, replaceResource: this.replaceResource});
        }
      }.bind(this))
    );
  },

  // TODO: add links
  renderSharing: function () {
    return div({className: "portal-pages-resource-lightbox-modal-sharing"},
      a({className: "share-facebook"}, "Facebook"),
      a({className: "share-twitter"}, "Twitter"),
      a({className: "share-email"}, "Email"),
      a({className: "share-more"}, "More")
    );
  },

  render404: function () {
    return div({className: "portal-pages-resource-lightbox-modal-content"},
      div({className: "portal-pages-resource-lightbox-not-found"}, "Sorry, the requested resource was not found."),
      div({},
        a({href: "#", onClick: this.handleClose}, "Click here"),
        " to close this lightbox and use the search box on this page to find another resource.")
    );
  },

  renderIcons: function () {
    var resource = this.state.resource;
    var links = resource.links;
    var printIcon = links.print_url ? a({className: 'print', href: links.print_url.url}, "print") : null;
    var copyIcon = links.external_copy ? a({className: 'copy', href: links.external_copy.url}, "copy") : null;
    var editLink = links.lara_activity_or_sequence ? links.external_lara_edit.url : links.external_edit.url;
    var editIcon = editLink ? a({className: 'edit', href: editLink}, "edit") : null;

    // TODO: gear icon?
    var settingsIcon = links.settings ? a({className: 'settings', href: links.settings}, 'settings') : null;

    if (!printIcon && !copyIcon && !editIcon) {
      return null;
    }

    return ul({},
      li({},
        printIcon
      ),
      li({},
        copyIcon
      ),
      li({},
        editIcon
      ),
      li({},
        settingsIcon
      )
    )
  },

  renderResource: function () {
    var resource = this.state.resource;
    var links = resource.links;

    return div({className: "portal-pages-resource-lightbox-modal-content"},
      div({className: "portal-pages-resource-lightbox-modal-content-top"},
        div({className: "portal-pages-resource-lightbox-modal-utility"},
          this.renderIcons()
        ),
        div({className: 'preview-image'},
          img({src: resource.icon.url.replace(/\.jpg$/, '-hr.jpg')})
        ),
        h1({}, resource.name),
        p({className: "portal-pages-resource-lightbox-description"}, resource.filteredDescription),
        div({},
          links.preview ? a({className: "portal-pages-primary-button", href: links.preview.url, target: "_blank"}, "Launch Activity") : null,
          links.assign_material ? a({className: "portal-pages-secondary-button", href: links.assign_material.url, onclick: links.assign_material.onclick}, "Assign Activity") : null,
          links.assign_collection ? a({className: "portal-pages-secondary-button", href: links.assign_collection.url, onclick: links.assign_collection.onclick}, "Add to Collection") : null,
          links.teacher_guide ? a({className: "portal-pages-secondary-button", href: links.teacher_guide.url}, "Teacher Guide") : null
        ),
        hr({}),
        h2({}, "Requirements"),
        this.renderRequirements(),
        this.renderStandards(),
        this.renderLearnMore()
      ),
      this.renderRelatedContent()
    );
  },

  render: function () {
    var resource = this.state.resource;
    return div({className: "portal-pages-resource-lightbox"},
      div({className: "portal-pages-resource-lightbox-background-close", onClick: this.handleClose}, "x"),
      div({className: "portal-pages-resource-lightbox-modal"},
        resource ? this.renderResource() : this.render404()
      ),
      resource ? this.renderSharing() : null
    );
  }
});

module.exports = ResourceLightbox;

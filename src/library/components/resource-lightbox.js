var Component = require('../helpers/component');

var div = React.DOM.div;
var img = React.DOM.img;
var h1 = React.DOM.h1;
var button = React.DOM.button;
var a = React.DOM.button;

var ResourceLightbox = Component({
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
    //this.requirements = '<p>This resource requires Java. You can download Java for free from <a href="http://java.com/" title="Get Java">java.com</a>.</p><p>Using OS X 10.9 or newer? You\'ll also need to install our launcher app. <a href="http://static.concord.org/installers/cc_launcher_installer.dmg" title="Download the CCLauncher installer">Download the launcher installer</a>, open the .dmg file and drag the CCLauncher app to your Applications folder, then return to this page and launch the resource.</p>';
  },

  render: function () {
    var resource = this.props.resource;
    return div({className: "stem-resource-lightbox"},
      div({className: "stem-resource-lightbox-background", onClick: this.handleClose}),
      div({className: "stem-resource-lightbox-background-close"}, "X"),
      div({className: "stem-resource-lightbox-modal"},
        div({className: "stem-resource-lightbox-modal-content"},
          img({src: resource.icon.url}),
          h1({}, resource.name),
          div({className: "stem-resource-lightbox-description"}, resource.filteredDescription),
          div({},
            button({className: "stem-resource-lightbox-launch-button"}, "Launch Activity"),
            button({className: "stem-resource-lightbox-assign-button"}, "Assign Activity")
          ),
          this.renderRequirements()
        )
      )
    );
  }
});

module.exports = ResourceLightbox;
var Component = require('../helpers/component');
var RelatedResourceResult = require("./related-resource-result");
var pluralize = require("../helpers/pluralize");
var portalObjectHelpers = require("../helpers/portal-object-helpers");
var StandardsHelpers = require("../helpers/standards-helpers");

var div = React.DOM.div;
var em = React.DOM.em;
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
var strong = React.DOM.strong;
var br = React.DOM.br;

var ResourceLightbox = Component({
  getInitialState: function () {
    return {
      resource: this.props.resource
    };
  },

  getDefaultProps: function () {
    return {
      savedUrl: window.location.toString(),
      savedTitle: document.title
    };
  },

  componentWillMount: function () {
    jQuery('html, body').css('overflow', 'hidden');
    jQuery('.home-page-content').addClass('blurred');

    var resource = this.props.resource;
    // If the lightbox is shown directly the resource might not have been
    // processed yet
    portalObjectHelpers.processResource(resource);

    this.titleSuffix = document.title.split("|")[1] || "";
    this.replaceResource(resource);
  },

  componentDidMount: function () {
    jQuery('.portal-pages-resource-lightbox-background, .portal-pages-resource-lightbox-container').fadeIn();
  },

  componentWillUnmount: function () {
    document.title = this.props.savedTitle;
    try {
      window.history.replaceState({}, document.title, this.props.savedUrl);
    }
    catch (e) {}
    jQuery('html, body').css('overflow', 'auto');
    jQuery('.home-page-content').removeClass('blurred');

    // FIXME: Not sure if this is going to work because the component will be removed
    jQuery('.portal-pages-resource-lightbox-background, .portal-pages-resource-lightbox-container').fadeOut();
  },

  replaceResource: function (resource) {
    if(!resource) {
        return;
    }

    document.title = this.titleSuffix ? resource.name + " | " + this.titleSuffix : resource.name;
    try {
      window.history.replaceState({}, document.title, resource.stem_resource_url);
    }
    catch (e) {}
    this.setState({resource: resource});
  },

  handlePreviewClick: function (e) {
    var resource = this.state.resource;
    _gaq.push(['_trackEvent','Resource Preview Button','Click', resource.name]);
  },

  handleAssignClick: function (e) {
    var resource = this.state.resource;
    _gaq.push(['_trackEvent','Assign to Class Button','Click', resource.name]);
  },

  handleTeacherGuideClick: function (e) {
    var resource = this.state.resource;
    _gaq.push(['_trackEvent','Teacher Guide Link','Click', resource.name]);
  },

  handleAddToCollectionClick: function (e) {
    var resource = this.state.resource;
    _gaq.push(['_trackEvent','Add to Collection Button','Click', resource.name]);
  },

  handleClose: function (e) {

    if (jQuery(e.target).is('.portal-pages-resource-lightbox') ||
        jQuery(e.target).is('.portal-pages-resource-lightbox-background-close')) {
        // only close lightbox if lightbox wrapper or X is clicked
        this.props.toggleLightbox(e);
        return;
    }

    //
    // Handle closing lightbox from "not found" view.
    //
    if( e.target.id == 'portal-pages-lightbox-close-not-found') {
        this.props.toggleLightbox(e);
        e.preventDefault();
        return;
    }
  },

  handleSocialMediaShare: function (e) {
    e.preventDefault();
    var width  = 575,
        height = 400,
        left   = (jQuery(window).width()  - width)  / 2,
        top    = (jQuery(window).height() - height) / 2,
        url    = e.target.href,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;
    window.open(url, 'social-media-share', opts);
  },

  renderIncludedActivities: function () {
    var resource = this.state.resource;
    if (resource.activities.length === 0) {
      return null;
    }
    var activities = resource.activities;
    return div({className: "portal-pages-resource-lightbox-included-activities"},
      hr({}),
      h2({}, "Included Activities"),
      div({},
        "This sequence includes the following activities: ",
        activities.map(function (activity, index) {
          return span({},
            em({},
              activity.name
            ),
            index === activities.length - 1 ? "." : "; "
          );
        })
      )
    );
  },

  renderRequirements: function () {
    var resource = this.state.resource;
    var runsInBrowser = true;
    if (resource.material_properties.indexOf('Requires download') > -1) {
      runsInBrowser = false;
    }
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

    var allStatements   = resource.standard_statements;
    var helpers         = {};
    var unhelped        = [];

    helpers.NGSS = StandardsHelpers.getStandardsHelper('NGSS');

    for(var i = 0; i < allStatements.length; i++) {
        var statement = allStatements[i];
        var helper = helpers[statement.type];

        if(helper) {
            helper.add(statement);
        } else {
            unhelped.push(statement);
        }
    }

    return div({className: "portal-pages-resource-lightbox-standards"},
      hr({}),
      h2({}, "Standards"),
      helpers.NGSS.getDiv(),
      unhelped.map(function (statement) {
        var description = statement.description;
        if(Array.isArray && Array.isArray(description)) {
          var formatted = "";
          for(var i = 0; i < description.length; i++) {
            if(description[i].endsWith(":")) {
                description[i] += " ";
            } else if(!description[i].endsWith(".")) {
                description[i] += ". ";
            }
            formatted += description[i];
          }
          description = formatted;
        }
        return div({},
          h3({}, statement.notation),
          description
        );
      })
    );
  },

  renderLicense: function () {
    var resource = this.state.resource;
    if (!resource.license_info) {
      return null;
    }

    var license = resource.license_info;

    var attribution_name = 'The Concord Consortium';
    var attribution_url = 'https://concord.org/';

    // replace Concord Consortium with proper author credit
    var license_description;
    if (!resource.credits) {
      license_description = license.description;
    } else {
      license_description = license.description.replace('the Concord Consortium', resource.credits);
    }

    // alter attribution values when all material should be attributed to a specific project or partner
    if (Portal.theme == 'ngss-assessment') {
      attribution_name = 'The Next Generation Science Assessment Project';
      attribution_url = 'http://nextgenscienceassessment.org/';
      license_description = license.description.replace('the Concord Consortium', attribution_name);
    }

    var license_attribution = '';
    // don't provide suggested attribution for public domain resources
    if (license.code !== 'CC0') {
      if (!resource.credits) {
        license_attribution = p({}, 'Suggested attribution: ' + resource.name + ' by ',
                a({href: attribution_url}, attribution_name),
                ' is licensed under ',
                a({href: license.deed}, license.code),
                '.'
              );
      } else {
        license_attribution = p({}, 'Suggested attribution: ' + resource.name + ' by ' + resource.credits,
                ' is licensed under ',
                a({href: license.deed}, license.code),
                '.'
              );
      }
    }

    return div({className: "portal-pages-resource-lightbox-license"},
      hr({}),
      h2({}, "License"),
      div({},
        img({src: license.image})
      ),
      h3({}, license.code),
      p({}, license.name),
      p({}, license_description,
        br(),
        a({href: license.deed}, license.deed),
        br(),
        a({href: license.legal}, license.legal)
      ),
      license_attribution
      // license.number
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

  //
  // TODO: add links
  //
  renderSharing: function () {

    var resource = this.state.resource;

    if(!resource.enable_sharing) {
        return null;
    }

    return div({className: "portal-pages-resource-lightbox-modal-sharing"},
      a({className: "share-facebook", href: "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href, target: '_blank', onClick: this.handleSocialMediaShare}, "Facebook"),
      a({className: "share-twitter", href: "http://twitter.com/share?text=" + resource.name + '&url=' + window.location.href, target: '_blank', onClick: this.handleSocialMediaShare}, "Twitter"),
      a({className: "share-email", href: "mailto:?subject=" + resource.name + "&body=" + encodeURIComponent(window.location.href), target: '_blank', onClick: this.handleSocialMediaShare}, "Email")
      //a({className: "share-more"}, "More")
    );
  },

  render404: function () {
    return div({className: "portal-pages-resource-lightbox-modal-content"},
      div({className: "portal-pages-resource-lightbox-not-found"}, "Sorry, the requested resource was not found."),
      div({},
        a({ id: "portal-pages-lightbox-close-not-found",
            href: "#",
            onClick: this.handleClose},
            "Click here"),
        " to close this lightbox and use the search box on this page to find another resource.")
    );
  },

  renderIcons: function () {
    var resource = this.state.resource;
    var links = resource.links;
    var printIcon = links.print_url ? a({className: 'print', href: links.print_url.url}, "print") : null;
    var copyIcon = links.external_copy ? a({className: 'copy', href: links.external_copy.url}, "copy") : null;
    var editLink = null;
    if (resource.lara_activity_or_sequence && links.external_lara_edit) {
      editLink = links.external_lara_edit.url;
    } else if (links.external_edit) {
      editLink = links.external_edit.url;
    }

    var editIcon = editLink ? a({className: 'edit', href: editLink}, "edit") : null;

    var settingsIcon = links.edit ? a({className: 'settings', href: links.edit.url}, 'settings') : null;

    if (printIcon || copyIcon || editIcon || settingsIcon) {
      return ul({},
        printIcon ? li({}, printIcon) : null,
        copyIcon ? li({}, copyIcon) : null,
        editIcon ? li({}, editIcon) : null,
        settingsIcon ? li({}, settingsIcon) : null
      );
    } else {
      return null;
    }
  },

  renderResource: function () {
    var resource = this.state.resource;
    var links = resource.links;

    // console.log("[DEBUG] resource-lightbox links.assign_material.onclick", links.assign_material.onclick);
    // console.log("[DEBUG] resource-lightbox links.assign_collection.onclick", links.assign_collection.onclick);

    return div({className: "portal-pages-resource-lightbox-modal-content"},
      div({className: "portal-pages-resource-lightbox-modal-content-top"},
        div({className: "portal-pages-resource-lightbox-modal-utility"},
          this.renderIcons()
        ),
        h1({}, resource.name),
        div({className: 'preview-image'},
          img({src: resource.icon.url})
        ),
        div({className: 'portal-pages-action-buttons'},

          links.preview ? a({className: "portal-pages-primary-button", href: links.preview.url, target: "_blank", onClick: this.handlePreviewClick}, links.preview.text) : null,

          /*jshint scripturl:true */

          links.assign_material ? a({className: "portal-pages-secondary-button", href: 'javascript:' + links.assign_material.onclick, onClick: this.handleAssignClick}, links.assign_material.text) : null,

          links.assign_collection ? a({className: "portal-pages-secondary-button", href: 'javascript:' + links.assign_collection.onclick, onClick: this.handleAddToCollectionClick}, links.assign_collection.text) : null,

          /*jshint scripturl:false */

          links.teacher_guide ? a({className: "portal-pages-secondary-button", href: links.teacher_guide.url, target: '_blank', onClick: this.handleTeacherGuideClick}, links.teacher_guide.text) : null

        ),
        p({className: "portal-pages-resource-lightbox-description",
           dangerouslySetInnerHTML: {__html: resource.longDescription}}),
        resource.has_pretest ?
            p({className: "portal-pages-resource-lightbox-description"},
                "Pre- and Post-tests available" )
            :
            null,
        this.renderIncludedActivities(),
        hr({}),
        h2({}, "Requirements"),
        this.renderRequirements(),
        this.renderStandards(),
        this.renderLicense(),
        this.renderLearnMore()
      ),
      this.renderRelatedContent()
    );
  },

  render: function () {

    var resource = this.state.resource;

    // console.log("[DEBUG] render resource", resource);

    return div({},
      div({className: "portal-pages-resource-lightbox-background"}),
      div({className: "portal-pages-resource-lightbox-container"},
        div({className: "portal-pages-resource-lightbox", onClick: this.handleClose},
          div({className: "portal-pages-resource-lightbox-background-close", onClick: this.handleClose}, "x"),
          div({className: "portal-pages-resource-lightbox-modal"},
            resource ? this.renderResource() : this.render404()
          ),
          resource ? this.renderSharing() : null
        )
      )
    );
  }
});

module.exports = ResourceLightbox;

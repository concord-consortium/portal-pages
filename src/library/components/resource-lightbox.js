import React from 'react'
import Component from '../helpers/component'
import RelatedResourceResult from './related-resource-result'
import pluralize from '../helpers/pluralize'
import portalObjectHelpers from '../helpers/portal-object-helpers'
import StandardsHelpers from '../helpers/standards-helpers'

var ResourceLightbox = Component({
  getInitialState: function () {
    return {
      resource: this.props.resource
    }
  },

  getDefaultProps: function () {
    return {
      savedUrl: window.location.toString(),
      savedTitle: document.title
    }
  },

  componentWillMount: function () {
    jQuery('html, body').css('overflow', 'hidden')
    jQuery('.home-page-content').addClass('blurred')

    const resource = this.props.resource
    // If the lightbox is shown directly the resource might not have been
    // processed yet
    portalObjectHelpers.processResource(resource)

    this.titleSuffix = document.title.split('|')[1] || ''
    this.replaceResource(resource)
  },

  componentDidMount: function () {
    jQuery('.portal-pages-resource-lightbox-background, .portal-pages-resource-lightbox-container').fadeIn()
  },

  componentWillUnmount: function () {
    document.title = this.props.savedTitle
    try {
      window.history.replaceState({}, document.title, this.props.savedUrl)
    } catch (e) {}
    jQuery('html, body').css('overflow', 'auto')
    jQuery('.home-page-content').removeClass('blurred')

    // FIXME: Not sure if this is going to work because the component will be removed
    jQuery('.portal-pages-resource-lightbox-background, .portal-pages-resource-lightbox-container').fadeOut()
  },

  replaceResource: function (resource) {
    if (!resource) {
      return
    }

    document.title = this.titleSuffix ? resource.name + ' | ' + this.titleSuffix : resource.name
    try {
      window.history.replaceState({}, document.title, resource.stem_resource_url)
    } catch (e) {}
    this.setState({resource: resource})
  },

  handlePreviewClick: function (e) {
    const resource = this.state.resource
    ga('send', 'event', 'Resource Preview Button', 'Click', resource.name)
  },

  handleAssignClick: function (e) {
    const resource = this.state.resource
    ga('send', 'event', 'Assign to Class Button', 'Click', resource.name)
  },

  handleTeacherGuideClick: function (e) {
    const resource = this.state.resource
    ga('send', 'event', 'Teacher Guide Link', 'Click', resource.name)
  },

  handleAddToCollectionClick: function (e) {
    const resource = this.state.resource
    ga('send', 'event', 'Add to Collection Button', 'Click', resource.name)
  },

  handleClose: function (e) {
    if (jQuery(e.target).is('.portal-pages-resource-lightbox') ||
        jQuery(e.target).is('.portal-pages-resource-lightbox-background-close')) {
      // only close lightbox if lightbox wrapper or X is clicked
      this.props.toggleLightbox(e)
      return
    }

    //
    // Handle closing lightbox from "not found" view.
    //
    if (e.target.id === 'portal-pages-lightbox-close-not-found') {
      this.props.toggleLightbox(e)
      e.preventDefault()
    }
  },

  handleSocialMediaShare: function (e) {
    e.preventDefault()
    const width = 575
    const height = 400
    const left = (jQuery(window).width() - width) / 2
    const top = (jQuery(window).height() - height) / 2
    const url = e.target.href
    const opts = 'status=1' +
               ',width=' + width +
               ',height=' + height +
               ',top=' + top +
               ',left=' + left
    window.open(url, 'social-media-share', opts)
    ga('send', 'event', 'Resource Lightbox ' + e.target.text + ' Button', 'Click', this.props.resource.name)
  },

  renderIncludedActivities: function () {
    const resource = this.state.resource
    if (resource.activities.length === 0) {
      return null
    }
    const activities = resource.activities

    const includedActivities = activities.map(function (activity, index) {
      return (
        <span>
          <em>
            {activity.name}
          </em>
          {index === activities.length - 1 ? '.' : '; '}
        </span>
      )
    })

    return (
      <div className="portal-pages-resource-lightbox-included-activities">
        <hr />
        <h2>Included Activities</h2>
        <div>
          This sequence includes the following activities: {includedActivities}
        </div>
      </div>
    )
  },

  renderRequirements: function () {
    const resource = this.state.resource
    let runsInBrowser = true
    if (resource.material_properties.indexOf('Requires download') > -1) {
      runsInBrowser = false
    }
    if (runsInBrowser) {
      return (
        <div className="portal-pages-resource-lightbox-requirements">
          This activity runs entirely in a Web browser. Preferred browsers are: <a href="http://www.google.com/chrome/" title="Get Google's Chrome Web Browser">Google Chrome</a> (versions 30 and above) <a href="http://www.apple.com/safari/" title="Get Apple's Safari Web Browser">Safari</a> (versions 7 and above), <a href="http://www.firefox.com/" title="Get the Firefox Web Browser">Firefox</a> (version 30 and above), <a href="http://www.microsoft.com/ie/" title="Get Microsoft's Internet Explorer Web Browser">Internet Explorer</a> (version 10 or higher), and <a href="https://www.microsoft.com/en-us/windows/microsoft-edge#f7x5cdShtkSvrROV.97" title="Get Microsoft's Edge Web Browser">Microsoft Edge</a>.
        </div>
      )
    }
    return (
      <div className="portal-pages-resource-lightbox-requirements">
        <p>This resource requires Java. You can download Java for free from <a href="http://java.com/" title="Get Java">java.com</a>.</p>
        <p>Using macOS 10.9 or newer? You&apos;ll also need to install our launcher app. <a href="http://static.concord.org/installers/cc_launcher_installer.dmg" title="Download the CCLauncher installer">Download the launcher installer</a> open the .dmg file and drag the CCLauncher app to your Applications folder, then return to this page and launch the resource.</p>
      </div>
    )
  },

  renderStandards: function () {
    const resource = this.state.resource
    if (!resource.standard_statements || resource.standard_statements.length === 0) {
      return null
    }

    const allStatements = resource.standard_statements
    let helpers = {}
    let unhelped = []

    helpers.NGSS = StandardsHelpers.getStandardsHelper('NGSS')

    for (let i = 0; i < allStatements.length; i++) {
      let statement = allStatements[i]
      let helper = helpers[statement.type]

      if (helper) {
        helper.add(statement)
      } else {
        unhelped.push(statement)
      }
    }

    const unhelpedStandards = unhelped.map(function (statement) {
      var description = statement.description
      if (Array.isArray && Array.isArray(description)) {
        var formatted = ''
        for (var i = 0; i < description.length; i++) {
          if (description[i].endsWith(':')) {
            description[i] += ' '
          } else if (!description[i].endsWith('.')) {
            description[i] += '. '
          }
          formatted += description[i]
        }
        description = formatted
      }
      return (
        <div>
          <h3>{statement.notation}</h3>
          {description}
        </div>
      )
    })

    return (
      <div className="portal-pages-resource-lightbox-standards">
        <hr />
        <h2>Standards</h2>
        {helpers.NGSS.getDiv()}
        {unhelpedStandards}
      </div>
    )
  },

  renderLicense: function () {
    const resource = this.state.resource
    if (!resource.license_info) {
      return null
    }

    const license = resource.license_info

    let attributionName = 'The Concord Consortium'
    let attributionUrl = 'https://concord.org/'

    // replace Concord Consortium with proper author credit
    let licenseDescription
    if (!resource.credits) {
      licenseDescription = license.description
    } else {
      licenseDescription = license.description.replace('the Concord Consortium', resource.credits)
    }

    // alter attribution values when all material should be attributed to a specific project or partner
    if (Portal.theme === 'ngss-assessment') {
      attributionName = 'The Next Generation Science Assessment Project'
      attributionUrl = 'http://nextgenscienceassessment.org/'
      licenseDescription = license.description.replace('the Concord Consortium', attributionName)
    }

    let licenseAttribution = ''
    // don't provide suggested attribution for public domain resources
    if (license.code !== 'CC0') {
      if (!resource.credits) {
        licenseAttribution = <p>Suggested attribution: {resource.name} by <a href={attributionUrl}>{attributionName}</a> is licensed under <a href={license.deed}>{license.code}</a>.</p>
      } else {
        licenseAttribution = <p>Suggested attribution: {resource.name} by {resource.credits} is licensed under <a href={license.deed}>{license.code}</a>.</p>
      }
    }

    return (
      <div className="portal-pages-resource-lightbox-license">
        <hr />
        <h2>License</h2>
        <div>
          <img src={license.image} />
        </div>
        <h3>license.code</h3>
        <p>{license.name}</p>
        <p>{licenseDescription}<br /><a href={license.deed}>{license.deed}</a><br />
        <a href={license.legal}>{license.legal}</a></p>
        {licenseAttribution}
      </div>
    )
  },

  renderLearnMore: function () {
    const resource = this.state.resource
    if (resource.projects.length === 0) {
      return null
    }
    const projects = resource.projects
    const numProjects = projects.length

    const projectsList = projects.map(function (project, index) {
      return (
        <span>
          <strong>
            {project.landing_page_url ? <a href={project.landing_page_url}>{project.name}</a> : project.name}
          </strong>
          {index !== numProjects - 1 ? ' and ' : ''}
        </span>
      )
    })

    return (
      <div>
        <hr />
        <h2>Learn More</h2>
        <div className="portal-pages-resource-lightbox-learn-more">
          This resource is part of the Concord Consortium's {projectsList} {pluralize(numProjects, ' project')}.
        </div>
      </div>
    )
  },

  renderRelatedContent: function () {
    const resource = this.state.resource
    if (resource.related_materials.length === 0) {
      return null
    }

    const relatedResources = resource.related_materials.map(function (resource, i) {
      if (i < 2) {
        return RelatedResourceResult({key: i, resource: resource, replaceResource: this.replaceResource})
      }
    }.bind(this))

    return (
      <div className="portal-pages-resource-lightbox-related-content cols">
        <h2>You may also like:</h2>
        {relatedResources}
      </div>
    )
  },

  //
  // TODO: add links
  //
  renderSharing: function () {
    const resource = this.state.resource
    const resourceUrl = window.location.href
    const facebookLink = "https://www.facebook.com/sharer/sharer.php?u=" + resourceUrl
    const twitterLink = "http://twitter.com/share?text=" + resource.name + "&url=" + resourceUrl
    const emailLink = "mailto:?subject="  + resource.name + "&body=" + resourceUrl

    if (!resource.enable_sharing) {
      return null
    }

    return (
      <div className="portal-pages-resource-lightbox-modal-sharing">
        <a className="share-facebook" href={facebookLink} target="_blank" onClick={this.handleSocialMediaShare}>Facebook</a>
        <a className="share-twitter" href={twitterLink} target="_blank" onClick={this.handleSocialMediaShare}>Twitter</a>
        <a className="share-email" href={emailLink} target="_blank" onClick={this.handleSocialMediaShare}>Email</a>
      </div>
    )
  },

  render404: function () {
    return (
      <div className="portal-pages-resource-lightbox-modal-content">
        <div className="portal-pages-resource-lightbox-not-found">
          Sorry, the requested resource was not found.'
        </div>
        <div>
          <a id="portal-pages-lightbox-close-not-found" href="#" onClick={this.handleClose}>Click here</a> to close this lightbox and use the search box on this page to find another resource.
        </div>
      </div>
    )
  },

  renderIcons: function () {
    const resource = this.state.resource
    const links = resource.links
    let printIcon = links.print_url ? <a className="print" href={links.print_url.url}>print</a> : null
    let copyIcon = links.external_copy ? <a className="copy" href={links.external_copy.url}>copy</a> : null
    let editLink = null
    if (resource.lara_activity_or_sequence && links.external_lara_edit) {
      editLink = links.external_lara_edit.url
    } else if (links.external_edit) {
      editLink = links.external_edit.url
    }

    let editIcon = editLink ? <a className="edit" href={editLink}>edit</a> : null

    let settingsIcon = links.edit ? <a className="settings" href={links.edit.url}>settings</a> : null

    const icons = [printIcon, copyIcon, editIcon, settingsIcon]
    const iconsListItems = icons.map((icon) => {
        return icon !== null ? <li>{icon}</li> : null
      }
    );

    if (printIcon || copyIcon || editIcon || settingsIcon) {
      return (
        <ul>{iconsListItems}</ul>
      )
    } else {
      return null
    }
  },

  longDescription: function () {
    const resource = this.state.resource
    return {__html: resource.longDescription}
  },

  renderResource: function () {
    const resource = this.state.resource
    const links = resource.links

    // console.log("[DEBUG] resource-lightbox links.assign_material.onclick", links.assign_material.onclick);
    // console.log("[DEBUG] resource-lightbox links.assign_collection.onclick", links.assign_collection.onclick);

    return (
      <div className="portal-pages-resource-lightbox-modal-content">
        <div className="portal-pages-resource-lightbox-modal-content-top">
          <div className="portal-pages-resource-lightbox-modal-utility">
            {this.renderIcons()}
          </div>
          <h1>{resource.name}</h1>
          <div className="preview-image">
            <img src={resource.icon.url} />
          </div>
          <div className="portal-pages-action-buttons">
            {links.preview ? <a className="portal-pages-primary-button" href={links.preview.url} target="_blank" onClick={this.handlePreviewClick}>{links.preview.text}</a> : null}
            {links.assign_material ? <a className="portal-pages-secondary-button" href="javascript: + {links.assign_material.onclick}" onClick={this.handleAssignClick}>{links.assign_material.text}</a> : null}
            {links.assign_collection ? <a className="portal-pages-secondary-button" href="javascript: + {links.assign_collection.onclick}" onClick={this.handleAddToCollectionClick}>{links.assign_collection.text}</a> : null}
            {links.teacher_guide ? <a className="portal-pages-secondary-button" href={links.teacher_guide.url} target="_blank" onClick={this.handleTeacherGuideClick}>{links.teacher_guide.text}</a> : null}
          </div>
          <p className="portal-pages-resource-lightbox-description" dangerouslySetInnerHTML={this.longDescription()}></p>
          {resource.has_pretest ? <p className="portal-pages-resource-lightbox-description">Pre- and Post-tests available</p> : null}
          {resource.saves_student_data === false ? <div className="portal-pages-resource-lightbox-no-save-warning"><strong>PLEASE NOTE:</strong> This resource can be assigned, but student responses will not be saved.</div> : null}
          {this.renderIncludedActivities()}
          <hr />
          <h2>Requirements</h2>
          {this.renderRequirements()}
          {this.renderStandards()}
          {this.renderLicense()}
          {this.renderLearnMore()}
        </div>
        {this.renderRelatedContent()}
      </div>
    )
  },

  render: function () {
    const resource = this.state.resource

    // console.log("[DEBUG] render resource", resource);

    return (
      <div>
        <div className="portal-pages-resource-lightbox-background"></div>
        <div className="portal-pages-resource-lightbox-container">
          <div className="portal-pages-resource-lightbox" onClick={this.handleClose}>
            <div className="portal-pages-resource-lightbox-background-close" onClick={this.handleClose}>
              x
            </div>
            <div className="portal-pages-resource-lightbox-modal">
              {resource ? this.renderResource() : this.render404()}
            </div>
            {resource ? this.renderSharing() : null}
          </div>
        </div>
      </div>
    )
  }
})

module.exports = ResourceLightbox

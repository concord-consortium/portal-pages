
// @function guessPortalDomain()
// Tries to use window.location to extract a portal host
// @returns string: eg: `https://learn.concord.org`
var guessPortalDomain = function () {
  return window.location.protocol +
    '//' + window.location.hostname +
    (window.location.port ? ':' + window.location.port : '')
}

// @function MakeTeacherEditionLinks(selector, domain)
// @param `selector`: dom selector, should look like `#teacher-edition-links a`
// @param `specDomain`: specify a host url eg: `https://learn.concord.org`
// if `specDomain` is omitted, we guess it from the window.location.
// This function decorates <a href=""/> style links and modifies the href value.
// It appends query params that let the runtime use login credentials specified
// by the `specDomain` portal.
var MakeTeacherEditionLinks = function (selector, specDomain = null) {
  var defaultDomain = guessPortalDomain()
  var domain = specDomain || defaultDomain

  var updateAnchorTag = function (anchor) {
    var oldLink = anchor.getAttribute('href')
    var encodedDomain = encodeURIComponent(domain)
    var domainUid = Portal.currentUser.userId
    var newLink = oldLink +
      '?domain=' + encodedDomain +
      '&domain_uid=' + domainUid +
      '&mode=teacher-edition&show_index=true&logging=true'
    anchor.setAttribute('href', newLink)
  }

  var links = document.querySelectorAll(selector)
  links.forEach(updateAnchorTag)
}

module.exports = MakeTeacherEditionLinks

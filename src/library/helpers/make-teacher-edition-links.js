// Selector should look like '#teacher-edition-links a'
//
var MakeTeacherEditionLinks = function (selector) {
  var updateAnchorTag = function (anchor) {
    var oldLink = anchor.getAttribute('href')
    var domain = encodeURIComponent('https://learn.staging.concord.org')
    var domainUid = Portal.currentUser.userId
    var newLink = oldLink +
      '?domain=' + domain +
      '&domain_uid=' + domainUid +
      '&mode=teacher-edition&show_index=true'
    anchor.setAttribute('href', newLink)
  }

  var links = document.querySelectorAll(selector)
  links.forEach(updateAnchorTag)
}

module.exports = MakeTeacherEditionLinks

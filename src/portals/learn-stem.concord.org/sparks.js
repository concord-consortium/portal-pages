jQuery(document).ready(function () {
  // Last argument is number of visible materials.
  PortalPages.renderMaterialsCollection(21, '#simulations-tab', 100)
  if (Portal.currentUser.isLoggedIn) {
    jQuery('.sign-up-box').remove()
  }
})

function showTab (tabId) { // eslint-disable-line no-unused-vars
  jQuery('.tab-content').hide().removeClass('active')
  jQuery(tabId + '-tab').addClass('active').show()
  jQuery('ul.tabs li').removeClass('active')
  jQuery(tabId + '-tab-link').addClass('active')
}

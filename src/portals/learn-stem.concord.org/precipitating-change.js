jQuery(document).ready(function () {
  if (Portal.currentUser.isLoggedIn) {
    PortalPages.renderMaterialsCollection(37, '#collection-1')
  } else {
    jQuery('.portal-pages-collection-resource-list').remove()
  }
})

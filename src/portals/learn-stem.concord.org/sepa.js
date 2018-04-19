jQuery(document).ready(function () {
  if (Portal.currentUser.isLoggedIn) {
    jQuery('#intro-msg').html('SEPA simulations and modeling are under development. Play around, have fun, and send any thoughts/suggestions to <a href="mailto:sepa@concord.org">the team</a>.')
    // Last argument is number of visible materials.
    PortalPages.renderMaterialsCollection(14, '#collection-1', 10)
  } else {
    jQuery('#intro-msg').html('SEPA educational activities and models are currently under development but will be published here when they are completed.')
  }
})

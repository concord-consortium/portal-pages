jQuery(document).ready(function() {
  // Last argument is number of visible materials.
  PortalPages.renderMaterialsCollection(21, '#simulations-tab', 100);
  if (Portal.currentUser.isLoggedIn) {
    jQuery('.sign-up-box').remove();
  }
});

function showTab(tab_id) {
  jQuery('.tab-content').hide().removeClass('active');
  jQuery(tab_id + '-tab').addClass('active').show();
  jQuery('ul.tabs li').removeClass('active');
  jQuery(tab_id + '-tab-link').addClass('active');
}

PortalPages.renderPageHeader({
  isCollections: true,
  fadeIn: 1000
}, 'page-header');

PortalPages.renderPageFooter({
  fadeIn: 1000
}, 'page-footer');

if (Portal.currentUser.isLoggedIn) {
  jQuery('#curriculum-note').remove();
} else {
  jQuery('.portal-pages-collection-resource-list').remove();
}

PortalPages.renderMaterialsCollection(29, '#collection-3', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0)
      jQuery('#collection-3').parents('li').remove(); // remove collection if no resources available
  }
});

PortalPages.renderMaterialsCollection(30, '#collection-4', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0)
      jQuery('#collection-4').parents('li').remove(); // remove collection if no resources available
  }
});

PortalPages.renderMaterialsCollection(28, '#collection-1', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0)
      jQuery('#collection-1').parents('li').remove(); // remove collection if no resources available
  }
});

PortalPages.renderMaterialsCollection(15, '#collection-2', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0)
      jQuery('#collection-2').parents('li').remove(); // remove collection if no resources available
  }
});

jQuery(document).ready(function() {
  jQuery('.collapsible').hide();
  jQuery('.collapsible-toggle').css({'cursor':'pointer'}).click(function() {
    jQuery(this).toggleClass('open');
    var toggle_top = jQuery(this).position().top + 650;
    jQuery('html,body').animate({scrollTop: toggle_top},'slow');
    jQuery(this).siblings('.collapsible').slideToggle('fast');
  });
});

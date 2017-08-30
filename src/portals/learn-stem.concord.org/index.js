PortalPages.renderPageHeader({
  fadeIn: 100,
  oauthProviders: Portal.oauthProviders
}, 'page-header');

PortalPages.renderStemFinder({
  fadeIn: 100
}, 'portal-pages-finder');

PortalPages.renderCollectionCards({
  shuffle: true,
  count: 3,
  fadeIn: 100
}, 'portal-pages-collections-cards');

PortalPages.renderPageFooter({
  fadeIn: 100
}, 'page-footer');

jQuery(document).ready(function(){
  jQuery('.mobile-filter-toggle').click(function() {
    jQuery(this).fadeOut('fast');
    jQuery('.portal-pages-finder-form-filters').slideToggle();
  });
});

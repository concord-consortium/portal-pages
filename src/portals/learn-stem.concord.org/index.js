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

jQuery(document).ready(function(){
  jQuery('.mobile-filter-toggle').click(function() {
    jQuery(this).toggleClass('active');
    if (jQuery(this).text() === 'More Filters') {
      jQuery(this).text('Less Filters');
    } else {
      jQuery(this).text('More Filters');
    }
    jQuery('.portal-pages-finder-form-filters').slideToggle();
  });
});

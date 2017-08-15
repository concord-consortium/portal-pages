PortalPages.renderPageHeader({
  fadeIn: 1000,
  oauthProviders: Portal.oauthProviders
}, 'page-header');

PortalPages.renderStemFinder({
  fadeIn: 1000
}, 'portal-pages-finder');

PortalPages.renderCollectionCards({
  shuffle: true,
  count: 3,
  fadeIn: 1000
}, 'portal-pages-collections-cards');

PortalPages.renderPageFooter({
  fadeIn: 1000
}, 'page-footer');

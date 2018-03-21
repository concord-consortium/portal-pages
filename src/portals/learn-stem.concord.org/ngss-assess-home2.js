PortalPages.renderPageHeader({
  fadeIn: 100,
  logo_class: 'ngsa',
  umbrella_link: false,
  oauthProviders: Portal.oauthProviders
}, 'page-header');

jQuery(document).ready(function() {
  jQuery('.portal-pages-main-nav-collections').text('Assessment Tasks');
});

PortalPages.renderPageHeader({
  fadeIn: 100,
  logo_class: 'cc-no-tagline',
  oauthProviders: Portal.oauthProviders
}, 'page-header');

jQuery(document).ready(function() {
  jQuery('.portal-pages-main-nav-collections').text('Assessment Tasks');
});

jQuery(window).scroll(function() {
  if (jQuery(window).scrollTop() >= 610) {
    jQuery('.portal-pages-brand-logo-container, .portal-pages-brand-banner-bg').addClass('fixed-header');
  } else {
    jQuery('.portal-pages-brand-logo-container, .portal-pages-brand-banner-bg').removeClass('fixed-header');
  }
});

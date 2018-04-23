PortalPages.renderPageHeader({
  fadeIn: 100,
  logo_class: 'ngsa',
  umbrella_link: false,
  oauthProviders: Portal.oauthProviders,
  theme: 'ngss-assessment'
}, 'page-header')

jQuery(document).ready(function () {
  jQuery('.collapsible').hide()
  jQuery('.collapsible-toggle').css({'cursor': 'pointer'}).click(function () {
    jQuery(this).toggleClass('open')
    // jQuery('html,body').animate({scrollTop: toggle_top},'slow');
    jQuery(this).next('.collapsible').slideToggle('fast')
  })
})

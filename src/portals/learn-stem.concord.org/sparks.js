// Last argument is number of visible materials.
//PortalPages.renderMaterialsCollection(7, '#collection-1');

jQuery(document).ready(function() {
  // Last argument is number of visible materials.
  PortalPages.renderMaterialsCollection(21, '#simulations-tab', 100);
  if (Portal.currentUser.isLoggedIn) {
    jQuery('.sign-up-box').remove();
  }
  if (jQuery(document).scrollTop() > 0) {
    shrinkHeader();
  }
  jQuery('body').append('<div id="overlay"></div>');
  jQuery('#overlay').click(function() {
    hidePopover();
  });
  jQuery('.collapsible').hide();
  jQuery('.collapsible-toggle').css({'cursor':'pointer'}).click(function(){
    jQuery(this).toggleClass('open');
    var toggle_top = (jQuery('#curriculum-tabs').position().top + jQuery(this).position().top) - 10;
    //jQuery('html,body').animate({scrollTop: toggle_top},'slow');
    jQuery(this).next('.collapsible').slideToggle('fast');
  });
});

jQuery(document).scroll(function() {
  if (!Portal.currentUser.isLoggedIn) {
    if (jQuery(document).scrollTop() > 5) {
      shrinkHeader();
    } else {
      enlargeHeader();
    }
  }
  if (jQuery(document).scrollTop() > jQuery('#intro').offset().top - 400) {
    jQuery('nav a').removeClass('active');
    jQuery('#intro-link').addClass('active');
  }
  if (jQuery(document).scrollTop() > jQuery('#curriculum').offset().top - 100) {
    jQuery('nav a').removeClass('active');
    jQuery('#curriculum-link').addClass('active');
  }
  if (jQuery(document).scrollTop() < 100) {
    jQuery('nav a').removeClass('active');
    jQuery('#intro-link').addClass('active');
  }

});

function showTab(tab_id) {
  jQuery('.tab-content').hide().removeClass('active');
  jQuery(tab_id + '-tab').addClass('active').show();
  jQuery('ul.tabs li').removeClass('active');
  jQuery(tab_id + '-tab-link').addClass('active');
}
function showPopover(popover_id) {
  jQuery('#overlay').fadeIn('fast');
  jQuery(popover_id).fadeIn('slow');
}
function hidePopover() {
  jQuery('.popover').fadeOut('fast');
  jQuery('#overlay').fadeOut('slow');
}

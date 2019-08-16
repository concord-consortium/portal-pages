// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(55, '#collection-1', {
  limit: 20,
  onDataLoad: function (materials) {
    if (materials.length <= 0) {
      jQuery('#collection-1').html('<p>Want to be notified when Connected Biology becomes freely available? <a href="http://short.concord.org/9f" target="_blank" rel="noopener noreferrer" title="Contact the ConnectedBio Project">Contact us</a>!</p>');
    }
  }
});

jQuery(document).ready(function(){
  jQuery('.collapsible p strong').each(function() {
    jQuery(this).click(function() {
      if (jQuery(this).siblings('.description').hasClass('open')) {
        jQuery(this).siblings('.description').removeClass('open');
      } else {
        jQuery('.collapsible .description').removeClass('open');
        jQuery(this).siblings('.description').addClass('open');
      }
    });
  });
});

// Simple library that can be used to create a modal dialog.
// Requires no setup. Just create HTML container:
// <div id="my-modal" class="modal">Content</div>
// and then call:
// showModal(clickHandler, "#my-modal");
// Close button and overlay will be automatically added.
// Related styles are in modal.scss file.

var showOverlay = function(clickHandler,modalId,fixedPosition) {
  jQuery('.portal-pages-modal').hide();
  jQuery(modalId).addClass('portal-pages-modal');
  if(fixedPosition) {
      jQuery(modalId).addClass('portal-pages-modal-fixed');
  }
  if (jQuery('#portal-pages-modal-overlay').length === 0) {
      jQuery('body').append('<div id="portal-pages-modal-overlay"></div>');
  }
  jQuery('#portal-pages-modal-overlay').unbind('click');
  if(clickHandler) {
      jQuery('#portal-pages-modal-overlay').click(clickHandler)
  }
  jQuery('#portal-pages-modal-overlay').css({'height': jQuery(document).height() + 'px'}).fadeIn('fast');
};

var showModal = function(modalId, specialMsg, fixedPosition) {
  jQuery('html, body').css({'overflow': 'hidden'});
  showOverlay(hideModal,modalId,fixedPosition);

  if (jQuery(modalId + ' .portal-pages-close').length === 0) {
    jQuery(modalId).append('<a class="portal-pages-close">x</a>');
    jQuery(modalId + ' .portal-pages-close').click(hideModal);
  }
  if (specialMsg != null) {
    jQuery(modalId + ' .portal-pages-special-msg').text(specialMsg).show();
  }
  jQuery('#portal-pages-modal-overlay').css({'height': jQuery(document).height() + 'px'}).fadeIn('fast');
  jQuery(modalId).fadeIn('slow');
};

var hideModal = function() {
  jQuery('html, body').css({'overflow': 'auto'});
  jQuery('.portal-pages-modal').fadeOut('fast');
  jQuery('#portal-pages-modal-overlay').fadeOut('slow');
  jQuery('.portal-pages-special-msg').text('').hide();
};

module.exports.showModal = showModal;
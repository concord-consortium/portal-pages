// Last argument is number of visible materials.
// PortalPages.renderMaterialsCollection(1, '#collection-1');

// Custom sorting plugin
(function (jQuery) {
  jQuery.fn.sorted = function (customOptions) {
    var options = {
      reversed: false,
      by: function (a) { return a.text() }
    }
    jQuery.extend(options, customOptions)
    var $data = jQuery(this)
    var arr = $data.get()
    arr.sort(function (a, b) {
      var valA = options.by(jQuery(a))
      var valB = options.by(jQuery(b))
      if (options.reversed) {
        return (valA < valB) ? 1 : (valA > valB) ? -1 : 0
      } else {
        return (valA < valB) ? -1 : (valA > valB) ? 1 : 0
      }
    })
    return jQuery(arr)
  }
})(jQuery)

jQuery(function () {
  // bind radiobuttons in the form
  var $filterType = jQuery('#filter input[name="type"]')

  // get the first collection
  var $sims = jQuery('#simulations-list')

  // clone applications to get a second collection
  var $data = $sims.clone()

  // attempt to call Quicksand on every form change
  $filterType.change(function (e) {
    var $filteredData
    if (jQuery('#filter input[name="type"]:checked').val() === 'all') {
      $filteredData = $data.find('li')
    } else {
      $filteredData = $data.find('li[class*=' + jQuery('#filter input[name="type"]:checked').val() + ']')
    }

    // call quicksand
    $sims.quicksand($filteredData, {
      duration: 700
    })
  })
})

PortalPages.renderMaterialsCollection(16, '#collection-1', 20)
PortalPages.renderMaterialsCollection(17, '#collection-2', 20)
PortalPages.renderMaterialsCollection(18, '#collection-3', 20)
PortalPages.renderMaterialsCollection(19, '#collection-4', 20)
PortalPages.renderMaterialsCollection(25, '#collection-6', 20)
PortalPages.renderMaterialsCollection(31, '#collection-5', 20)

jQuery(document).ready(function () {
  jQuery('body').append('<div id="overlay"></div>')
  jQuery('#curriculum-details').append('<p style="clear: both; cursor: pointer; text-align: center;"><a onclick="hidePopover(); return false;">close this</a></p>')
  jQuery('#overlay').click(function () {
    hidePopover()
  })
  jQuery('.collapsible').hide()
  jQuery('.collapsible-toggle').css({ 'cursor': 'pointer' }).click(function () {
    jQuery(this).toggleClass('open')
    // jQuery('html,body').animate({scrollTop: toggle_top},'slow');
    jQuery(this).siblings('.collapsible').slideToggle('fast')
  })
})

window.showTab = function showTab (tabId) {
  jQuery('.tab-content').hide().removeClass('active')
  jQuery(tabId + '-tab').addClass('active').show()
  jQuery('ul.tabs li').removeClass('active')
  jQuery(tabId + '-tab-link').addClass('active')
}
window.showPopover = function showPopover (popoverId) {
  jQuery('#overlay').fadeIn('fast')
  jQuery(popoverId).fadeIn('slow')
}
function hidePopover () {
  jQuery('.popover').fadeOut('fast')
  jQuery('#overlay').fadeOut('slow')
}

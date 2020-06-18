if (Portal.currentUser.isLoggedIn) {
  jQuery('#curriculum-note').remove()
} else {
  jQuery('.portal-pages-collection-resource-list').remove()
}

PortalComponents.renderMaterialsCollection(33, '#collection-5', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0) { jQuery('#collection-5').parents('li').remove() } // remove collection if no resources available
  }
})

PortalComponents.renderMaterialsCollection(34, '#collection-6', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0) { jQuery('#collection-6').parents('li').remove() } // remove collection if no resources available
  }
})

PortalComponents.renderMaterialsCollection(30, '#collection-4', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0) { jQuery('#collection-4').parents('li').remove() } // remove collection if no resources available
  }
})

PortalComponents.renderMaterialsCollection(28, '#collection-1', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0) { jQuery('#collection-1').parents('li').remove() } // remove collection if no resources available
  }
})

PortalComponents.renderMaterialsCollection(15, '#collection-2', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0) { jQuery('#collection-2').parents('li').remove() } // remove collection if no resources available
  }
})

jQuery(document).ready(function () {
  jQuery('.collapsible').hide()
  jQuery('.collapsible-toggle').css({ 'cursor': 'pointer' }).click(function () {
    jQuery(this).toggleClass('open')
    var toggleTop = jQuery(this).position().top + 650
    jQuery('html,body').animate({ scrollTop: toggleTop }, 'slow')
    jQuery(this).siblings('.collapsible').slideToggle('fast')
  })
})

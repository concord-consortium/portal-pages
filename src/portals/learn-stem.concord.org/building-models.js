if (Portal.currentUser.isLoggedIn) {
  jQuery('#curriculum-note').remove()
}
// else {
//  jQuery('.portal-pages-collection-resource-list').remove();
//}

// Last argument is number of visible materials.
//PortalPages.renderMaterialsCollection(33, '#collection-4', {
//  limit: 10,
//  onDataLoad: function (materials) {
//    if (materials.length <= 0) {
//      jQuery('#collection-4').parent('li').remove(); // remove collection if no resources available
//    }
//  },
//  header: ''
//});

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(34, '#collection-5', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0) {
      jQuery('#collection-5').parent('li').remove(); // remove collection if no resources available
    }
  },
  header: ''
});

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(45, '#collection-6', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0) {
      jQuery('#collection-6').parent('li').remove(); // remove collection if no resources available
    }
  },
  header: ''
});

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(46, '#collection-7', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0) {
      jQuery('#collection-7').parent('li').remove(); // remove collection if no resources available
    }
  },
  header: ''
});

// Last argument is number of visible materials.
//PortalPages.renderMaterialsCollection(30, '#collection-3', {
//  limit: 10,
//  onDataLoad: function (materials) {
//    if (materials.length <= 0) {
//      jQuery('#collection-3').parent('li').remove(); // remove collection if no resources available
//    }
//  },
//  header: ''
//});

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(28, '#collection-1', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0) {
      jQuery('#collection-1').parent('li').remove(); // remove collection if no resources available
    }
  },
  header: ''
});

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(15, '#collection-2', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0) {
      jQuery('#collection-2').parent('li').remove() // remove collection if no resources available
    }
  },
  header: ''
});

if (Portal.currentUser.isLoggedIn) {
  jQuery('.portal-pages-collection-page-intro:nth-child(2)').remove()
}

var collectionsCheckTimer
jQuery(document).ready(function() {
  jQuery('.collapsible').hide();
  jQuery('.collapsible-toggle').css({'cursor':'pointer'}).click(function() {
    jQuery(this).toggleClass('open')
    //var toggle_top = jQuery(this).position().top + 650
    //jQuery('html,body').animate({scrollTop: toggle_top},'slow')
    jQuery(this).siblings('.collapsible').slideToggle('fast')
  });
  collectionsCheckTimer = setTimeout('postMaterialsLoadTest()', 2000)
});

function postMaterialsLoadTest() {
  console.log('test');
  var collContIds = ['1','2','3','4','5']
  for (var i = 0; i < collContIds.length; i++) {
    if (jQuery.trim(jQuery('#collection-' + collContIds[i]).html()) === '<!-- react-empty: 1 -->' || jQuery.trim(jQuery('#collection-' + collContIds[i]).html()) === '<!--react-empty: 1-->') {
      jQuery('#collection-' + collContIds[i]).parents('li').remove()
    }
  }
  clearTimeout(collectionsCheckTimer)
}

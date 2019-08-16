// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(35, '#collection-1', 10)

jQuery(document).ready(function() {
  if (Portal.currentUser.isLoggedIn) {
    var logged_in_content = '<h1>InquirySpace</h1><p class="tagline">Learning Science by Doing Science</p><p>Seven InquirySpace activities were designed as a sequence, with a focus on collecting and analyzing data by looking for patterns in graphs. The activities were designed to be used by small groups of students though they can also be used individually. As the teacher, you will need to facilitate the activities and provide background knowledge. Make sure to run the activities yourself before using them with students. Teacher guides are available. </p><p>Each activity brings students a step closer to designing and performing their own hands-on experiment using sensors and the CODAP environment:</p><ul><li>The <strong>Ramp Game</strong> introduces students to CODAP (Common Online Data Analysis Platform) by stepping them through the process of collecting model data, exporting it to a data table, and creating a graph. If your students have never used CODAP, start here!</li><li>The <strong>Spring and Mass</strong> activities are also highly scaffolded, guiding students through a physical spring and mass experiment and then a simulation.</li><li>The <strong>Parachute</strong> activities provide less instruction on the basics and encourage students to explore different variables.</li><li>Finally, students devise experiments based on their own experimental question with the <strong>Sensor Data Collection</strong> experiments.</li></ul><p>All sensor-based activities require the installation of the <a href="http://sensorconnector.concord.org/" title="Get the SensorConnector App">SensorConnector App</a>.</p><p><a href="http://codap.concord.org/" title="CODAP Help">Get help with CODAP</a>, our newest data analysis environment.</p>'
    jQuery('#introduction').html(logged_in_content)
  }
})

if (Portal.currentUser.isLoggedIn) {
  jQuery('#curriculum-note').remove()
}
// else {
//  jQuery('.portal-pages-collection-resource-list').remove()
//}

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(43, '#collection-2', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0) {
      jQuery('#collection-4').parent('li').remove() // remove collection if no resources available
    }
  },
  header: ''
})

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(44, '#collection-3', {
  limit: 10,
  onDataLoad: function (materials) {
    if (materials.length <= 0) {
      jQuery('#collection-5').parent('li').remove() // remove collection if no resources available
    }
  },
  header: ''
})


if (Portal.currentUser.isLoggedIn) {
  jQuery('.portal-pages-collection-page-intro:nth-child(2)').remove()
}

var collections_check_timer
jQuery(document).ready(function() {
  jQuery('.collapsible').hide()
  jQuery('.collapsible-toggle').css({'cursor':'pointer'}).click(function() {
    jQuery(this).toggleClass('open')
    //var toggle_top = jQuery(this).position().top + 650
    //jQuery('html,body').animate({scrollTop: toggle_top},'slow')
    jQuery(this).siblings('.collapsible').slideToggle('fast')
  })
  collections_check_timer = setTimeout('postMaterialsLoadTest()', 2000)
})

function postMaterialsLoadTest() {
  console.log('test')
  var coll_cont_ids = ['1','2','3']
  for (var i = 0 i < coll_cont_ids.length i++) {
    if (jQuery.trim(jQuery('#collection-' + coll_cont_ids[i]).html()) === '<!-- react-empty: 1 -->' || jQuery.trim(jQuery('#collection-' + coll_cont_ids[i]).html()) === '<!--react-empty: 1-->') {
      jQuery('#collection-' + coll_cont_ids[i]).parents('li').remove()
    }
  }
  clearTimeout(collections_check_timer)
}

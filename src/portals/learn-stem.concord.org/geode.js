jQuery(document).ready(function () {
  if (Portal.currentUser.isLoggedIn) {
    var loggedInContent = '<p><img src="https://concord.org/sites/default/files/images/projects/geode/geode-students.jpg" alt="GEODE Students" style="float: right; height: auto; margin: 3px 0 0 1em; width: 250px;" />The Geological Models for Explorations of Dynamic Earth (GEODE) project is working on two models and associated scaffolded activities for middle school Earth Science students.</p><ul><li>The <strong>Seismic Explorer Model</strong> allows students to freely explore earthquakes, volcanic activity and plate boundaries.</li><li><strong>Exploring Earth\'s Seismicity</strong> is a three-part scaffolded activity, guiding students through mapping earthquakes, volcanoes, and tectonic plates.</li><li>The <strong>Geodynamic model</strong> will include a system of plates bounded on all sides by other plates that interact like those found on Earth, providing an environment where students can correlate surface geologic features and events to plate interactions. This model is coming soon!</li></ul>'
    jQuery('#carousel_wrapper').hide()
    jQuery('#intro-text').css('width', '640px')
    jQuery('#intro-text').html(loggedInContent)
  }
})

// Last argument is number of visible materials.
PortalComponents.renderMaterialsCollection(40, '#collection-1', {
  limit: 20,
  onDataLoad: function (materials) { if (jQuery('#collection-1 .portal-pages-finder-materials-collection-item').length < 1) { jQuery('#collection-1, #collection-1-heading').remove() } },
  header: 'GEODE Activities'
})

PortalComponents.renderMaterialsCollection(41, '#collection-2', {
  limit: 20,
  onDataLoad: function (materials) {},
  header: 'GEODE Activities'
})

jQuery(document).ready(function() {
  if (Portal.currentUser.isLoggedIn) {
    var logged_in_content = '<p><img src="https://concord.org/sites/default/files/images/projects/geode/geode-students.jpg" alt="GEODE Students" style="float: right; height: auto; margin: 3px 0 0 1em; width: 250px;" />The Geological Models for Explorations of Dynamic Earth (GEODE) project is working on two models and associated scaffolded activities for middle school Earth Science students.</p><ul><li>The <strong>Seismic Explorer Model</strong> allows students to freely explore earthquakes, volcanic activity and plate boundaries.</li><li><strong>Exploring Earth\'s Seismicity</strong> is a three-part scaffolded activity, guiding students through mapping earthquakes, volcanoes, and tectonic plates.</li><li>The <strong>Geodynamic model</strong> will include a system of plates bounded on all sides by other plates that interact like those found on Earth, providing an environment where students can correlate surface geologic features and events to plate interactions. This model is coming soon!</li></ul>';
    jQuery('#carousel_wrapper').hide();
    jQuery('#intro-text').css('width', '640px');
    jQuery('#intro-text').html(logged_in_content);
  }
});

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(41, '#collection-2', {
  limit: 20,
  onDataLoad: function (materials) {if(materials.length<1){jQuery('#collection-2-heading, #collection-2').remove();}},
    header: 'Public Activities'
});

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(40, '#collection-1', {
  limit: 20,
  onDataLoad: function (materials) {if(materials.length<1){jQuery('#collection-1-heading, #collection-1').remove();}else{jQuery('#collection-2-heading, #collection-2').remove();}},
    header: 'Pilot Teacher Activities'
});

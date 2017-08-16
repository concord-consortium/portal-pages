PortalPages.renderPageHeader({
  isCollections: true,
  fadeIn: 1000
}, 'page-header');

PortalPages.renderPageFooter({
  fadeIn: 1000
}, 'page-footer');

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(3, '#collection-1', 10);

jQuery(document).ready(function() {
  if (Portal.currentUser.isLoggedIn) {
    var logged_in_content = '<h1>InquirySpace</h1><p class="tagline">Learning Science by Doing Science</p><p>Seven InquirySpace activities were designed as a sequence, with a focus on collecting and analyzing data by looking for patterns in graphs. The activities were designed to be used by small groups of students though they can also be used individually. As the teacher, you will need to facilitate the activities and provide background knowledge. Make sure to run the activities yourself before using them with students. Teacher guides are available. </p><p>Each activity brings students a step closer to designing and performing their own hands-on experiment using sensors and the CODAP environment:</p><ul><li>The <strong>Ramp Game</strong> introduces students to CODAP (Common Online Data Analysis Platform) by stepping them through the process of collecting model data, exporting it to a data table, and creating a graph. If your students have never used CODAP, start here!</li><li>The <strong>Spring and Mass</strong> activities are also highly scaffolded, guiding students through a physical spring and mass experiment and then a simulation.</li><li>The <strong>Parachute</strong> activities provide less instruction on the basics and encourage students to explore different variables.</li><li>Finally, students devise experiments based on their own experimental question with the <strong>Sensor Data Collection</strong> experiments.</li></ul><p>All sensor-based activities require the installation of the <a href="http://sensorconnector.concord.org/" title="Get the SensorConnector App">SensorConnector App</a>.</p><p><a href="http://codap.concord.org/" title="CODAP Help">Get help with CODAP</a>, our newest data analysis environment.</p>';
    jQuery('#introduction').html(logged_in_content);
  }
});
// Selector should look like '#teacher-edition-links a'
var makeTeacherLinks = function(selector) {
  var updateAnchorTag = function(anchor) {
    var oldLink = anchor.getAttribute('href');
    var domain = encodeURIComponent('https://learn.concord.org');
    var domain_uid = Portal.currentUser.userId;
    var newLink = oldLink +
      '?domain=' + domain +
      '&domain_uid=' + domain_uid +
      '&mode=teacher-edition&show_index=true';
    anchor.setAttribute('href',newLink);
  };

  var links = document.querySelectorAll(selector);
  links.forEach(updateAnchorTag);
}

// Don't show teacher edition to non-teacher users.
if(Portal.currentUser.isTeacher) {
  makeTeacherLinks('#teacher-edition-links a')
}

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(49, '#collection-1', {
limit: 20,
onDataLoad: function (materials) {
  if (materials.length <= 0) {
    jQuery('#supplements').remove();
    jQuery('#collection-1').html('<p style="margin: 0 12px 30px;">These resources are currently under development. If you would like more information, please email <a href="mailto:geode@concord.org">geode@concord.org</a>.</p>');
    jQuery('#main-text').html('<p>This page will give you access to all the professional development and classroom support materials that you will need to successfully run the GEODE module with your students. If you are in the Blue Plate Special cohort, log in with your learn.concord.org teacher account to begin.</p><p>If you are not a member of the Blue Plate Special cohort and would like to be notified when new GEODE materials become available, please fill out <a href="https://www.surveymonkey.com/r/GEODE8-19">this survey</a>.</p>');
  }
},
header: ''
});

PortalPages.renderMaterialsCollection(50, '#collection-2', {
limit: 20,
onDataLoad: function (materials) {
  if (materials.length <= 0) {
    jQuery('#collection-2').html('<p style="margin: 0 12px 30px;">These resources are currently under development. If you would like more information, please email <a href="mailto:geode@concord.org">geode@concord.org</a>.</p>');
  }
},
header: ''
});

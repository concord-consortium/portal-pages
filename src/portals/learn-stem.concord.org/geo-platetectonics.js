// Don't show teacher edition to non-teacher users.
if(Portal.currentUser.isTeacher) {
  PortalPages.MakeTeacherEditionLinks('#teacher-edition-links a');
  PortalPages.MakeTeacherEditionLinks('#density-teacher-edition-link a');
} else {
  jQuery('#teacher-instructions').html('Registered teachers gain access to the Teacher Edition, with supplemental background materials, teacher tips, and exemplar answers, pre- and post-tests, and the Teacher Dashboard. Registration in the STEM Resource Finder is free.');
  jQuery('#collection-2-heading').remove();
}
// Don't show teacher edition to non-teacher users.
if(Portal.currentUser.isTeacher) {
  PortalPages.MakeTeacherEditionLinks('#teacher-edition-links a');
  jQuery('#teacher-edition-links, .view-resources, #teacher-resources').show();
} else {
  jQuery('#teacher-edition-links, .view-resources, #teacher-resources').remove();
  jQuery('.teacher-only').remove();
  jQuery('.intro-text').append('<p>Registered teachers gain access to the Teacher Edition, with supplemental background materials, teacher tips, and exemplar answers, pre- and post-tests, and the Teacher Dashboard. Registration in the STEM Resource Finder is free.</p>');
}
// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(69, '#collection-1', {
  limit: 20,
  onDataLoad: function (materials) {
    if (materials.length <= 0) {
      jQuery('#collection-1').html('<p style="margin: 0 12px 30px;">These resources are currently under development. If you would like more information, please email <a href="mailto:geode@concord.org">geode@concord.org</a>.</p>');
    }
  },
  header: ''
});
PortalPages.renderMaterialsCollection(73, '#collection-2', {
  limit: 20,
  onDataLoad: function (materials) {},
  header: ''
});
PortalPages.renderMaterialsCollection(70, '#collection-3', {
  limit: 20,
  onDataLoad: function (materials) {},
  header: ''
});

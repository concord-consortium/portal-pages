jQuery(document).ready(function () {
  jQuery('.collapsible').hide();
  jQuery('.collapsible-toggle').css({'cursor': 'pointer'}).click(function () {
    var toggle_top = jQuery(this).offset().top;
    jQuery(this).toggleClass('open');
    jQuery('html,body').animate({scrollTop: toggle_top},'slow');
    jQuery(this).siblings('.collapsible').slideToggle('fast');
  });
});

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
PortalPages.renderMaterialsCollection(48, '#collection-1', {
  limit: 20,
  onDataLoad: function (materials) {
    if (materials.length <= 0) {
      jQuery('#main-text').html('<p>This page is for the Geniventure Early Adopt-a-Drake Pilot Program.  If you are in this program, log in with your learn.concord.org teacher account to begin. If you are not a member of this teacher cohort and would like to participate in the future, please email <a href="mailto:gvsupport@concord.org">gvsupport@concord.org</a>.');
      jQuery('#collection-1').html('<p style="font-weight: bold; margin: 0 12px 0;">Geniventure coming soon: The dragons will be released August 2019.</p><p style="margin: 0 12px 30px;">Want to be notified when Geniventure becomes freely available? Add your name to <a href="https://www.surveymonkey.com/r/GVSummer2019" title="Get notified when Geniventure is available">our announcement list</a>!</p>');
      jQuery('#direct-links, #handouts, #student-materials-1, #teacher-edition-links, #teacher-guides-1, #teacher-guides-2').remove();
    }
  },
  header: 'Modules'
});

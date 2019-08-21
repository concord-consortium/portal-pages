jQuery(document).ready(function () {
  jQuery('.collapsible').hide()
  jQuery('.collapsible-toggle').css({ 'cursor': 'pointer' }).click(function () {
    var toggleTop = jQuery(this).offset().top
    jQuery(this).toggleClass('open')
    jQuery('html,body').animate({ scrollTop: toggleTop }, 'slow')
    jQuery(this).siblings('.collapsible').slideToggle('fast')
  })
})

// Don't show teacher edition to non-teacher users.
if (Portal.currentUser.isTeacher) {
  PortalPages.MakeTeacherEditionLinks('#teacher-edition-links a')
  PortalPages.renderMaterialsCollection(72, '#collection-2', {
    limit: 20,
    onDataLoad: function (materials) {},
    header: ''
  })
} else {
  jQuery('#teacher-edition-links, #lga-1, #lga-2').remove()
  jQuery('#prepare').html('The best way to prepare for Geniventure is to play the game yourself. The Geniventure self-paced online course steps you through the game and presents practical teaching tips. Learn the structure of the game, the progression of concepts, the different types of challenges, and various teaching strategies. <em>To access the online course, you must log in as a teacher.</em> Ready to get started? See our <a href="https://docs.google.com/document/d/1zMweS4gD9rDb6_nZLlCAJnE0Z2gICzorCGAa1LqDolo/" target="_blank">Quick Start Guide</a>.')
  jQuery('.view-resources').css({ 'float': 'none' })
  jQuery('#get-started').html('<strong style="font-weight: 500">Ready to get started?</strong> See our <a href="https://docs.google.com/document/d/1zMweS4gD9rDb6_nZLlCAJnE0Z2gICzorCGAa1LqDolo/" target="_blank">Quick Start Guide</a>. Additional resources are available to registered teachers!')
  jQuery('#collection-2-heading').remove()
}

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(71, '#collection-1', {
  limit: 20,
  onDataLoad: function (materials) {
    if (materials.length <= 0) {
      jQuery('#collection-1').html('<p style="font-weight: bold; margin: 0 12px 0;">Geniventure coming soon: The dragons will be released August 2019.</p><p style="margin: 0 12px 30px;">Want to be notified when Geniventure becomes freely available? Add your name to <a href="https://www.surveymonkey.com/r/GVSummer2019" title="Get notified when Geniventure is available">our announcement list</a>!</p>')
    }
  },
  header: ''
})

if (jQuery('#collection-1').html() === '') {
  PortalPages.renderMaterialsCollection(71, '#collection-1')
}

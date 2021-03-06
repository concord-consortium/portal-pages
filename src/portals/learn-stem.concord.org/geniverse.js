// Last argument is number of visible materials.
PortalComponents.renderMaterialsCollection(2, '#collection-1')

jQuery(document).ready(function () {
  var pageIntro
  if (Portal.currentUser.isLoggedIn) {
    if (Portal.currentUser.isStudent) {
      pageIntro = jQuery('.portal-pages-collection-page-intro').parent('div')
      jQuery('.portal-pages-collection-page-intro').remove()
      pageIntro.append('<div class="portal-pages-collection-page-intro col-12"><h1>Geniverse</h1></div>')
    } else {
      pageIntro = jQuery('.portal-pages-collection-page-intro').parent('div')
      jQuery('.portal-pages-collection-page-intro').remove()
      pageIntro.html('<div class="portal-pages-collection-page-intro col-12"><h1 class="page-title">Geniverse</h1><p class="tagline">Explore heredity and genetics by experimenting with breeding and studying virtual dragons.</p><p>Looking for classroom materials, lesson plans, teacher guides, FAQs and more? Check out <a href="http://geniverse.concord.org/geniversity/"><strong>Geniversity</strong></a>, our teacher support website.</p><p>Give your students access to Geniverse by clicking the activity link below, then clicking the "Assign to Class" button.</p></div>')
    }
  }
})

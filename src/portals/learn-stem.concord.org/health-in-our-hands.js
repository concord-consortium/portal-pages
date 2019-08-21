jQuery(document).ready(function () {
  jQuery('.collapsible').hide()
  jQuery('.collapsible-toggle').css({ 'cursor': 'pointer' }).click(function () {
    var toggleTop = jQuery(this).offset().top
    jQuery(this).toggleClass('open')
    jQuery('html,body').animate({ scrollTop: toggleTop }, 'slow')
    jQuery(this).siblings('.collapsible').slideToggle('fast')
  })
})

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(54, '#collection-1', {
  limit: 20,
  onDataLoad: function (materials) {
    jQuery('.portal-pages-finder-materials-collection-item__description').each(function (index) {
      let descText = jQuery(this).children('p:first-child').text()
      let newDescText = newDesc(descText, 420, '')
      jQuery(this).children('p:first-child').html(newDescText)
    })
  }
})

let newDesc = function (text, limit, standardsList) {
  if (text.length > limit) {
    for (let i = limit; i > 0; i--) {
      if (text.charAt(i) === ' ' && (text.charAt(i - 1) !== ',' || text.charAt(i - 1) !== '.' || text.charAt(i - 1) !== '')) {
        if (standardsList !== '') {
          return text.substring(0, i) + '&hellip <span class="more-link" onclick="jQuery(this).closest(\'.portal-pages-finder-materials-collection-item__description\').siblings(\'.portal-pages-finder-materials-collection-item__title\').children(\'a\')[0].click()">Read more&nbsp&raquo</span><br /><br /><strong>STANDARDS</strong><br />' + standardsList
        } else {
          return text.substring(0, i) + '&hellip <span class="more-link" onclick="jQuery(this).closest(\'.portal-pages-finder-materials-collection-item__description\').siblings(\'.portal-pages-finder-materials-collection-item__title\').children(\'a\')[0].click()">Read more&nbsp&raquo</span>'
        }
      }
    }
  } else {
    return text + ' <span class="more-link" onclick="jQuery(this).closest(\'.portal-pages-finder-materials-collection-item__description\').siblings(\'.portal-pages-finder-materials-collection-item__title\').children(\'a\')[0].click()">Read more&nbsp&raquo</span>'
  }
}

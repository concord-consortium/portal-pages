// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(52, '#collection-1', {
  limit: 20,
  onDataLoad: function (materials) {
    jQuery('.portal-pages-finder-materials-collection-item__description').each(function() {
      let descText = jQuery(this).children('p:first-child').html()
      let standardsList = jQuery(this).children('p:last-child').children('a:first-child').attr('href')
      standardsList = standardsList.replace('#','')
      standardsList = standardsList.replace(/,/g,', ')
      standardsList = decodeURIComponent(standardsList)
      let newDescText = newDesc(descText, 210, standardsList)
      jQuery(this).children('p:first-child').html(newDescText)
    });
  }
});

let newDesc = function(text, limit, standardsList) {
console.log(standardsList)
  if (text.length > limit) {
    for (let i = limit; i > 0; i--) {
      if (text.charAt(i) === ' ' && (text.charAt(i-1) != ','||text.charAt(i-1) != '.'||text.charAt(i-1) != ';')) {
        return text.substring(0, i) + '&hellip; <span class="more-link" onclick="jQuery(this).closest(\'.portal-pages-finder-materials-collection-item__description\').siblings(\'.portal-pages-finder-materials-collection-item__title\').children(\'a\')[0].click()">Read more&nbsp;&raquo;</span><br /><br /><strong>STANDARDS</strong><br />' + standardsList
      }
    }
  } else {
    return text
  }
};

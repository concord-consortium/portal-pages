PortalPages.renderPageHeader({
  isCollections: true,
  fadeIn: 1000
}, 'page-header');

PortalPages.renderPageFooter({
  fadeIn: 1000
}, 'page-footer');

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(23, '#collection-1', {
  limit: 20,
  onDataLoad: function (materials) {},
  header: 'Teaching Teamwork Field Test'
});

PortalPages.renderMaterialsCollection(26, '#collection-2', {
  limit: 20,
  onDataLoad: function (materials) {},
  header: 'Additional Activities'
});

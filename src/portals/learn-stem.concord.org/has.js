PortalPages.renderPageHeader({
  isCollections: true,
  fadeIn: 1000
}, 'page-header');

// Last argument is number of visible materials.
PortalPages.renderMaterialsCollection(20,'#collection-1',{limit: 10, randomize: true});

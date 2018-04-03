// renderMaterialsCollection(collectionID, renderSelector, options)
// options = { limit, featured, randomize };

var params = PortalPages.ParseQueryString();
// example: http://learn.concord.org/has?prioritize=80
var featured = params.prioritize || params.featured;
var options = { limit: 10, randomize: true };

if (featured) options.featured = featured;

// 20 is collection_id on learn.concord.org.  Use 13 for learn.staging.concord.org
PortalPages.renderMaterialsCollection(20,'#collection-1', options);

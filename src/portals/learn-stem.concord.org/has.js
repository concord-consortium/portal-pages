// renderMaterialsCollection(collectionID, renderSelector, options)
// options = { limit, featured, randomize };

var params = PortalComponents.ParseQueryString()
// example: http://learn.concord.org/has?prioritize=80
var featured = params.prioritize || params.featured
var options = { limit: 10, randomize: true }

if (featured) options.featured = parseInt(featured)

// 20 is collection_id on learn.concord.org.  Use 13 for learn.staging.concord.org
PortalComponents.renderMaterialsCollection(20, '#collection-1', options)

// Last argument is an options hash of { limit, featured, randomize };
// example: http://has.portal.concord.org/?prioritize=80&priority_type=external_activity

var params = PortalPages.ParseQueryString();
var featured = params.prioritize || params.featured;
var options = { limit: 10, randomize: true };

if (featured) options.featured = featured;

PortalPages.renderMaterialsCollection(20,'#collection-1', options);

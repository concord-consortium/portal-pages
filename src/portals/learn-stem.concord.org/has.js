// Last argument is an options hash of { limit, featured, randomize };
// example: http://has.portal.concord.org/?prioritize=80&priority_type=external_activity

var params = {}
if (PortalPages.ParseQueryString) {
  params = PortalPages.ParseQueryString()
}
var featured = params['prioritize']
var options = { limit: 10, randomize: true }

if (featured) options.featured = parseInt(featured)

PortalPages.renderMaterialsCollection(20, '#collection-1', options)

PortalPages.renderMaterialsCollection(53, '#collection-2', {
  limit: 20,
  onDataLoad: function (materials) {
    if (materials.length <= 0) {
      jQuery('.collection-2').remove()
    }
  },
  header: ''
})

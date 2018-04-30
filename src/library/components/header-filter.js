var Component = require('../helpers/component')

var div = React.DOM.div
var span = React.DOM.span

var HeaderFilter = Component({
  handleClear: function () {
    this.props.toggleFilter(this.props.type, this.props.filter)
  },

  render: function () {
    return div({className: 'portal-pages-finder-header-filter'},
      this.props.filter.title,
      span({onClick: this.handleClear})
    )
  }
})

module.exports = HeaderFilter

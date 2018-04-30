var Component = require('../helpers/component')

var ResourceLightbox = require('./resource-lightbox')
var ResourceType = require('./resource-type')
var GradeLevels = require('./grade-levels')
var Lightbox = require('../helpers/lightbox')

var div = React.DOM.div
var img = React.DOM.img
var a = React.DOM.a
var i = React.DOM.i

// vars for special treatment of hover and click states on touch-enabled devices
var pageScrolling = false
var touchInitialized = false

var StemFinderResult = Component({
  getInitialState: function () {
    return {
      hovering: false,
      favorited: this.props.resource.is_favorite,
      lightbox: false
    }
  },

  componentDidMount: function () {
    document.body.addEventListener('touchstart', this.handleTouchStart)
    document.body.addEventListener('touchmove', this.handleTouchMove)
    document.body.addEventListener('touchend', this.handleTouchEnd)
  },

  componentWillUnmount: function () {
    document.body.removeEventListener('touchstart', this.handleTouchStart)
    document.body.removeEventListener('touchmove', this.handleTouchMove)
    document.body.removeEventListener('touchend', this.handleTouchEnd)
  },

  handleTouchStart: function (e) {
    e.stopPropagation()
    touchInitialized = true
    pageScrolling = false
  },

  handleTouchMove: function (e) {
    e.stopPropagation()
    touchInitialized = true
    pageScrolling = true
  },

  handleTouchEnd: function (e) {
    e.stopPropagation()
    if (pageScrolling) {

    }
  },

  handleMouseOver: function (e) {
    if (this.state.lightbox) {
      return
    }
    if (touchInitialized === false && pageScrolling === false) {
      this.setState({hovering: true})
    }
  },

  handleMouseOut: function () {
    if (this.state.lightbox) {
      return
    }
    this.setState({hovering: false})
  },

  toggleLightbox: function (e) {
    e.preventDefault()
    e.stopPropagation()
    var lightbox = !this.state.lightbox

    this.setState({
      lightbox: lightbox,
      hovering: false
    })

    // mount/unmount lightbox outside of homepage content
    if (lightbox && pageScrolling === false) {
      var resourceLightbox = ResourceLightbox({
        resource: this.props.resource,
        toggleLightbox: this.toggleLightbox
      })
      Lightbox.open(resourceLightbox)
      ga('send', 'event', 'Home Page Resource Card', 'Click', this.props.resource.name)
    } else {
      Lightbox.close()
      // reset touchInitialized for touch screen devices with mouse or trackpad
      touchInitialized = false
    }
  },

  toggleFavorite: function (e) {
    e.preventDefault()
    e.stopPropagation()

    if (!Portal.currentUser.isLoggedIn || !Portal.currentUser.isTeacher) {
      var mouseX = e.pageX + 31
      var mouseY = e.pageY - 23
      jQuery('body').append('<div class="portal-pages-favorite-tooltip">Log in or sign up to save resources for quick access!</div>')
      jQuery('.portal-pages-favorite-tooltip').css({'left': mouseX + 'px', 'top': mouseY + 'px'}).fadeIn('fast')

      window.setTimeout(function () {
        jQuery('.portal-pages-favorite-tooltip').fadeOut('slow', function () { jQuery(this).remove() })
      }, 3000)
      return
    }

    var resource = this.props.resource
    var done = function () {
      resource.is_favorite = !resource.is_favorite
      this.setState({favorited: resource.is_favorite})
    }.bind(this)
    if (resource.is_favorite) {
      jQuery.post('/api/v1/materials/remove_favorite', {favorite_id: resource.favorite_id}, done)
    } else {
      jQuery.post('/api/v1/materials/add_favorite', {id: resource.id, material_type: resource.class_name_underscored}, done)
    }
  },

  renderFavoriteStar: function () {
    var active = this.state.favorited ? ' portal-pages-finder-result-favorite-active' : ''
    return div({className: 'portal-pages-finder-result-favorite' + active, onClick: this.toggleFavorite},
      i({className: 'icon-favorite'})
    )
  },

  render: function () {
    var resource = this.props.resource
    var options = {href: resource.stem_resource_url}

    if (this.state.hovering || this.state.lightbox) {
      return div({className: 'portal-pages-finder-result col-4', onClick: this.toggleLightbox, onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut},
        a(options,
          div({className: "portal-pages-finder-result-description"},
            div({className: "title"}, resource.name),
            div({}, resource.filteredShortDescription)
          ),
          this.renderFavoriteStar()
        ),
        GradeLevels({resource: resource}),
        this.renderFavoriteStar()
      )
    }
    return div({className: 'portal-pages-finder-result col-4', onClick: this.toggleLightbox, onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut},
      a(options,
        div({className: 'portal-pages-finder-result-image-preview'},
          img({alt: resource.name, src: resource.icon.url}),
          ResourceType({resource: resource})
        ),
        div({className: 'portal-pages-finder-result-name'}, resource.name),
        this.renderFavoriteStar()
      ),
      GradeLevels({resource: resource})
    )
  }
})

module.exports = StemFinderResult

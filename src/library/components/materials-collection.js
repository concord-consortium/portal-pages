/*
{div} = React.DOM

{div} = React.DOM

{div, a, img} = React.DOM

{div, table, tbody, tr, td, span} = React.DOM

{div, i, span} = React.DOM

{div, li, i, h3, h4} = React.DOM

window.SMaterialDetailsClass = React.createClass
  displayName: "SMaterialDetailsClass"
  toggle: (event) ->
    window.toggleDetails jQuery(event.target)

  toggleFromChild: (event) ->
    window.toggleDetails jQuery(event.target.parentElement)

  hasActivitiesOrPretest: ->
    @props.material.has_activities || @props.material.has_pretest

  getMaterialDescClass: ->
    "material-description #{if @hasActivitiesOrPretest() then 'two-cols' else 'one-col'}"

  renderActivities: ->
    activities = (@props.material.activities || []).map (activity) ->
      (li {key: activity.id}, activity.name) if activity?

  render: ->
    material = @props.material
    (div {className: 'toggle-details', onClick: @toggle},
      (i {className: 'toggle-details-icon fa fa-chevron-down', onClick: @toggleFromChild})
      (i {className: 'toggle-details-icon fa fa-chevron-up', style: {display: 'none'}, onClick: @toggleFromChild})
      (div {className: 'material-details', style: {display: 'none'}},
        (div {className: @getMaterialDescClass()},
          (h3 {}, 'Description')
          # It's already sanitized by server!
          (div {dangerouslySetInnerHTML: {__html: material.description}})
        )
        (div {className: 'material-activities'},
          if material.has_pretest
            (h4 {}, 'Pre- and Post-tests available.')
          if material.activities.length > 0
            (div {},
              (h3 {}, 'Activities')
              @renderActivities()
            )
        )
      )
    )

window.SMaterialDetails = React.createFactory SMaterialDetailsClass

window.SMaterialBodyClass = React.createClass
  displayName: "SMaterialBodyClass"
  renderMaterialUsage: ->
    classCount = @props.material.class_count
    if classCount?
      (div {},
        (i {},
          if classCount is 0
            'Not used in any class.'
          else if classCount == 1
            'Used in 1 class.'
          else
            'Used in ' + classCount + ' classes.'
        )
      )

  renderRequiredSensors: ->
    sensors = @props.material.sensors
    if sensors? and sensors.length > 0
      (div {className: 'required_equipment_container'},
        (span {}, 'Required sensor(s):')
        (span {style: {fontWeight: 'bold'}}, sensors.join(', '))
      )

  render: ->
    (div {className: 'material_body'},
      @renderMaterialUsage()
      @renderRequiredSensors()
    )

window.SMaterialBody = React.createFactory SMaterialBodyClass


window.SMaterialInfoClass = React.createClass
  displayName: "SMaterialInfoClass"
  renderLinks: ->
    material = @props.material
    for own key, link of material.links
      link.key = key

    links = []
    links.push material.links.preview           if material.links.preview
    links.push material.links.print_url         if material.links.print_url
    if material.lara_activity_or_sequence
      links.push material.links.external_lara_edit if material.links.external_lara_edit
    else
      links.push material.links.external_edit if material.links.external_edit
    links.push material.links.external_copy     if material.links.external_copy
    links.push material.links.teacher_guide     if material.links.teacher_guide
    links.push material.links.assign_material   if material.links.assign_material
    links.push material.links.assign_collection if material.links.assign_collection
    links.push material.links.unarchive         if material.links.unarchive

    (SMaterialLinks {links: links})

  renderParentInfo: ->
    if @props.material.parent
      (span {}, "from #{@props.material.parent.type} \"#{@props.material.parent.name}\"")

  renderAuthorInfo: ->
    credits = if @props.material.credits?.length > 0
      @props.material.credits
    else if @props.material.user?.name.length > 0
      @props.material.user.name
    else
      null
    if credits
      (div {},
        (span {style: {fontWeight: 'bold'}}, "By #{credits}")
      )

  renderClassInfo: ->
    assignedClassess = @props.material.assigned_classes
    if assignedClassess? and assignedClassess.length > 0
      (span {className: 'assignedTo'}, "(Assigned to #{assignedClassess.join(', ')})")

  render: ->
    (div {},
      (div {style: {overflow: 'hidden'}},
        (table {width: '100%'},
          (tbody {},
            (tr {}, (td {},
              @renderLinks()
            ))
            (tr {}, (td {},
              (SMaterialHeader {material: @props.material})
              @renderParentInfo()
              @renderAuthorInfo()
            ))
            (tr {}, (td {},
              @renderClassInfo()
            ))
          )
        )
      )
    )


window.SMaterialIconClass = React.createClass

  displayName: "SMaterialIconClass"

  render: ->

    material        = @props.material
    icon            = material.icon
    starred         = material.is_favorite

    configuration   = @props.configuration
    enableFavorites = false
    favOutlineClass    = ""

    #
    # Get display configuration info.
    #
    if configuration
        enableFavorites = configuration.enableFavorites
        favClassMap     = configuration.favoriteClassMap
        favOutlineClass = configuration.favoriteOutlineClass
    else
        #
        # Set some defaults
        #
        favClassMap = {
            true:   "stem-finder-result-favorite-active",
            false:  "stem-finder-result-favorite"
        }

    #
    # Set the icon image
    #
    if icon.url is null
        border = '1px solid black'
    else
        border = '0px'

    containerStyle = { 'border': border }

    #
    # Check for caller overrides
    #
    for prop in ['width', 'height']
        if configuration[prop]
            containerStyle[prop] = configuration[prop]

    #
    # Create the favorites div if enabled.
    #
    if enableFavorites

        #
        # Set favorite info.
        #
        favClass        = favClassMap[false]
        favStar         = "\u2605"
        outlineStar     = "\u2606"
        if starred
            favClass += " " + favClassMap[true]
        else
            outlineClass = favClass + " " + favOutlineClass

        favDiv = (div { className:  favClass,       \
                        onClick:    @handleClick,   \
                        dangerouslySetInnerHTML: {__html: favStar} } )
        if ! starred
            outlineDiv = (div { className: outlineClass,    \
                            style: {color: '#CCCCCC'},      \
                            onClick:    @handleClick,       \
                            dangerouslySetInnerHTML: {__html: outlineStar} } )

    (div {  className: 'material_icon', style: containerStyle },

        (a {className: 'thumb_link', href: material.links.browse && material.links.browse.url},
            (img {  src: icon.url, width: '100%'})
        )
        favDiv
        outlineDiv
    )

  handleClick: ->
    material = @props.material

    apiUrl 	= null
    params	= {}

    if !Portal.currentUser.isTeacher
        alert("You must be logged in as a teacher to favorite material.");
        return

    if material.is_favorite
        apiUrl = Portal.API_V1.MATERIALS_REMOVE_FAVORITE
        params = {  favorite_id:    material.favorite_id    }
    else
        apiUrl = Portal.API_V1.MATERIALS_ADD_FAVORITE
        params = {  id:             material.id,                    \
                    material_type:  material.class_name_underscored }

    jQuery.ajax
      url: apiUrl
      data: params
      dataType: 'json'
      success: (data) =>
        material.is_favorite = !material.is_favorite
        material.favorite_id = data.favorite_id
        @setState { material: material }
      error: (jqXHR, textStatus, errorThrown) =>
        console.error("ERROR", jqXHR.responseText, jqXHR)

window.SMaterialIcon = React.createFactory SMaterialIconClass


window.SMaterialClass = React.createClass
  displayName: "SMaterialClass"
  render: ->
    material = @props.material

    configuration = {
        enableFavorites:    true,
        favoriteClassMap:   {
            true:   "legacy-favorite-active",
            false:  "legacy-favorite"
        },
        favoriteOutlineClass:   "legacy-favorite-outline"
    }

    (div {
        className: 'material_list_item'
        'data-material_id': material.id
        'data-material_name': material.name
        id: "search_#{material.class_name_underscored}_#{material.id}"
      },
      (div {className: 'main-part'},
        (SMaterialIcon {material: material, \
                        configuration: configuration } )
        (SMaterialInfo {material: material})
        (SMaterialBody {material: material})
      )
      (SMaterialDetails {material: material})
    )

window.SMaterial = React.createFactory SMaterialClass


window.SMaterialsListClass = React.createClass
  displayName: "SMaterialsListClass"
  render: ->
    (div {className: 'material_list'},
      for material in @props.materials
        (SMaterial {material: material, key: "#{material.class_name}#{material.id}"})
    )


window.MaterialsCollectionClass = React.createClass
  getDefaultProps: ->
    randomize: false
    limit: Infinity
    header: null
    # Optional callback executed when materials collection is downloaded
    onDataLoad: null

  getInitialState: ->
    materials: []
    truncated: true

  componentDidMount: ->
    {randomize, onDataLoad} = @props
    jQuery.ajax
      url: Portal.API_V1.MATERIALS_BIN_COLLECTIONS
      data: id: @props.collection
      dataType: 'json'
      success: (data) =>
        materials = data[0].materials
        materials = shuffle(materials) if randomize
        onDataLoad(materials) if onDataLoad
        @setState materials: materials if @isMounted()

  toggle: (e) ->
    @setState truncated: not @state.truncated
    e.preventDefault()

  getMaterialsList: ->
    if @state.truncated
      @state.materials.slice 0, @props.limit
    else
      @state.materials

  renderTruncationToggle: ->
    return if @state.materials.length <= @props.limit
    chevron = if @state.truncated then 'down' else 'up'
    text = if @state.truncated then ' show all materials' else ' show less'
    (a {className: 'mc-truncate', onClick: @toggle, href: ''},
      (i {className: "fa fa-chevron-#{chevron}"})
      (span {className: 'mc-truncate-text'}, text)
    )

  render: ->
    headerVisible = @props.header && @state.materials.length > 0
    (div {},
      if headerVisible
        (h1 {className: 'collection-header'}, @props.header)
      (SMaterialsList {materials: @getMaterialsList()})
      @renderTruncationToggle()
    )
*/

var Component = require('../helpers/component');

var div = React.DOM.div;
var span = React.DOM.span;

var MaterialsCollection = Component({
  render: function () {
    return div({className: "stem-finder-materials-collection"},
      "Materials Collection"
    );
  }
});

module.exports = MaterialsCollection;
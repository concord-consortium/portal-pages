jQuery(document).ready(function () {
  // add click listener to overlay and close button
  jQuery('#edit-form-frame #close-button, #overlay').click(function () {
    hideTicketForm()
  })

  // decide which content to display based on user type
  if (Portal.currentUser.isLoggedIn) {
    jQuery('#intro').html('')
    jQuery('#intro').html('<div id="uwp-top"><img src="https://concord.org/sites/default/files/images/ast/students.jpg" alt="Ambitious Science Teaching" /><h1 class="page-title">Ambitious Science Teaching</h1><p>As a network of elementary, middle and high school science teams, we are aiming to improve students\' written and spoken scientific explanations, models and arguments.</p></div><!-- <div id="uwp-reports-button"><p style="margin-bottom:.675em">To generate an activity report, click the button below.</p><button>Generate Report</button><p style="margin-bottom:0;text-align:center"><small>Please allow up to 24 hours for your report to be generated.</small></p></div>--><div id="uwp-tickets"><h2>Exit Tickets</h2><ul><li>Basic AST Exit Ticket <div class="ticket-links"><a class="uwp-preview-link" href="https://learn.concord.org/eresources/384.run_resource_html" target="_blank">Preview</a> <a class="uwp-create-link" href="https://learn.concord.org/eresources/384/copy" target="_blank">Create</a></div></li><li>Modeling Exit Ticket <div class="ticket-links"><a class="uwp-preview-link" href="https://learn.concord.org/eresources/386.run_resource_html" target="_blank">Preview</a> <a class="uwp-create-link" href="https://learn.concord.org/eresources/386/copy" target="_blank">Create</a></div></li><li>Peer Feedback Exit Ticket <div class="ticket-links"><a class="uwp-preview-link" href="https://learn.concord.org/eresources/387.run_resource_html" target="_blank">Preview</a> <a class="uwp-create-link" href="https://learn.concord.org/eresources/387/copy" target="_blank">Create</a></div></li><li>Structured Talk Exit Ticket <div class="ticket-links"><a class="uwp-preview-link" href="https://learn.concord.org/eresources/388.run_resource_html" target="_blank">Preview</a> <a class="uwp-create-link" href="https://learn.concord.org/eresources/388/copy" target="_blank">Create</a></div></li><li>Assessment Ticket <div class="ticket-links"><a class="uwp-preview-link" href="https://learn.concord.org/eresources/272.run_resource_html" target="_blank">Preview</a> <a class="uwp-create-link" href="https://learn.concord.org/eresources/272/copy" target="_blank">Create</a></div></li><li>Question Bank <div class="ticket-links"><a class="uwp-preview-link" href="https://learn.concord.org/eresources/217.run_resource_html" target="_blank">View</a></div></li></ul></div>')
  }

  retrieveTickets()
})

jQuery(document).ready(function () {
  // set up create link listeners -- disabled for now
  /* jQuery('.uwp-create-link').click(function(e) {
    e.preventDefault();
    var target_url = jQuery(this).attr('href');
    showTicketForm(target_url);
  }); */
  // set up report link listeners
  jQuery('.uwp-report-link').click(function (e) {
    e.preventDefault()
    window.alert('Report links don\'t do anything yet.')
  })
})

function hideTicketForm () {
  jQuery('#overlay, #edit-form-frame').fadeOut('fast')
  // jQuery('#edit-form-frame iframe').attr('src', '');
}

function retrieveTickets () {
  jQuery.ajax({
    url: '/api/v1/search/search',
    data: 'search_term=&sort_order=Newest&model_types=All&investigation_page=1&activity_page=1&interactive_page=1&include_mine=1'
  }).done(function (result) {
    // compile results into an array of resource objects
    var investigation = ''
    var activity = ''
    var interactive = ''
    var resources = []

    var results = result.results

    // get investigations
    var i
    if (typeof results[0] !== 'undefined' && results[0].materials.length > 0) {
      for (i = 0; i < results[0].materials.length; i++) {
        investigation = new Resource(results[0].materials[i], 'Sequence')
        resources.push(investigation)
      }
    }
    // get activities
    if (typeof results[1] !== 'undefined' && results[1].materials.length > 0) {
      for (i = 0; i < results[1].materials.length; i++) {
        activity = new Resource(results[1].materials[i], 'Activity')
        resources.push(activity)
      }
    }
    // get interactives
    if (typeof results[2] !== 'undefined' && results[2].materials.length > 0) {
      for (i = 0; i < results[2].materials.length; i++) {
        interactive = new Resource(results[2].materials[i], 'Interactive')
        resources.push(interactive)
      }
    }

    // sort all resources by name value in ascending alphabetical order
    resources.sort(sortBy('name', false, function (a) {
      return a.toUpperCase()
    }))

    // build output HTML string
    var resultsOutput = ''

    if (resources.length > 0) {
      for (i = 0; i < resources.length; i++) {
        var idStr = createID(resources[i].name)
        var resourceTitle = resources[i].name

        if (resourceTitle.length > 42) {
          resourceTitle = resourceTitle.substr(0, 42) + '...'
        }
        resultsOutput += '<li id="' + idStr + '" class="' + resources[i].classes + '">' + resourceTitle + ' <div class="ticket-links"><a href="' + resources[i].edit_url + '" target="_blank">Edit</a> <a  href="' + resources[i].preview_url + '" target="_blank">Preview</a> <a href="javascript:void(0)" onclick="' + resources[i].assign_url + '">Assign to Class</a> <a href="' + resources[i].copy_url + '" target="_blank">Create New Version</a></div></li>'
      }

      // populate results list with output HTML
      jQuery('#uwp-my-tickets ul').html(resultsOutput)
      jQuery('#uwp-my-tickets-status').remove()
    }

    // var visible_resources = jQuery('#my-tickets li').is(':visible');
  })
}

function sortBy (field, reverse, primer) {
  var key = primer
    ? function (x) { return primer(x[field]) }
    : function (x) { return x[field] }

  reverse = !reverse ? 1 : -1

  return function (a, b) {
    a = key(a)
    b = key(b)
    return reverse * ((a > b) - (b > a))
  }
}

function createID (title) {
  // convert to lower case
  var idStr = title.toLowerCase()

  // replace spaces with dashes
  idStr = idStr.replace(/ /g, '-')
  // replace unwanted characters and punctuation
  idStr = idStr.replace(/[\u2018\u2019]/g, '')
  idStr = idStr.replace(/[\u201C\u201D]/g, '')
  idStr = idStr.replace(/[.,:'()?!;&]/g, '')

  return idStr
}

window.getUrlVars = function getUrlVars (url) {
  var vars = []
  var qs
  var qsVars = url.slice(url.indexOf('?') + 1).split('&amp;')
  for (var i = 0; i < qsVars.length; i++) {
    qs = qsVars[i].split('=')
    vars.push(qs[0])
    vars[qs[0]] = qs[1]
  }
  return vars
}

function Resource (resourceObject) {
  this.id = resourceObject.id
  this.name = resourceObject.name
  this.copy_url = resourceObject.copy_url
  this.preview_url = resourceObject.preview_url
  if (resourceObject.assign_to_class_url) {
    this.assign_url = resourceObject.assign_to_class_url.replace(/^javascript:/, '')
  }
  if (resourceObject.assign_to_collection_url) {
    this.collect_url = resourceObject.assign_to_collection_url.replace(/^javascript:/, '')
  }
  this.edit_url = resourceObject.edit_url
}

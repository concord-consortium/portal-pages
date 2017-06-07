var resource_id_counter = 0, page_init = true, search_term = '', collections = [], resources = [], selected_filters = [], query_params = {};
var filters = {
  'life-sciences': {'classes': '.Biology'},
  'engineering-technology': {'classes': '.Engineering'},
  'earth-space-sciences': {'classes': '.Earth-and-Space-Science'},
  'physical-sciences': {'classes': '.Chemistry,.Physics'},
  'elementary-school': {'classes': '.3-4,.5-6'},
  'middle-school': {'classes': '.7-8'},
  'high-school': {'classes': '.9-12'},
  'higher-education': {'classes': '.Higher-Ed,.13-14'},
  'sequence': {'classes': '.Sequence'},
  'activity': {'classes': '.Activity'},
  'model': {'classes': '.Interactive'},
  'sensor-based': {'classes': '.Sensor-Based'},
  'browser-based': {'classes': '.Browser-Based'},
};
jQuery(document).ready(function () {
  getQSParams();
  if (query_params.subjects || query_params.resource_types || query_params.grade_levels || query_params.keyword) {
    page_init = false;
    setActiveFilters();
  }
  showResources();
  jQuery('#resources').append('<div id="resources-overlay"><a href="#" onclick="showAllMatchingResources(); return false;">Show All Resources</a></div>');
  jQuery('#core-ideas li').each(function () {
    jQuery(this).click(function () {
      if (isDoubleClicked(jQuery(this))) return;
      selectFilter(this.id);
      if (jQuery(this).hasClass('enabled')) {
        var filter_title = jQuery(this).text();
        _gaq.push(['_trackEvent', 'Home Page Filter', 'Click', filter_title]);
      }
    });
    jQuery(this).css({'cursor': 'pointer'});
  });
  jQuery('#grade-levels li').each(function () {
    jQuery(this).click(function () {
      if (isDoubleClicked(jQuery(this))) return;
      selectFilter(this.id);
      if (jQuery(this).hasClass('enabled')) {
        var filter_title = jQuery(this).text();
        _gaq.push(['_trackEvent', 'Home Page Filter', 'Click', filter_title]);
      }
    });
    jQuery(this).css({'cursor': 'pointer'});
  });
  jQuery('#resource-types li').each(function () {
    jQuery(this).click(function () {
      if (isDoubleClicked(jQuery(this))) return;
      selectFilter(this.id);
      if (jQuery(this).hasClass('enabled')) {
        var filter_title = jQuery(this).text();
        _gaq.push(['_trackEvent', 'Home Page Filter', 'Click', filter_title]);
      }
    });
    jQuery(this).css({'cursor': 'pointer'});
  });
  var show_more = '<div class="show-more"></div>';
  var show_more_bg = '<div class="show-more-bg"></div>';

  jQuery('body').append(show_more).append(show_more_bg);
  jQuery.ajax({
    url: '/api/v1/projects',
    dataType: 'json'
  }).done(function (data) {
    var card_li;
    collections = data.sort(sortBy('name', false, function(a){return a.toUpperCase();}));
    jQuery(collections).each(function(index) {
      if (collections[index].public && collections[index].landing_page_slug !== null) {
        card_li = '<li><a href="/' + collections[index].landing_page_slug + '"><h3><img alt="' + collections[index].name + '" src="' + collections[index].project_card_image_url + '"/>' + collections[index].name + '</h3><p>' + collections[index].project_card_description + '</p></a></li>';
        jQuery('#collections-cards').append(card_li);
      }
    });
  });

  if (!Portal.currentUser.isLoggedIn) {
    jQuery('#lead.project-header').append('<div id="accounts"><a href="/help" id="help-link">Help</a> <a href="javascript:void(0);" onclick="Portal.openSignupModal();">Sign Up</a> <a href="#" onclick="Portal.showModal(\'#log-in\'); return false;">Log In</a></div>');
  } else {
    jQuery('#intro p').html('Find the right resources for your learning goals. Create classes, assign activities, track student progress, and more.');
    var accounts_html = '<div class="welcome-box"><table width="100%"><tbody><tr><td><b>Welcome ' + Portal.currentUser.firstName + ' ' + Portal.currentUser.lastName + '</b><br><a href="/help" target="_blank">Help | </a><a id="user-preferences">My Preferences</a> | <a href="/users/sign_out">Logout</a></td></tr></tbody></table></div>';
    jQuery('body').append(accounts_html).css({'background-image': 'url(/assets/styles/bg-body-68a9ea44fd47a61c00a785d854599100.png)'});
    var nav_html = '<div id="nav_top"><span class="hidden doNotPrint">Navigation:</span><ul class="menu_h"><li class="trail" id="home"><a href="/recent_activity">My Classes</a></li><li class="trail"><a href="/">Search</a></li>';
    if (Portal.currentUser.isAdmin) {
      nav_html += '<li class="trail"><a href="/admin">Admin</a></li>';
    }
    nav_html += '<li class="trail"><a href="#collections_menu" onclick="toggleCollectionsMenu();return false;">Collections<span class="collections_menu_arrow">&#x25B6;</span></a></li><li class="trail"><a href="/about">About</a></li><li class="trail"><a href="/help" id="help" target="_blank">Help</a></li></ul></div>';
    jQuery(nav_html).insertAfter('#lead.project-header');

    var collections_menu_html = '<div id="collections_menu" style="font-size:.8em;left: 241.016px; top: 88px; display: none;"><ul></ul></div>';
    jQuery(collections_menu_html).insertAfter('#nav_top');
    jQuery.ajax({
      url: '/api/v1/projects',
      dataType: 'json'
    }).done(function (data) {
      var nav_li;
      collections = data.sort(sortBy('name', false, function(a){return a.toUpperCase();}));
      jQuery(collections).each(function(index) {
        if (collections[index].landing_page_slug !== null) {
          nav_li = '<li><a href="/' + collections[index].landing_page_slug + '">' + collections[index].name + '</a></li>';
          jQuery('#collections_menu ul').append(nav_li);
        }
      });
    });

    jQuery.ajax({
      url: '/auth/user',
      dataType: 'json'
    }).done(function (data) {
      var link_url = '/users/' + data.id + '/preferences';
      jQuery('#user-preferences').attr('href', link_url);
    });
  }
});
function toggleCollectionsMenu() {
  jQuery('#collections_menu').toggle();
  if (jQuery('.collections_menu_arrow').html() == '▶') {
    jQuery('.collections_menu_arrow').html('▼');
  } else {
    jQuery('.collections_menu_arrow').html('▶');
  }
}
function showAllMatchingResources() {
  jQuery('#resources-overlay').fadeOut();
  jQuery('#resources').css({'height': 'auto'});
}
function searchResources() {
  selected_filters = [];
  setQSParams();
  search_term = jQuery('#keyword').val();
  var qstr = 'search_term=' + search_term + '&sort_order=Alphabetical&include_official=1&model_types=All&investigation_page=1&activity_page=1&interactive_page=1&per_page=9999';
  retrieveResources(qstr);
  if (search_term !== '') {
    _gaq.push(['_trackEvent', 'Home Page Search', 'Search', search_term]);
  }
}
function retrieveResources(qstr) {
  jQuery('#resource-list-status').html('').fadeOut('slow');
  jQuery('#resources ul').html('');
  toggleFilters('disable');
  jQuery('#loading').fadeIn(100);
  jQuery.ajax({
    url: '/api/v1/search/search',
    data: qstr,
    dataType: 'json'
  }).done(function (result, text_status, jq_xhr) {
    if (jq_xhr.status == 401) {
      var reload_url = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
      if (query_params.subjects !== '' || query_params.resource_types !== '' || query_params.grade_levels !== '' || query_params.keyword !== '') {
        reload_url = reload_url + '?' + jQuery.param(query_params);
      }
      window.location.href = reload_url;
    }
    //compile results into an array of resource objects
    var investigation = '', activity = '', interactive = '', results = [], resources = [], i;
    results = result.results;
    //get investigations
    if (typeof results[0] != 'undefined' && results[0].materials.length > 0) {
      for (i = 0; i < results[0].materials.length; i++) {
        investigation = new Resource(results[0].materials[i], 'Sequence');
        resources.push(investigation);
      }
    }
    //get activities
    if (typeof results[1] != 'undefined' && results[1].materials.length > 0) {
      for (i = 0; i < results[1].materials.length; i++) {
        activity = new Resource(results[1].materials[i], 'Activity');
        resources.push(activity);
      }
    }
    // get interactives
    if (typeof results[2] != 'undefined' && results[2].materials.length > 0) {
      for (i = 0; i < results[2].materials.length; i++) {
        interactive = new Resource(results[2].materials[i], 'Interactive');
        resources.push(interactive);
      }
    }
    // sort all resources by name value in ascending alphabetical order
    resources.sort(sortBy('name', false, function (a) {
      if (!!a) {
        return a.toUpperCase();
      }
    }));
    // build output HTML string
    var results_output = '';
    for (i = 0; i < resources.length; i++) {
      if (resources[i].subject_areas !== '') { // omit untagged resources
        var id_str = createID(resources[i].name);
        var resource_title = resources[i].name;
        if (resource_title.length > 42) {
          resource_title = resource_title.substr(0, 45) + '...';
        }
        var preview_button_text = resources[i].requires_java ? 'Download &amp; Preview' : 'Preview';
        results_output += '<li id="' + id_str + '" class="' + resources[i].classes + '" onclick="toggleMoreDetail(jQuery(this), \'' + id_str + '\');" data-system-id="' + resources[i].id + '" data-metadata="' + resources[i].extra_data + '"><a href="#' + id_str + '" onclick="return false;"><div class="image-wrap" style="background: #fef7e0 url(\'' + resources[i].icon_url + '\') center center no-repeat; background-size: cover;"></div><strong class="title">' + resource_title + '</strong> <span class="description">' + resources[i].short_description + '<br /><br />Resource Type: ' + resources[i].resource_type + '</span> Grade Level: ' + resources[i].grade_levels + '</a><div class="more-details"><div class="overview"><div class="slideshow" style="background: #fff url(\'' + resources[i].icon_url + '\') no-repeat center center; background-size: cover;">';
        if (!!resources[i].no_save) {
          results_output += '<p class="no-save">PLEASE NOTE: This activity can be assigned, but student responses will not be saved.</p>';
        }
        results_output += '</div><div class="description"><h2>' + resources[i].name + '</h2><p>' + resources[i].description + '</p><p><a class="button" href="' + resources[i].preview_url + '" target="_blank" onclick="_gaq.push([\'_trackEvent\',\'Resource Preview Button\',\'Click\',\'' + resources[i].name + '\']);">' + preview_button_text + '</a> ';
        if (!!resources[i].assign_url) {
          results_output += '<a class="button" href="javascript:void(0)" onclick="' + resources[i].assign_url + ';_gaq.push([\'_trackEvent\',\'Assign to Class Button\',\'Click\',\'' + resources[i].name + '\']);return false;">Assign to Class</a> ';
        }
        if (!!resources[i].teacher_guide_url) {
          results_output += '<a href="' + resources[i].teacher_guide_url + '" target="_blank" onclick="_gaq.push([\'_trackEvent\',\'Teacher Guide Link\',\'Click\',\'' + resources[i].name + '\']);">Teacher Guide</a>';
        }
        results_output += '</p><ul class="privileged-links">';
        if (!!resources[i].collect_url) {
          results_output += '<li class="add-to-collection-link"><a href="javascript:void(0)" onclick="' + resources[i].collect_url + ';_gaq.push([\'_trackEvent\',\'Add to Collection Button\',\'Click\',\'' + resources[i].name + '\']);return false;">Add to Collection</a></li>';
        }
        if (!!resources[i].edit_url) {
          results_output += '<li class="edit-link"><a href="' + resources[i].edit_url + '" target="_blank">Edit Resource</a></li>';
        }
        results_output += '</ul>';
        results_output += '</div></div><div class="details"><div class="col"><dl><dt>Subject</dt><dd>' + resources[i].subject_areas + '</dd><dt>Grade Level</dt><dd>' + resources[i].grade_levels + '</dd><dt>Requirements</dt><dd>' + resources[i].requirements + '</dd></dl></div><div class="col"><dl><dt>Author</dt><dd>The Concord Consortium</dd><dt>License</dt><dd>CC BY 4.0</dd>';
        if (!!resources[i].no_save) {
          results_output += '<dt>Please Note</dt><dd>This activity can be assigned, but student responses will not be saved.</dd>';
        }
        results_output += '</dl></div></div></li>';
      }
    }
    jQuery('#resources ul').html(results_output);
    if (jQuery('#resources ul li').length < 1) {
      jQuery('#resource-list-status').html('Sorry. No matches found.').fadeIn('slow');
    }
    if (page_init) {
      var visible_resources = jQuery('#resources li').is(':visible');
      var resources_height = (visible_resources.length / 4) * 250 + 100;
      jQuery('#resources').css({'height': resources_height + 'px'});
      page_init = false;
    } else {
      showAllMatchingResources();
    }
    toggleFilters('enable');
    jQuery('#resources #resources-list > li').each(function (index) {
      var res_id = '', metadata_path = '';
      res_id = jQuery(this).attr('data-system-id');
      metadata_path = jQuery(this).attr('data-metadata');
      var add_data_obj = getFullDesc(res_id, metadata_path);
    });
    if (selected_filters.length > 0) {
      for (i = 0; i < selected_filters.length; i++) {
        selectFilter(selected_filters[i]);
      }
    }
    jQuery('#loading').fadeOut();
    jQuery('#resources ul#resource-list').fadeIn();
  });
}
function createID(title) {
  // convert to lower case
  var id_str = title.toLowerCase();
  // remove leading non-alphabetic characters
  id_str = id_str.replace(/^[^a-zA-Z]+/, '');
  // replace spaces with dashes
  id_str = id_str.replace(/ /g, '-');
  // replace unwanted characters and punctuation
  id_str = id_str.replace(/[\u2018\u2019]/g, '');
  id_str = id_str.replace(/[\u201C\u201D]/g, '');
  id_str = id_str.replace(/[.,:'()?!;&]/g, '');
  // add unique numeral to ensure uniqueness of ID
  id_str = id_str + '-' + resource_id_counter;
  resource_id_counter++;
  return id_str;
}
function sortBy(field, reverse, primer) {
  var key = primer ?
      function (x) {
        return primer(x[field]);
      } :
      function (x) {
        return x[field];
      };
  reverse = !reverse ? 1 : -1;
  return function (a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  };
}
function toggleMoreDetail(link_id, resource_id) {
  if (isDoubleClicked(link_id)) return;
  var li_id = '#' + resource_id;
  if (jQuery(li_id).hasClass('selected')) {
    hideMoreDetail(li_id);
  } else {
    showMoreDetail(li_id);
  }
}
function showMoreDetail(li_id) {
  showAllMatchingResources();
  var before = false;
  jQuery('.show-more').hide();
  //clear all selected classes
  jQuery('#resources ul > li').not('#resources ul li ul li').each(function () {
    if (jQuery(this).hasClass('selected')) {
      jQuery(this).removeClass('selected');
    }
    jQuery(this).css({'opacity': '.4', 'transform': 'scale(.95,.95)'});
    if (jQuery(this).css('margin-bottom') != '0px' && jQuery(li_id).css('margin-bottom') == '0px') {
      if (jQuery(this).index() < jQuery(li_id).index()) {
        before = true;
        jQuery('.show-more-bg').hide();
      }
    }
  });
  //populate show-more div and push next row down to make space for it
  var li_top = jQuery(li_id).offset().top;
  var ypos = li_top + 260;
  var overview_content = jQuery(li_id).children('div.more-details').html();
  var show_more_content = overview_content + '<div class="tabs"><a class="overview-tab selected-tab" href="#" onclick="showOverview(jQuery(this));_gaq.push([\'_trackEvent\',\'Home Page Resource Tab\',\'Click\',\'Overview\']);return false;">Overview</a> <a href="#" onclick="showDetails(jQuery(this));_gaq.push([\'_trackEvent\',\'Home Page Resource Tab\',\'Click\',\'Details\']);return false;" class="details-tab">Details</a></div><a class="close-link" href="#" onclick="hideMoreDetail(\'' + li_id + '\'); return false;">close</a>';
  jQuery('.show-more').html(show_more_content).css({'top': ypos});
  jQuery('.show-more-bg').css({'top': ypos});
  jQuery(li_id).addClass('selected').css({'opacity': '1.0', 'transform': 'scale(1.05,1.05)'});
  // if clicked li's bottom margin is 0, push next row down
  if (jQuery(li_id).css('margin-bottom') == '0px') {
    var my_siblings = jQuery(li_id).siblings().filter(function () {
      return jQuery(this).offset().top == li_top;
    });
    jQuery(li_id).animate({'margin-bottom': '375px'}, 150);
    jQuery(li_id).siblings().filter(function () {
      return jQuery(this).offset().top == li_top;
    }).animate({'margin-bottom': '375px'}, 150, function () {
      jQuery('html, body').animate({scrollTop: jQuery(li_id).offset().top - 10}, 450);
      jQuery('.overview').show();
      jQuery('.details').hide();
      jQuery('.show-more, .show-more-bg').fadeIn('slow');
    });
    jQuery(li_id).siblings().filter(function () {
      return jQuery(this).offset().top != li_top;
    }).animate({'margin-bottom': '0'}, 100);
    if (before) {
      jQuery('.show-more').animate({'top': ypos - 384}, 100);
      jQuery('.show-more-bg').animate({'top': ypos - 384}, 100);
    } else {
      jQuery('.show-more').animate({'top': ypos}, 100);
      jQuery('.show-more-bg').animate({'top': ypos}, 100);
    }
  } else {
    // autoscroll page to clicked li
    jQuery('html, body').animate({scrollTop: jQuery(li_id).offset().top - 10}, 450);
    jQuery('.overview').show();
    jQuery('.details').hide();
  }
  jQuery(li_id + ' a .description').css({'display': 'none'});
  jQuery('.show-more, .show-more-bg').fadeIn('slow');
}
function hideMoreDetail(li_id) {
  jQuery('#resources ul > li').not('#resources ul li ul li').each(function () {
    jQuery(this).css({'opacity': '1.0', 'transform': 'scale(1,1)'});
    jQuery(this).children('a').children('.description').attr('style', '');
  });
  if (!!li_id) {
    jQuery(li_id).removeClass('selected');
  } else {
    jQuery('#resources li').removeClass('selected');
  }
  jQuery('.show-more, .show-more-bg').fadeOut('fast', function () {
    jQuery('.show-more').html('');
  });
  jQuery('#resources li').not('#resources ul li ul li').animate({'margin-bottom': '0'}, 300);
  if (!!li_id) {
    jQuery('html, body').animate({scrollTop: jQuery(li_id).offset().top - 10}, 450);
  } else {
    jQuery('html, body').animate({scrollTop: jQuery('#search').offset().top - 10}, 450);
  }
}
function showResources() {
  jQuery('#resource-list-status').html('');
  jQuery('#resources ul').empty();
  jQuery('#resources ul#resource-list').hide();
  //jQuery('#keyword').val('');
  var keyword = jQuery('#keyword').val();
  var qstr = 'search_term=' + keyword + '&sort_order=Alphabetical&include_official=1&model_types=All&investigation_page=1&activity_page=1&interactive_page=1&per_page=9999';
  retrieveResources(qstr);
}
function getValue(key, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][0] == key) {
      return array[i][1];
    }
  }
}
function showOverview(link_id) {
  if (isDoubleClicked(link_id)) return;
  jQuery('.overview-tab').addClass('selected-tab');
  jQuery('.details-tab').removeClass('selected-tab');
  jQuery('.details').fadeOut();
  jQuery('.overview').fadeIn();
}
function showDetails(link_id) {
  if (isDoubleClicked(link_id)) return;
  jQuery('.details-tab').addClass('selected-tab');
  jQuery('.overview-tab').removeClass('selected-tab');
  jQuery('.overview').fadeOut();
  jQuery('.details').fadeIn();
}
function getFullDesc(res_id, metadata_path) {
  var full_desc = '';
  var data_url = '/' + metadata_path;
  jQuery.ajax({url: data_url, dataType: 'json'}).done(function (data) {
    full_desc = data.description.replace(/<(?:.|\n)*?>/gim, '');
    if (full_desc !== '') {
      full_desc = full_desc.substr(0, 390);
      var match = full_desc.match(/[\.|\?|\!]/gi);
      var last_index = full_desc.lastIndexOf(match[match.length - 1]);
      full_desc = full_desc.substr(0, last_index) + '.';
      full_desc = full_desc.replace(/&nbsp;/g, ' ');
      jQuery('#resources li[data-metadata="' + metadata_path + '"]').children('.more-details').children('.overview').children('.description').children('p').first().text(full_desc);
    }
  });
}
function toggleFilters(mode) {
  if (mode == 'disable') {
    jQuery('#filter-blocker').show();
  } else {
    jQuery('#filter-blocker').hide();
  }
}
function selectFilter(filter_name) {
  hideMoreDetail();
  if (jQuery('ul#core-ideas').css('zoom') > 0.75) {
    jQuery('html, body').animate({scrollTop: jQuery('#paths').offset().top - 30}, 500);
    jQuery('#grade-levels-container, #resource-types-container').animate({'margin-top': '1em'}, 500);
    jQuery('ul#core-ideas, #core-ideas-heading, #ngss-toggle').animate({
      'margin-top': '0',
      'margin-bottom': '0',
      'zoom': '.75'
    }, 500);
    jQuery('#grade-levels-container, #resource-types-container').animate({'margin-top': '1em'}, 500);
  }
  jQuery('#' + filter_name).toggleClass('enabled');
  if (jQuery('#' + filter_name).hasClass('enabled')) {
    jQuery('#' + filter_name).removeClass('disabled');
    // add to selected filters
    if (selected_filters.indexOf(filter_name) < 0) {
      selected_filters.push(filter_name);
    }
  } else {
    // remove from selected filters
    var index = selected_filters.indexOf(filter_name);
    selected_filters.splice(index, 1);
  }
  filterResources();
}
function filterResources() {
  jQuery('#resource-list-status').html('').fadeOut('fast');
  var core_ideas = [], grade_levels = [], resource_types = [];
  core_ideas = jQuery('#core-ideas li.enabled').map(function () {
    return filters[this.id].classes;
  }).get().join();
  if (jQuery('#core-ideas li.enabled').length > 0) {
    jQuery('#core-ideas li').not('.enabled').addClass('disabled');
  } else {
    jQuery('#core-ideas li').removeClass('disabled');
  }
  grade_levels = jQuery('#grade-levels li.enabled').map(function () {
    return filters[this.id].classes;
  }).get().join();
  resource_types = jQuery('#resource-types li.enabled').map(function () {
    return filters[this.id].classes;
  }).get().join();
  var resources = jQuery('#resources ul#resources-list > li');
  resources.hide();
  if (core_ideas) {
    resources = resources.filter(core_ideas);
  }
  if (grade_levels) {
    resources = resources.filter(grade_levels);
  }
  if (resource_types) {
    //console.resource_types;
    // split resource type filters into two groups: [sequence,activity,model/interactive] and [sensor-based,browser-based]
    // so we can handle the second group differently than other filters (e.g. if model and browser-based filters are
    // selected, only show models that are browser-based.)
    var rtg1 = '', rtg2 = '', rtg3 = '';
    var rta = resource_types.split(',');
    for (var rtc = 0; rtc < rta.length; rtc++) {
      if (rta[rtc] == '.Sensor-Based') {
        rtg2 = rtg2 + rta[rtc] + ',';
      } else if (rta[rtc] == '.Browser-Based') {
        rtg3 = rtg3 + rta[rtc] + ',';
      } else {
        rtg1 = rtg1 + rta[rtc] + ',';
      }
    }
    rtg1 = rtg1.replace(/,$/, '');
    rtg2 = rtg2.replace(/,$/, '');
    rtg3 = rtg3.replace(/,$/, '');
    if (rtg1 !== '') {
      resources = resources.filter(rtg1);
    }
    if (rtg2 !== '') {
      resources = resources.filter(rtg2);
    }
    if (rtg3 !== '') {
      resources = resources.filter(rtg3);
    }
  }
  resources.show();
  showAllMatchingResources();
  if (resources.length < 1) {
    jQuery('#resource-list-status').html('Sorry. No matches found.').fadeIn('slow');
  }
  setQSParams();
}
function getQSParams() {
  var queryString = window.location.search.substring(1), re = /([^&=]+)=([^&]*)/g, m;
  m = re.exec(queryString);
  while (m) {
    query_params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    m = re.exec(queryString);
  }
}
function setQSParams() {
  var subjects = '', resource_types = '', grade_levels = '', keyword = '', new_url = '', i;
  for (i = 0; i < selected_filters.length; i++) {
    if (jQuery.inArray(selected_filters[i], jQuery('#core-ideas li').map(function () {
          return this.id;
        }).get()) > -1) {
      if (subjects.search(selected_filters[i]) < 0) {
        subjects = subjects + ',' + selected_filters[i];
      }
    }
  }
  subjects = subjects.replace(/^,/, '');
  query_params.subjects = subjects;
  for (i = 0; i < selected_filters.length; i++) {
    if (jQuery.inArray(selected_filters[i], jQuery('#resource-types li').map(function () {
          return this.id;
        }).get()) > -1) {
      if (resource_types.search(selected_filters[i]) < 0) {
        resource_types = resource_types + ',' + selected_filters[i];
      }
    }
  }
  resource_types = resource_types.replace(/^,/, '');
  query_params.resource_types = resource_types;
  for (i = 0; i < selected_filters.length; i++) {
    if (jQuery.inArray(selected_filters[i], jQuery('#grade-levels li').map(function () {
          return this.id;
        }).get()) > -1) {
      if (grade_levels.search(selected_filters[i]) < 0) {
        grade_levels = grade_levels + ',' + selected_filters[i];
      }
    }
  }
  grade_levels = grade_levels.replace(/^,/, '');
  query_params.grade_levels = grade_levels;
  keyword = jQuery('#keyword').val();
  query_params.keyword = keyword;
  new_url = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
  if (subjects !== '' || resource_types !== '' || grade_levels !== '' || keyword !== '') {
    new_url = new_url + '?' + jQuery.param(query_params);
  }
  window.history.pushState({path: new_url}, '', new_url);
}
function setActiveFilters() {
  var i;
  if (query_params.subjects) {
    var subjects = query_params.subjects.split(',');
    for (i = 0; i < subjects.length; i++) {
      selected_filters.push(subjects[i]);
    }
  }
  if (query_params.resource_types) {
    var resource_types = query_params.resource_types.split(',');
    for (i = 0; i < resource_types.length; i++) {
      selected_filters.push(resource_types[i]);
    }
  }
  if (query_params.grade_levels) {
    var grade_levels = query_params.grade_levels.split(',');
    for (i = 0; i < grade_levels.length; i++) {
      selected_filters.push(grade_levels[i]);
    }
  }
  if (query_params.keyword) {
    var keyword = query_params.keyword;
    jQuery('#keyword').val(query_params.keyword);
  }
}
function getUrlVars(url) {
  var vars = [], qs;
  var qs_vars = url.slice(url.indexOf('?') + 1).split('&amp;');
  for (var i = 0; i < qs_vars.length; i++) {
    qs = qs_vars[i].split('=');
    vars.push(qs[0]);
    vars[qs[0]] = qs[1];
  }
  return vars;
}

function isDoubleClicked(element) {
  if (element.data('isclicked')) return true;
  element.data('isclicked', true);
  setTimeout(function () {
    element.removeData('isclicked');
  }, 250);
  return false;
}

function Resource(resource_object, resource_type) {
  this.id = resource_object.id;
  this.name = resource_object.name;
  this.resource_type = resource_type;
  this.subject_areas = '';
  this.grade_levels = '';
  var description = resource_object.description;
  var classes_str;
  // get classes metadata
  var classes_match = description.match(/href="([^\'\"]+)/);
  if (classes_match !== null && classes_match.length > 0) {
    classes_str = classes_match[0];
    classes_str = classes_str.replace(/href="/g, '');
    classes = getUrlVars(classes_str);
    for (var i = 0; i < classes.length; i++) {
      if (classes[i] == 'subject_areas') {
        this.subject_areas = classes.subject_areas.replace(/,/g, ', ').replace(/\+/g, ' ');
      }
      if (classes[i] == 'grade_levels') {
        this.grade_levels = classes.grade_levels.replace(/,/g, ', ').replace(/\+/g, ' ');
      }
      if (classes[i] == 'sensor_based') {
        this.sensor_based = classes.sensor_based;
      }
      if (classes[i] == 'browser_based') {
        this.browser_based = classes.browser_based;
      }
      if (classes[i] == 'no_save') {
        this.no_save = classes.no_save;
      }
    }
  }
  if (description === '') {
    this.description = 'There is no description for this resource. ';
  } else {
    description = description.replace(/<(?:.|\n)*?>/gim, '');
    if (description.length > 385) {
      description = description.substr(0, 385);
    }
    var match = description.match(/[\.|\?|\!]/gi);
    if (match && match.length > 0) {
      var last_index = description.lastIndexOf(match[match.length - 1]);
      this.description = description.substr(0, last_index) + '.';
    } else {
      this.description = description.substr(0, description.lastIndexOf('. '));
    }
  }
  // the regex below is imperfect but does a good job of finding the end of a paragraph's first sentence
  var end_first_sentence = this.description.search(/[^A-Z.A-Z][.|!|?][\s|\t]*[A-Z]/) + 2;
  if (end_first_sentence > 2) {
    this.short_description = this.description.substr(0, end_first_sentence);
  } else {
    this.short_description = this.description;
  }
  if (resource_object.icon.url === null) {
    this.icon_url = 'https://concord.org/sites/default/files/images/learn/placeholder.png';
  } else {
    this.icon_url = resource_object.icon.url;
  }
  // replace image cache path in image URLs on concord.org
  this.icon_url = this.icon_url.replace('imagecache/image_activity_finder/', '');
  if (this.icon_url.search('resources.has.concord.org') < 0) {
    this.icon_url = this.icon_url.replace('http://', 'https://');
  }
  this.preview_url = resource_object.preview_url;
  if (resource_object.assign_to_class_url) {
    this.assign_url = resource_object.assign_to_class_url.replace(/^javascript:/, '');
  }
  if (resource_object.assign_to_collection_url) {
    this.collect_url = resource_object.assign_to_collection_url.replace(/^javascript:/, '');
  }
  this.edit_url = resource_object.edit_url;
  if (resource_object.links.teacher_guide) {
    this.teacher_guide_url = resource_object.links.teacher_guide.url;
  }
  var subject_areas_classes = this.subject_areas.replace(/, /g, ' ');
  subject_areas_classes = subject_areas_classes.replace('Earth and Space Science', 'Earth-and-Space-Science');
  var grade_levels_classes = this.grade_levels.replace(/, /g, ' ');
  grade_levels_classes = grade_levels_classes.replace('Higher Ed', 'Higher-Ed');
  grade_levels_classes = grade_levels_classes.replace('Earth and Space Science', 'Earth-and-Space-Science');
  this.classes = resource_type + ' ' + subject_areas_classes + ' ' + grade_levels_classes;
  if (typeof this.sensor_based != 'undefined') {
    this.classes += ' Sensor-Based';
  }
  if (typeof this.browser_based != 'undefined') {
    this.classes += ' Browser-Based';
  } else {
    this.requires_java = true;
  }
  var browse_url = resource_object.links.browse.url;
  this.extra_data = browse_url.replace(/http(s|)\:\/\/learn\.concord\.org\/(browse\/|)/, '') + '.json';
  if (this.requires_java === true) {
    this.requirements = '<p>This resource requires Java. You can download Java for free from <a href="http://java.com/" title="Get Java">java.com</a>.</p><p>Using OS X 10.9 or newer? You\'ll also need to install our launcher app. <a href="http://static.concord.org/installers/cc_launcher_installer.dmg" title="Download the CCLauncher installer">Download the launcher installer</a>, open the .dmg file and drag the CCLauncher app to your Applications folder, then return to this page and launch the resource.</p>';
  } else {
    this.requirements = '<p>This activity runs entirely in a Web browser. Preferred browsers are: <a href="http://www.google.com/chrome/" title="Get Google\'s Chrome Web Browser">Google Chrome</a> (versions 30 and above), <a href="http://www.apple.com/safari/" title="Get Apple\'s Safari Web Browser">Safari</a> (versions 7 and above), <a href="http://www.firefox.com/" title="Get the Firefox Web Browser">Firefox</a> (version 30 and above), <a href="http://www.microsoft.com/ie/" title="Get Microsoft\'s Internet Explorer Web Browser">Internet Explorer</a> (version 10 or higher), and <a href="https://www.microsoft.com/en-us/windows/microsoft-edge#f7x5cdShtkSvrROV.97" title="Get Microsoft\'s Edge Web Browser">Microsoft Edge</a>.</p>';
  }
}

function sortBy(field, reverse, primer) {
  var key = primer ?
    function(x) {return primer(x[field]);} :
    function(x) {return x[field];};
  reverse = !reverse ? 1 : -1;
  return function (a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  };
}

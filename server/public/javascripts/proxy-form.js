var $ = document.getElementById.bind(document);
var $page = $("page");
var $portal = $("portal");
var $selector = $("selector");

$("proxyForm").onsubmit = function (e) {
  var page = $page.value.trim();
  var portal = $portal.value.trim();
  var selector = $selector.value.trim();
  var error;

  if ((page.length === 0) || (portal.length === 0) || (selector.length === 0)) {
    error = "Please fill in all the fields!";
  }
  else if (!portal.match(/^https?:\/\//)) {
    error = "Please enter a portal url starting with http or https!";
  }

  if (error) {
    alert(error);
    e.preventDefault();
  }
  else {
    localStorage.setItem(page, JSON.stringify({portal: portal, selector: selector}));
  }
};

// set the form from the saved settings for the page
var loadSettings = function (defaultJSON) {
  var page = $page.value.trim();
  var settings = localStorage.getItem(page);
  var json = defaultJSON;
  if (settings) {
    try {
      json = JSON.parse(settings);
    }
    catch (e) {}
  }
  if (json) {
    $portal.value = json.portal;
    $selector.value = json.selector;
  }
};

$page.onchange = function () {
  loadSettings();
};

loadSettings({
  portal: "https://learn.concord.org/",
  selector: "div.home-page-content"
});

var $ = document.getElementById.bind(document);
var $page = $("page");
var $portal = $("portal");
var $selector = $("selector");
var $fakeLogin = $("fakeLogin");
var $fakeLoginOptions = $("fakeLoginOptions");
var $student = $("student");
var $teacher = $("teacher");
var $admin = $("admin");
var $manager = $("manager");
var $researcher = $("researcher");
var $author = $("author");

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
    localStorage.setItem(page, JSON.stringify({
      portal: portal,
      selector: selector,
      fakeLogin: $fakeLogin.checked,
      student: $student.checked,
      teacher: $teacher.checked,
      admin: $admin.checked,
      manager: $manager.checked,
      researcher: $researcher.checked,
      author: $author.checked
    }));
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
    $fakeLogin.checked = json.fakeLogin;
    $student.checked = json.student;
    $teacher.checked = json.teacher;
    $admin.checked = json.admin;
    $manager.checked = json.manager;
    $researcher.checked = json.researcher;
    $author.checked = json.author;
  }
};

$page.onchange = function () {
  loadSettings();
};

var toggleLoginOptions = function (parent) {
  parent = parent || $fakeLoginOptions;
  parent.childNodes.forEach(function (node) {
    toggleLoginOptions(node);
  });
  parent.disabled = !$fakeLogin.checked;
  parent.className = !$fakeLogin.checked ? "login-option-disabled" : "";
};

$fakeLogin.onclick = function () {
  toggleLoginOptions();
};

loadSettings({
  portal: "https://learn.concord.org/",
  selector: "div.home-page-content",
  fakeLogin: false,
  student: true,
  teacher: false,
  admin: false,
  manager: false,
  researcher: false,
  author: false
});

toggleLoginOptions();
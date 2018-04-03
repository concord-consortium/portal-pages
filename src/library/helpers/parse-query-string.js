// from https://stackoverflow.com/questions/979975/
var parseQueryString = function() {
  var queryString = window.location.search.replace(/^\?/, "");
  var vars = queryString.split("&");
  var params = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof params[pair[0]] === "undefined") {
      params[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof params[pair[0]] === "string") {
      var arr = [params[pair[0]], decodeURIComponent(pair[1])];
      params[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      params[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return params;
};


module.exports = parseQueryString;

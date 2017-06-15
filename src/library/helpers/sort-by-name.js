var sortByName = function (a, b) {
  var aName = a.name.toUpperCase();
  var bName = b.name.toUpperCase();
  return ((aName > bName) - (bName > aName));
};

module.exports = sortByName;
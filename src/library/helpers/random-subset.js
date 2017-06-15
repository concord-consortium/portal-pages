var shuffleArray = require("./shuffle-array");

var randomSubset = function (array) {
  var count = Math.round(Math.random() * array.length);
  var subset = array.slice(0, count);
  return shuffleArray(subset);
};

module.exports = randomSubset;
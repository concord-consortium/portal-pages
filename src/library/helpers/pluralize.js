var pluralize = function (count, singular, plural) {
  plural = plural || singular + "s";
  return count === 1 ? singular : plural;
};

module.exports = pluralize;

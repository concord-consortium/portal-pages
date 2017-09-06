var filterDiv = null;

var shortenText = function(text, length) {
  length = (typeof length !== 'undefined') ? length : 255;
  if (!text) {
    return "";
  } else {
    if (text.length > length) {
      return text.substring(0, length-6) + "…" + text.substring(text.length-5);
    } else {
      return text;
    }
  }
};

var textOfHtml = function (text) {
  if (!filterDiv) {
    filterDiv = document.createElement("DIV");
  }

  filterDiv.innerHTML = text;
  return filterDiv.innerText;
};

/*
   The resource.description is setup by the portal. It is not the same as the description
   field stored in the database. The portal uses this logic:
   - if the user is a teacher and there is a description_for_teacher, then the
     description is the description_for_teacher
   - else if there is an abstract, then the description is the abstract
   - finally if the other two cases don't apply then the description is the
     actual description shortened to 255 characters.

   Portal v1.19.0-pre.12 added the following fields:
   - resource.full_description - description database value, "" otherwise
   - resource.abstact - database value if it exists, "" otherwise
   - resource.description_for_teacher - database value if it exists, "" otherwise
*/
var processResource = function (resource) {

  if (resource == null || resource._processed) {
    return;
  }

  resource.filteredDescription = textOfHtml(resource.description);

  if (resource.abstract) {
    resource.shortDescription = resource.abstract;
  } else if (resource.full_description) {
    resource.shortDescription = shortenText(resource.full_description);
  } else {
    resource.shortDescription = resource.description
  }
  resource.filteredShortDescription = textOfHtml(resource.shortDescription);

  if (resource.description_for_teacher){
    resource.longDescription = resource.description_for_teacher;
  } else if (resource.full_description) {
    resource.longDescription = resource.full_description;
  } else {
    resource.longDescription = resource.description;
  }

  resource._processed = true;
};

module.exports = {
  textOfHtml: textOfHtml,
  processResource: processResource
}

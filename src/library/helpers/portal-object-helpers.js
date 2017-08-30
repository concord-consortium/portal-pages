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
  if (resource._processed) {
    return;
  }

  resource.filteredDescription = textOfHtml(resource.description);

  var shortDescription;
  if (resource.abstract) {
    shortDescription = resource.abstract;
  } else if (resource.full_description) {
    shortDescription = shortenText(resource.full_description);
  } else {
    shortDescription = resource.description
  }
  resource.filteredShortDescription = textOfHtml(shortDescription);

  var longDescription;
  if (Portal.currentUser.isTeacher && resource.description_for_teacher){
    longDescription = resource.description_for_teacher;
  } else if (resource.full_description) {
    longDescription = resource.full_description;
  } else {
    longDescription = resource.description;
  }
  resource.filteredLongDescription = textOfHtml(longDescription);

  resource._processed = true;
};

module.exports = {
  textOfHtml: textOfHtml,
  processResource: processResource
}

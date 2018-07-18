// Copied from learn.staging.concord.org in 2018-07-05
window.Portal = {}
window.Portal.API_V1 = {
  FAKE_ID: '999',

  COUNTRIES: 'mock-data/countries.json',
  SECURITY_QUESTIONS: '/api/v1/security_questions',
  STUDENTS: '/api/v1/students',
  STUDENT_CHECK_PASSWORD: '/api/v1/students/999/check_password',
  studentCheckPassword: function (studentId) {
    return this.STUDENT_CHECK_PASSWORD.replace(this.FAKE_ID, studentId)
  },
  TEACHERS: '/api/v1/teachers',
  STATES: '/api/v1/states',
  DISTRICTS: '/api/v1/districts',
  SCHOOLS: 'mock-data/schools.json',

  //
  // Login and email availability.
  //
  EMAILS: '/api/v1/teachers/email_available',
  LOGINS: '/api/v1/teachers/login_available',

  //
  // Login and name validation.
  //
  LOGIN_VALID: '/api/v1/teachers/login_valid',
  NAME_VALID: '/api/v1/teachers/name_valid',

  CLASSWORD: '/api/v1/students/check_class_word',
  COLLABORATIONS: '/api/v1/collaborations',
  AVAILABLE_COLLABORATORS: '/api/v1/collaborations/available_collaborators',

  //
  // Materials
  //
  MATERIALS_FEATURED: '/api/v1/materials/featured',
  MATERIALS_OWN: '/api/v1/materials/own',
  MATERIALS_BIN_COLLECTIONS: '/api/v1/materials_bin/collections',
  MATERIALS_BIN_UNOFFICIAL_MATERIALS: '/api/v1/materials_bin/unofficial_materials',
  MATERIALS_BIN_UNOFFICIAL_MATERIALS_AUTHORS: '/api/v1/materials_bin/unofficial_materials_authors',

  //
  // Offerings
  //
  OFFERING: '/api/v1/offerings/999',
  offering: function (offeringId) {
    return this.OFFERING.replace(this.FAKE_ID, offeringId)
  },
  OFFERINGS: '/api/v1/offerings',

  //
  // Classes
  //
  CLASS: '/api/v1/classes/999',
  class: function (classId) {
    return this.CLASS.replace(this.FAKE_ID, classId)
  },

  //
  // Favorites
  //
  MATERIALS_ADD_FAVORITE: '/api/v1/materials/add_favorite',
  MATERIALS_REMOVE_FAVORITE: '/api/v1/materials/remove_favorite',
  MATERIALS_GET_FAVORITE: '/api/v1/materials/get_favorites',

  SEARCH: '/api/v1/search/search',
  ASSIGN_MATERIAL_TO_CLASS: '/api/v1/materials/assign_to_class'
}

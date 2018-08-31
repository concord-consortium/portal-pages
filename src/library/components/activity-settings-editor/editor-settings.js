/*
 * editor_settings() returns a data-structure that directs the construction of
 * a "page" of editing controls. This is initially intended to be a straight-
 * forward way of creating a property/attribute settings editor.
 * 
 * The data structure has two primary sections. The first is the "api" section
 * defining how a changed value is communicated back to the server. The second
 * section, "editor_page", contains an entry for each setting the user can
 * modify.
 * 
 * Each of these contain:
 *
 *    *  label: displayed next to the control;
 *    *  type:  either 'text', 'boolean', or 'choice';
 *    *  name:  a name of the setting for communication via the api; and,
 *    *  dscrp: a block of descriptive text to help explain the setting.
 * 
 * If the type === 'choice', an additional entry, named 'options' must be
 * present to define a set of values the user may elect (i.e., the contents
 * of a <select> element).
 */

export default function editor_settings() {
  return ({
    api: {
      endpoint: "Portal.API_VI.external_activity(id)", // Not yet implemented.
      // Right now, this endpoint is hard-coded in the update function that
      // actually does the 'PUT'.
    },
    editor_page: [
      { label: 'Name',               type: 'text',     name: 'name',
        dscrp: 'The display name of this activity.'},
      // The following setting, Source Type, has been removed pending changes
      // in portal to supply the setting and to accept the change of setting
      // when passed to the update-API.
      //
      // { label: '**Source Type',        type: 'choice',   name: '',
      //   dscrp: 'Just a placeholder, for now.',
      //   options: [
      //     { option: 'LARA', value: 'lara' },
      //     { option: 'Native', value: 'native' } ]},
      { label: 'CC Official',        type: 'boolean',  name: 'is_official',
        dscrp: 'Designate this as an "official" Concord activity in lists.' },
      { label: 'Locked',             type: 'boolean',  name: 'is_locked',
        dscrp: 'Do not allow this activity to be copied.' },
      { label: 'Publication Status', type: 'choice',   name: 'publication_status',
        dscrp: 'Marking this as "published" makes it visible to everyone.',
        options: [
          { option: 'Published', value: 'published' },
          { option: 'Private',   value: 'private' },
          { option: 'Draft',     value: 'draft' } ]},
      { label: 'Credits',            type: 'text',     name: 'credits',
        dscrp: 'If present, overrides the default credits of "Admin Admin".' },
      { label: 'Short Description',  type: 'text',     name: 'short_description',
        dscrp: 'Shown in search results, student listings, and as a fallback ' +
               'for long description. Recommend every activity has this ' +
               'value provided.' },
      { label: 'Long Description',   type: 'text',      name: 'long_description',
        dscrp: 'Shown in places where activity details are visible (e.g. ' +
               'STEM Resource finder lightbox). Uses Short Description as a ' +
               'fallback.' },
      { label: 'Long Description for Teacher', type: 'text', name: 'long_description_for_teacher',
        dscrp: 'Variant of Long Description visible only for teachers. Uses ' +
               'Long Description as a fallback.' },
      { label: 'Teacher Guide URL',   type: 'text', name: 'teacher_guide_url',
        dscrp: '' },
      { label: 'Has Pre and Post Tests', type: 'boolean', name: 'has_pretest',
        dscrp: 'This unit has pre- and post-tests available.' },
      { label: 'Student Report Enabled', type: 'boolean', name: 'student_report_enabled',
        dscrp: 'Show a link to the student to see their evaluated answers.' },
      { label: 'Open URL in New Window', type: 'boolean', name: 'popup',
        dscrp: '' },
      { label: 'Run with Collaborators', type: 'boolean', name: 'allow_collaboration',
        dscrp: 'Allow students to run this activity with collaborators.' },
      { label: 'Student Assessment Item', type: 'boolean', name: 'is_assessment_item',
         dscrp: 'Materials marked as student assessment items are not ' +
                'displayed to students or visitors in search results.' },
      { label: 'Rubric', type: 'text', name: 'rubric_url',
        dscrp: 'The URL for a rubric associated with this activity.' },      
      { label: 'Thumbnail Image', type: 'text', name: 'thumbnail_url',
        dscrp: 'Thumbnail image URL (300 x 250 px).' },
      { label: 'Feature On Landing Page', type: 'boolean', name: 'is_featured',
        dscrp: 'This activity should be displayed to anonymous users on ' +
               'the landing page.' },
        { label: 'URL', type: 'text', name: 'url',
          dscrp: 'The URL used for preview links.' },
        { label: 'Launch URL', type: 'text', name: 'launch_url',
          dscrp: 'If present, this URL is used when a student ' +
                 'starts an activity, otherwise the main URL is used. ' +
                 'Activities with a ' +
                 'launch url are assumed to support editing by appending /edit.' },
          { label: 'Append Learner ID to URL', type: 'boolean', name: 'append_learner_id_to_url',
            dscrp: 'Append the learner id to the url (e.g. http://foo.com/bar?learner=4)' },
          { label: 'Append Survey Monkey user ID to URL', type: 'boolean', name: 'append_survey_monkey_uid',
            dscrp: 'Append a unique Survey Monkey user id to the ' +
                   'url (e.g. http://www.surveymonkey.com/s/H2Y9H27?c=00001)' }, 
          { label: 'Append Authentication Token', type: 'boolean', name: 'append_auth_token',
            dscrp: 'Append a short-lived authentication token.'}, 
          { label: 'Enable Logging', type: 'boolean', name: 'logging',
            dscrp: 'Enable logging on this activity (for activities that support it).'},
          { label: 'Enable Social Media Sharing', type: 'boolean', name: 'enable_sharing',
            dscrp: 'The resource lightbox for this activity will ' +
                   'display social media sharing links.' },
          { label: 'Save Student Data', type: 'boolean', name: 'saves_student_data',
            dscrp: 'This activity saves student data which can be viewed by their teacher.' },
          { label: 'Save Path', type: 'text', name: 'save_path',
            dscrp: 'Extra parameter for custom activities.' },
          { label: 'Material Type', type: 'choice', name: 'material_type',
            dscrp: 'Users can see the type of material in various places, ' +
                    'use this field to change that type',
            options: [
              { option: 'Activity', value: 'Activity' },
              { option: 'Sequence',   value: 'Sequence' },
              { option: 'Model',     value: 'Model' } ]},   
    ]
  });
}

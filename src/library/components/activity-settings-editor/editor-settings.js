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
      boolean_constants: [ 'true', 'false' ]  // Also, NYI, use these values
      // to communicate back to the api to change boolean settings.
    },
    editor_page: [
      { label: 'Name',               type: 'text',     name: 'name',
        dscrp: 'W: The display name of this activity.'},
      { label: 'Source Type',        type: 'choice',   name: '',
        dscrp: 'NAD: -- Just a placeholder till I talk to Scott',
        options: [
          { option: 'LARA', value: 'lara' },
          { option: 'Native', value: 'native' } ]},
      { label: 'CC Official',        type: 'boolean',  name: 'is_official',
        dscrp: 'W: Designate this as an "official" Concord activity in lists.' },
      { label: 'Locked',             type: 'boolean',  name: 'is_locked',
        dscrp: 'WD: Needs descriptive text.' },
      { label: 'Publication Status', type: 'choice',   name: 'publication_status',
        dscrp: 'A: Marking this as "published" makes it visible to everyone.',
        options: [
          { option: 'Published', value: 'published' },
          { option: 'Private',   value: 'private' },
          { option: 'Draft',     value: 'draft' } ]},
      { label: 'Copied From',        type: 'text',     name: '',
        dscrp: 'DNA:' },
      { label: 'Credits',            type: 'text',     name: 'credits',
        dscrp: 'W: If present, overrides the default credits of "Admin Admin".' },
      { label: 'Short Description',  type: 'text',     name: 'short_description',
        dscrp: 'W: Shown in search results, student listings, and as a fallback ' +
               'for long description. Recommend every activity has this ' +
               'value provided.' },
      { label: 'Long Description',   type: 'text',      name: 'long_description',
        dscrp: 'W: Shown in places where activity details are visible (e.g. ' +
               'STEM Resource finder lightbox). Uses Short Description as a ' +
               'fallback.' },
      { label: 'Long Description for Teacher', type: 'text', name: 'long_description_for_teacher',
        dscrp: 'W: Variant of Long Description visible only for teachers. Uses ' +
               'Long Description as a fallback.' },
      { label: 'Teacher Guide URL',   type: 'text', name: 'teacher_guide_url',
        dscrp: 'WD: ' },
      { label: 'Has Pre and Post Tests', type: 'boolean', name: 'has_pretest',
        dscrp: 'W: This unit has pre- and post-tests available.' },
      { label: 'Student Report Enabled', type: 'boolean', name: 'student_report_enabled',
        dscrp: 'W: Show a link to the student to see their evaluated answers.' },
      { label: 'Open URL in New Window', type: 'boolean', name: 'popup',
        dscrp: 'WDN?: Is this the popup flag?' },
      { label: 'Run with Collaborators', type: 'boolean', name: 'allow_collaboration',
        dscrp: 'WD: Allow students to run this activity with collaborators.' },
      { label: 'Do Not Copy', type: 'boolean', name: '',
        dscrp: 'DNA:' },
      { label: 'Student Assessment Item', type: 'boolean', name: 'is_assessment_item',
         dscrp: 'Materials marked as student assessment items are not displayed to students or visitors in search results.' },
  

    ]
  });
}
/*      
      { label: 'Requires Download', name: '' },
      { label: 'Projects', name: '' },
      { label: 'Cohorts', name: '' },
      { label: 'Grade Levels', name: '' },
      { label: 'Subject Areas', name: '' },
      { label: 'Display Title', name: '' },
      { label: 'Text for Index Page', name: '' },
      { label: 'Logo', name: '' },
      { label: 'Thumbnail URL', name: 'thumbnail_url', type: 'text' },
      { label: 'Theme', name: '' },
      { label: 'LARA Project Name', name: '' },
      { label: 'Related Content', name: '' },
      { label: 'Estimated Time to Complete', name: '' },
      { label: 'Activity Layout', name: '' },
      { label: 'Authoring Mode', name: '' },
      { label: 'Notes', name: '' },
      { label: 'URL', name: 'url', type: 'text' },
      { label: 'Launch URL', name: 'launch_url', type: 'text' },
      { label: 'External Reporting', name: '' },
      { label: 'Custom Reporting URL', name: '' },
      { label: 'Append Learner ID to URL', name: '' },
      { label: 'Append Survey Monkey user ID to URL', name: '' },
      { label: 'Enable Logging', name: '' },
      { label: 'Save Path', name: '' }
      
    ]
  });
}
  */

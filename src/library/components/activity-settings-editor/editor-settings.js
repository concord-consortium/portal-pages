export default function editor_settings() {
  return ({
    general: [
      { label: 'Name', name: 'name', type: 'text' },
      { label: 'CC Official', name: 'is_official', type: 'boolean' },
      { label: 'Locked', name: 'is_locked', type: 'boolean' },
      { label: 'Publication Status', name: 'publication_status',
        type: 'choice',
        options: [
          { option: 'Published', value: 'published' },
          { option: 'Private',   value: 'private' },
          { option: 'Draft',     value: 'draft' }
        ]
      },
      { label: 'Copied From', name: '' },
      { label: 'Credits', name: 'credits', type: 'text' },
      { label: 'Sort Description', name: 'short_description', type: 'text' },
      { label: 'Long Description', name: 'long_description', type: 'text' },
      { label: 'Long Description for Teacher', name: 'long_description_for_teacher', type: 'text' },
      { label: 'Teacher Guide URL', name: 'teacher_guide_url', type: 'text' },
      { label: 'Has Pre and Post Tests', name: 'has_pretest', type: 'boolean' },
      { label: 'Student Report Enabled', name: 'student_report_enabled', type: 'boolean' },
      { label: 'Open URL in New Window', name: '' }, // Is this the "popup" flag?
      { label: 'Run with Collaborators', name: 'allow_collaboration', type: 'boolean' },
      { label: 'Do Not Copy', name: '' },
      { label: 'Student Assessment Item', name: 'is_assessment_item', type: 'boolean' },
      { label: 'Requires Download', name: '' },
      { label: 'Projects', name: '' },
      { label: 'Cohorts', name: '' },
      { label: 'Grade Levels', name: '' },
      { label: 'Subject Areas', name: '' }
    ],
    layout: [
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
      { label: 'Notes', name: '' }
    ],
    advanced: [
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
  
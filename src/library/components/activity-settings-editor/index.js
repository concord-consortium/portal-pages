import React from 'react'
// import css from './style.scss'

/*
* See `README.md` in this folder for the complete structure of the
* Settings-Editor props.
*/

// We will come back to setting up the data-store a little bit later.
// const ActivityEditorDataStore = { }

/*
 * When expanded, a DisplayJson component will show an object in it's JSON
 * form. Handy for debugging.
 *
 * NP: Don't know if this is the right way to think about a component; but,
 * I thought that I wanted the display of the object's JSON to change as the
 * object get's changed -- ergo, state changes. That right?
 */
class DisplayJson extends React.Component {
//  constructor (props) {
//    super(props)
//  }
  render () {
    return (
      <div>
        <details>
          <summary>{this.props.title + ' JSON'}</summary>
          <pre>
            {JSON.stringify(this.props.objectToDisplay, null, 2)}
          </pre>
        </details>
      </div>
    )
  }
}

class TextComp extends React.Component {
  render () {
    const textAreaStyle = {
      width: '350px',
      height: '20px'
    }
    return (
      <textarea
        style={textAreaStyle}
        value={this.props.value}
        onChange={e => this.props.update({[this.props.name]: e.target.value})} />
    )
  }
}

class CheckboxComp extends React.Component {
  render () {
    return (
      <input
        type='checkbox'
        checked={this.props.value === true}
        onChange={e => this.props.update({ [this.props.name]: !!e.target.checked })}
      />
    )
  }
}

/*
 * A settings page object is the body of a tab-page. It contains some fields
 * and will update the state as the fields are modified. Eventually, I want
 * what fields are displayed to be passed in thru some control data structure
 * that maps the UI stuff to a particular setting.
 *
 * Also, eventually, want to make the fields themselves be another react
 * component -- say, one for a label and a text area, another for a label
 * and a checkbox for a boolean, another for a label and a radio button, etc.
 */
class SettingsPage extends React.Component {
//  constructor (props) {
//    super(props);
//  }
  render () {
    const tabPageStyle = {
      padding: '0.5em 1em',
      border: '1px solid',
      borderTop: 'none'
    }

    tabPageStyle.display = this.props.selected ? 'block' : 'none'

    const { fields, settings, update } = this.props
    return (
      <div style={tabPageStyle}>
        <h2>{this.props.title}</h2>
        <table>
          <tbody> {
            fields.map((field) => {
              console.log(settings[field.name])
              const componentForType = (typeName) => {
                switch (typeName) {
                  case 'boolean':
                    return <CheckboxComp name={field.name} update={update} value={settings[field.name]} />
                  case 'text':
                  default:
                    return <TextComp name={field.name} update={update} value={settings[field.name]} />
                }
              }
              return (
                <tr>
                  <td>{ field.label } </td>
                  <td> {componentForType(field.type)} </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}

const UISettings = {
  general: [
    { label: 'Name', name: 'name', type: 'text' },
    { label: 'CC Official', name: 'is_official', type: 'boolean' },
    { label: 'Locked', name: 'is_locked', type: 'boolean' },
    { label: 'Publication Status',
      name: 'publication_status',
      type: 'choice',
      option_names: 'Published Private Other',
      options: 'published private 42' },
    { label: 'Copied From', name: '' },
    { label: 'Credits', name: 'credits', type: 'text' },
    { label: 'Sort Description', name: 'short_description', type: 'text' },
    { label: 'Long Description', name: 'long_description', type: 'text' },
    { label: 'Long Description for Teacher', name: 'long_description_for_teacher', type: 'text' },
    { label: 'Teacher Guide URL', name: 'teacher_guide_url', type: 'text' },
    { label: 'Has Pre and Post Tests', name: 'has_pretest', type: 'boolean' },
    { label: 'Student Report Enabled', name: 'student_report_enabled', type: 'boolean' },
    { label: 'Open URL in New Windwow', name: '' }, // Is this the "popup" flag?
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
}

export default class ActivitySettingsEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      settingsData: Object.assign({}, props),
      UISettings: Object.assign({}, UISettings)
    }
    this.state.UISettings.UIActivePage = 'general'
  }

  updateSettingsData (newParams) {
    const newValues = Object.assign(this.state.settingsData, newParams)
    this.setState({settingsData: newValues})
  }

  updateUISettings (newParams) {
    const newValues = Object.assign(this.state.UISettings, newParams)
    this.setState({UISettings: newValues})
  }

  activateTabPage (pageToActivate) {
    this.updateUISettings({UIActivePage: pageToActivate})
  }

  render () {
    const tabBarStyle = {
      overflow: 'hidden',
      border: '1px solid'
    }
    const tabButtonStyle = {
      float: 'left',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      padding: '1em',
      margin: '0.2em'
    }
    const settings = this.state.settingsData
    const UISettings = this.state.UISettings

    // const settings = Object.assign(this.state);
    return (
      <div>
        <h2>Settings</h2>
        <div style={tabBarStyle}>
          <button style={tabButtonStyle}
            onClick={() => this.activateTabPage('general')}>General</button>
          <button style={tabButtonStyle}
            onClick={() => this.activateTabPage('layout')}>Layout</button>
          <button style={tabButtonStyle}
            onClick={() => this.activateTabPage('advanced')}>Advanced</button>
        </div>
        <SettingsPage title='General Settings'
          update={(nameAndValue) => this.updateSettingsData(nameAndValue)}
          settings={settings}
          fields={UISettings.general}
          selected={UISettings.UIActivePage === 'general'} />
        <SettingsPage title='Layout Settings'
          update={(nameAndValue) => this.updateSettingsData(nameAndValue)}
          settings={settings}
          fields={UISettings.layout}
          selected={UISettings.UIActivePage === 'layout'} />
        <SettingsPage title='Advanced Settings'
          update={(nameAndValue) => this.updateSettingsData(nameAndValue)}
          settings={settings}
          fields={UISettings.advanced}
          selected={UISettings.UIActivePage === 'advanced'} />
        <div>
          <br />
          <br />
          <DisplayJson title='State (edited values)' objectToDisplay={settings} />
          <br />
          <DisplayJson title='Property (input values)' objectToDisplay={this.props} />
        </div>
      </div>
    )
  }
}

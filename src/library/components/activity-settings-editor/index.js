import React from 'react'
import css from './style.scss'

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
  constructor (props) {
    super(props)
  }
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
  constructor (props) {
    super(props);
  }
  render () {
    const tabPageStyle = {
      padding: '0.5em 1em',
      border: '1px solid',
      borderTop: 'none'
    }
    const textAreaStyle = {
      width: '350px',
      height: '20px'
    }
    console.log('HERE! ' + this.props.title + this.props.fields);
    tabPageStyle.display = this.props.selected ? 'block' : 'none';
    return (
      <div style={tabPageStyle}>
        <h2>{this.props.title}</h2>
        <table>
          <tbody> {
            this.props.fields.map( (field) =>
              <tr>
                <td>{ field.label } </td>
                <td>
                   <textarea
                     style={textAreaStyle}
                     value={ this.props.settings[field.name] }
                     onChange={ e => this.props.update({ [field.name]: e.target.value}) }
                     >
                   </textarea>
                 </td>
               </tr>
             ) }
           </tbody>
         </table>
      </div>   
    )
  }
}


export default class ActivitySettingsEditor extends React.Component {
  constructor (props) {
    super(props);
    this.state = Object.assign(props);
    this.state.UIActivePage = 'general';
  }

  activateTabPage (pageToActivate) {
    console.log('About to activate tab-page ' + pageToActivate)
    this.setState({UIActivePage: pageToActivate})
  }
 
  render () {

   /*
     Dummy this up, right here, for now. Eventually, this will be passed in
     to control the behavior of the component -- by picking which fields
     are edited, and on what tab-page they appear.
   */
  const settingsVector = {
    general: [
      { label: "Name",                         name: "name", type: "text" },
      { label: "CC Official",                  name: "" },
      { label: "Locked",                       name: "is_locked", type: "boolean" },
      { label: "Publication Status",           name: "", type: "choice:Published,Private,CC-Only" },
      { label: "Copied From",                  name: "" },
      { label: "Credits",                      name: "" },
      { label: "Sort Description",             name: "" },
      { label: "Long Description",             name: "long_description", type: "text" },
      { label: "Long Description for Teacher", name: "long_description_for_teacher", type: "text" },
      { label: "Teacher Guide URL",            name: "" },
      { label: "Has Pre and Post Tests",       name: "has_pretest", type: "boolean" },
      { label: "Student Report Enabled",       name: "" },
      { label: "Open URL in New Windwow",      name: "" },
      { label: "Run with Collaborators",       name: "" },
      { label: "Do Not Copy",                  name: "" },
      { label: "Student Assessment Item",      name: "is_assssment_item", type: "boolean" },
      { label: "Requires Download",            name: "" },
      { label: "Projects",                     name: "" },
      { label: "Cohorts",                      name: "" },
      { label: "Grade Levels",                 name: "" },
      { label: "Subject Areas",                name: "" }
    ],
    layout: [
      { label: "Display Title",                name: "" },
      { label: "Text for Index Page",          name: "" },
      { label: "Logo",                         name: "" },
      { label: "Thumbnail URL",                name: "" },
      { label: "Theme",                        name: "" },
      { label: "LARA Project Name",            name: "" },
      { label: "Related Content",              name: "" },
      { label: "Estimated Time to Complete",   name: "" },
      { label: "Activity Layout",              name: "" },
      { label: "Authoring Mode",               name: "" },
      { label: "Notes",                        name: "" }
    ],
    advanced: [
      { label: "URL",                          name: "" },
      { label: "Launch URL",                   name: "" },
      { label: "External Reporting",           name: "" },
      { label: "Custom Reporting URL",         name: "" },
      { label: "Append Learner ID to URL",     name: "" },
      { label: "Append Survey Monkey user ID to URL", name: "" },
      { label: "Enable Logging",               name: "" },
      { label: "Save Path",                    name: "" }
    ]
  };

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
      margin: '0.2em',
      background: 'orange'
    } 
    //const settings = this.state;

    const settings = Object.assign(this.state);
    return (
      <div>
        <h2>Settings</h2>
        <div style={tabBarStyle}>
          <button style={tabButtonStyle} onClick={ () => this.activateTabPage('general') }>General</button>
          <button style={tabButtonStyle} onClick={ () => this.activateTabPage('layout')  }>Layout</button>
          <button style={tabButtonStyle} onClick={ () => this.activateTabPage('advanced') }>Advanced</button>
        </div>
        <SettingsPage title="General Settings" update={ (field_and_value) => this.setState(field_and_value) } settings={settings} fields={ settingsVector.general }  selected={ settings.UIActivePage === 'general' } />
        <SettingsPage title="Layout Settings" settings={settings} fields={ settingsVector.layout }  selected={ settings.UIActivePage === 'layout' } />
        <SettingsPage title="Advanced Settings" settings={settings} fields={ settingsVector.advanced } selected={ settings.UIActivePage === 'advanced' } />
        <br />
        <br />
        <DisplayJson title="State" objectToDisplay={settings} />
        <br />
        <DisplayJson title="Property" objectToDisplay={this.props} />
     </div>
    )
  }
}



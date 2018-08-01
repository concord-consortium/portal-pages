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

class TextComp extends React.Component {
  render () {
    const textAreaStyle = {
      width: '350px',
      height: '20px'
    }
    return (
      <textarea
        style={ textAreaStyle}
        value={ this.props.value }
        onChange={ e => this.props.update({ [this.props.name]: e.target.value}) }
        />
    )
  }
}

class CheckboxComp extends React.Component {
  render () {
    return (
      <input
        type='checkbox'
        checked={this.props.value === 'true'}
        onChange={ e => this.props.update({ [this.props.name]: e.target.checked ? 'true' : 'false' })}
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
  constructor (props) {
    super(props);
  }
  render () {
    const tabPageStyle = {
      padding: '0.5em 1em',
      border: '1px solid',
      borderTop: 'none'
    }

    console.log('HERE! ' + this.props.title + this.props.fields);
    tabPageStyle.display = this.props.selected ? 'block' : 'none';


    const { fields, settings, update } = this.props
    return (
      <div style={tabPageStyle}>
        <h2>{this.props.title}</h2>
        <table>
          <tbody> {
            fields.map((field) => {
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


export default class ActivitySettingsEditor extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      settingsData: Object.assign({}, props.settings),
      UISettings: Object.assign({}, props.UISettings)
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
    console.log('About to activate tab-page ' + pageToActivate)
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
      margin: '0.2em',
      background: 'orange'
    } 
    const settings = this.state.settingsData
    const UISettings = this.state.UISettings

    // const settings = Object.assign(this.state);
    return (
      <div>
        <h2>Settings</h2>
        <div style={tabBarStyle}>
          <button style={tabButtonStyle} onClick={ () => this.activateTabPage('general') }>General</button>
          <button style={tabButtonStyle} onClick={ () => this.activateTabPage('layout')  }>Layout</button>
          <button style={tabButtonStyle} onClick={ () => this.activateTabPage('advanced') }>Advanced</button>
        </div>
        <SettingsPage title="General Settings" update= { (nameAndValue) => this.updateSettingsData(nameAndValue) } settings={settings} fields={ UISettings.general }  selected={ UISettings.UIActivePage === 'general' } />

        <SettingsPage title="Layout Settings" settings={settings} fields={ UISettings.layout }  selected={ UISettings.UIActivePage === 'layout' } />

        <SettingsPage title="Advanced Settings" settings={settings} fields={ UISettings.advanced } selected={ UISettings.UIActivePage === 'advanced' } />
        <br />
        <br />
        <DisplayJson title="State" objectToDisplay={settings} />
        <br />
        <DisplayJson title="Property" objectToDisplay={this.props} />
     </div>
    )
  }
}



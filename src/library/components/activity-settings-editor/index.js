import React from 'react'
// import css from './style.scss'
import DisplayJson from '../../helpers/display-json'
import CheckBox from '../../helpers/check-box'
import editor_settings from './editor-settings'

// We will come back to setting up the data-store a little bit later.
// const ActivityEditorDataStore = { }

function send_updated_text_value_to_portal(id, field_name, update_json) {
  jQuery.ajax({
    type: 'PUT',
    url: Portal.API_V1.external_activity(id),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(update_json),
    success: function (data) {
      console.log("send_update_text_value_to_portal() - We got 200 back\n" +
        JSON.stringify(data))
    },
    error: function (data) {
      console.log("send_update_text_value_to_portal() - update failed")
      window.alert('Error changing a setting on an external activity\n' +
      JSON.stringify(data))
    }
  })
}

class TextComp extends React.Component {
  render () {
    const textAreaStyle = {
      width: '350px',
      height: '20px'
    }
    const id = this.props.activity_id;
  //  const update = this.props.update;
    const api = this.props.api;
    return (
      <textarea
        style={textAreaStyle}
        value={this.props.value}
        onChange={ (e) => {
          this.props.update({ [this.props.name]: e.target.value });
          }}
        onBlur={ (e) => {api(e)} }
      />
    )
  }
}

class ChoiceComp extends React.Component {
  render () {
    console.log("ChoiceComp.render()\n")
    console.log("  options:" + JSON.stringify(this.props.options))
    return (
      <div>
        <select onChange={ (e) => { this.props.api(e) } } >
        {
          this.props.options.map( (option) => {
            return (<option value={option.value}>{option.option}</option>);
          })
        }
        </select>
      </div>      
    );
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
  render () {
    const tabPageStyle = {
      padding: '0.5em 1em',
      border: '1px solid',
      borderTop: 'none'
    }
    // Can I move this to the const above?
    tabPageStyle.display = this.props.selected ? 'block' : 'none'
    const { fields, settings, update } = this.props

    return (
      <div style={tabPageStyle}>
        <h2>{this.props.title}</h2>
        <table>
          <tbody> {
            fields.map((field) => {
              const componentForType = (typeName) => {
                switch (typeName) {
                  case 'choice':
                  console.log("OPTIONS: " + JSON.stringify(field.options))
                    return (<ChoiceComp
                      activity_id={settings["id"]}
                      name={field.name}
                      value={settings[field.name]}
                      update={update}
                      options={field.options}
                      api={ (e) => {
                        console.log('API Handler for ChoiceComp\n');
                        console.log('  name = ' + field.name);
                        console.log('  value = ' + settings[field.name]);
                        console.log('  event.target = ' + e.target);
                        console.log('  event.target.value = ' + e.target.value);
                        console.log('  settings["id"] = ' + settings['id']);
                        const updated_field_json = { [field.name]: e.target.value};
                        console.log('updated_field_json = ' + JSON.stringify(updated_field_json));
                        send_updated_text_value_to_portal(settings['id'], [this.props.name], updated_field_json);
                      }}
                    />);
                  case 'boolean':
                    return (<CheckBox
                      activity_id={settings["id"]}
                      name={field.name}
                      value={settings[field.name]}
                      update={update}
                      api={ (e) => {
                        console.log('API Handler for CheckBox\n');
                        console.log('  name = ' + field.name);
                        console.log('  value = ' + settings[field.name]);
                        console.log('  event.target = ' + e.target);
                        console.log('  event.target.value = ' + e.target.value);
                        console.log('  settings["id"] = ' + settings['id']);
                        const updated_field_json = { [field.name]: e.target.value};
                        console.log('updated_field_json = ' + JSON.stringify(updated_field_json));
                        send_updated_text_value_to_portal(settings['id'], [this.props.name], updated_field_json);
                      }}
                    />);
                  case 'text':
                  default:
                    return (<TextComp
                      activity_id={settings["id"]}
                      name={field.name}
                      value={settings[field.name]}
                      update={update}
                      api={ (e) => {
                        console.log('API Handler for TextComp\n');
                        console.log('  name = ' + field.name);
                        console.log('  value = ' + settings[field.name]);
                        console.log('  event.target = ' + e.target);
                        console.log('  event.target.value = ' + e.target.value);
                        console.log('  settings["id"] = ' + settings['id']);
                        
                          // Do quard this so it only sends if curren filed value is different
                          // from the orginal JSON?
                          const updated_field_json = { [field.name]: e.target.value};
                          console.log('updated_field_json = ' + JSON.stringify(updated_field_json));
                          send_updated_text_value_to_portal(settings['id'], [this.props.name], updated_field_json);
                          // do we update original JSON hehre?
                          // And, do want to upddate the main page display?
                          } }
                    />);
                }
              }
              return (
                <tr>
                  <td>{ field.label }</td>
                  <td>{ componentForType(field.type) }</td>
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
      settingsData: Object.assign({}, props),
      UISettings: Object.assign({}, editor_settings())
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

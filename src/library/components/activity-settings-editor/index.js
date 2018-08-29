import React from 'react'
import DisplayJson from '../../helpers/display-json' // Remove after debugging.
import editor_settings from './editor-settings'
import SettingsPage from './settings-page'

// This component is the top-level component for a settings editing page. It
// is created with a single property, the settings data structure passed in
// from the server, which contains all the current values for all the various
// user-modifiable settings.
//
// These current settings, in addition to the editor's configuration data, that
// is isolated in the editor_settings() function, are added to the state of
// this parent component so that the subordinate components may access both
// the initial state of settings being edited as well as the editor's settings
// used to build the UI.

export default class ActivitySettingsEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activity_settings:  Object.assign({}, props),
      editor_page:        Object.assign({}, editor_settings())
    }
  }

  updateActivitySettings (newParams) {
    const newValues = Object.assign(this.state.activity_settings, newParams);
    this.setState({ activity_settings: newValues });
  }

  render () {
    const { activity_settings, editor_page } = this.state;
    return (
      <div>
        <h2>Settings</h2>
        <SettingsPage
          update={(name_value) => this.updateActivitySettings(name_value)}
          settings={activity_settings}
          fields={editor_page}
          />
        <div>
          <DisplayJson title='State (edited values)' objectToDisplay={activity_settings} />
          <DisplayJson title='Property (input values)' objectToDisplay={this.props} />
        </div>
      </div>
    );
  }
}

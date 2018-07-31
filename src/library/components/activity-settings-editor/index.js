import React from 'react'
// import css from './style.scss'

/*
* See `README.md` in this folder for the complete structure of the
* Settings-Editor props.
*/

// We will come back to setting up the data-store a little bit later.
// const ActivityEditorDataStore = { }

export default class ActivitySettingsEditor extends React.Component {

  constructor (props) {
    super(props)
    this.state = Object.assign(props)
  }

  longDescriptorOnChange (value) {
    console.log('The value = ' + value);
    this.setState({long_description_for_teacher:value})
  }

  activateTabPage(pageToActivate) {
    console.log('About to activate tab-page ' + pageToActivate);
    //for loop
    document.getElementById(pageToActivate).style.display = "block";
  }

  render () {

    const tabBarStyle = {
      overflow: 'hidden',
      border: '1px solid'
      };

    const tabButtonStyle = {
      float: 'left',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      padding: '1em',
      margin: '0.2em',
      background: 'orange'
      };

    const tabPageStyle = {
      display: 'none',        // Initialize them all as hidden.
      padding: '0.5em 1em',
      border: '1px solid',
      borderTop: 'none'
      };

    const setttings = this.state;

    return (
      <div>
        <div style={tabBarStyle} >
          <button style={tabButtonStyle} onClick={ () => this.activateTabPage('general') }>General</button>
          <button style={tabButtonStyle} onClick={ () => this.activateTabPage('layout')  }>Layout</button>
          <button style={tabButtonStyle} onClick={ () => this.activateTabPage('advanced') }>Advanced</button>
        </div>

      <div id="General" style={tabPageStyle} >
         <h2>General Settings</h2>
      </div>

      <div id="Layout" style={tabPageStyle} >
         <h2>Layout Settings</h2>
      </div>

      <div id="Advanced" style={tabPageStyle} >
         <h2>Advanced Settings</h2>
      </div>


        <div>
          Long Description For Teacher:
          <textarea
          value={ this.state.long_description_for_teacher }
          onChange={ e => this.longDescriptorOnChange(e.target.value) } />
        </div>
        Everything here, from this point down, would be the LARA editing
        experience for manipulating an activity or sequence. At the moment, we
        just going to display the JSON object that is specific to the activity
        we've selected to edit.
        <br />
        <br />
        <br />
        <details>
          <summary>Show "state" JSON</summary>
          <pre>
          state =&nbsp;
            {JSON.stringify(this.state, null, 2)}
          </pre>
        </details>
        <br />
        <details>
          <summary>Show "property" JSON</summary>
          <pre>
          state =&nbsp;
            {JSON.stringify(this.props, null, 2)}
          </pre>
        </details>
     </div>
    )
  }
}

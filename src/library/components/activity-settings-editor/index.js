import React from 'react'
// import css from './style.scss'

/*
* See `README.md` in this folder
* for the complete netsed structure of the Navigation props.
*/
export default class ActivitySettingsEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      opened: true,
      selection: props.selected_section
    }
  }

  render () {
    return (
      <div>
        Everything here, from this point down, would be the LARA editing
        experience for manipulating an activity or sequence. At the moment, we
        just going to display the JSON object that is specific to the activity
        we've selected to edit.
        <pre>
        Dubugging Info -- "{this.props.name}" JSON is as follows:
        <br />
        {JSON.stringify(this.props, null, 2)}
        </pre>
      </div>
    )
  }
}

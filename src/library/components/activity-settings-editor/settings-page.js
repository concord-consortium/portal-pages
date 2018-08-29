import React from 'react'
import CheckBox from './check-box'
import ChoiceBox from './choice-box'
import TextBox from './text-box'
import update_server from './update-server'

export default class SettingsPage extends React.Component {

  createSubComponent(field, settings, update) {
    const n = field.name;
    const v = settings[n];
    const o = field.options;
    const id = settings['id'];
    switch (field.type) {
      case 'choice':
        return ( <ChoiceBox name={n} value={v} update={update} options={o}
          api={ (e) => { update_server(id, { [n]: e.target.value }) } } />);
      case 'boolean':
        return ( <CheckBox name={n} value={v} update={update} options={o}
            api={ (e) => { update_server(id, { [n]: e.target.checked }) } } />);
      case 'text':
      default:
        return ( <TextBox name={n} value={v} update={update} options={o}
            api={ (e) => { update_server(id, { [n]: e.target.value }) } } />);
    }
  }

  render () {
    const { fields, settings, update } = this.props
    return (
      <div>
        <span>
          <p>
            A message from your developer: This list describes the state of
            each setting -- as indicated by a letter at the beginning of each
            description, for each setting.
            <ul>
              <li>W: appears to work</li>
              <li>N: needs a portal "setting" name</li>
              <li>A: broken in the portal API</li>
              <li>D: needs descriptive text</li>
            </ul>
            <br />
          </p>
        </span>
        <table>
          <tbody>
            {
              fields.editor_page.map( (field) => {
                return (
                  <tr>
                    <td>{ field.label }</td>
                    <td>{ this.createSubComponent(field, settings, update) }</td>
                    <td>{ field.dscrp }</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

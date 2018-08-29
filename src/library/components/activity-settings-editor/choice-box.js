import React from 'react'

export default class ChoiceBox extends React.Component {
  render () {
    const { api, options } = this.props;
    return (
      <div>
        <select onChange={ (e) => { api(e) } } >
        {
          options.map( (option) => {
            return (<option value={option.value}>{option.option}</option>);
          })
        }
        </select>
      </div>      
    );
  }
}

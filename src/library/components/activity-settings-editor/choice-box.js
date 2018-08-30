import React from 'react'

export default class ChoiceBox extends React.Component {
  render () {
    const { api, value, options } = this.props;
    return (
      <div>
        <select onChange={ (e) => { api(e) } } >
        {
          options.map( (option) => { return (
            <option
              value={option.value}
              selected={option.value == value ? "selected" : ""}
            >
              {option.option}
            </option>);
          })
        }
        </select>
      </div>      
    );
  }
}

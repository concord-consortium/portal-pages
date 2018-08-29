import React from 'react'

export default class CheckBox extends React.Component {
  render () {
    const { name, value, update, api } = this.props;
    return (
      <div>
        <input
          type='checkbox'
          checked={value === true}
          onChange={ (e) => {
            update({ [name]: !! e.target.checked });
            api(e);
          }}
        />
      </div>
    )
  }
}
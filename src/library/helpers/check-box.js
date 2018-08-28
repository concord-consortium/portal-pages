import React from 'react'

export default class CheckBox extends React.Component {
  render () {
    const { name, value, update } = this.props;
    return (
      <div>
        <input
          type='checkbox'
          checked={this.props.value === true}
          onChange={ (e) => {
            this.props.update({ [this.props.name]: !!e.target.checked });
            this.props.api(e);
          }}
        />
      </div>
    )
  }
}
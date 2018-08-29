import React from 'react'

export default class TextBox extends React.Component {
  render () {
    const textAreaStyle = {
      width: '350px',
      height: '20px'
    }
    const {api, value, update, name } = this.props;
    return (
      <textarea style={textAreaStyle} value={value}
        onChange={ (e) => { update({ [name]: e.target.value }); } }
        onBlur={ (e) => { api(e) } }
      />
    )
  }
}
import React from 'react'
import { withFormsy } from 'formsy-react';

class CheckboxInput extends React.Component {
  componentDidMount() {
    return this.props.setValue(this.props.defaultChecked)
  }

  changeValue(event) {
    return this.props.setValue(event.target.checked)
  }

  render() {
    return (
      <div className={`checkbox-input ${this.props.name}`}>
        <label className="checkbox-label">
          <input type="checkbox" onChange={this.changeValue} defaultChecked={this.props.defaultChecked} />
          {this.props.label}
        </label>
      </div>
    )
  }
}

export default withFormsy(CheckboxInput)

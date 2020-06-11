import React from 'react'
import { withFormsy } from 'formsy-react';

class SelectInput extends React.Component {

  constructor(props) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
  }

  changeValue(option) {
    this.setValue(option && option.value)
    this.props.onChange(option)
  }

  render() {
    const {placeholder, loadOptions, disabled} = this.props
    let className = 'select-input'
    if (this.getValue()) {
      className += ' valid'
    }

    return (
      <div className={className}>
        <Select.Async
          placeholder={placeholder}
          loadOptions={loadOptions}
          disabled={disabled}
          value={this.getValue() || ''}
          onChange={this.changeValue}
          clearable={false}
        >
          <div className='input-error'>
            {this.getErrorMessage()}
          </div>
        </Select.Async>
      </div>
    )
  }
}

export default withFormsy(SelectInput)

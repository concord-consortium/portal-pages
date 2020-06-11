import React from 'react'
import { withFormsy } from 'formsy-react';

class TextInput extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      inputVal: '',
      _asyncValidationPassed: true
    }

    this.onChange = this.onChange.bind(this)
  }

  isValidAsync() {
    return this.isValid && this.state._asyncValidationPassed
  }

  validateAsync(value) {
    if (!this.props.asyncValidation) {
      return
    }
    this.setState({
      _asyncValidationPassed: false
    })
    if (this._asyncValidationTimeoutID) {
      window.clearTimeout(this._asyncValidationTimeoutID)
    }
    this._asyncValidationTimeoutID = window.setTimeout(() => {
      this.props.asyncValidation(value).done(() => {
        this.setState({
          _asyncValidationPassed: true
        })
        this.context.formsy.validate(this)
      }).fail(function () {
        this.setState({
          _asyncValidationPassed: false,
          _isValid: false,
          _externalError: [this.props.asyncValidationError]
        })
      })
    }, this.props.asyncValidationTimeout)
  }

  onChange(event) {
    let newVal = event.currentTarget.value
    const delay = this.isValidValue(newVal) ? 0 : TIMEOUT

    this.setState({
      inputVal: newVal
    })

    if (this.timeoutID) {
      window.clearTimeout(this.timeoutID)
    }
    this.timeoutID = window.setTimeout(() => {
      if (this.props.processValue) {
        newValue = this.props.processValue(newVal)
      }
      this.setValue(newValue)
    }, delay)
    if (this.isValidValue(newVal)) {
      this.validateAsync(newVal)
    }
  }

  render() {
    const {type, placeholder, disabled} = this.props

    let className = 'text-input ' + this.props.name
    if (this.showRequired && !this.isPristine) {
      className += ' required'
    }
    if (this.showError) {
      className += ' error'
    }
    if (this.isValidAsync()) {
      className += ' valid'
    }
    if (disabled) {
      className += ' disabled'
    }

    return (
      <div className={className}>
        <input
          type={type}
          onChange={this.onChange}
          value={this.state.inputVal}
          placeholder={placeholder}
          disabled={disabled}
        />
        <div className="input-error">
          {this.errorMessage}
        </div>
      </div>
    )
  }
}

TextInput.defaultProps = {
  type: 'text',
  asyncValidationTimeout: 500,
  asyncValidationError: 'Async validation failed'
}

export default withFormsy(TextInput)

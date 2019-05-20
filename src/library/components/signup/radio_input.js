import React from 'react'

const RadioInput = () => {
  return React.createClass({
    displayName: 'RadioInput',
    mixins: [Formsy.Mixin],

    renderOptions (options) {
      let i, len, option, ref1, results
      ref1 = options
      results = []
      for (i = 0, len = ref1.length; i < len; i++) {
        option = ref1[i]
        results.push(<label><input type='radio' onChange={this.changeValue} value={option.value} checked={this.getValue() === option.value} /> {option.label}</label>)
      }
      return results
    },

    changeValue: function (event) {
      console.log('INFO RadioInput changeValue', event)
      if (this.props.handleChange) {
        this.props.handleChange(event)
      }
      return this.setValue(event.currentTarget.value)
    },

    render () {
      return (
        <div className='radio-input stacked'>
          <div className='title inline'>
            {this.props.title}
          </div>
          {this.renderOptions(this.props.options)}
        </div>
      )
    }
  })
}

module.exports = RadioInput

import React from 'react'
var TIMEOUT = 500

var ref = React.DOM
var div = ref.div

var SchoolInput = function () {
  // console.log("INFO creating school_input");

  var ReactSelect, getSchools
  ReactSelect = React.createFactory(Select)
  getSchools = function (country, zipcode) {
    return jQuery.get(Portal.API_V1.SCHOOLS + '?country_id=' + country + '&zipcode=' + zipcode)
  }
  return React.createClass({
    displayName: 'SchoolInput',
    mixins: [Formsy.Mixin],
    getInitialState: function () {
      return {
        isLoading: false,
        options: []
      }
    },
    componentDidMount: function () {
      return this.updateOptions()
    },
    componentDidUpdate: function (prevProps) {
      var ref1 = this.props
      var country = ref1.country
      var zipcode = ref1.zipcode
      if (prevProps.country !== country || prevProps.zipcode !== zipcode) {
        this.setValue('')
        return this.updateOptions()
      }
    },
    newSchoolLink: function () {
      var onAddNewSchool
      onAddNewSchool = this.props.onAddNewSchool
      return div({
        className: 'new-school-link',
        onClick: onAddNewSchool
      }, 'Add a new school')
    },
    changeValue: function (option) {
      return this.setValue(option && option.value)
    },
    updateOptions: function () {
      var ref1 = this.props
      var country = ref1.country
      var zipcode = ref1.zipcode
      if ((country == null) || (zipcode == null)) {
        return
      }
      if (this.timeoutID) {
        window.clearTimeout(this.timeoutID)
      }
      this.setState({
        isLoading: true
      })
      this.timeoutID = window.setTimeout((function (_this) {
        return function () {
          return getSchools(country, zipcode).done(function (data) {
            var options
            options = data.map(function (school) {
              return {
                label: school.name,
                value: school.id
              }
            })
            options.push({
              label: _this.newSchoolLink(),
              disabled: true
            })
            return _this.setState({
              options: options,
              isLoading: false
            })
          })
        }
      })(this), TIMEOUT)
      return this.timeoutID
    },
    render: function () {
      var className = 'select-input'
      var ref1 = this.props
      var placeholder = ref1.placeholder
      var disabled = ref1.disabled
      var ref2 = this.state
      var options = ref2.options
      var isLoading = ref2.isLoading
      if (this.getValue()) {
        className += ' valid'
      }
      return div({
        className: className
      }, ReactSelect({
        placeholder: placeholder,
        options: options,
        isLoading: isLoading,
        disabled: disabled,
        value: this.getValue() || '',
        onChange: this.changeValue,
        clearable: false,
        noResultsText: div({}, div({}, 'No schools found'), this.newSchoolLink())
      }), div({
        className: 'input-error'
      }, this.getErrorMessage()))
    }
  })
}

module.exports = SchoolInput

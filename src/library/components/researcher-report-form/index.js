import React from 'react'
import LogReportButton from './logs-report-button'

const ReactSelect = React.createFactory(Select)
const DayP = React.createFactory(DayPickerOverlay)

const title = str => (str.charAt(0).toUpperCase() + str.slice(1)).replace(/_/g, ' ')

const queryCache = {}

export default class ResearcherReportForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      counts: {},
      // the current values of the filters
      schools: [],
      teachers: [],
      runnables: [],
      permission_forms: [],
      start_date: '',
      end_date: '',
      hide_names: false,
      // all possible values for each pulldown
      filterables: {
        schools: [],
        teachers: [],
        runnables: [],
        permission_forms: []
      },
      // waiting for results
      waitingFor_schools: false,
      waitingFor_teachers: false,
      waitingFor_runnables: false,
      waitingFor_permission_forms: false
    }
    this.getQueryParams = this.getQueryParams.bind(this)
  }

  componentWillMount () {
    this.updateFilters()
  }

  // Queries ES using the portal API
  // If we pass a field name, the filter box for that field will *not* be
  // updated, b ut all others will. This lets us find all possible values
  // for a dropdown given all the other filters.
  // If we don't pass a field name, the counts are updates.
  // All requests are cached, and if we make a duplicate request as one that
  // is still pending, the new callback is added as a chained promise, so that
  // no new request is made.
  query (_params, _fieldName, searchString) {
    if (_fieldName) {
      this.setState({[`waitingFor_${_fieldName}`]: true})
    }
    const params = jQuery.extend({}, _params) // clone
    if (_fieldName) {
      // we remove the value of each field from the filter query for that
      // dropdown, as we want to know all possible values for that dropdown
      // given only the other filters
      delete params[_fieldName]
    }
    if (searchString) {
      params[_fieldName] = searchString
    }

    const cacheKey = JSON.stringify(params)

    const handleResponse = (fieldName => {
      return data => {
        let newState
        queryCache[cacheKey] = data
        const aggs = data.aggregations
        if (fieldName) {
          newState = {filterables: this.state.filterables}
          let {buckets} = aggs[fieldName]
          const idsField = `${fieldName}_ids`
          if (aggs[idsField]) {
            // some fields have a separate id aggregration that is filtered
            // based on the access of the current user
            // we use this to filter the buckets in the main field aggregration
            const filteredIds = aggs[idsField].buckets.map(b =>
              // sometimes this will be an integer and sometimes it will be a string
              // convert it to a string for consistency
              b.key.toString()
            )

            buckets = buckets.filter(b => filteredIds.indexOf(b.key.match(/\d+/)[0]) !== -1)
          }

          if (searchString) {
            // merge results
            if (newState.filterables[fieldName] == null) { newState.filterables[fieldName] = [] } // aggs[fieldName].buckets
            newState.filterables[fieldName] = newState.filterables[fieldName].concat(buckets)
          } else {
            newState.filterables[fieldName] = buckets
          }
          newState[`waitingFor_${_fieldName}`] = false
        } else {
          newState = {
            counts: {
              learners: data.hits.total,
              students: aggs.count_students.value,
              classes: aggs.count_classes.value,
              teachers: aggs.count_teachers.value,
              runnables: aggs.count_runnables.value
            }
          }
        }
        this.setState(newState)
        return data
      }
    })(_fieldName)

    if ((queryCache[cacheKey] != null ? queryCache[cacheKey].then : undefined)) { // already made a Promise that is still pending
      queryCache[cacheKey].then(handleResponse) // chain a new Then
    } else if (queryCache[cacheKey]) { // have data that has already returned
      handleResponse(queryCache[cacheKey]) // use it directly
    } else {
      queryCache[cacheKey] = jQuery.ajax({ // make req and add new Promise to cache
        url: '/api/v1/report_learners_es',
        type: 'GET',
        data: params
      }).then(handleResponse)
    }
  }

  getQueryParams () {
    const params = {}
    for (var filter of ['schools', 'teachers', 'runnables', 'permission_forms']) {
      if ((this.state[filter] != null ? this.state[filter].length : undefined) > 0) {
        params[filter] = this.state[filter].map(v => v.value).sort().join(',')
      }
    }
    for (filter of ['start_date', 'end_date']) {
      if ((this.state[filter] != null ? this.state[filter].length : undefined) > 0) { params[filter] = this.state[filter] }
    }
    return params
  }

  updateFilters () {
    const params = this.getQueryParams()
    // update the counts, and the values in all the dropdowns. We have to do
    // them all separately, as each dropdown may require a different query,
    // depending on the other filters. If the queries are the same, however,
    // no additional requests are made over the network
    this.query(params)
    this.query(params, 'schools')
    this.query(params, 'teachers')
    this.query(params, 'runnables')
    this.query(params, 'permission_forms')
  }

  renderTopInfo () {
    const { counts } = this.state
    if ((Object.keys(counts)).length > 0) {
      return Object.keys(counts).map(k => (
        <span key={k} style={{paddingLeft: 12}}>
          <span style={{fontWeight: 'bold'}}>{k}</span>
          <span style={{paddingLeft: 6}}>{this.state.counts[k]}</span>
        </span>
      ))
    } else {
      return <i className='wait-icon fa fa-spinner fa-spin' />
    }
  }

  renderInput (name) {
    if (!this.state.filterables[name]) { return }
    const agg = this.state.filterables[name]

    const isLoading = this.state[`waitingFor_${name}`]
    const placeholder = !isLoading ? 'Select ...' : 'Loading ...'

    // convert to all strings
    let options = agg.map(function (f) { if (typeof f === 'string') { return f } else { return f.key } })

    // rm dupes
    options = options.filter((str, i) => options.indexOf(str) === i)

    // split into values/labels
    options = options.map(function (f) {
      const idName = typeof f === 'string' ? f.split(/:(.+)/) : f.key.split(/:(.+)/)
      return {value: idName[0], label: idName[1]}
    })

    // rm messed-up ES values
    options = options.filter(o => o.value.indexOf('%{') < 0)

    const handleSelectInputChange = value => {
      if (value.length === 4) {
        const params = this.getQueryParams()
        this.query(params, name, value)
        return value
      }
    }

    const handleSelectChange = value => {
      this.setState({[name]: value}, () => {
        this.updateFilters()
      })
    }

    return (
      <div style={{marginTop: '6px'}}>
        <span>{title(name)}</span>
        <ReactSelect
          name={name}
          options={options}
          multi
          joinValues
          placeholder={placeholder}
          isLoading={isLoading}
          value={this.state[name]}
          onInputChange={handleSelectInputChange}
          onChange={handleSelectChange}
        />
      </div>
    )
  }

  renderDatePicker (name) {
    const label = name === 'start_date' ? 'Earliest date of last run' : 'Latest date of last run'

    const handleChange = value => {
      this.setState({[name]: value}, () => {
        this.updateFilters()
      })
    }

    return (
      <div>
        <span>{label}</span>
        <DayP
          name={name}
          value={this.state[name]}
          onChange={handleChange}
        />
      </div>
    )
  }

  renderCheck (name) {
    const handleChange = evt => {
      this.setState({[name]: evt.target.checked})
    }
    return (
      <div>
        <input
          name={name}
          type='checkbox'
          style={{margin: '15px 10px 0 0'}}
          checked={this.state[name]}
          onChange={handleChange}
        />
        {title(name)}
      </div>
    )
  }

  renderButton (name) {
    return (
      <input
        style={{margin: '10px 10px 0 0'}}
        type='submit'
        name='commit'
        value={name}
      />
    )
  }

  renderForm () {
    const { logReports } = this.props
    return (
      <form url={window.location.pathname} method='get'>
        {this.renderInput('schools')}
        {this.renderInput('teachers')}
        {this.renderInput('runnables')}
        {this.renderInput('permission_forms')}

        {this.renderDatePicker('start_date')}
        {this.renderDatePicker('end_date')}

        {this.renderCheck('hide_names')}

        {this.renderButton('Usage Report')}
        {this.renderButton('Details Report')}
        {this.renderButton('Arg Block Report')}

        {logReports.map(lr =>
          <LogReportButton label={lr.label} url={lr.url} getQueryParams={this.getQueryParams} />
        )}
      </form>
    )
  }

  render () {
    return (
      <div>
        <div>
          <h3>Your filter matches:</h3>
          {this.renderTopInfo()}
        </div>
        {this.renderForm()}
      </div>
    )
  }
}

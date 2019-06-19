import React from 'react'
import jQuery from 'jquery'

const postToUrl = (url, json, signature, portalToken) => {
  // Issue POST request to Log app. We can't use GET, as URL could get too long. Generating a fake
  // form is a way to send non-Ajax POST request and open the target page.
  const tempForm = jQuery(
    `<form action="${url}" method="POST">` +
    `<input type="hidden" name="allowDebug" value="1">` +
    `<input type="hidden" name="json" value='${JSON.stringify(json)}'>` +
    `<input type="hidden" name="signature" value="${signature}">` +
    (portalToken ? `<input type="hidden" name="portal_token" value="${portalToken}">` : '') +
    `</form>`
  )
  tempForm.appendTo('body').submit()
  // Unless form uses target="_blank", this action results in redirect and cleanup is not necessary.
  // But it won't hurt and if target="_blank" is ever used, it's gonna be useful.
  tempForm.remove()
}

export default class ExternalReportButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      disabled: this.isDisabled(props)
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({disabled: this.isDisabled(nextProps)})
  }

  render () {
    const {label} = this.props
    const {disabled} = this.state
    return <input type='submit' onClick={this.handleClick} disabled={disabled} value={label} />
  }

  handleClick (event) {
    const { reportUrl, queryUrl, getQueryParams, postToUrl, portalToken } = this.props
    // Make sure we don't submit a form if this component is part of a form (it's possible but not required).
    event.preventDefault()
    // Get the signed query JSON first.
    jQuery.ajax({
      type: 'GET',
      dataType: 'json',
      // jQuery.param nicely converts JS hash into query params string.
      url: `${queryUrl}?${jQuery.param(getQueryParams())}`,
      success: response => {
        postToUrl(reportUrl, response.json, response.signature, portalToken)
      },
      error: (jqXHR, textStatus, error) => {
        console.error('logs_query request failed', error)
        window.alert('Logs query generation failed. Please reload the page and try again.')
        this.setState({disabled: false})
      }
    })
    this.setState({disabled: true})
  }

  isDisabled (props) {
    return Object.keys(props.getQueryParams()).length === 0
  }
}

ExternalReportButton.defaultProps = {
  queryUrl: typeof Portal !== 'undefined' ? Portal.API_V1.EXTERNAL_RESEARCHER_REPORT_QUERY : '',
  postToUrl: postToUrl
}

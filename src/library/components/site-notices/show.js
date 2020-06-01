import React from 'react'

import css from './style.scss'

export default class ShowSiteNotices extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      notices: [],
      noNotice: props.noNotice,
      noticeDisplay: props.noticeDisplay,
      toggleDisplayPath: props.toggleDisplayPath
    }
    this.getPortalData = this.getPortalData.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  componentDidMount () {
    const { dataUrl, initialData } = this.props
    if (dataUrl && !initialData) {
      this.getPortalData()
    }
  }

  getPortalData () {
    const { dataUrl } = this.props
    jQuery.ajax({
      url: dataUrl,
      success: data => {
        this.setState({
          notices: data
        })
      },
      error: () => {
        console.error(`GET ${dataUrl} failed, can't render notices`)
      }
    })
  }

  handleDelete (notice) {
    const dismissUrl = '/api/v1/site_notices/' + notice.id + '/dismiss_notice'
    const authToken = jQuery('meta[name="csrf-token"]').attr('content')
    if (window.confirm('Are you sure you want to dismiss this notice?')) {
      jQuery.ajax({
        url: dismissUrl,
        type: 'post',
        data: 'authenticity_token=' + encodeURIComponent(authToken),
        success: data => {},
        error: () => {
          console.error(`POST failed, can't dismiss notice`)
        }
      })
    }
    return false
  }

  handleToggle () {
    const { noticeDisplay, toggleDisplayPath } = this.state
    jQuery.ajax({
      url: toggleDisplayPath,
      method: 'post',
      success: data => {
        // this.setState({})
      },
      error: () => {
        console.error(`POST ${toggleDisplayPath} failed`)
      }
    })
    if (noticeDisplay === 'collapsed') {
      this.setState({ noticeDisplay: '' })
    } else {
      this.setState({ noticeDisplay: 'collapsed' })
    }
  }

  renderRow (notice) {
    let noticeRowId = 'admin__site_notice_' + notice.id
    return (
      <tr id={noticeRowId}>
        <td>
          {notice.created_at.slice(0, 10)}
        </td>
        <td dangerouslySetInnerHTML={{ __html: notice.notice_html }} />
        <td>
          <a href={'#'} onClick={() => this.handleDelete(notice)} title={'Dismiss'}>x</a>
        </td>
      </tr>
    )
  }

  render () {
    const { notices, noNotice, noticeDisplay } = this.state
    if (noNotice) {
      return (
        <div>
          There are currently no notices.
        </div>
      )
    }

    let userNoticeContainerClass = 'user_notice_container_div webkit_scrollbars'
    let toggleText = 'Hide Notices'
    if (noticeDisplay === 'collapsed') {
      userNoticeContainerClass = [userNoticeContainerClass, css.collapsed].join(' ')
      toggleText = 'Show Notices'
    }

    return (
      <div id={'notice_container'} className={'notice_container'}>
        <div className={'notices_top'}>
          <div className={'showhide_notices'}>
            <a href={'#'} id={'oHideShowLink'} onClick={this.handleToggle} title={toggleText}>{toggleText}</a>
          </div>
          <div className={'notice_header'}>
            Notices
          </div>
          <div className={userNoticeContainerClass} id={'user_notice_container_div'}>
            <table className={'all_notice_to_render'} id={'all_notice_to_render'}>
              <tbody>
                { notices.map(this.renderRow) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

ShowSiteNotices.defaultProps = {
  // This path will return all site notices for logged in user.
  dataUrl: Portal.API_V1.GET_NOTICES_FOR_USER,
  // If initialData is not provided, component will use API (dataUrl) to get it.
  initialData: null
}

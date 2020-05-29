import React from 'react'
import Notices from './notices'

export default class SiteNotices extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      notices: []
    }
    this.getPortalData = this.getPortalData.bind(this)
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

  render () {
    const { notices } = this.state
    return (
      <div id={'admin_notice_listing_container-inner'}>
        <h1>Notices</h1>
        <Notices notices={notices} />
        <div className={'floatR'}>
          <a href='/admin/site_notices/new' className={'button'}>Create New Notice</a>
        </div>
      </div>
    )
  }
}

SiteNotices.defaultProps = {
  // This path will return all site notices.
  dataUrl: Portal.API_V1.SITE_NOTICES_INDEX,
  // If initialData is not provided, component will use API (dataUrl) to get it.
  initialData: null
}

import React from 'react'

export default class SiteNoticesEditForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      notice: this.props.notice
    }
  }

  render () {
    const { notice } = this.state
    const formAction = '/api/v1/site_notices/' + notice.id
    const formId = 'edit_admin_site_notice_' + notice.id
    const authToken = jQuery('meta[name="csrf-token"]').attr('content')
    return (
      <div id={'admin_notice_edit_container-inner'}>
        <h1>Edit Notice</h1>
        <form acceptCharset='UTF-8' action={formAction} method='post' id={formId} className={'edit_admin_site_notice'}>
          <div>
            <input name='utf8' type='hidden' value='✓' />
            <input name='_method' type='hidden' value='put' />
            <input name='authenticity_token' type='hidden' value={authToken} />
          </div>
          <div id={'editor'} className={'editor'}>
            <textarea className={'tinymce_textarea'} rows={'40'} name={'notice_html'} defaultValue={notice.notice_html} />
          </div>
          <div className={'back_link'}>
            <a href='/admin/site_notices'>Cancel</a>
          </div>
          <div id={'submit_button_container'} className={'submit_button_container'}>
            <input className={'pie'} name='commit' type='submit' value='Update Notice' />
          </div>
        </form>
      </div>
    )
  }
}

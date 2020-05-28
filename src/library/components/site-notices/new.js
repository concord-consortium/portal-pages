import React from 'react'

export default class SiteNoticesNewForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount () {

  }

  componentWillUnmount () {
  }

  render () {
    const authToken = jQuery('meta[name="csrf-token"]').attr('content')
    return (
      <div id={'admin_notice_edit_container-inner'}>
        <h1>Create Notice</h1>
        <form acceptCharset='UTF-8' action='create' method='post'>
          <div>
            <input name='utf8' type='hidden' value='✓' />
            <input name='authenticity_token' type='hidden' value={authToken} />
          </div>
          <div id={'editor'} className={'editor'}>
            <textarea className={'tinymce_textarea'} rows={'40'} name={'notice_html'} />
          </div>
          <div id={'filters'}>
            <h2>Receivers</h2>
            <div id={'roles'} className={'roles'}>
              <div className={'checkboxcontainers'}>
                <div className={'rolescheckboxes'}>
                  <input id='admin' name='role[]' type='checkbox' value='1' defaultChecked />
                  <label htmlFor='admin'>Admin</label>
                </div>
                <div className={'rolescheckboxes'}>
                  <input id='manager' name='role[]' type='checkbox' value='1' defaultChecked />
                  <label htmlFor='manager'>Manager</label>
                </div>
                <div className={'rolescheckboxes'}>
                  <input id='researcher' name='role[]' type='checkbox' value='1' defaultChecked />
                  <label htmlFor='researcher'>Researcher</label>
                </div>
              </div>
              <div className={'checkboxcontainers'}>
                <div className={'rolescheckboxes'}>
                  <input id='author' name='role[]' type='checkbox' value='1' defaultChecked />
                  <label htmlFor='author'>Author</label>
                </div>
                <div className={'rolescheckboxes'}>
                  <input id='member' name='role[]' type='checkbox' value='1' defaultChecked />
                  <label htmlFor='member'>Member</label>
                </div>
              </div>
            </div>
          </div>
          <div className={'back_link'}>
            <a href='/admin/site-notices'>Cancel</a>
          </div>
          <div id={'submit_button_container'} className={'submit_button_container'}>
            <input className={'pie'} name='commit' type='submit' value='Publish Notice' />
          </div>
        </form>
      </div>
    )
  }
}

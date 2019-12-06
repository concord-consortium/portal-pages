import React from 'react'

export default class RecentCollectionsPages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        recentCollectionsPages: []
      }
    this.getRecentCollectionsPages = this.getRecentCollectionsPages.bind(this)
  }

  componentDidMount() {
    this.getRecentCollectionsPages()
  }

  getRecentCollectionsPages () {
    jQuery.ajax({
      url: Portal.API_V1.GET_RECENT_COLLECTIONS_PAGES,
      dataType: 'json',
      success: function (data) {
        //console.log(data)
        this.setState({ recentCollectionsPages: data })
      }.bind(this)
    })
  }

  render () {
    return (
      <div className={'recentCollectionsPages'}>
        <h2>Recently Visited Collections</h2>
        <ul className={'recentCollectionsPages__list'}>
        {
          Object.keys(this.state.recentCollectionsPages).map(key => {
            return (
              <li className={'recentCollectionsPages__list-item'}>
                <a href={this.state.recentCollectionsPages[key].landing_page_slug}>
                  <img src={this.state.recentCollectionsPages[key].project_card_image_url} />
                  {this.state.recentCollectionsPages[key].name}
                </a>
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}

module.exports = RecentCollectionsPages

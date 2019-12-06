import React from 'react'
import css from './style.scss'

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
      <div className={css.recentCollectionsPages}>
        <h2>Recently Visited Collections</h2>
        <ul className={css.recentCollectionsPages__list}>
        {
          Object.keys(this.state.recentCollectionsPages).map(key => {
            let imgStyle = {
              backgroundImage: 'url(' + this.state.recentCollectionsPages[key].project_card_image_url + ')'
            }
            return (
              <li className={css.recentCollectionsPages__list_item}>
                <a href={this.state.recentCollectionsPages[key].landing_page_slug}>
                  <span className={css.recentCollectionsPages__list_item_img} style={imgStyle}></span>
                  <span className={css.recentCollectionsPages__list_item_name}>
                    {this.state.recentCollectionsPages[key].name}
                  </span>
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

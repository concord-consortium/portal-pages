import React from 'react'
import css from './style.scss'

export default class TeacherProjectViews extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      TeacherProjectViews: null
    }
    this.getTeacherProjectViews = this.getTeacherProjectViews.bind(this)
  }

  componentDidMount () {
    this.getTeacherProjectViews()
  }

  getTeacherProjectViews () {
    jQuery.ajax({
      url: Portal.API_V1.GET_TEACHER_PROJECT_VIEWS,
      dataType: 'json',
      success: function (data) {
        this.setState({ TeacherProjectViews: data })
      }.bind(this)
    })
  }

  render () {
    if (Portal.currentUser.isTeacher && this.state.TeacherProjectViews !== null && this.state.TeacherProjectViews.length > 0) {
      return (
        <div className={css.teacherProjectViews}>
          <h2>Recently Visited Collections</h2>
          <ul className={css.teacherProjectViews__list}>
            {
              Object.keys(this.state.TeacherProjectViews).map(key => {
                let imgStyle = {
                  backgroundImage: 'url(' + this.state.TeacherProjectViews[key].project_card_image_url + ')'
                }
                return (
                  <li className={css.teacherProjectViews__list_item} key={this.state.TeacherProjectViews[key].id}>
                    <a href={this.state.TeacherProjectViews[key].landing_page_slug}>
                      <span className={css.teacherProjectViews__list_item_img} style={imgStyle} />
                      <span className={css.teacherProjectViews__list_item_name}>
                        {this.state.TeacherProjectViews[key].name}
                      </span>
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </div>
      )
    } else {
      return null
    }
  }
}

module.exports = TeacherProjectViews

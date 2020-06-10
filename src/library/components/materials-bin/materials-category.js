import React from 'react'

export default class MBMaterialsCategory extends React.Component {
  hideForAnonymous () {
    return this.props.loginRequired && Portal.currentUser.isAnonymous
  }

  getVisibilityClass () {
    if (this.hideForAnonymous() || !this.props.visible) {
      return 'mb-hidden'
    } else {
      return ''
    }
  }

  getSelectionClass () {
    if (this.props.selected) {
      return 'mb-selected'
    } else {
      return ''
    }
  }

  handleClick () {
    this.props.handleClick(this.props.column, this.props.slug)
  }

  render () {
    const className = `mb-cell mb-category mb-clickable ${this.props.customClass || ''} ${this.getVisibilityClass()} ${this.getSelectionClass()}`
    return (
      <div className={className} onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </div>
    )
  }
}

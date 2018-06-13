import React from 'react'
import css from './style.scss'

const defaultNavProps = {
  links: []
}

export default class Navigation extends React.Component {
  constructor (props = defaultNavProps) {
    super(props)
    this.state = {}
  }

  renderHead () {
    const {greeting, name, testing} = this.props
    return (
      <div className={css.head}>
        <p>
          {testing} {greeting}
          <br />
          <strong>{name}</strong>
        </p>
      </div>
    )
  }

  renderLink (linkDef) {
    // iconName, label, section, url, function
    const {popOut, iconName, label, target, url, className} = linkDef
    const icon = popOut ? 'icon-arrow-circle-right' : iconName
    const linkStyles = (classNames) =>
      classNames.split(' ')
        .map((name) => css[name] || name)
        .join(' ')
        .replace(/^\s+|\s+$/g, '')
    return (
      <li className={linkStyles(className)}>
        <a href={url} target={target}>
          <div className={css['icon']}>
            <i className={icon} />
          </div>
          {label}
        </a>
      </li>
    )
  }
  render () {
    // const links = defaultNavProps.links
    // const props = this.props
    const realLinks = this.props.links.map((link) => this.renderLink(link))
    const head = this.renderHead()
    return (
      <div id='left-navigation'>
        {head}
        <ul>
          {realLinks}
        </ul>
      </div>
    )
  }
}

Navigation.defaultProps = {
  greeting: 'Hello',
  name: 'Guest',
  links: [
    {label: 'help', url: '/help'}
  ]
}

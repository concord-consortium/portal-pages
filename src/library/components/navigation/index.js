import React from 'react'
import css from './style.scss'

const defaultNavProps = {
  links: []
}

const ROOT_SELECTION = '__ROOT__'
const SECTION_TYPE = 'SECTION'

export default class Navigation extends React.Component {
  constructor (props = defaultNavProps) {
    super(props)
    this.state = {
      selection: props.selected_section
    }
  }

  renderHead () {
    const {greeting, name} = this.props
    return (
      <div className={css.head}>
        <span className={css.greeting}>{greeting}</span>
        <br />
        <strong>{name}</strong>
        <hr />
      </div>
    )
  }

  getLinkClasses (linkDef) {
    const classes = (linkDef.classNames && linkDef.classNames.split()) || []
    if (linkDef.small) {
      classes.push('small')
    }
    if (linkDef.divider) {
      classes.push('divider')
    }
    return classes
  }

  renderLink (linkDef) {
    const {popOut, iconName, label, url, onClick} = linkDef
    const {selection} = this.state
    const target = popOut ? '_blank' : '_self'
    const icon = popOut ? 'icon-arrow-circle-right' : iconName
    const classNames = this.getLinkClasses(linkDef)
    const selected = linkDef.id === selection
    if (selected) {
      classNames.push('selected')
    }
    const linkStyles = classNames
      .map((name) => css[name] || name)
      .join(' ')
      .replace(/^\s+|\s+$/g, '')
    const clickHandler = (e) => {
      // don't trigger on parent.
      e.stopPropagation()
      if (onClick) {
        onClick(e)
      }
      return true
    }
    return (
      <li className={linkStyles} onClick={clickHandler}>
        <a href={url} target={target}>
          {icon ? <div className={css['icon']}><i className={icon} /></div> : null }
          {label}
        </a>
      </li>
    )
  }

  renderSection (section) {
    const { selection } = this.state
    const selected = section.id === selection
    const inSelection = selection.match(section.id)
    const inRoot = section.id === ROOT_SELECTION
    const children = section.children.map(i => this.renderItem(i))
    const classNames = ['section']

    if (inSelection && (!inRoot)) {
      classNames.push('selected')
    }

    const styles = classNames
      .map((name) => css[name] || name)
      .join(' ')
      .replace(/^\s+|\s+$/g, '')

    const displayName = section.id === ROOT_SELECTION ? '' : section.label
    const parentPathTree = section.id.split('/')

    parentPathTree.pop()
    const parentId = parentPathTree.join('/') || ROOT_SELECTION

    const clickHandler = (e) => {
      e.stopPropagation()
      if (selected) {
        this.setState({selection: parentId})
      } else {
        this.setState({selection: section.id})
      }
      return true
    }
    return (
      <li className={styles} onClick={clickHandler}>
        {displayName}
        <span className={inSelection ? css.selected : css.unselected} />
        <ul>
          {children}
        </ul>
        {section.divider ? <hr /> : ''}
      </li>
    )
  }

  renderItem (item) {
    if (item.type === SECTION_TYPE) {
      return this.renderSection(item)
    } else {
      return this.renderLink(item)
    }
  }

  render () {
    const items = this.props.links
    const rendered = items.map(item => this.renderItem(item))
    const head = this.renderHead()

    return (
      <div id='left-navigation'>
        {head}
        <ul>
          {rendered}
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

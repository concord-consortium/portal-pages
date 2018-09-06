import React from 'react'
import css from './style.scss'

const defaultNavProps = {
  greeting: 'Welcome,',
  name: 'Guest',
  links: []
}

const ROOT_SELECTION = '__ROOT__'
const SECTION_TYPE = 'SECTION'

/*
* See `README.md` in this folder
* for the complete netsed structure of the Navigation props.
*/
export default class Navigation extends React.Component {
  constructor (props = defaultNavProps) {
    super(props)
    this.state = {
      opened: true,
      location: props.selected_section,
      openedSection: props.selected_section
    }
  }

  componentDidMount () {
    if (this.props.overlay) {
      this.closeTimeout = setTimeout(() => this.setState({opened: false}), 3000)
    }
  }

  renderHead () {
    const {greeting, name} = this.props
    const clickHeader = (e) => {
      this.setState({opened: !this.state.opened})
      if (this.closeTimeout) {
        window.clearTimeout(this.closeTimeout)
      }
    }
    const classes = [css.head]
    classes.push(this.state.opened ? css.open : css.closed)
    return (
      <div className={classes.join(' ')} onClick={clickHeader} >
        <p>
          <span className={css.greeting}>{greeting}</span>
          <br />
          <strong>{name}</strong>
        </p>
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
    const {location} = this.state
    const target = popOut ? '_blank' : '_self'
    const icon = popOut ? 'icon-arrow-circle-right' : iconName
    const classNames = this.getLinkClasses(linkDef)
    const selected = linkDef.id === location
    if (selected) {
      classNames.push('selected')
    }
    const linkStyles = classNames
      .map((name) => css[name] || name)
      .join(' ')
      .replace(/^\s+|\s+$/g, '')
    const clickHandler = (e) => {
      // don't trigger the event in parents.
      e.stopPropagation()
      if (onClick) {
        onClick(e)
      }
      return true
    }
    return (
      <li className={linkStyles} onClick={clickHandler} key={linkDef.id}>
        <a href={url} target={target}>
          {icon ? <div className={css['icon']}><i className={icon} /></div> : null }
          {label}
        </a>
      </li>
    )
  }

  renderSection (section) {
    const { openedSection } = this.state
    const inSection = openedSection.match(section.id)
    const inRoot = section.id === ROOT_SELECTION
    const children = section.children.map(i => this.renderItem(i))
    const classNames = ['section']

    if (inSection && (!inRoot)) {
      classNames.push('open')
    }

    const styles = classNames
      .map((name) => css[name] || name)
      .join(' ')
      .replace(/^\s+|\s+$/g, '')

    const displayName = section.id === ROOT_SELECTION ? '' : section.label
    const parentPathTree = section.id.split('/')

    parentPathTree.pop()
    // const parentId = parentPathTree.join('/') || ROOT_SELECTION

    const clickHandler = (e) => {
      e.stopPropagation()
      if (inSection && !inRoot) {
        this.setState({openedSection: ROOT_SELECTION})
      } else {
        this.setState({openedSection: section.id})
      }
      return true
    }
    return (
      <li className={styles} onClick={clickHandler} key={section.id}>
        {displayName}
        <span className={inSection ? css.open : css.closed} />
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

  sortLinks (links) {
    links.forEach((item) => {
      if (item.children) {
        item.children = this.sortLinks(item.children)
      }
    })

    return links.sort((a, b) => {
      if (a.sort < b.sort) {
        return -1
      }
      if (a.sort > b.sort) {
        return 1
      }
      return 0
    })
  }

  render () {
    const items = this.sortLinks(this.props.links)
    const rendered = items.map(item => this.renderItem(item))
    const head = this.renderHead()
    const classNames = [css.leftNavigation]

    if (this.props.overlay) {
      classNames.push(css.overlay)
    }
    if (!this.state.opened) {
      classNames.push(css.closed)
    }

    return (
      <div className={classNames.join(' ')}>
        {head}
        <ul>
          {rendered}
        </ul>
      </div>
    )
  }
}
Navigation.defaultProps = defaultNavProps

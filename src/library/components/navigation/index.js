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
      selection: props.selected_section
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
        <div>
          <span className={css.greeting}>{greeting}</span>
          <br />
          <strong>{name}</strong>
          <hr />
        </div>
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
    const { selection } = this.state
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
    // const parentId = parentPathTree.join('/') || ROOT_SELECTION

    const clickHandler = (e) => {
      e.stopPropagation()
      if (inSelection && !inRoot) {
        this.setState({selection: ROOT_SELECTION})
      } else {
        this.setState({selection: section.id})
      }
      return true
    }
    return (
      <li className={styles} onClick={clickHandler} key={section.id}>
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
    const classNames = []

    if (this.props.overlay) {
      classNames.push(css.overlay)
    }
    if (!this.state.opened) {
      classNames.push(css.closed)
    }

    return (
      <div className={classNames.join(' ')} id='left-navigation'>
        {head}
        <ul>
          {rendered}
        </ul>
      </div>
    )
  }
}
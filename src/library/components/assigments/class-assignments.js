import React from 'react'

import css from './style.scss'
import commonCss from '../../styles/common-css-modules.scss'

export default class ClassAssignments extends React.Component {
  render () {
    const { clazz} = this.props
    return (
      <div className={css.classAssignments}>
        <div>
          <h1>Assignments for { clazz.name }</h1>
          <a className={css.assignMaterials} href={clazz.assignMaterialsPath}>Assign Materials</a>
        </div>
        <table className={css.classInfo}>
          <tbody>
            <tr>
              <td>Teacher:</td><td> { clazz.teachers }</td>
            </tr>
            <tr>
              <td>Class word:</td><td> { clazz.classWord }</td>
            </tr>
          </tbody>
        </table>
        <div className={css.reports}>
          {
            clazz.externalClassReports.map(r => <a href={r.url} target='_blank' className={commonCss.smallButton} title={r.name}>{ r.launchText }</a>)
          }
        </div>
      </div>
    )
  }
}

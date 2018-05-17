import React from 'react'
import OfferingProgress from '../common/offering-progress'

import css from './style.scss'
import commonCss from '../../styles/common-css-modules.scss'

export default class OfferingDetails extends React.Component {
  render () {
    const { previewUrl, reportUrl, externalReport, students, activities } = this.props.offering
    return (
      <div className={css.offeringDetails}>
        <a href={previewUrl} target='_blank' className={commonCss.smallButton} title='Preview'>Preview</a>
        {
          reportUrl &&
          <a href={reportUrl} target='_blank' className={commonCss.smallButton} title='Report'>Report</a>
        }
        {
          externalReport &&
          <a href={externalReport.url} target='_blank' className={commonCss.smallButton} title={externalReport.name}>{ externalReport.launchText }</a>
        }
        <div className={css.progressContainer}>
          <OfferingProgress activities={activities} students={students} />
        </div>
      </div>
    )
  }
}

import ProgressDetails from './progress-details'

import css from './style.scss'

export default class Offering extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      detailsVisible: false
    }
    this.toggleDetails = this.toggleDetails.bind(this)
  }

  get detailsToggleLabel () {
    const { detailsVisible } = this.state
    return detailsVisible ? '- Hide Detail' : '+ Show Detail'
  }

  toggleDetails () {
    const { detailsVisible } = this.state
    this.setState({detailsVisible: !detailsVisible})
  }

  render () {
    const { detailsVisible } = this.state
    const { clazz, activity, students, reportUrl, externalReport,
      completedStudentsCount, inProgressStudentsCount, notStartedStudentsCount } = this.props.offering
    const completedWidth = (completedStudentsCount / students.length) * 100
    const inProgressWidth = (inProgressStudentsCount / students.length) * 100
    const notStartedWidth = (notStartedStudentsCount / students.length) * 100
    return (
      <div className={css.offering}>
        <div>
          <span className={css.offeringHeader}>{clazz}: {activity}</span>
          <a className={css.detailsToggle} onClick={this.toggleDetails}>{this.detailsToggleLabel}</a>
        </div>
        <div>
          <span>Class size = { students.length }</span>
          <div className={css.classProgress}>
            <div className={css.completed} style={{width: `${completedWidth}%`}} >
              { completedStudentsCount > 0 && <div className={css.count}>{ completedStudentsCount }</div> }
            </div>
            <div className={css.inProgress} style={{width: `${inProgressWidth}%`}} >
              { inProgressStudentsCount > 0 && <div className={css.count}>{ inProgressStudentsCount }</div> }
            </div>
            <div className={css.notStarted} style={{width: `${notStartedWidth}%`}} >
              { notStartedStudentsCount > 0 && <div className={css.count}>{ notStartedStudentsCount }</div> }
            </div>
          </div>
        </div>
        {
          reportUrl &&
          <div><a href={reportUrl} target='_blank' className={css.reportBtn + ' button'}>Report</a></div>
        }
        {
          externalReport &&
          <div><a href={externalReport.url} target='_blank' className={css.reportBtn + ' button'}>{ externalReport.launchText }</a></div>
        }
        <div className={css.detailsContainer}>
          { detailsVisible && <ProgressDetails students={students} /> }
        </div>
      </div>
    )
  }
}

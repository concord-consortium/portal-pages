import React from 'react'
import ProgressBar from './progress-bar'

import css from './style.scss'

const formatDate = date => `${date.getMonth() + 1}/${date.getDate()}`

const noProgressForActivities = activities => activities.map(a => ({ activityId: a.id, progress: 0, reportUrl: null }))

export default class ProgressTable extends React.Component {
  getFeedbackOptions (activityId) {
    const { activities } = this.props
    return activities.find(a => a.id === activityId).feedbackOptions
  }

  renderStudentName (student) {
    return <span className={css.name}>{ student.name }</span>
  }

  render () {
    const { students, activities } = this.props
    if (students.length === 0) {
      return null
    }
    const noProgress = noProgressForActivities(activities)
    return (
      <div className={css.offeringProgress}>
        <div className={css.namesTableContainer}>
          <table className={css.namesTable}>
            <tbody>
              <tr>
                <th>Student</th>
                <th className={css.dateHeader}>Last Run</th>
              </tr>
              {
                students.map(student =>
                  <tr key={student.id}>
                    <td>
                      {
                        student.totalProgress > 0
                          ? <a href={student.reportUrl} target='_blank' title={`Open report for ${student.name}`}>{ this.renderStudentName(student) }</a>
                          : this.renderStudentName(student)
                      }
                    </td>
                    <td className={css.date} title={student.lastRun && student.lastRun.toLocaleDateString()}>
                      { student.lastRun ? formatDate(student.lastRun) : 'n/a' }
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        <div className={css.progressTableContainer}>
          <table className={css.progressTable}>
            <tbody>
              <tr>
                {
                  activities.map((a, idx) =>
                    <th key={idx}><a href={a.reportUrl} target='_blank' title={`Open report for "${a.name}"`}>
                      <span className={css.activityTitle}>{ a.name }</span></a>
                    </th>)
                }
              </tr>
              {
                students.map(student =>
                  <tr key={student.id}>
                    {
                      (student.detailedProgress || noProgress).map((details, idx) =>
                        <td key={idx}>
                          <ProgressBar student={student} detailedProgress={details} feedbackOptions={this.getFeedbackOptions(details.activityId)} />
                        </td>
                      )
                    }
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

import React from 'react'
import css from './style.scss'

const formatDate = date => `${date.getMonth() + 1}/${date.getDate()}`

const noProgressForActivities = activities => activities.map(a => ({ progress: 0, reportUrl: null }))

export default class ProgressTable extends React.Component {

  renderBar (details) {
    return (
      <div className={css.progressBar}>
        <div className={`${css.bar} ${details.progress === 100 ? css.completed : ''}`}
          style={{width: `${details.progress}%`}} />
      </div>
    )
  }

  render () {
    const { students, activities } = this.props
    if (students.length === 0) {
      return null
    }
    const noProgress = noProgressForActivities(activities)
    return (
      <table className={css.progressTable}>
        <tbody>
          <tr>
            <th className={css.names}>Student</th>
            <th className={css.lastRun}>Last Run</th>
            { activities.map((a, idx) => <th key={idx}><a href={a.reportUrl} target='_blank' title={`Open report for "${a.name}"`}>{ a.name }</a></th>)}
          </tr>
          {
            students.map(student =>
              <tr key={student.id}>
                <td className={css.name}>
                  {
                    student.totalProgress > 0
                      ? <a href={student.reportUrl} target='_blank' title={`Open report for ${student.name}`}>{ student.name }</a>
                      : student.name
                  }
                </td>
                <td className={css.date} title={student.lastRun && student.lastRun.toLocaleDateString()}>
                  { student.lastRun ? formatDate(student.lastRun) : 'n/a' }
                </td>
                {
                  (student.detailedProgress || noProgress).map((details, idx) =>
                    <td key={idx}>
                      {
                        details.progress > 0
                          ? <a href={details.reportUrl} target='_blank' title={`Open report for "${details.activityName}" and ${student.name}`}>{ this.renderBar(details) }</a>
                          : this.renderBar(details)
                      }
                    </td>
                  )
                }
              </tr>
            )
          }
        </tbody>
      </table>
    )
  }
}

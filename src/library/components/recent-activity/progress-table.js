import React from 'react'
import css from './style.scss'

const formatDate = date => `${date.getMonth() + 1}/${date.getDate()}`

export default class ProgressTable extends React.Component {
  get activityNames () {
    const { students } = this.props
    return students[0].detailedProgress.map(p => p.activity)
  }

  render () {
    const { students } = this.props
    if (students.length === 0) {
      return null
    }
    return (
      <table className={css.progressTable}>
        <tbody>
          <tr>
            <th className={css.names}>In Progress</th>
            <th className={css.lastRun}>Last Run</th>
            { this.activityNames.map((activity, idx) => <th key={idx}>{ activity }</th>)}
          </tr>
          {
            students.map(student =>
              <tr key={student.id}>
                <td className={css.name}>{ student.name }</td>
                <td>{ formatDate(student.lastRun) }</td>
                {
                  student.detailedProgress.map((details, idx) =>
                    <td key={idx}>
                      <div className={css.progressBar}>
                        <div className={`${css.bar} ${details.progress === 100 ? css.completed : 0}`}
                          style={{width: `${details.progress}%`}} />
                      </div>
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

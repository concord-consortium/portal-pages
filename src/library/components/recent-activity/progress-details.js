import ProgressTable from './progress-table'

export default class ProgressDetails extends React.Component {
  get inProgressStudents () {
    const { students } = this.props
    return students.filter(s => s.totalProgress > 0 && s.totalProgress < 100)
  }

  get notYetStartedStudents () {
    const { students } = this.props
    return students.filter(s => s.totalProgress === 0)
  }

  get completedStudents () {
    const { students } = this.props
    return students.filter(s => s.totalProgress === 100)
  }

  renderInProgressList () {
    const inProgressStudents = this.inProgressStudents
    if (inProgressStudents.length === 0) {
      return (
        <div>
          <b>In Progress</b>
          <div>No students with incomplete progress.</div>
        </div>
      )
    }
    return <ProgressTable students={inProgressStudents} />
  }

  renderNotYetStartedList () {
    const notYetStartedStudents = this.notYetStartedStudents
    if (notYetStartedStudents.length === 0) {
      return 'All students have started this activity.'
    }
    return notYetStartedStudents.map(s => <div key={s.id}>{ s.name }</div>)
  }

  renderCompletedList () {
    const completedStudents = this.completedStudents
    if (completedStudents.length === 0) {
      return 'No student has completed this activity yet.'
    }
    return completedStudents.map(s => <div key={s.id}>{ s.name }</div>)
  }

  render () {
    return (
      <div>
        { this.renderInProgressList() }
        <b>Not Yet Started</b>
        <div>
          { this.renderNotYetStartedList() }
        </div>
        <br />
        <b>Completed</b>
        <div>
          { this.renderCompletedList() }
        </div>
      </div>
    )
  }
}

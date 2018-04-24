import Offering from './offering'
import Legend from './legend'

// Automatically update recent activity page every X ms.
const DATA_UPDATE_INTERVAL = 30000 // ms

const studentMapping = data => {
  return {
    id: data.user_id,
    name: data.last_name + ', ' + data.first_name,
    lastRun: new Date(data.last_run),
    totalProgress: data.total_progress,
    detailedProgress: data.detailed_progress
  }
}

const offeringMapping = data => {
  const lastRunDates = data.students
    // Filer out offerings that have never been run.
    .filter(s => s.last_run !== null)
    .map(s => new Date(s.last_run))
  const notStartedStudents = data.students.filter(s => s.total_progress === 0)
  const inProgressStudents = data.students.filter(s => s.total_progress > 0 && s.total_progress < 100)
  const completedStudents = data.students.filter(s => s.total_progress === 100)
  return {
    id: data.id,
    clazz: data.clazz,
    activity: data.activity,
    lastRun: lastRunDates.length > 0 ? lastRunDates[0] : null,
    notStartedStudentsCount: notStartedStudents.length,
    inProgressStudentsCount: inProgressStudents.length,
    completedStudentsCount: completedStudents.length,
    reportPath: reportPath(data.id),
    students: data.students.map(s => studentMapping(s))
  }
}

const processAPIData = data => {
  return data
    .map(offering => offeringMapping(offering))
    // Show only offerings that has been started by at least one student.
    .filter(offering => offering.lastRun !== null)
    .sort((o1, o2) => o2.lastRun - o1.lastRun) // Sort by lastRun, DESC order
}

const reportPath = offeringId => `/portal/offerings/${offeringId}/report`

export default class RecentActivityPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      anyData: false,
      offerings: []
    }
    this.getPortalData = this.getPortalData.bind(this)
  }

  componentDidMount () {
    this.getPortalData()
    this.intervalId = window.setInterval(this.getPortalData, DATA_UPDATE_INTERVAL)
  }

  componentWillUnmount () {
    window.clearInterval(this.intervalId)
  }

  getPortalData () {
    jQuery.ajax({
      url: Portal.API_V1.OFFERINGS_OWN,
      success: data => {
        this.setState({
          loading: false,
          // Note that processAPIData will skip offerings that have been never run by any student.
          offerings: processAPIData(data),
          // So, we need some additional variables:
          // - check if there is any offering
          anyData: data.length > 0,
          // - check if there are any students assigned to some offering
          anyStudents: data.map(o => o.students.length).filter(count => count > 0).length > 0
        })
      },
      error: () => {
        console.error(`GET ${Portal.API_V1.OFFERINGS_OWN} failed, can't render Recent Activity page`)
      }
    })
  }

  render () {
    const { loading, offerings, anyData, anyStudents } = this.state
    if (loading) {
      return null
    }
    if (!anyData) {
      return (
        <div>
          <div>You need to assign investigations to your classes.</div>
          <div>As your students get started, their progress will be displayed here.</div>
        </div>
      )
    }
    if (anyData && !anyStudents) {
      return (
        <div>
          <div>You have not yet assigned students to your classes.</div>
          <div>As your students get started, their progress will be displayed here.</div>
        </div>
      )
    }
    if (offerings.length === 0) {
      return <div>As your students get started, their progress will be displayed here.</div>
    }
    return (
      <div>
        <Legend />
        { offerings.map(offering => <Offering key={offering.id} offering={offering} />) }
      </div>
    )
  }
}

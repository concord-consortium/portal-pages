import React from 'react'
import Offerings from './offerings'

const externalReportMapping = data => {
  if (!data) {
    return null
  }
  return {
    url: data.url,
    launchText: data.launch_text
  }
}

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
    reportUrl: data.report_url,
    externalReport: externalReportMapping(data.external_report),
    students: data.students.map(s => studentMapping(s))
  }
}

const processAPIData = data => {
  return data && data
    .map(offering => offeringMapping(offering))
    // Show only offerings that has been started by at least one student.
    .filter(offering => offering.lastRun !== null)
    .sort((o1, o2) => o2.lastRun - o1.lastRun) // Sort by lastRun, DESC order
}

// Checks if there is any data available.
const anyData = data => data && data.length > 0
// Checks if there are any students assigned to some offering.
const anyStudents = data => data && data.map(o => o.students.length).filter(count => count > 0).length > 0

export default class RecentActivity extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: !props.initialData,
      anyData: anyData(props.initialData),
      anyStudents: anyStudents(props.initialData),
      offerings: processAPIData(props.initialData)
    }
    this.getPortalData = this.getPortalData.bind(this)
  }

  componentDidMount () {
    const { dataUrl, initialData, updateInterval } = this.props
    if (dataUrl && !initialData) {
      this.getPortalData()
    }
    if (updateInterval) {
      this.intervalId = window.setInterval(this.getPortalData, updateInterval)
    }
  }

  componentWillUnmount () {
    if (this.intervalId) {
      window.clearInterval(this.intervalId)
    }
  }

  getPortalData () {
    const { dataUrl } = this.props
    jQuery.ajax({
      url: dataUrl,
      success: data => {
        this.setState({
          loading: false,
          // Note that processAPIData will skip offerings that have been never run by any student.
          offerings: processAPIData(data),
          // So, we need some additional variables:
          anyData: anyData(data),
          anyStudents: anyStudents(data)
        })
      },
      error: () => {
        console.error(`GET ${dataUrl} failed, can't render Recent Activity page`)
      }
    })
  }

  render () {
    const { loading, offerings, anyData, anyStudents } = this.state
    if (loading) {
      return null
    }
    return (
      <Offerings anyData={anyData} anyStudents={anyStudents} offerings={offerings} />
    )
  }
}

RecentActivity.defaultProps = {
  // This path will return all the offerings for logged in user. Portal will probably explicitly limit scope
  // of offerings by providing custom path with user_id param.
  dataUrl: Portal.API_V1.OFFERING,
  // If initialData is not provided, component will use API (dataUrl) to get it.
  initialData: null,
  // Set updateInterval to null to disable updates at all.
  updateInterval: 300000 // ms
}

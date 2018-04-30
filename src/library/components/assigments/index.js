import React from 'react'
import ClassAssignments from './class-assignments'
import OfferingsTable from './offerings-table'
import { arrayMove} from 'react-sortable-hoc'

const teachersMapping = data => {
  return data.map(teacher => `${teacher.first_name} ${teacher.last_name}`).join(', ')
}

const offeringsListMapping = data => {
  return data.map(offering => ({ id: offering.id, name: offering.name, apiUrl: offering.url, locked: offering.locked, active: offering.active }))
}

const externalReportsMapping = data => {
  return data.map(report => ({ name: report.name, launchText: report.launch_text, url: report.url }))
}

const classMapping = data => {
  return data && {
    name: data.name,
    classWord: data.class_word,
    teachers: teachersMapping(data.teachers),
    editPath: data.edit_path,
    assignMaterialsPath: data.assign_materials_path,
    externalClassReports: externalReportsMapping(data.external_class_reports)
  }
}

export default class Assignments extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: !props.initialClassData,
      clazz: classMapping(props.initialClassData),
      offerings: props.initialClassData ? offeringsListMapping(props.initialClassData.offerings) : [],
      offering: null
    }
    this.onOfferingsReorder = this.onOfferingsReorder.bind(this)
  }

  componentDidMount () {
    const { classDataUrl, initialClassData } = this.props
    if (classDataUrl && !initialClassData) {
      this.getClassData()
    }
  }

  getClassData () {
    const { classDataUrl } = this.props
    jQuery.ajax({
      url: classDataUrl,
      success: data => {
        this.setState({
          loading: false,
          clazz: classMapping(data),
          offerings: offeringsListMapping(data.offerings)
        })
      },
      error: () => {
        console.error(`GET ${classDataUrl} failed, can't render Assignment page`)
      }
    })
  }

  onOfferingsReorder ({oldIndex, newIndex}) {
    const { offerings } = this.state
    const offeringApiUrl = offerings[oldIndex].apiUrl
    this.setState({ offerings: arrayMove(offerings, oldIndex, newIndex) })
    jQuery.ajax({
      type: 'PUT',
      url: offeringApiUrl,
      data: {
        position: newIndex + 1
      },
      error: (a, b, c) => {
        console.log(a, b, c)
        // window.alert('Reordering failed, please try to reload page and try again.')
        this.setState({ offerings: offerings })
      }
    })
  }

  onOfferingUpdate (offeringApiUrl, prop, value) {
    const { onOfferingUpdate } = this.props
    onOfferingUpdate(offeringApiUrl, prop, value)
  }

  render () {
    const { loading, clazz, offerings } = this.state
    if (loading) {
      return null
    }
    return (
      <div>
        <ClassAssignments clazz={clazz} />
        <OfferingsTable offerings={offerings} onOfferingsReorder={this.onOfferingsReorder} />
      </div>
    )
  }
}

Assignments.defaultProps = {
  // classDataUrl is pretty much required. It can be set to any default value, as it depends on the current class.
  classDataUrl: null,
  // If initialData is not provided, component will use API (dataUrl) to get it.
  initialClassData: null,
  // Set updateInterval to null to disable updates at all.
  updateInterval: 300000 // ms
}

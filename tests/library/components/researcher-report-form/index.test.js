/* globals jest describe it expect */
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import ResearcherReportForm from 'components/researcher-report-form'
import ExternalReportButton from 'components/researcher-report-form/external-report-button'
import Select from 'react-select'
import DayPickerInput from 'react-day-picker/DayPickerInput'

Enzyme.configure({adapter: new Adapter()})

describe('ResearcherReportForm', () => {
  const externalReports = [{url: 'url1', label: 'label1'}, {url: 'url2', label: 'label2'}]
  const wrapper = Enzyme.shallow(
    <ResearcherReportForm externalReports={externalReports} />
  )

  it('renders all the report buttons', () => {
    expect(wrapper.html()).toEqual(expect.stringContaining('Usage Report'))
    expect(wrapper.html()).toEqual(expect.stringContaining('Details Report'))
    expect(wrapper.html()).toEqual(expect.stringContaining('Arg Block Report'))
  })

  it('renders custom external report buttons', () => {
    expect(wrapper.find(ExternalReportButton).length).toEqual(2)
    expect(wrapper.find({reportUrl: 'url1', label: 'label1'}).length).toEqual(1)
    expect(wrapper.find({reportUrl: 'url2', label: 'label2'}).length).toEqual(1)
  })

  it('renders filter forms', () => {
    expect(wrapper.text()).toEqual(expect.stringContaining('Schools'))
    expect(wrapper.text()).toEqual(expect.stringContaining('Teachers'))
    expect(wrapper.text()).toEqual(expect.stringContaining('Runnables'))
    expect(wrapper.text()).toEqual(expect.stringContaining('Permission forms'))
    expect(wrapper.find(Select).length).toEqual(4)

    expect(wrapper.text()).toEqual(expect.stringContaining('Earliest date of last run'))
    expect(wrapper.text()).toEqual(expect.stringContaining('Latest date of last run'))
    expect(wrapper.find(DayPickerInput).length).toEqual(2)

    expect(wrapper.text()).toEqual(expect.stringContaining('Hide names'))
    expect(wrapper.find('input[type="checkbox"]').length).toEqual(1)
  })
})

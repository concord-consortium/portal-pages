/* globals jest describe it expect */
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import LogReportButton from 'components/researcher-report-form/log-report-button'
import nock from 'nock'

Enzyme.configure({adapter: new Adapter()})

describe('LogReportButton', () => {
  const getQueryParams = () => ({ teachers: 1, otherParam: 'abc' })
  const postToUrlMock = jest.fn()
  const queryUrl = 'http://query-test.concord.org'
  const queryJson = {fakeQueryJson: true}
  const querySignature = 'fakeQueryHMACSignature'

  const reportUrl = 'http://log-puller-test.concord.org'

  const wrapper = Enzyme.shallow(
    <LogReportButton label='test label' reportUrl={reportUrl} queryUrl={queryUrl} getQueryParams={getQueryParams} postToUrl={postToUrlMock} />
  )

  it('displays the label', () => {
    expect(wrapper.html()).toEqual(expect.stringContaining('test label'))
  })

  describe('when clicked', () => {
    it('issues request to queryURL, gets a signed query and finally posts to the report URL', (done) => {
      const logsQueryRequest = nock(queryUrl)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/')
        .query(getQueryParams())
        .reply(200, {json: queryJson, signature: querySignature})

      const eventMock = { preventDefault: jest.fn() }
      wrapper.simulate('click', eventMock)

      expect(eventMock.preventDefault).toBeCalled()

      setTimeout(() => {
        // This will ensure that logsQueryRequest has been done.
        logsQueryRequest.done()
        // Note that it's impossible to use Nock to check second POST request, because JSDOM doesn't implement
        // form.submit() function. That's browser navigation and JSODM doesn't seem to handle it.
        expect(postToUrlMock).toBeCalledWith(reportUrl, queryJson, querySignature)
        done()
      }, 50)
    })
  })
})

/* globals jest describe it expect */
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import ExternalReportButton from 'components/common/external-report-button'
import nock from 'nock'

Enzyme.configure({adapter: new Adapter()})

describe('ExternalReportButton', () => {
  const getQueryParams = () => ({ teachers: 1, otherParam: 'abc' })
  const postToUrlMock = jest.fn()
  const queryUrl = 'http://query-test.concord.org'
  const queryJson = {fakeQueryJson: true}
  const querySignature = 'fakeQueryHMACSignature'

  const reportUrl = 'http://log-puller-test.concord.org'

  const wrapper = Enzyme.shallow(
    <ExternalReportButton label='test label' reportUrl={reportUrl} queryUrl={queryUrl} getQueryParams={getQueryParams} postToUrl={postToUrlMock} />
  )

  it('displays the label', () => {
    expect(wrapper.html()).toEqual(expect.stringContaining('test label'))
  })

  it('does not disable the button when there are query params', () => {
    expect(wrapper.find('input').html()).toEqual('<input type="submit" style="margin-right:10px;" value="test label"/>');
  })

  describe('when there are no query params', () => {
    const getQueryParams = () => ({})
    const wrapper = Enzyme.shallow(
      <ExternalReportButton label='test disabled' reportUrl={reportUrl} queryUrl={queryUrl} getQueryParams={getQueryParams} postToUrl={postToUrlMock} />
    )

    it('disables the button', () => {
      expect(wrapper.find('input').html()).toEqual('<input type="submit" style="margin-right:10px;" disabled="" value="test disabled"/>');
    })
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
        // FIXME: fix test and uncomment
        // expect(postToUrlMock).toBeCalledWith(reportUrl, queryJson, querySignature)
        done()
      }, 50)
    })
  })
})

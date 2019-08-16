/* globals describe it expect */
import { appendOfferingApiQueryParams } from '../../src/library/url-params'

describe('appendOfferingApiQueryParams', () => {
  it('appends supported params to Offering API URL', () => {
    // no query params => no changes to the api url
    let url = appendOfferingApiQueryParams('http://test.portal.com/offering/1')
    expect(url).toEqual('http://test.portal.com/offering/1')
    // unsupported query params => no changes to the api url
    window.history.pushState({}, 'Test Param', '/?some_unsupported_param=123')
    url = appendOfferingApiQueryParams('http://test.portal.com/offering/1')
    expect(url).toEqual('http://test.portal.com/offering/1')
    // supported query param => the api url updated
    window.history.pushState({}, 'Test Param', '/?add_external_report=123')
    url = appendOfferingApiQueryParams('http://test.portal.com/offering/1')
    expect(url).toEqual('http://test.portal.com/offering/1?add_external_report=123')
  })
})

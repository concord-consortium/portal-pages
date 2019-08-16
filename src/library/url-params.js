import queryString from 'query-string'

const ADD_EXTERNAL_REPORT = 'add_external_report'

// This function will take search params from the current URL, parse them, check if there are any params
// that are supported by Offering API, and it will append these query params to Offering API URL provided as an
// argument. It ensures that apiUrl won't get broken, even if if already has some search params included.
export const appendOfferingApiQueryParams = apiUrl => {
  const searchParams = queryString.parse(window.location.search)
  if (searchParams[ADD_EXTERNAL_REPORT] !== undefined) {
    const apiUrlParsed = queryString.parseUrl(apiUrl)
    apiUrlParsed.query[ADD_EXTERNAL_REPORT] = searchParams[ADD_EXTERNAL_REPORT]
    return apiUrlParsed.url + '?' + queryString.stringify(apiUrlParsed.query)
  } else {
    return apiUrl
  }
}

const ADD_EXTERNAL_REPORT = 'add_external_report'

// This function will take search params from the current URL, parse them, check if there are any params
// that are supported by Offering API, and it will append these query params to Offering API URL provided as an
// argument. It ensures that apiUrl won't get broken, even if if already has some search params included.
export const appendOfferingApiQueryParams = apiUrl => {
  const currentUrl = new URL(window.location)
  if (currentUrl.searchParams.has(ADD_EXTERNAL_REPORT)) {
    const apiUrlParsed = new URL(apiUrl)
    apiUrlParsed.searchParams.set(ADD_EXTERNAL_REPORT, currentUrl.searchParams.get(ADD_EXTERNAL_REPORT))
    return apiUrlParsed.toString()
  } else {
    return apiUrl
  }
}

export const getGoogleOAuthURL = () => {
  const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth'
  if (
    !process.env.REACT_APP_CLIENT_ID ||
    !process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL
  )
    throw new Error('Error Happened.')
  const urlAuthParamsOptions = {
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL,
    response_type: 'token',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' '),
    prompt: 'consent'
  }
  const authParams = new URLSearchParams(urlAuthParamsOptions)

  return `${rootURL}?${authParams.toString()}`
}

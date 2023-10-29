import { getGoogleOAuthURL } from './getGoogleOAuthURL'

describe('Get google url test', () => {
  it('Simple options should work.', () => {
    const valueToBeTested = getGoogleOAuthURL()
    const givenOptions = {
      client_id: process.env.REACT_APP_CLIENT_ID as string,
      redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL as string,
      response_type: 'token',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ].join(' '),
      prompt: 'consent'
    }
    const givenQuerryParams = new URLSearchParams(givenOptions)
    const expectedValue = `https://accounts.google.com/o/oauth2/v2/auth?${givenQuerryParams.toString()}`

    expect(valueToBeTested).toMatch(expectedValue)
  })
})

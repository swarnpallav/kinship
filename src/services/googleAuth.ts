import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import * as Crypto from 'expo-crypto'

// Configure WebBrowser for OAuth
WebBrowser.maybeCompleteAuthSession()

// Google OAuth configuration
// Try using the original web client ID which might work better with Expo
const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  '657248796191-c9hb65uu7tk2c86oh4j7p6gqhuins0ta.apps.googleusercontent.com' // Original web client ID

// Use different redirect URIs for development vs production
const GOOGLE_REDIRECT_URI = __DEV__
  ? 'https://auth.expo.io/@swarnpallav/kinship' // Development - Expo proxy
  : 'com.kinship.app://oauth' // Production - Direct app scheme

// Log for debugging
console.log('🍎 Using iOS OAuth Client')
console.log('📱 Client ID:', GOOGLE_CLIENT_ID)
console.log('🔗 Redirect URI (for reference):', GOOGLE_REDIRECT_URI)

export interface GoogleUser {
  id: string
  email: string
  name: string
  picture?: string
}

export class GoogleAuthService {
  private static instance: GoogleAuthService

  static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService()
    }
    return GoogleAuthService.instance
  }

  async signInWithGoogle(): Promise<GoogleUser> {
    try {
      // Use implicit flow which works better with Expo auth proxy
      const request = new AuthSession.AuthRequest({
        clientId: GOOGLE_CLIENT_ID,
        scopes: ['openid', 'profile', 'email'],
        redirectUri: GOOGLE_REDIRECT_URI,
        responseType: AuthSession.ResponseType.Token, // Use implicit flow
        usePKCE: false, // Disable PKCE for implicit flow
      })

      console.log('🔗 Starting Google OAuth with AuthRequest (Implicit Flow)')
      console.log('📍 Redirect URI being used:', GOOGLE_REDIRECT_URI)
      console.log('🆔 Client ID being used:', GOOGLE_CLIENT_ID)

      // Start the OAuth flow
      const result = await request.promptAsync({
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      })

      console.log('📱 OAuth result:', result)

      if (result.type !== 'success') {
        console.error('OAuth failed with type:', result.type)
        if (result.type === 'error') {
          console.error('OAuth error details:', result.error)
        }
        throw new Error(`Google sign-in failed: ${result.type}`)
      }

      // With implicit flow, we get the access token directly
      const accessToken = result.params?.access_token

      if (!accessToken) {
        throw new Error('No access token received from Google')
      }

      console.log('✅ Successfully received access token from Google')

      // Get user info
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (!userInfoResponse.ok) {
        throw new Error('Failed to fetch user info from Google')
      }

      const userInfo = await userInfoResponse.json()

      return {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
      }
    } catch (error) {
      console.error('Google sign-in error:', error)
      throw new Error('Failed to sign in with Google')
    }
  }

  // Mock implementation for development
  async mockSignInWithGoogle(
    testScenario?: 'college' | 'personal' | 'custom',
    customEmail?: string
  ): Promise<GoogleUser> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    let email = 'user@college.edu' // Default to college email

    if (testScenario === 'personal') {
      email = 'user@gmail.com'
    } else if (testScenario === 'custom' && customEmail) {
      email = customEmail
    }

    // Return mock user data - in development, you can change this to test different scenarios
    return {
      id: 'mock-google-user-id',
      email,
      name: 'John Doe',
      picture: 'https://via.placeholder.com/150',
    }
  }
}

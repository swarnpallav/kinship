# Local Google OAuth Testing Guide

## Quick Testing Options

### 1. Mock Authentication (Recommended for Development)

The app is now configured to use mock authentication by default. You can control this via
`src/config/env.ts`:

```typescript
// Set to true for mock auth, false for real OAuth
useMockAuth: true
```

### 2. Test Different Email Scenarios

#### College Email Flow (Auto-verified)

```typescript
// In your test code or by modifying mockSignInWithGoogle
const googleUser = await googleAuthService.mockSignInWithGoogle('college')
// Results in: user@college.edu
```

#### Personal Email Flow (Requires ID verification)

```typescript
const googleUser = await googleAuthService.mockSignInWithGoogle('personal')
// Results in: user@gmail.com
```

#### Custom Email Testing

```typescript
const googleUser = await googleAuthService.mockSignInWithGoogle('custom', 'test@university.ac.uk')
// Results in: test@university.ac.uk
```

### 3. Real OAuth Testing

To test with real Google OAuth:

1. **Update Configuration**:

   ```typescript
   // In src/config/env.ts
   useMockAuth: false,
   googleClientId: 'your-actual-client-id.apps.googleusercontent.com'
   ```

2. **Get Your Redirect URI**:

   **Method 1: Check Console Output (Mobile Testing)**

   ```bash
   npx expo start
   # Look for: 🔗 Google OAuth Redirect URI: exp://192.168.x.x:8081/--/oauth/callback
   # Or: com.kinship.app://oauth/callback (for production builds)
   ```

   **Method 2: For Physical Device Testing**

   ```bash
   npx expo start --tunnel
   # Look for: 🔗 Google OAuth Redirect URI: exp://abc123.tunnel.exp.direct/--/oauth/callback
   ```

   **Method 3: Check Expo DevTools**
   - Start your app and open the browser DevTools
   - Look for the redirect URI in the console logs

3. **Configure Google Cloud Console**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to APIs & Services > Credentials
   - Add your redirect URI to authorized redirect URIs
   - For Expo development, use the URI from step 2

4. **Configure OAuth Consent Screen** (IMPORTANT):
   - Go to APIs & Services > OAuth consent screen
   - Choose "External" user type
   - Fill in App name: "Kinship"
   - Add your email as user support email
   - Go to "Test users" section and add your Gmail address
   - Keep the app in "Testing" mode

5. **Update Client ID**:
   ```typescript
   // In src/services/googleAuth.ts
   const GOOGLE_CLIENT_ID = 'your-actual-client-id.apps.googleusercontent.com'
   ```

## Testing Checklist

### Mock Authentication Tests

- [ ] College email flow (user@college.edu)
- [ ] Personal email flow (user@gmail.com)
- [ ] Different college domains (.edu, .ac.uk, .ac.in, etc.)
- [ ] Error handling (network failures, cancelled auth)

### Real OAuth Tests

- [ ] Successful authentication
- [ ] User cancellation
- [ ] Network error handling
- [ ] Token refresh
- [ ] Different Google accounts

## Development Commands

```bash
# Start with mock auth (default)
npm start

# Test with real OAuth
# 1. Set useMockAuth: false in src/config/env.ts
# 2. Update GOOGLE_CLIENT_ID in src/services/googleAuth.ts
# 3. Start the app
npm start

# Run on specific platform
npx expo start --ios
npx expo start --android
npx expo start --web
```

## Debugging Tips

1. **Check Console Logs**: Look for authentication flow logs
2. **Network Tab**: Monitor OAuth requests in browser dev tools
3. **Expo Dev Tools**: Use the Expo development tools for debugging
4. **Mock Data**: Modify mock responses to test edge cases

## Environment Variables (Optional)

Create a `.env` file for easier configuration:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
USE_MOCK_AUTH=true
```

Then update your config to use these values:

```typescript
// In src/config/env.ts
useMockAuth: process.env.USE_MOCK_AUTH === 'true',
googleClientId: process.env.GOOGLE_CLIENT_ID || 'fallback-client-id',
```

## Common Issues & Solutions

### Issue: "This app doesn't comply with Google's OAuth 2.0 policy for keeping apps secure"

**Solution**: Configure the OAuth consent screen in Google Cloud Console:

1. Go to APIs & Services > OAuth consent screen
2. Choose "External" user type
3. Fill in required fields (App name: "Kinship", support email)
4. Add test users (your Gmail address)
5. Keep the app in "Testing" mode

### Issue: "Parameter not allowed for this message type: code_challenge_method"

**Solution**: This error occurs when PKCE parameters are used with providers that don't support
them. The code has been updated to use authorization code flow without PKCE parameters.

### Issue: "Invalid Redirect: must end with a public top-level domain"

**Solution**: For mobile OAuth, use `https://auth.expo.io/@anonymous/kinship` as your redirect URI
in Google Cloud Console instead of `exp://` URLs.

### Issue: "Invalid redirect URI"

**Solution**: Ensure the redirect URI in Google Cloud Console matches exactly what Expo generates

### Issue: "OAuth client not found"

**Solution**: Verify the client ID is correct and the OAuth client is properly configured

### Issue: "Network request failed"

**Solution**: Check internet connection and ensure Google APIs are accessible

### Issue: Mock auth not working

**Solution**: Verify `useMockAuth: true` in config and check console for errors

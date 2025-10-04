# Email/OTP Authentication Guide

## Overview

This app now uses **Email/OTP authentication** instead of Google Sign-In. Users verify their college
email address by entering a one-time password (OTP) sent to their email.

## Authentication Flow

### 1. User Journey

```
Welcome Screen
    ↓
Email OTP Screen (Enter Email)
    ↓
Backend sends OTP to email
    ↓
Email OTP Screen (Enter OTP)
    ↓
Backend verifies OTP
    ↓
Profile Setup Screen
    ↓
Main App
```

### 2. Email Validation

The app validates that users enter a **college email address** by checking for common educational
domains:

- `.edu` (United States)
- `.ac.uk` (United Kingdom)
- `.ac.in` (India)
- `.edu.au` (Australia)
- `.ac.za` (South Africa)
- `.ac.nz` (New Zealand)

You can add more domains in `src/utils/validation.ts`.

## Backend Requirements

Your backend needs to implement these two endpoints:

### 1. Send OTP

**Endpoint:** `POST /auth/send-otp`

**Request Body:**

```json
{
  "email": "student@college.edu"
}
```

**Response:**

```json
{
  "success": true,
  "message": "OTP sent to email"
}
```

**Backend should:**

- Validate email is from a college domain
- Generate a 6-digit OTP
- Store OTP with expiration time (e.g., 5 minutes)
- Send OTP via email
- Rate limit to prevent abuse

### 2. Verify OTP

**Endpoint:** `POST /auth/verify-otp`

**Request Body:**

```json
{
  "email": "student@college.edu",
  "otp": "123456"
}
```

**Response:**

```json
{
  "user": {
    "id": "user-uuid",
    "email": "student@college.edu",
    "name": "Student Name"
  },
  "token": "jwt-token-here"
}
```

**Backend should:**

- Verify OTP matches and hasn't expired
- Create or get existing user
- Generate JWT token
- Return user data and token

## Development/Testing

### Mock Mode

The app includes a **mock mode** for development. When `config.useMockAuth` is `true`:

- Any college email will work
- Any 6-digit OTP will be accepted
- No actual backend calls are made

To enable mock mode, update `src/config/env.ts`:

```typescript
export const config = {
  useMockAuth: true, // Set to false for production
  // ... other config
}
```

### Testing Emails

Valid test emails in mock mode:

- `test@college.edu`
- `student@university.ac.uk`
- `user@school.ac.in`

Any 6-digit number will work as OTP: `123456`, `000000`, etc.

## File Changes

### New Files

- `src/screens/EmailOTPScreen.tsx` - Email/OTP authentication screen
- `EMAIL_OTP_AUTH_GUIDE.md` - This documentation

### Modified Files

- `src/services/auth.ts` - Added `sendOTP()` and `verifyOTP()` methods
- `src/context/AuthContext.tsx` - Updated to use email/OTP authentication
- `src/hooks/useAuth.ts` - Updated for OTP mutations
- `src/navigation/types.ts` - Updated auth stack types
- `src/navigation/RootNavigator.tsx` - Updated to use EmailOTPScreen
- `src/screens/WelcomeScreen.tsx` - Updated button text
- `src/screens/index.ts` - Updated exports
- Test files - Updated for new authentication flow

### Deleted Files

- `src/screens/GoogleSignInScreen.tsx` - No longer needed
- `src/screens/CollegeVerificationScreen.tsx` - No longer needed
- `src/services/googleAuth.ts` - No longer needed
- `GOOGLE_OAUTH_SETUP.md` - No longer relevant

### Optional Cleanup

You can remove these unused npm packages:

```bash
npm uninstall expo-auth-session expo-web-browser expo-crypto
```

## Security Considerations

### Backend Implementation

1. **Rate Limiting**: Limit OTP requests per email (e.g., 3 per hour)
2. **OTP Expiration**: OTPs should expire after 5-10 minutes
3. **One-Time Use**: Each OTP should only be usable once
4. **Secure Storage**: Store OTPs hashed in your database
5. **Email Validation**: Maintain a whitelist of valid college domains
6. **Brute Force Protection**: Lock accounts after multiple failed attempts

### Frontend Considerations

1. **Token Storage**: Tokens are stored in `expo-secure-store` (encrypted)
2. **HTTPS Only**: All API calls should use HTTPS
3. **Email Validation**: Client-side validation for better UX
4. **Input Sanitization**: Email and OTP inputs are sanitized

## UI/UX Features

### Email OTP Screen

- **Two-step process**: Email entry → OTP verification
- **Resend OTP**: Users can request a new OTP
- **Email validation**: Real-time feedback for invalid emails
- **Beautiful design**: Matches the app's romantic theme with gradients and decorative elements
- **Error handling**: Clear error messages for failed attempts
- **Back navigation**: Users can go back to change email

### Accessibility

- Proper keyboard types (`email-address` for email, `number-pad` for OTP)
- Auto-capitalization disabled for email
- Clear labels and placeholders
- Loading states for async operations

## Troubleshooting

### "Invalid email" error

- Ensure email ends with a valid college domain
- Check `src/utils/validation.ts` for supported domains

### OTP not received

- Check spam/junk folder
- Verify backend email service is configured
- Check backend logs for errors

### "Invalid OTP" error

- Ensure OTP hasn't expired
- Check for typos
- Use "Resend OTP" to get a new code

### Mock mode not working

- Verify `config.useMockAuth` is `true`
- Check console logs for `🧪 Mock:` messages
- Clear app data and restart

## Next Steps

1. Implement backend endpoints (`/auth/send-otp` and `/auth/verify-otp`)
2. Configure email service on backend (SendGrid, AWS SES, etc.)
3. Test with real college emails
4. Set `useMockAuth` to `false` in production
5. Monitor authentication metrics and errors

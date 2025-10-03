// Temporary static configuration - will add @env back once babel is working
export const config = {
  // API Settings
  apiBaseUrl: 'https://api.kinship.com',
  apiTimeout: 10000,

  // Expo Settings
  expoProjectId: 'your-expo-project-id',

  // Environment
  isDevelopment: true,
  isProduction: false,
  isTest: false,

  // Feature Flags
  enableNotifications: true,
  enableAnalytics: false,

  // Authentication
  useMockAuth: true, // Set to true for development, false for production OAuth
  googleClientId:
    process.env.GOOGLE_CLIENT_ID ||
    '657248796191-h679unjbgnlturbj96c0i5170vn9i2ta.apps.googleusercontent.com',

  // Debug
  debug: true,
} as const

// Type-safe environment variables
export type Config = typeof config

// Development helpers
if (config.isDevelopment) {
  console.log('🔧 Environment Configuration:', config)
}

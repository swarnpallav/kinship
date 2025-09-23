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

  // Debug
  debug: true,
} as const

// Type-safe environment variables
export type Config = typeof config

// Development helpers
if (config.isDevelopment) {
  console.log('🔧 Environment Configuration:', config)
}

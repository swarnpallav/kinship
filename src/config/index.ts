export * from './env'

// Legacy exports for backward compatibility
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || 'https://example.com/api'
export const API_TIMEOUT_MS = Number(
  process.env.EXPO_PUBLIC_API_TIMEOUT_MS || 10000
)

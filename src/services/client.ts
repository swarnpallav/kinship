import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { config } from '../config'

const TOKEN_KEY = 'auth_token'

export const client = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.apiTimeout,
})

// Request interceptor to add auth token
client.interceptors.request.use(
  async config => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor for error handling
client.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear stored auth
      await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_KEY),
        SecureStore.deleteItemAsync('auth_user'),
        SecureStore.deleteItemAsync('auth_onboarded'),
      ])
      // Could trigger logout here if needed
    }
    return Promise.reject(error)
  }
)

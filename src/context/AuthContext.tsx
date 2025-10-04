import React, { createContext, useContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { User } from '../types'
import { AuthService } from '../services/auth'
import { config } from '../config'

type AuthState = {
  user: User | null
  isLoading: boolean
  isOnboarded: boolean
}

type AuthContextValue = AuthState & {
  sendOTPMutation: {
    mutateAsync: (email: string) => Promise<void>
  }
  verifyOTPMutation: {
    mutateAsync: (params: { email: string; otp: string }) => Promise<User>
  }
  logoutMutation: {
    mutate: () => void
  }
  completeOnboarding: (profile: { name: string; bio: string }) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'
const ONBOARDED_KEY = 'auth_onboarded'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isOnboarded: false,
  })

  // Load stored auth state on app start
  useEffect(() => {
    loadStoredAuth()
  }, [])

  const loadStoredAuth = async () => {
    try {
      const [token, userStr, onboardedStr] = await Promise.all([
        SecureStore.getItemAsync(TOKEN_KEY),
        SecureStore.getItemAsync(USER_KEY),
        SecureStore.getItemAsync(ONBOARDED_KEY),
      ])

      if (token && userStr) {
        const user = JSON.parse(userStr)
        setState({
          user,
          isLoading: false,
          isOnboarded: onboardedStr === 'true',
        })
      } else {
        setState(prev => ({ ...prev, isLoading: false }))
      }
    } catch (error) {
      console.error('Failed to load auth state:', error)
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const sendOTPMutation = {
    mutateAsync: async (email: string): Promise<void> => {
      // In mock mode, just simulate sending OTP
      if (config.useMockAuth) {
        console.log('🧪 Mock: OTP sent to', email)
        await new Promise(resolve => setTimeout(resolve, 1000))
        return
      }

      // Call backend to send OTP
      await AuthService.sendOTP(email)
    },
  }

  const verifyOTPMutation = {
    mutateAsync: async (params: {
      email: string
      otp: string
    }): Promise<User> => {
      let userData: any

      // In mock mode, accept any 6-digit OTP
      if (config.useMockAuth) {
        console.log('🧪 Mock: Verifying OTP', params.otp, 'for', params.email)
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (params.otp.length !== 6) {
          throw new Error('Invalid OTP')
        }

        userData = {
          user: {
            id: 'mock-user-' + Date.now(),
            email: params.email,
            name: params.email.split('@')[0],
          },
          token: 'mock-token-' + Date.now(),
        }
      } else {
        // Call backend to verify OTP
        userData = await AuthService.verifyOTP(params.email, params.otp)
      }

      const user: User = {
        id: userData.user.id,
        email: userData.user.email,
        name: userData.user.name,
        picture: userData.user.picture,
      }

      await Promise.all([
        SecureStore.setItemAsync(TOKEN_KEY, userData.token),
        SecureStore.setItemAsync(USER_KEY, JSON.stringify(user)),
      ])

      setState(prev => ({
        ...prev,
        user,
        isOnboarded: false,
      }))

      return user
    },
  }

  const logoutMutation = {
    mutate: async () => {
      await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_KEY),
        SecureStore.deleteItemAsync(USER_KEY),
        SecureStore.deleteItemAsync(ONBOARDED_KEY),
      ])

      setState({
        user: null,
        isLoading: false,
        isOnboarded: false,
      })
    },
  }

  const completeOnboarding = async (profile: { name: string; bio: string }) => {
    if (state.user) {
      const updatedUser = { ...state.user, name: profile.name }
      await Promise.all([
        SecureStore.setItemAsync(USER_KEY, JSON.stringify(updatedUser)),
        SecureStore.setItemAsync(ONBOARDED_KEY, 'true'),
      ])

      setState(prev => ({
        ...prev,
        user: updatedUser,
        isOnboarded: true,
      }))
    }
  }

  const value: AuthContextValue = {
    ...state,
    sendOTPMutation,
    verifyOTPMutation,
    logoutMutation,
    completeOnboarding,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}

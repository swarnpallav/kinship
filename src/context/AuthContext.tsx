import React, { createContext, useContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { User } from '../types'

type AuthState = {
  user: User | null
  isLoading: boolean
  isOnboarded: boolean
}

type AuthContextValue = AuthState & {
  loginMutation: {
    mutateAsync: (credentials: {
      email: string
      password: string
    }) => Promise<void>
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

  const loginMutation = {
    mutateAsync: async (credentials: { email: string; password: string }) => {
      // Mock login - replace with real API call
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'John Doe',
      }
      const mockToken = 'mock-jwt-token-' + Date.now()

      await Promise.all([
        SecureStore.setItemAsync(TOKEN_KEY, mockToken),
        SecureStore.setItemAsync(USER_KEY, JSON.stringify(mockUser)),
      ])

      setState(prev => ({
        ...prev,
        user: mockUser,
        isOnboarded: false,
      }))
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
    loginMutation,
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

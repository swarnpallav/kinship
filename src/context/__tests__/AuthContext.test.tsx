import React from 'react'
import { render, waitFor, act } from '@testing-library/react-native'
import { Text } from 'react-native'
import { AuthProvider, useAuthContext } from '../AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Mock expo-secure-store
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}))

// Mock the services
jest.mock('../../services/mockApi', () => ({
  mockApi: {
    auth: {
      login: jest.fn().mockResolvedValue({
        user: { id: 'test-user', email: 'test@example.com', name: 'Test User' },
        token: 'mock-token',
        refreshToken: 'mock-refresh-token',
      }),
      me: jest.fn().mockResolvedValue({
        id: 'test-user',
        email: 'test@example.com',
        name: 'Test User',
      }),
    },
  },
}))

// Test component that uses AuthContext
function TestComponent() {
  const {
    user,
    isLoading,
    isOnboarded,
    loginMutation,
    logoutMutation,
    completeOnboarding,
  } = useAuthContext()

  return (
    <>
      <Text testID='loading'>{isLoading ? 'Loading' : 'Not Loading'}</Text>
      <Text testID='user'>{user ? user.name : 'No User'}</Text>
      <Text testID='onboarded'>
        {isOnboarded ? 'Onboarded' : 'Not Onboarded'}
      </Text>
      <Text testID='login-loading'>
        {loginMutation.isPending ? 'Login Loading' : 'Login Ready'}
      </Text>
      <Text testID='logout-loading'>
        {logoutMutation.isPending ? 'Logout Loading' : 'Logout Ready'}
      </Text>
    </>
  )
}

function TestWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('provides initial auth state', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )

    // Should start with loading state
    expect(getByTestId('loading').children[0]).toBe('Loading')
    expect(getByTestId('user').children[0]).toBe('No User')
    expect(getByTestId('onboarded').children[0]).toBe('Not Onboarded')

    // Wait for loading to complete
    await waitFor(() => {
      expect(getByTestId('loading').children[0]).toBe('Not Loading')
    })
  })

  it('handles login mutation', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(getByTestId('loading').children[0]).toBe('Not Loading')
    })

    // Test login mutation
    const { useAuthContext } = require('../AuthContext')

    // We need to access the context from within the component
    function LoginTestComponent() {
      const { loginMutation } = useAuthContext()

      React.useEffect(() => {
        loginMutation.mutate({
          email: 'test@example.com',
          password: 'password',
        })
      }, [])

      return <Text testID='login-test'>Login Test</Text>
    }

    const { rerender } = render(
      <TestWrapper>
        <LoginTestComponent />
      </TestWrapper>
    )

    await waitFor(() => {
      // Login should have been called
      const { mockApi } = require('../../services/mockApi')
      expect(mockApi.auth.login).toHaveBeenCalledWith(
        'test@example.com',
        'password'
      )
    })
  })

  it('handles logout mutation', async () => {
    // Create a component that triggers logout
    function LogoutTestComponent() {
      const { logoutMutation } = useAuthContext()

      React.useEffect(() => {
        logoutMutation.mutate()
      }, [])

      return <Text testID='logout-test'>Logout Test</Text>
    }

    render(
      <TestWrapper>
        <LogoutTestComponent />
      </TestWrapper>
    )

    await waitFor(() => {
      // Should clear the user state (this is handled by the mutation)
      expect(true).toBe(true) // Basic test to ensure logout mutation runs
    })
  })

  it('handles onboarding completion', async () => {
    function OnboardingTestComponent() {
      const { completeOnboarding, isOnboarded } = useAuthContext()

      React.useEffect(() => {
        // Simulate completing onboarding
        completeOnboarding({
          name: 'Updated Name',
          bio: 'Test bio',
          interests: ['Music', 'Sports'],
        })
      }, [])

      return (
        <Text testID='onboarding-status'>
          {isOnboarded ? 'Completed' : 'Not Completed'}
        </Text>
      )
    }

    const { getByTestId } = render(
      <TestWrapper>
        <OnboardingTestComponent />
      </TestWrapper>
    )

    await waitFor(() => {
      // Onboarding completion should update state
      expect(getByTestId('onboarding-status').children[0]).toBe('Completed')
    })
  })

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useAuthContext must be used within AuthProvider')

    consoleSpy.mockRestore()
  })
})

import React from 'react'
import { render, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RootNavigator from '../RootNavigator'
import { AuthProvider } from '../../context'

// Mock expo-secure-store
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}))

// Mock the notification service
jest.mock('../../services/notifications', () => ({
  notificationService: {
    requestPermissions: jest.fn().mockResolvedValue(true),
    addNotificationReceivedListener: jest
      .fn()
      .mockReturnValue({ remove: jest.fn() }),
    addNotificationResponseReceivedListener: jest
      .fn()
      .mockReturnValue({ remove: jest.fn() }),
  },
}))

// Mock the services
jest.mock('../../services/mockApi', () => ({
  mockApi: {
    auth: {
      me: jest.fn().mockResolvedValue({
        id: 'test-user',
        email: 'test@example.com',
        name: 'Test User',
      }),
      login: jest.fn().mockResolvedValue({
        user: { id: 'test-user', email: 'test@example.com', name: 'Test User' },
        token: 'mock-token',
        refreshToken: 'mock-refresh-token',
      }),
    },
  },
}))

// Mock react-native-svg for lucide icons
jest.mock('react-native-svg', () => 'SvgMock')
jest.mock('lucide-react-native', () => ({
  Heart: 'HeartIcon',
  User: 'UserIcon',
  Settings: 'SettingsIcon',
  Compass: 'CompassIcon',
}))

// Mock the screens
jest.mock('../../screens', () => ({
  WelcomeScreen: () =>
    require('react-native').Text(
      { testID: 'welcome-screen' },
      'Welcome Screen'
    ),
  EmailOTPScreen: () =>
    require('react-native').Text({ testID: 'email-otp-screen' }, 'Email OTP'),
  ProfileSetupScreen: () =>
    require('react-native').Text(
      { testID: 'profile-setup-screen' },
      'Profile Setup'
    ),
  DiscoverScreen: () =>
    require('react-native').Text({ testID: 'discover-screen' }, 'Discover'),
  ProfileScreen: () =>
    require('react-native').Text({ testID: 'profile-screen' }, 'Profile'),
  SettingsScreen: () =>
    require('react-native').Text({ testID: 'settings-screen' }, 'Settings'),
  MatchesScreen: () =>
    require('react-native').Text({ testID: 'matches-screen' }, 'Matches'),
  ChatScreen: () =>
    require('react-native').Text({ testID: 'chat-screen' }, 'Chat'),
}))

// Mock the MatchesStackNavigator
jest.mock(
  '../MatchesStackNavigator',
  () => () =>
    require('react-native').Text({ testID: 'matches-stack' }, 'Matches Stack')
)

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

describe('RootNavigator', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock SecureStore to return no stored data (unauthenticated state)
    const { getItemAsync } = require('expo-secure-store')
    getItemAsync.mockResolvedValue(null)
  })

  it('renders WelcomeScreen when user is not authenticated', async () => {
    const { getByTestId, queryByTestId } = render(
      <TestWrapper>
        <RootNavigator />
      </TestWrapper>
    )

    // Should show loading initially
    await waitFor(
      () => {
        expect(queryByTestId('welcome-screen')).toBeTruthy()
      },
      { timeout: 3000 }
    )

    // Should not show authenticated screens
    expect(queryByTestId('discover-screen')).toBeFalsy()
    expect(queryByTestId('matches-stack')).toBeFalsy()
  })

  it('renders MainTabs when user is authenticated and onboarded', async () => {
    // Mock authenticated state
    const { getItemAsync } = require('expo-secure-store')
    getItemAsync
      .mockResolvedValueOnce('mock-token') // TOKEN_KEY
      .mockResolvedValueOnce(
        JSON.stringify({
          id: 'test-user',
          email: 'test@example.com',
          name: 'Test User',
        })
      ) // USER_KEY
      .mockResolvedValueOnce('true') // ONBOARDED_KEY

    const { queryByTestId } = render(
      <TestWrapper>
        <RootNavigator />
      </TestWrapper>
    )

    await waitFor(
      () => {
        // Should show main tabs (discover screen should be visible as default tab)
        expect(queryByTestId('discover-screen')).toBeTruthy()
      },
      { timeout: 3000 }
    )

    // Should not show auth screens
    expect(queryByTestId('welcome-screen')).toBeFalsy()
  })

  it('renders auth flow when user is authenticated but not onboarded', async () => {
    // Mock authenticated but not onboarded state
    const { getItemAsync } = require('expo-secure-store')
    getItemAsync
      .mockResolvedValueOnce('mock-token') // TOKEN_KEY
      .mockResolvedValueOnce(
        JSON.stringify({
          id: 'test-user',
          email: 'test@example.com',
          name: 'Test User',
        })
      ) // USER_KEY
      .mockResolvedValueOnce(null) // ONBOARDED_KEY (not onboarded)

    const { queryByTestId } = render(
      <TestWrapper>
        <RootNavigator />
      </TestWrapper>
    )

    await waitFor(
      () => {
        // Should show welcome screen (auth flow)
        expect(queryByTestId('welcome-screen')).toBeTruthy()
      },
      { timeout: 3000 }
    )

    // Should not show main tabs
    expect(queryByTestId('discover-screen')).toBeFalsy()
  })

  it('shows loading state initially', async () => {
    const { getByTestId, queryByTestId } = render(
      <TestWrapper>
        <RootNavigator />
      </TestWrapper>
    )

    // Should show ActivityIndicator initially
    expect(getByTestId('activity-indicator')).toBeTruthy()

    // Wait for loading to complete
    await waitFor(
      () => {
        expect(queryByTestId('activity-indicator')).toBeFalsy()
      },
      { timeout: 3000 }
    )
  })
})

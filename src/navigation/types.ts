import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { CompositeScreenProps } from '@react-navigation/native'

// Auth Stack Types
export type AuthStackParamList = {
  Welcome: undefined
  EmailOTP: undefined
  ProfileSetup: undefined
}

// Matches Stack Types (nested in Matches tab)
export type MatchesStackParamList = {
  MatchesList: undefined
  Chat: {
    matchId: string
    matchName: string
    matchAvatar?: string
  }
}

// Main App Tabs Types
export type MainTabsParamList = {
  Discover: undefined
  Matches: undefined
  Profile: undefined
  Settings: undefined
}

// Root Stack Types (top level)
export type RootStackParamList = {
  AuthStack: undefined
  MainTabs: undefined
}

// Screen Props Types
export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>

export type MatchesStackScreenProps<T extends keyof MatchesStackParamList> =
  NativeStackScreenProps<MatchesStackParamList, T>

export type MainTabsScreenProps<T extends keyof MainTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabsParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

// Declare global navigation types for TypeScript
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

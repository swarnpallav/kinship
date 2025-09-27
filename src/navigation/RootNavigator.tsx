import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Heart,
  MessageCircle,
  User,
  Settings,
  Compass,
} from 'lucide-react-native'
import { useAuthContext } from '../context'
import {
  WelcomeScreen,
  GoogleSignInScreen,
  CollegeVerificationScreen,
  ProfileSetupScreen,
  DiscoverScreen,
  ProfileScreen,
  SettingsScreen,
} from '../screens'
import MatchesStackNavigator from './MatchesStackNavigator'
import type {
  RootStackParamList,
  AuthStackParamList,
  MainTabsParamList,
} from './types'

const RootStack = createNativeStackNavigator<RootStackParamList>()
const AuthStack = createNativeStackNavigator<AuthStackParamList>()
const MainTabs = createBottomTabNavigator<MainTabsParamList>()

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name='Welcome' component={WelcomeScreen} />
      <AuthStack.Screen name='GoogleSignIn' component={GoogleSignInScreen} />
      <AuthStack.Screen
        name='CollegeVerification'
        component={CollegeVerificationScreen}
      />
      <AuthStack.Screen name='ProfileSetup' component={ProfileSetupScreen} />
    </AuthStack.Navigator>
  )
}

function MainTabsNavigator() {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView style={styles.tabContainer} edges={['top', 'left', 'right']}>
      <MainTabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#ef4444', // primary-500
          tabBarInactiveTintColor: '#737373', // neutral-500
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e5e5e5',
            paddingBottom: Math.max(insets.bottom, 5),
            paddingTop: 5,
            height: 60 + Math.max(insets.bottom, 0),
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          headerShown: false,
        }}
      >
        <MainTabs.Screen
          name='Discover'
          component={DiscoverScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Compass size={size} {...({ color } as any)} />
            ),
          }}
        />
        <MainTabs.Screen
          name='Matches'
          component={MatchesStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Heart size={size} {...({ color } as any)} />
            ),
          }}
        />
        <MainTabs.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <User size={size} {...({ color } as any)} />
            ),
          }}
        />
        <MainTabs.Screen
          name='Settings'
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Settings size={size} {...({ color } as any)} />
            ),
          }}
        />
      </MainTabs.Navigator>
    </SafeAreaView>
  )
}

export default function RootNavigator() {
  const { user, isLoading, isOnboarded } = useAuthContext()

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size='large'
          color='#ef4444'
          testID='activity-indicator'
        />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user && isOnboarded ? (
          <RootStack.Screen name='MainTabs' component={MainTabsNavigator} />
        ) : (
          <RootStack.Screen name='AuthStack' component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
})

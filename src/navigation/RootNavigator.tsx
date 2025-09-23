import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, ActivityIndicator } from 'react-native'
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
  return (
    <MainTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ef4444', // primary-500
        tabBarInactiveTintColor: '#737373', // neutral-500
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e5e5',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
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
            <Compass size={size} color={color} />
          ),
        }}
      />
      <MainTabs.Screen
        name='Matches'
        component={MatchesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
      <MainTabs.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      <MainTabs.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </MainTabs.Navigator>
  )
}

export default function RootNavigator() {
  const { user, isLoading, isOnboarded } = useAuthContext()

  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center bg-neutral-50 dark:bg-neutral-900'>
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

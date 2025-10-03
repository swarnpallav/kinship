import React from 'react'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import {
  Heart,
  MessageCircle,
  User,
  Settings,
  Compass,
} from 'lucide-react-native'
import { useAuthContext } from '../context'
import { useTheme } from '../theme'
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
  const { theme, isDark } = useTheme()

  return (
    <SafeAreaView
      style={[
        styles.tabContainer,
        { backgroundColor: 'transparent' }, // Transparent to show gradients
      ]}
      edges={['left', 'right']} // Don't include 'top' so content extends behind status bar
    >
      <MainTabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary[500],
          tabBarInactiveTintColor: theme.colors.text.tertiary,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: isDark
              ? 'rgba(47, 43, 58, 0.95)' // More opaque for better contrast
              : 'rgba(255, 255, 255, 0.95)', // More opaque for better contrast
            borderTopColor: isDark
              ? 'rgba(77, 69, 86, 0.5)'
              : 'rgba(153, 153, 153, 0.3)', // Darker border for visibility
            borderTopWidth: 1,
            paddingBottom: Math.max(insets.bottom, 5),
            paddingTop: 5,
            height: 60 + Math.max(insets.bottom, 0),
            // Add blur effect
            ...(Platform.OS === 'ios' && {
              backgroundColor: 'transparent',
            }),
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          headerShown: false,
          tabBarBackground: () =>
            Platform.OS === 'ios' ? (
              <BlurView
                intensity={90}
                tint={isDark ? 'dark' : 'light'}
                style={StyleSheet.absoluteFill}
              />
            ) : null,
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
          options={({ route }) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? 'MatchesList'

            return {
              tabBarIcon: ({ color, size }) => (
                <Heart size={size} {...({ color } as any)} />
              ),
              // Hide tab bar when in Chat screen
              tabBarStyle:
                routeName === 'Chat'
                  ? { display: 'none' }
                  : {
                      position: 'absolute',
                      backgroundColor: isDark
                        ? 'rgba(47, 43, 58, 0.95)'
                        : 'rgba(255, 255, 255, 0.95)',
                      borderTopColor: isDark
                        ? 'rgba(77, 69, 86, 0.5)'
                        : 'rgba(153, 153, 153, 0.3)',
                      borderTopWidth: 1,
                      paddingBottom: Math.max(insets.bottom, 5),
                      paddingTop: 5,
                      height: 60 + Math.max(insets.bottom, 0),
                      ...(Platform.OS === 'ios' && {
                        backgroundColor: 'transparent',
                      }),
                    },
            }
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
  const { theme, isDark } = useTheme()

  // Create navigation theme based on current theme
  const navigationTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: theme.colors.primary[500],
          background: theme.colors.background.primary,
          card: theme.colors.background.tertiary,
          text: theme.colors.text.primary,
          border: theme.colors.border.light,
          notification: theme.colors.primary[500],
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: theme.colors.primary[500],
          background: theme.colors.background.primary,
          card: theme.colors.background.secondary,
          text: theme.colors.text.primary,
          border: theme.colors.border.light,
          notification: theme.colors.primary[500],
        },
      }

  if (isLoading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background.primary },
        ]}
      >
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background.primary}
        />
        <ActivityIndicator
          size='large'
          color={theme.colors.primary[500]}
          testID='activity-indicator'
        />
      </View>
    )
  }

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor='transparent'
        translucent
      />
      <NavigationContainer theme={navigationTheme}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {user && isOnboarded ? (
            <RootStack.Screen name='MainTabs' component={MainTabsNavigator} />
          ) : (
            <RootStack.Screen name='AuthStack' component={AuthNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flex: 1,
  },
})

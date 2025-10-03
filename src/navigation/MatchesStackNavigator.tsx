import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Platform, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import { MatchesScreen, ChatScreen } from '../screens'
import { useTheme } from '../theme'
import type { MatchesStackParamList } from './types'

const Stack = createNativeStackNavigator<MatchesStackParamList>()

export default function MatchesStackNavigator() {
  const { theme, isDark } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: Platform.select({
          ios: {
            backgroundColor: 'transparent',
          },
          android: {
            backgroundColor: isDark
              ? 'rgba(26, 23, 33, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
          },
        }),
        headerTintColor: theme.colors.text.primary,
        headerShadowVisible: false,
        headerTransparent: Platform.OS === 'ios',
        headerBlurEffect:
          Platform.OS === 'ios' ? (isDark ? 'dark' : 'light') : undefined,
        headerTitleStyle: {
          color: theme.colors.text.primary,
        },
      }}
    >
      <Stack.Screen
        name='MatchesList'
        component={MatchesScreen}
        options={{
          title: 'Matches',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: theme.colors.text.primary,
          },
        }}
      />
      <Stack.Screen
        name='Chat'
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.matchName,
          headerTitleStyle: {
            fontWeight: '600',
            color: theme.colors.text.primary,
          },
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  )
}

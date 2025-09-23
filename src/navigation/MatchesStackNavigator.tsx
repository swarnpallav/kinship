import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MatchesScreen, ChatScreen } from '../screens'
import type { MatchesStackParamList } from './types'

const Stack = createNativeStackNavigator<MatchesStackParamList>()

export default function MatchesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='MatchesList'
        component={MatchesScreen}
        options={{
          title: 'Matches',
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name='Chat'
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.matchName,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  )
}

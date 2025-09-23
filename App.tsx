import React, { useEffect } from 'react'
import { RootNavigator } from './src/navigation'
import { AuthProvider } from './src/context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { notificationService } from './src/services'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})

export default function App() {
  useEffect(() => {
    // Request notification permissions on app start
    const initializeNotifications = async () => {
      try {
        const hasPermission = await notificationService.requestPermissions()
        if (hasPermission) {
          console.log('✅ Notification permissions granted')
        } else {
          console.warn('⚠️ Notification permissions denied')
        }

        // Set up notification listeners
        const notificationListener =
          notificationService.addNotificationReceivedListener(notification => {
            console.log('📱 Notification received:', notification)
          })

        const responseListener =
          notificationService.addNotificationResponseReceivedListener(
            response => {
              console.log('👆 Notification tapped:', response)
              // Handle notification tap - could navigate to specific screen
              const data = response.notification.request.content.data
              if (data?.type === 'match') {
                // Navigate to matches screen
              } else if (data?.type === 'message') {
                // Navigate to chat screen
              }
            }
          )

        // Clean up listeners
        return () => {
          notificationListener.remove()
          responseListener.remove()
        }
      } catch (error) {
        console.error('Failed to initialize notifications:', error)
      }
    }

    initializeNotifications()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </QueryClientProvider>
  )
}

import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import { config } from '../config'

// Configure how notifications are handled when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export type NotificationType = 'match' | 'message' | 'like' | 'general'

export interface NotificationData {
  type: NotificationType
  userId?: string
  matchId?: string
  messageId?: string
  title: string
  body: string
}

class NotificationService {
  private expoPushToken: string | null = null

  /**
   * Request notification permissions and get Expo push token
   */
  async requestPermissions(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        })
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        console.warn('Failed to get push token for push notification!')
        return false
      }

      // Determine projectId from Constants (EAS) or config, falling back gracefully
      const detectedProjectId =
        (Constants as any)?.expoConfig?.extra?.eas?.projectId ||
        (Constants as any)?.easConfig?.projectId ||
        (config.expoProjectId && /^[0-9a-fA-F-]{36}$/.test(config.expoProjectId)
          ? config.expoProjectId
          : undefined)

      try {
        const token = detectedProjectId
          ? await Notifications.getExpoPushTokenAsync({
              projectId: detectedProjectId,
            })
          : await Notifications.getExpoPushTokenAsync()

        this.expoPushToken = token.data
        console.log('Expo Push Token:', this.expoPushToken)
      } catch (tokenErr) {
        console.warn(
          'Expo push token not available (no projectId). Local notifications will still work.'
        )
        this.expoPushToken = null
      }

      return true
    } catch (error) {
      console.error('Error requesting notification permissions:', error)
      return false
    }
  }

  /**
   * Get the current Expo push token
   */
  getExpoPushToken(): string | null {
    return this.expoPushToken
  }

  /**
   * Schedule a local notification
   */
  async scheduleLocalNotification(
    title: string,
    body: string,
    data?: any,
    delaySeconds: number = 0
  ): Promise<string | null> {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: true,
        },
        trigger: delaySeconds > 0 ? { seconds: delaySeconds } : null,
      })

      return notificationId
    } catch (error) {
      console.error('Error scheduling notification:', error)
      return null
    }
  }

  /**
   * Send a test notification (local)
   */
  async sendTestNotification(): Promise<void> {
    try {
      await this.scheduleLocalNotification(
        '💕 Kinship Test',
        'This is a test notification to make sure everything is working!',
        { type: 'test' },
        2 // 2 second delay
      )
      console.log('Test notification scheduled!')
    } catch (error) {
      console.error('Error sending test notification:', error)
    }
  }

  /**
   * Send a match notification
   */
  async sendMatchNotification(matchUserName: string): Promise<void> {
    await this.scheduleLocalNotification(
      "🎉 It's a Match!",
      `You and ${matchUserName} liked each other!`,
      { type: 'match', userName: matchUserName }
    )
  }

  /**
   * Send a new message notification
   */
  async sendMessageNotification(
    senderName: string,
    message: string
  ): Promise<void> {
    await this.scheduleLocalNotification(
      `💬 ${senderName}`,
      message.length > 50 ? `${message.substring(0, 50)}...` : message,
      { type: 'message', senderName }
    )
  }

  /**
   * Send a like notification
   */
  async sendLikeNotification(): Promise<void> {
    await this.scheduleLocalNotification(
      '❤️ Someone Likes You!',
      'You have a new like! Check out your matches.',
      { type: 'like' }
    )
  }

  /**
   * Cancel a specific notification
   */
  async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId)
    } catch (error) {
      console.error('Error canceling notification:', error)
    }
  }

  /**
   * Cancel all scheduled notifications
   */
  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync()
    } catch (error) {
      console.error('Error canceling all notifications:', error)
    }
  }

  /**
   * Handle notification received while app is in foreground
   */
  addNotificationReceivedListener(
    listener: (notification: Notifications.Notification) => void
  ) {
    return Notifications.addNotificationReceivedListener(listener)
  }

  /**
   * Handle notification tapped/opened
   */
  addNotificationResponseReceivedListener(
    listener: (response: Notifications.NotificationResponse) => void
  ) {
    return Notifications.addNotificationResponseReceivedListener(listener)
  }

  /**
   * Get notification settings
   */
  async getNotificationSettings() {
    return await Notifications.getPermissionsAsync()
  }
}

// Export singleton instance
export const notificationService = new NotificationService()

// Export the class for testing or custom instances
export default NotificationService

import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Switch,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native'
import { AppCard, AppButton } from '../components'
import { useAuthContext } from '../context'
import { notificationService } from '../services'

type SettingItem = {
  id: string
  title: string
  description: string
  type: 'toggle' | 'action'
  value?: boolean
  onPress?: () => void
}

export default function SettingsScreen() {
  const { logoutMutation } = useAuthContext()
  const [notifications, setNotifications] = useState(true)
  const [showAge, setShowAge] = useState(true)
  const [showDistance, setShowDistance] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const settings: SettingItem[] = [
    {
      id: 'notifications',
      title: 'Push Notifications',
      description: 'Get notified about new matches and messages',
      type: 'toggle',
      value: notifications,
    },
    {
      id: 'show-age',
      title: 'Show Age',
      description: 'Display your age on your profile',
      type: 'toggle',
      value: showAge,
    },
    {
      id: 'show-distance',
      title: 'Show Distance',
      description: 'Show distance to other users',
      type: 'toggle',
      value: showDistance,
    },
    {
      id: 'dark-mode',
      title: 'Dark Mode',
      description: 'Use dark theme throughout the app',
      type: 'toggle',
      value: darkMode,
    },
  ]

  const handleToggle = (settingId: string, value: boolean) => {
    switch (settingId) {
      case 'notifications':
        setNotifications(value)
        break
      case 'show-age':
        setShowAge(value)
        break
      case 'show-distance':
        setShowDistance(value)
        break
      case 'dark-mode':
        setDarkMode(value)
        break
    }
  }

  const handleEditProfile = () => {
    console.log('Edit profile')
  }

  const handlePrivacySettings = () => {
    console.log('Privacy settings')
  }

  const handleSupport = () => {
    console.log('Support')
  }

  const handleTestNotification = async () => {
    try {
      await notificationService.sendTestNotification()
      Alert.alert(
        'Test Notification Sent!',
        'You should receive a test notification in 2 seconds.',
        [{ text: 'OK' }]
      )
    } catch (error) {
      Alert.alert(
        'Notification Error',
        'Failed to send test notification. Make sure notifications are enabled.',
        [{ text: 'OK' }]
      )
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        contentInsetAdjustmentBehavior='automatic'
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Settings</Text>

        {/* Preferences */}
        <AppCard style={styles.card}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          {settings.map(setting => (
            <View key={setting.id} style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>{setting.title}</Text>
                <Text style={styles.settingDescription}>
                  {setting.description}
                </Text>
              </View>

              {setting.type === 'toggle' && (
                <Switch
                  value={setting.value}
                  onValueChange={value => handleToggle(setting.id, value)}
                  trackColor={{ false: '#d4d4d4', true: '#ef4444' }}
                  thumbColor={setting.value ? '#ffffff' : '#f5f5f5'}
                />
              )}
            </View>
          ))}
        </AppCard>

        {/* Account Actions */}
        <AppCard style={styles.card}>
          <Text style={styles.sectionTitle}>Account</Text>

          <Pressable onPress={handleEditProfile} style={styles.actionRow}>
            <Text style={styles.actionText}>Edit Profile</Text>
          </Pressable>

          <Pressable onPress={handlePrivacySettings} style={styles.actionRow}>
            <Text style={styles.actionText}>Privacy Settings</Text>
          </Pressable>

          <Pressable onPress={handleSupport} style={styles.actionRow}>
            <Text style={styles.actionText}>Help & Support</Text>
          </Pressable>
        </AppCard>

        {/* Test Notifications */}
        <AppCard style={styles.card}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <AppButton
            title='Send Test Notification'
            variant='outline'
            onPress={handleTestNotification}
            size='lg'
          />
        </AppCard>

        {/* Sign Out */}
        <AppCard style={styles.card}>
          <AppButton
            title='Sign Out'
            variant='outline'
            onPress={() => logoutMutation.mutate()}
            style={styles.signOutButton}
            size='lg'
          />
        </AppCard>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Kinship v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 20, // Reduced padding since tab bar now handles safe area
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#171717',
    marginBottom: 24,
    marginTop: 16, // Add top margin for better spacing
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#171717',
  },
  settingDescription: {
    fontSize: 14,
    color: '#525252',
    marginTop: 4,
  },
  actionRow: {
    paddingVertical: 12,
  },
  actionText: {
    fontSize: 16,
    color: '#171717',
  },
  signOutButton: {
    borderColor: '#ef4444',
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  appVersion: {
    fontSize: 14,
    color: '#737373',
  },
})

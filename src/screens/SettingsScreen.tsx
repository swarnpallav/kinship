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
import { LinearGradient } from 'expo-linear-gradient'
import { AppCard, AppButton } from '../components'
import { useAuthContext } from '../context'
import { useTheme } from '../theme'
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
  const { theme, isDark, themeMode, toggleTheme, setThemeMode } = useTheme()
  const styles = createStyles(theme)
  const [notifications, setNotifications] = useState(true)
  const [showAge, setShowAge] = useState(true)
  const [showDistance, setShowDistance] = useState(true)

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

  const handleThemeToggle = (value: boolean) => {
    if (themeMode === 'system') {
      // First toggle from system mode: set to opposite of current system theme
      setThemeMode(value ? 'dark' : 'light')
    } else {
      // Already in manual mode, just toggle
      toggleTheme()
    }
  }

  const handleResetToSystem = () => {
    setThemeMode('system')
  }

  const isSystemMode = themeMode === 'system'
  const getThemeDescription = () => {
    if (isSystemMode) {
      return `Following system (currently ${isDark ? 'dark' : 'light'})`
    }
    return `Manually set to ${isDark ? 'dark' : 'light'} mode`
  }

  return (
    <LinearGradient
      colors={theme.gradients.velvetAffection as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        {/* Decorative background elements */}
        <View style={styles.decorativeContainer}>
          <Text style={[styles.decorativeEmoji, styles.emoji1]}>💝</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji2]}>✨</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji3]}>💕</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          contentInsetAdjustmentBehavior='automatic'
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Settings</Text>

          {/* Appearance */}
          <AppCard style={styles.card}>
            <Text style={styles.sectionTitle}>Appearance</Text>

            <View style={styles.themeRow}>
              <View style={styles.themeInfo}>
                <View style={styles.themeTitleRow}>
                  <Text style={styles.themeTitle}>
                    {isDark ? '🌙' : '☀️'} {isDark ? 'Dark' : 'Light'} Mode
                  </Text>
                  {isSystemMode && (
                    <View style={styles.systemBadge}>
                      <Text style={styles.systemBadgeText}>AUTO</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.themeDescription}>
                  {getThemeDescription()}
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={handleThemeToggle}
                trackColor={{
                  false: theme.colors.neutral[300],
                  true: theme.colors.primary[500],
                }}
                thumbColor={theme.colors.background.primary}
                ios_backgroundColor={theme.colors.neutral[300]}
              />
            </View>

            {!isSystemMode && (
              <Pressable
                style={styles.resetButton}
                onPress={handleResetToSystem}
              >
                <Text style={styles.resetButtonText}>
                  📱 Reset to System Theme
                </Text>
              </Pressable>
            )}
          </AppCard>

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
                    trackColor={{
                      false: theme.colors.neutral[300],
                      true: theme.colors.primary[500],
                    }}
                    thumbColor={theme.colors.background.primary}
                    ios_backgroundColor={theme.colors.neutral[300]}
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
              size='lg'
            />
          </AppCard>

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={styles.appVersion}>Kinship v1.0.0</Text>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  )
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    gradient: {
      flex: 1,
    },
    container: {
      flex: 1,
      position: 'relative',
    },
    decorativeContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
    },
    decorativeEmoji: {
      position: 'absolute',
      fontSize: 38,
      opacity: 0.1,
    },
    emoji1: {
      top: '12%',
      left: '10%',
      transform: [{ rotate: '-12deg' }],
      fontSize: 42,
    },
    emoji2: {
      top: '25%',
      right: '12%',
      fontSize: 35,
    },
    emoji3: {
      top: '75%',
      right: '10%',
      fontSize: 40,
      transform: [{ rotate: '10deg' }],
    },
    scrollView: {
      flex: 1,
      zIndex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      padding: theme.spacing.md,
      paddingBottom: 120, // Account for floating tab bar (60px) + safe area + spacing
    },
    title: {
      fontSize: theme.typography.fontSizes['2xl'],
      fontWeight: theme.typography.fontWeights.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.lg,
      marginTop: theme.spacing.md,
    },
    card: {
      marginBottom: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSizes.lg,
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
    },
    themeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.xs,
    },
    themeInfo: {
      flex: 1,
      marginRight: theme.spacing.md,
    },
    themeTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    themeTitle: {
      fontSize: theme.typography.fontSizes.base,
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.text.primary,
    },
    systemBadge: {
      backgroundColor: theme.colors.primary[500],
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: 2,
      borderRadius: theme.borderRadius.sm,
    },
    systemBadgeText: {
      fontSize: theme.typography.fontSizes.xs,
      fontWeight: theme.typography.fontWeights.bold,
      color: theme.colors.text.inverse,
    },
    themeDescription: {
      fontSize: theme.typography.fontSizes.sm,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.xs,
    },
    resetButton: {
      marginTop: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.background.tertiary,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border.light,
    },
    resetButtonText: {
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.primary,
      textAlign: 'center',
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.sm,
    },
    settingInfo: {
      flex: 1,
      marginRight: theme.spacing.md,
    },
    settingTitle: {
      fontSize: theme.typography.fontSizes.base,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.primary,
    },
    settingDescription: {
      fontSize: theme.typography.fontSizes.sm,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.xs,
    },
    actionRow: {
      paddingVertical: theme.spacing.sm,
    },
    actionText: {
      fontSize: theme.typography.fontSizes.base,
      color: theme.colors.text.primary,
    },
    appInfo: {
      alignItems: 'center',
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.md,
    },
    appVersion: {
      fontSize: theme.typography.fontSizes.sm,
      color: theme.colors.text.tertiary,
      marginTop: theme.spacing.xs,
    },
  })

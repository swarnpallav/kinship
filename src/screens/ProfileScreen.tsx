import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AppCard, AppButton, Avatar } from '../components'
import { useAuthContext } from '../context'
import { useTheme } from '../theme'

export default function ProfileScreen() {
  const { user, logoutMutation } = useAuthContext()
  const { theme } = useTheme()
  const styles = createStyles(theme)

  return (
    <LinearGradient
      colors={theme.gradients.tenderEmbrace as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        {/* Decorative background elements */}
        <View style={styles.decorativeContainer}>
          <Text style={[styles.decorativeEmoji, styles.emoji1]}>💗</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji2]}>💓</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji3]}>💖</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji4]}>💕</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          contentInsetAdjustmentBehavior='automatic'
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Your Profile</Text>

          {/* Profile Info Card */}
          <AppCard style={styles.card}>
            <View style={styles.profileHeader}>
              <Avatar size={80} />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>
                  {user?.name || 'Your Name'}
                </Text>
                <Text style={styles.profileEmail}>
                  {user?.email || 'your.email@college.edu'}
                </Text>
              </View>
            </View>

            <Text style={styles.profileBio}>
              Computer Science student passionate about technology and
              innovation. Love hiking, coffee, and building cool apps! 🚀
            </Text>

            {/* Interests */}
            <Text style={styles.sectionLabel}>Interests</Text>
            <View style={styles.interestsContainer}>
              {['Technology', 'Hiking', 'Coffee', 'Music', 'Travel'].map(
                interest => (
                  <View key={interest} style={styles.interestTag}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                )
              )}
            </View>
          </AppCard>

          {/* Profile Actions */}
          <AppCard style={styles.card}>
            <Text style={styles.sectionTitle}>Profile Actions</Text>

            <AppButton
              title='Edit Profile'
              variant='primary'
              onPress={() => console.log('Edit profile')}
              style={styles.actionButton}
              size='lg'
            />

            <AppButton
              title='Change Photos'
              variant='outline'
              onPress={() => console.log('Change photos')}
              style={styles.actionButton}
              size='lg'
            />

            <AppButton
              title='Privacy Settings'
              variant='outline'
              onPress={() => console.log('Privacy settings')}
              style={styles.actionButton}
              size='lg'
            />
          </AppCard>

          {/* Account */}
          <AppCard style={styles.card}>
            <Text style={styles.sectionTitle}>Account</Text>
            <AppButton
              title='Sign Out'
              variant='outline'
              onPress={() => logoutMutation.mutate()}
              size='lg'
            />
          </AppCard>
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
      fontSize: 35,
      opacity: 0.1,
    },
    emoji1: {
      top: '8%',
      left: '10%',
      transform: [{ rotate: '-15deg' }],
      fontSize: 40,
    },
    emoji2: {
      top: '15%',
      right: '12%',
      fontSize: 30,
    },
    emoji3: {
      top: '70%',
      left: '8%',
      fontSize: 35,
    },
    emoji4: {
      top: '80%',
      right: '10%',
      fontSize: 32,
      transform: [{ rotate: '12deg' }],
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
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    profileInfo: {
      marginLeft: theme.spacing.md,
      flex: 1,
    },
    profileName: {
      fontSize: theme.typography.fontSizes.xl,
      fontWeight: theme.typography.fontWeights.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    profileEmail: {
      fontSize: theme.typography.fontSizes.base,
      color: theme.colors.text.secondary,
    },
    profileBio: {
      fontSize: theme.typography.fontSizes.base,
      color: theme.colors.text.primary,
      lineHeight: 22,
      marginBottom: theme.spacing.md,
    },
    sectionLabel: {
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSizes.lg,
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
    },
    interestsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    interestTag: {
      backgroundColor: theme.colors.primary[50],
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 6,
      borderRadius: theme.borderRadius.xl,
      marginRight: theme.spacing.xs,
      marginBottom: theme.spacing.xs,
      borderWidth: 1,
      borderColor: theme.colors.primary[200],
    },
    interestText: {
      fontSize: theme.typography.fontSizes.sm,
      color: theme.colors.primary[700],
      fontWeight: theme.typography.fontWeights.medium,
    },
    actionButton: {
      marginBottom: theme.spacing.sm,
    },
  })

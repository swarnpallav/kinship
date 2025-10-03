import React, { useState } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AppButton, AppCard } from '../components'
import { useAuthContext } from '../context'
import { useTheme } from '../theme'
import { isCollegeEmail } from '../utils/validation'
import { config } from '../config'
import type { AuthStackScreenProps } from '../navigation/types'

type Props = AuthStackScreenProps<'GoogleSignIn'>

export default function GoogleSignInScreen({ navigation }: Props) {
  const { googleSignInMutation } = useAuthContext()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const styles = createStyles(theme)

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      // Use the Google sign-in from AuthContext
      const googleUser = await googleSignInMutation.mutateAsync()

      // Check if email is from a college domain
      if (isCollegeEmail(googleUser.email)) {
        // College email - proceed to profile setup
        navigation.navigate('ProfileSetup')
      } else {
        // Personal email - need college ID verification
        navigation.navigate('CollegeVerification')
      }
    } catch (error) {
      console.error('Google sign-in error:', error)
      Alert.alert('Error', 'Failed to sign in with Google. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <LinearGradient
      colors={theme.gradients.blushingRomance as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        {/* Decorative elements */}
        <View style={styles.decorativeContainer}>
          <Text style={[styles.decorativeEmoji, styles.emoji1]}>💝</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji2]}>✨</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji3]}>💕</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji4]}>💫</Text>
        </View>

        <AppCard>
          <Text style={styles.title}>Sign in with Google</Text>
          <Text style={styles.subtitle}>
            Use your college Gmail account or personal account with college ID
            card
          </Text>

          {config.useMockAuth && (
            <View style={styles.mockBanner}>
              <Text style={styles.mockText}>
                🧪 Development Mode: Using mock authentication
              </Text>
              <Text style={styles.mockSubtext}>
                Randomly tests college (.edu) and personal (gmail.com) emails
              </Text>
            </View>
          )}

          <AppButton
            title={loading ? 'Signing in...' : 'Continue with Google'}
            onPress={handleGoogleSignIn}
            disabled={loading}
            size='lg'
          />
          <AppButton
            title='Back'
            variant='outline'
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            size='lg'
          />
        </AppCard>
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
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.lg,
      minHeight: '100%',
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
      opacity: 0.2,
    },
    emoji1: {
      top: '20%',
      left: '15%',
      transform: [{ rotate: '-20deg' }],
    },
    emoji2: {
      top: '30%',
      right: '10%',
      fontSize: 40,
    },
    emoji3: {
      top: '65%',
      left: '10%',
      fontSize: 30,
    },
    emoji4: {
      top: '75%',
      right: '15%',
      fontSize: 35,
      transform: [{ rotate: '15deg' }],
    },
    title: {
      fontSize: theme.typography.fontSizes['2xl'],
      fontWeight: theme.typography.fontWeights.bold,
      textAlign: 'center',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
    },
    subtitle: {
      textAlign: 'center',
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.xl,
      fontSize: theme.typography.fontSizes.base,
    },
    backButton: {
      marginTop: theme.spacing.sm,
    },
    mockBanner: {
      backgroundColor: theme.colors.warning[50],
      borderColor: theme.colors.warning[100],
      borderWidth: 1,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.sm,
      marginBottom: theme.spacing.lg,
    },
    mockText: {
      color: theme.colors.warning[800],
      fontSize: theme.typography.fontSizes.sm,
      textAlign: 'center',
      fontWeight: theme.typography.fontWeights.medium,
    },
    mockSubtext: {
      color: theme.colors.warning[800],
      fontSize: theme.typography.fontSizes.xs,
      textAlign: 'center',
      marginTop: theme.spacing.xs,
      opacity: 0.8,
    },
  })

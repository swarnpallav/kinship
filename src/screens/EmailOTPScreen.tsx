import React, { useState } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AppButton, AppCard, AppTextInput } from '../components'
import { useAuthContext } from '../context'
import { useTheme } from '../theme'
import { isCollegeEmail } from '../utils/validation'
import type { AuthStackScreenProps } from '../navigation/types'

type Props = AuthStackScreenProps<'EmailOTP'>

export default function EmailOTPScreen({ navigation }: Props) {
  const { sendOTPMutation, verifyOTPMutation } = useAuthContext()
  const { theme } = useTheme()
  const styles = createStyles(theme)

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSendOTP = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your college email address')
      return
    }

    if (!isCollegeEmail(email)) {
      Alert.alert(
        'Invalid Email',
        'Please use your college email address (e.g., .edu, .ac.in)'
      )
      return
    }

    setLoading(true)
    try {
      await sendOTPMutation.mutateAsync(email)
      setOtpSent(true)
      Alert.alert('Success', 'OTP has been sent to your email')
    } catch (error) {
      console.error('Send OTP error:', error)
      Alert.alert('Error', 'Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter the OTP')
      return
    }

    setLoading(true)
    try {
      await verifyOTPMutation.mutateAsync({ email, otp })
      // Navigation will be handled by AuthContext after successful verification
      navigation.navigate('ProfileSetup')
    } catch (error) {
      console.error('Verify OTP error:', error)
      Alert.alert('Error', 'Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setOtp('')
    await handleSendOTP()
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
          <Text style={styles.title}>
            {otpSent ? 'Verify OTP' : 'Sign in with Email'}
          </Text>
          <Text style={styles.subtitle}>
            {otpSent
              ? 'Enter the OTP sent to your college email'
              : 'Use your college email address to sign in'}
          </Text>

          {!otpSent ? (
            <>
              <AppTextInput
                label='College Email'
                placeholder='your.name@college.edu'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                autoComplete='email'
                editable={!loading}
              />

              <AppButton
                title={loading ? 'Sending...' : 'Send OTP'}
                onPress={handleSendOTP}
                disabled={loading}
                size='lg'
              />
            </>
          ) : (
            <>
              <View style={styles.emailDisplay}>
                <Text style={styles.emailLabel}>Email:</Text>
                <Text style={styles.emailText}>{email}</Text>
              </View>

              <AppTextInput
                label='OTP'
                placeholder='Enter 6-digit OTP'
                value={otp}
                onChangeText={setOtp}
                keyboardType='number-pad'
                maxLength={6}
                editable={!loading}
              />

              <AppButton
                title={loading ? 'Verifying...' : 'Verify OTP'}
                onPress={handleVerifyOTP}
                disabled={loading}
                size='lg'
              />

              <AppButton
                title='Resend OTP'
                variant='outline'
                onPress={handleResendOTP}
                disabled={loading}
                style={styles.resendButton}
                size='lg'
              />
            </>
          )}

          <AppButton
            title='Back'
            variant='outline'
            onPress={() => {
              if (otpSent) {
                setOtpSent(false)
                setOtp('')
              } else {
                navigation.goBack()
              }
            }}
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
    emailDisplay: {
      backgroundColor: theme.colors.background.tertiary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.lg,
    },
    emailLabel: {
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.secondary,
    },
    emailText: {
      fontSize: theme.typography.fontSizes.base,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.primary,
      marginTop: theme.spacing.xs,
    },
    resendButton: {
      marginTop: theme.spacing.sm,
    },
    backButton: {
      marginTop: theme.spacing.sm,
    },
  })

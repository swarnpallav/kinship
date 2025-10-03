import React, { useState } from 'react'
import { View, Text, Alert, ScrollView, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker'
import { AppButton, AppCard } from '../components'
import { useAuthContext } from '../context'
import { useTheme } from '../theme'
import type { AuthStackScreenProps } from '../navigation/types'

type Props = AuthStackScreenProps<'CollegeVerification'>

export default function CollegeVerificationScreen({ navigation }: Props) {
  const { user } = useAuthContext()
  const { theme } = useTheme()
  const styles = createStyles(theme)
  const [idPhotoUri, setIdPhotoUri] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handlePickIdPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Permission needed',
        'Please allow access to your photo library'
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    })

    if (!result.canceled) {
      setIdPhotoUri(result.assets[0].uri)
    }
  }

  const handleVerify = async () => {
    if (!idPhotoUri) {
      Alert.alert('Missing ID', 'Please upload your college ID card')
      return
    }

    setLoading(true)
    // Mock verification process
    setTimeout(() => {
      setLoading(false)
      navigation.navigate('ProfileSetup')
    }, 2000)
  }

  const canVerify = idPhotoUri !== null

  return (
    <LinearGradient
      colors={theme.gradients.romanticSunset as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Decorative elements */}
        <View style={styles.decorativeContainer}>
          <Text style={[styles.decorativeEmoji, styles.emoji1]}>🎓</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji2]}>✨</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji3]}>📚</Text>
        </View>

        <AppCard>
          <Text style={styles.title}>Verify Your College</Text>
          <Text style={styles.subtitle}>
            Since you're using a personal Gmail account, please upload your
            college ID card to verify your student status
          </Text>

          {/* Show current email */}
          <View style={styles.emailContainer}>
            <Text style={styles.label}>Signed in as:</Text>
            <Text style={styles.emailText}>{user?.email}</Text>
          </View>

          {/* Student ID Photo */}
          <Text style={styles.label}>College ID Card Photo</Text>
          <AppButton
            title={
              idPhotoUri ? 'Change ID Card Photo' : 'Upload College ID Card'
            }
            variant='outline'
            onPress={handlePickIdPhoto}
            style={styles.uploadButton}
            size='lg'
          />
          {idPhotoUri && (
            <Text style={styles.successText}>✓ College ID card uploaded</Text>
          )}

          <Text style={styles.disclaimer}>
            We'll review your college ID card to verify your student status.
            This usually takes 1-2 business days.
          </Text>

          <AppButton
            title={loading ? 'Verifying...' : 'Submit for Verification'}
            onPress={handleVerify}
            disabled={!canVerify || loading}
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
      </ScrollView>
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
    },
    contentContainer: {
      flexGrow: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.xl,
      justifyContent: 'center',
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
      fontSize: 40,
      opacity: 0.15,
    },
    emoji1: {
      top: '12%',
      left: '10%',
      transform: [{ rotate: '-12deg' }],
    },
    emoji2: {
      top: '20%',
      right: '15%',
      fontSize: 35,
    },
    emoji3: {
      top: '75%',
      right: '10%',
      fontSize: 38,
      transform: [{ rotate: '10deg' }],
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
    label: {
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    emailContainer: {
      backgroundColor: theme.colors.background.tertiary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.lg,
    },
    emailText: {
      fontSize: theme.typography.fontSizes.base,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.primary,
      marginTop: theme.spacing.xs,
    },
    uploadButton: {
      marginBottom: theme.spacing.lg,
    },
    successText: {
      fontSize: theme.typography.fontSizes.sm,
      color: theme.colors.success[600],
      marginBottom: theme.spacing.md,
    },
    disclaimer: {
      fontSize: theme.typography.fontSizes.xs,
      color: theme.colors.text.tertiary,
      marginBottom: theme.spacing.lg,
      textAlign: 'center',
    },
    backButton: {
      marginTop: theme.spacing.sm,
    },
  })

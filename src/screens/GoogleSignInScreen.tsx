import React, { useState } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import { AppButton, AppCard } from '../components'
import { useAuthContext } from '../context'
import { isCollegeEmail } from '../utils/validation'
import type { AuthStackScreenProps } from '../navigation/types'

type Props = AuthStackScreenProps<'GoogleSignIn'>

export default function GoogleSignInScreen({ navigation }: Props) {
  const { googleSignInMutation } = useAuthContext()
  const [loading, setLoading] = useState(false)

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
    <View style={styles.container}>
      <AppCard>
        <Text style={styles.title}>Sign in with Google</Text>
        <Text style={styles.subtitle}>
          Use your college Gmail account or personal account with college ID
          card
        </Text>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 24,
    minHeight: '100%', // Ensure full height on mobile web
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#171717',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    color: '#525252',
    marginBottom: 32,
    fontSize: 16,
  },
  backButton: {
    marginTop: 12,
  },
})

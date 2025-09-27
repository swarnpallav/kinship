import React, { useState } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import { AppButton, AppCard } from '../components'
import { useAuthContext } from '../context'
import type { AuthStackScreenProps } from '../navigation/types'

type Props = AuthStackScreenProps<'GoogleSignIn'>

export default function GoogleSignInScreen({ navigation }: Props) {
  const { loginMutation } = useAuthContext()
  const [loading, setLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      // Mock Google Sign In - in real app, use expo-auth-session or similar
      await loginMutation.mutateAsync({
        email: 'user@college.edu',
        password: 'mock-password',
      })
      navigation.navigate('CollegeVerification')
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in with Google')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <AppCard>
        <Text style={styles.title}>Sign in with Google</Text>
        <Text style={styles.subtitle}>
          We'll use your college email to verify your student status
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

import React, { useState } from 'react'
import { View, Text, Alert, ScrollView, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { AppButton, AppCard } from '../components'
import { useAuthContext } from '../context'
import type { AuthStackScreenProps } from '../navigation/types'

type Props = AuthStackScreenProps<'CollegeVerification'>

export default function CollegeVerificationScreen({ navigation }: Props) {
  const { user } = useAuthContext()
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
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
          title={idPhotoUri ? 'Change ID Card Photo' : 'Upload College ID Card'}
          variant='outline'
          onPress={handlePickIdPhoto}
          style={styles.uploadButton}
          size='lg'
        />
        {idPhotoUri && (
          <Text style={styles.successText}>✓ College ID card uploaded</Text>
        )}

        <Text style={styles.disclaimer}>
          We'll review your college ID card to verify your student status. This
          usually takes 1-2 business days.
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
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
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#404040',
    marginBottom: 8,
  },
  emailContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#171717',
    marginTop: 4,
  },
  uploadButton: {
    marginBottom: 20,
  },
  successText: {
    fontSize: 14,
    color: '#16a34a',
    marginBottom: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: '#737373',
    marginBottom: 24,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 12,
  },
})

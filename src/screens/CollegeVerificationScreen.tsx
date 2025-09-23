import React, { useState } from 'react'
import { View, Text, Alert, ScrollView, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { AppButton, AppCard, AppTextInput } from '../components'
import type { AuthStackScreenProps } from '../navigation/types'

type Props = AuthStackScreenProps<'CollegeVerification'>

export default function CollegeVerificationScreen({ navigation }: Props) {
  const [collegeEmail, setCollegeEmail] = useState('')
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
    if (!collegeEmail.includes('.edu')) {
      Alert.alert('Invalid Email', 'Please enter a valid college email (.edu)')
      return
    }

    setLoading(true)
    // Mock verification process
    setTimeout(() => {
      setLoading(false)
      navigation.navigate('ProfileSetup')
    }, 2000)
  }

  const canVerify = collegeEmail.includes('.edu') && idPhotoUri

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <AppCard>
        <Text style={styles.title}>Verify Your College</Text>
        <Text style={styles.subtitle}>Help us verify your student status</Text>

        {/* College Email */}
        <Text style={styles.label}>College Email Address</Text>
        <AppTextInput
          placeholder='your.name@college.edu'
          value={collegeEmail}
          onChangeText={setCollegeEmail}
          keyboardType='email-address'
          autoCapitalize='none'
          style={styles.input}
        />

        {/* Student ID Photo */}
        <Text style={styles.label}>Student ID Photo</Text>
        <AppButton
          title={idPhotoUri ? 'Change ID Photo' : 'Upload Student ID'}
          variant='outline'
          onPress={handlePickIdPhoto}
          style={styles.uploadButton}
          size='lg'
        />
        {idPhotoUri && (
          <Text style={styles.successText}>✓ Student ID uploaded</Text>
        )}

        <Text style={styles.disclaimer}>
          We'll review your information to verify your student status
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
  input: {
    marginBottom: 20,
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

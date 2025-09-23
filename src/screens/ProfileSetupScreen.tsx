import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Alert,
  Pressable,
  StyleSheet,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { AppButton, AppCard, AppTextInput, Avatar } from '../components'
import { useAuthContext } from '../context'
import type { AuthStackScreenProps } from '../navigation/types'

type Props = AuthStackScreenProps<'ProfileSetup'>

const INTERESTS = [
  'Music',
  'Sports',
  'Art',
  'Movies',
  'Books',
  'Travel',
  'Food',
  'Gaming',
  'Photography',
  'Fitness',
  'Technology',
  'Nature',
]

export default function ProfileSetupScreen({ navigation }: Props) {
  const { completeOnboarding } = useAuthContext()
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [profilePhotoUri, setProfilePhotoUri] = useState<string | null>(null)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const handlePickPhoto = async () => {
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
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled) {
      setProfilePhotoUri(result.assets[0].uri)
    }
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleComplete = () => {
    if (name.trim()) {
      completeOnboarding({
        name: name.trim(),
        bio: bio.trim(),
        profilePhoto: profilePhotoUri,
        interests: selectedInterests,
      })
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <AppCard>
        <Text style={styles.title}>Set Up Your Profile</Text>
        <Text style={styles.subtitle}>Help others get to know you</Text>

        {/* Profile Photo */}
        <View style={styles.photoContainer}>
          <Pressable onPress={handlePickPhoto} style={styles.avatarPressable}>
            <Avatar
              source={profilePhotoUri ? { uri: profilePhotoUri } : undefined}
              size={100}
            />
          </Pressable>
          <AppButton
            title='Add Photo'
            variant='outline'
            size='sm'
            onPress={handlePickPhoto}
          />
        </View>

        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <AppTextInput
          placeholder='Your name'
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        {/* Bio */}
        <Text style={styles.label}>Bio</Text>
        <AppTextInput
          placeholder='Tell us about yourself...'
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
          style={styles.bioInput}
        />

        {/* Interests */}
        <Text style={styles.label}>Interests (select up to 5)</Text>
        <View style={styles.interestsContainer}>
          {INTERESTS.map(interest => {
            const isSelected = selectedInterests.includes(interest)
            const isDisabled = !isSelected && selectedInterests.length >= 5

            return (
              <Pressable
                key={interest}
                onPress={() => toggleInterest(interest)}
                disabled={isDisabled}
                style={[
                  styles.interestTag,
                  isSelected
                    ? styles.interestTagSelected
                    : styles.interestTagUnselected,
                  isDisabled && styles.interestTagDisabled,
                ]}
              >
                <Text
                  style={[
                    styles.interestText,
                    isSelected
                      ? styles.interestTextSelected
                      : styles.interestTextUnselected,
                  ]}
                >
                  {interest}
                </Text>
              </Pressable>
            )
          })}
        </View>

        <AppButton
          title='Complete Setup'
          onPress={handleComplete}
          disabled={!name.trim()}
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
  photoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarPressable: {
    marginBottom: 8,
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
  bioInput: {
    marginBottom: 20,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  interestTag: {
    marginRight: 8,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  interestTagSelected: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  interestTagUnselected: {
    backgroundColor: 'transparent',
    borderColor: '#d4d4d4',
  },
  interestTagDisabled: {
    opacity: 0.5,
  },
  interestText: {
    fontSize: 14,
  },
  interestTextSelected: {
    color: '#ffffff',
  },
  interestTextUnselected: {
    color: '#404040',
  },
})

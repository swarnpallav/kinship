import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Alert,
  Pressable,
  StyleSheet,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker'
import { AppButton, AppCard, AppTextInput, Avatar } from '../components'
import { useAuthContext } from '../context'
import { useTheme } from '../theme'
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
  const { theme } = useTheme()
  const styles = createStyles(theme)
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
      })
    }
  }

  return (
    <LinearGradient
      colors={theme.gradients.velvetAffection as any}
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
          <Text style={[styles.decorativeEmoji, styles.emoji1]}>💖</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji2]}>💕</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji3]}>✨</Text>
        </View>

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
      fontSize: 35,
      opacity: 0.15,
    },
    emoji1: {
      top: '10%',
      left: '10%',
      transform: [{ rotate: '-10deg' }],
    },
    emoji2: {
      top: '20%',
      right: '12%',
      fontSize: 40,
    },
    emoji3: {
      top: '80%',
      right: '8%',
      fontSize: 30,
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
    photoContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    avatarPressable: {
      marginBottom: theme.spacing.xs,
    },
    label: {
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    input: {
      marginBottom: theme.spacing.lg,
    },
    bioInput: {
      marginBottom: theme.spacing.lg,
      minHeight: 80,
      textAlignVertical: 'top',
    },
    interestsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: theme.spacing.lg,
    },
    interestTag: {
      marginRight: theme.spacing.xs,
      marginBottom: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.full,
      borderWidth: 1,
    },
    interestTagSelected: {
      backgroundColor: theme.colors.primary[500],
      borderColor: theme.colors.primary[500],
    },
    interestTagUnselected: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.neutral[300],
    },
    interestTagDisabled: {
      opacity: 0.5,
    },
    interestText: {
      fontSize: theme.typography.fontSizes.sm,
    },
    interestTextSelected: {
      color: theme.colors.text.inverse,
      fontWeight: theme.typography.fontWeights.medium,
    },
    interestTextUnselected: {
      color: theme.colors.text.primary,
    },
  })

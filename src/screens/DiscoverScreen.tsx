import React, { useState } from 'react'
import { View, Text, Pressable, Dimensions, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AppCard, Avatar } from '../components'
import { useTheme } from '../theme'

const { width: screenWidth } = Dimensions.get('window')
const CARD_WIDTH = screenWidth - 48

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 20,
    bio: 'Psychology major, loves hiking and coffee ☕',
    interests: ['Music', 'Books', 'Nature'],
    photo: null,
  },
  {
    id: '2',
    name: 'Mike Chen',
    age: 22,
    bio: 'Computer Science student, gamer and foodie 🎮',
    interests: ['Gaming', 'Technology', 'Food'],
    photo: null,
  },
  {
    id: '3',
    name: 'Emma Davis',
    age: 19,
    bio: 'Art student who loves painting and traveling ✈️',
    interests: ['Art', 'Travel', 'Photography'],
    photo: null,
  },
]

export default function DiscoverScreen() {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentUser = MOCK_USERS[currentIndex]

  const nextCard = () => {
    setCurrentIndex(prev => (prev + 1) % MOCK_USERS.length)
  }

  const handleLike = () => {
    nextCard()
  }

  const handlePass = () => {
    nextCard()
  }

  if (!currentUser) {
    return (
      <LinearGradient
        colors={theme.gradients.lovesIntensity as any}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.emptyContainer}>
            <AppCard>
              <Text style={styles.emptyTitle}>No more profiles</Text>
              <Text style={styles.emptySubtitle}>
                Check back later for new connections!
              </Text>
            </AppCard>
          </View>
        </View>
      </LinearGradient>
    )
  }

  return (
    <LinearGradient
      colors={theme.gradients.romanticSunset as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        {/* Decorative background elements */}
        <View style={styles.decorativeContainer}>
          <Text style={[styles.decorativeEmoji, styles.emoji1]}>💖</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji2]}>💕</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji3]}>❤️</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji4]}>💗</Text>
        </View>

        {/* Profile Card */}
        <View style={[styles.cardContainer, { width: CARD_WIDTH }]}>
          <AppCard style={styles.profileCard}>
            {/* Profile Photo Area */}
            <View style={styles.photoArea}>
              <Avatar size={120} />
            </View>

            {/* Profile Info */}
            <View style={styles.infoArea}>
              <Text style={styles.nameAge}>
                {currentUser.name}, {currentUser.age}
              </Text>
              <Text style={styles.bio}>{currentUser.bio}</Text>

              {/* Interests */}
              <View style={styles.interestsContainer}>
                {currentUser.interests.map(interest => (
                  <View key={interest} style={styles.interestTag}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>
          </AppCard>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable
            onPress={handlePass}
            style={styles.passButton}
            accessible={true}
            accessibilityRole='button'
            accessibilityLabel='Pass on this profile'
          >
            <Text style={styles.actionIcon}>✕</Text>
          </Pressable>

          <Pressable
            onPress={handleLike}
            style={styles.likeButton}
            accessible={true}
            accessibilityRole='button'
            accessibilityLabel='Like this profile'
          >
            <Text style={styles.actionIcon}>♥</Text>
          </Pressable>
        </View>

        {/* Instructions */}
        <Text style={styles.instructions}>Tap the buttons to like or pass</Text>
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
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
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
      opacity: 0.12,
    },
    emoji1: {
      top: '15%',
      left: '8%',
      transform: [{ rotate: '-15deg' }],
      fontSize: 40,
    },
    emoji2: {
      top: '25%',
      right: '10%',
      fontSize: 30,
    },
    emoji3: {
      top: '75%',
      left: '12%',
      fontSize: 35,
      transform: [{ rotate: '10deg' }],
    },
    emoji4: {
      top: '80%',
      right: '8%',
      fontSize: 28,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyTitle: {
      fontSize: theme.typography.fontSizes.xl,
      fontWeight: theme.typography.fontWeights.semibold,
      textAlign: 'center',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    emptySubtitle: {
      textAlign: 'center',
      color: theme.colors.text.secondary,
      fontSize: theme.typography.fontSizes.base,
    },
    cardContainer: {
      height: 500,
      marginBottom: theme.spacing.xl,
      zIndex: 1,
    },
    profileCard: {
      height: '100%',
      padding: 0,
      overflow: 'hidden',
    },
    photoArea: {
      height: '60%',
      backgroundColor: theme.colors.neutral[200],
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoArea: {
      height: '40%',
      padding: theme.spacing.lg,
    },
    nameAge: {
      fontSize: theme.typography.fontSizes['2xl'],
      fontWeight: theme.typography.fontWeights.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    bio: {
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.md,
      fontSize: theme.typography.fontSizes.base,
      lineHeight: 22,
    },
    interestsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    interestTag: {
      backgroundColor: theme.colors.primary[50],
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.xl,
      marginRight: theme.spacing.xs,
      marginBottom: theme.spacing.xs,
      borderWidth: 1,
      borderColor: theme.colors.primary[200],
    },
    interestText: {
      fontSize: theme.typography.fontSizes.sm,
      color: theme.colors.secondary[600],
      fontWeight: theme.typography.fontWeights.medium,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
      zIndex: 1,
    },
    passButton: {
      width: 64,
      height: 64,
      backgroundColor: theme.colors.neutral[200],
      borderRadius: theme.borderRadius.full,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.xl,
      ...theme.shadows.md,
    },
    likeButton: {
      width: 64,
      height: 64,
      backgroundColor: theme.colors.primary[500],
      borderRadius: theme.borderRadius.full,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.md,
    },
    actionIcon: {
      fontSize: theme.typography.fontSizes['2xl'],
      color: theme.colors.text.inverse,
    },
    instructions: {
      textAlign: 'center',
      color: theme.colors.text.primary,
      fontSize: theme.typography.fontSizes.base,
      fontWeight: theme.typography.fontWeights.semibold,
      marginBottom: 100, // Account for floating tab bar
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
      zIndex: 1,
    },
  })

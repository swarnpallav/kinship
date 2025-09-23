import React, { useState } from 'react'
import { View, Text, Pressable, Dimensions, StyleSheet } from 'react-native'
import { AppCard, Avatar } from '../components'

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
    )
  }

  return (
    <View style={styles.container}>
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
        <Pressable onPress={handlePass} style={styles.passButton}>
          <Text style={styles.actionIcon}>✕</Text>
        </Pressable>

        <Pressable onPress={handleLike} style={styles.likeButton}>
          <Text style={styles.actionIcon}>♥</Text>
        </Pressable>
      </View>

      {/* Instructions */}
      <Text style={styles.instructions}>Tap the buttons to like or pass</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#171717',
    marginBottom: 8,
  },
  emptySubtitle: {
    textAlign: 'center',
    color: '#525252',
    fontSize: 16,
  },
  cardContainer: {
    height: 500,
    marginBottom: 32,
  },
  profileCard: {
    height: '100%',
    padding: 0,
    overflow: 'hidden',
  },
  photoArea: {
    height: '60%',
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoArea: {
    height: '40%',
    padding: 24,
  },
  nameAge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#171717',
    marginBottom: 8,
  },
  bio: {
    color: '#525252',
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 22,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#fef2f2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    fontSize: 14,
    color: '#b91c1c',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  passButton: {
    width: 64,
    height: 64,
    backgroundColor: '#e5e5e5',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 32,
  },
  likeButton: {
    width: 64,
    height: 64,
    backgroundColor: '#ef4444',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 24,
    color: '#ffffff',
  },
  instructions: {
    textAlign: 'center',
    color: '#737373',
    fontSize: 14,
  },
})

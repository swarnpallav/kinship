import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { AppCard, AppButton, Avatar } from '../components'
import { useAuthContext } from '../context'

export default function ProfileScreen() {
  const { user, logoutMutation } = useAuthContext()

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Your Profile</Text>

        {/* Profile Info Card */}
        <AppCard style={styles.card}>
          <View style={styles.profileHeader}>
            <Avatar size={80} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {user?.name || 'Your Name'}
              </Text>
              <Text style={styles.profileEmail}>
                {user?.email || 'your.email@college.edu'}
              </Text>
            </View>
          </View>

          <Text style={styles.profileBio}>
            Computer Science student passionate about technology and innovation.
            Love hiking, coffee, and building cool apps! 🚀
          </Text>

          {/* Interests */}
          <Text style={styles.sectionLabel}>Interests</Text>
          <View style={styles.interestsContainer}>
            {['Technology', 'Hiking', 'Coffee', 'Music', 'Travel'].map(
              interest => (
                <View key={interest} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              )
            )}
          </View>
        </AppCard>

        {/* Profile Actions */}
        <AppCard style={styles.card}>
          <Text style={styles.sectionTitle}>Profile Actions</Text>

          <AppButton
            title='Edit Profile'
            variant='primary'
            onPress={() => console.log('Edit profile')}
            style={styles.actionButton}
            size='lg'
          />

          <AppButton
            title='Change Photos'
            variant='outline'
            onPress={() => console.log('Change photos')}
            style={styles.actionButton}
            size='lg'
          />

          <AppButton
            title='Privacy Settings'
            variant='outline'
            onPress={() => console.log('Privacy settings')}
            style={styles.actionButton}
            size='lg'
          />
        </AppCard>

        {/* Account */}
        <AppCard style={styles.card}>
          <Text style={styles.sectionTitle}>Account</Text>
          <AppButton
            title='Sign Out'
            variant='outline'
            onPress={() => logoutMutation.mutate()}
            style={styles.signOutButton}
            size='lg'
          />
        </AppCard>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#171717',
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#171717',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#525252',
  },
  profileBio: {
    fontSize: 16,
    color: '#404040',
    lineHeight: 22,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#404040',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 16,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#fef2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    fontSize: 14,
    color: '#b91c1c',
  },
  actionButton: {
    marginBottom: 12,
  },
  signOutButton: {
    borderColor: '#ef4444',
  },
})

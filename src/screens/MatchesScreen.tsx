import React from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { AppCard, Avatar } from '../components'
import { useMatches } from '../hooks'
import type { MatchesStackScreenProps } from '../navigation/types'

type Props = MatchesStackScreenProps<'MatchesList'>

export default function MatchesScreen({ navigation }: Props) {
  const { matches, isLoading } = useMatches()

  const handleMatchPress = (matchId: string, matchName: string) => {
    navigation.navigate('Chat', {
      matchId,
      matchName,
      matchAvatar: undefined, // Could add avatar URL here
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Your Matches</Text>

        {matches.map(match => (
          <Pressable
            key={match.id}
            onPress={() =>
              handleMatchPress(match.id, match.otherUser?.name || 'Unknown')
            }
            style={styles.matchPressable}
          >
            <AppCard>
              <View style={styles.matchContainer}>
                <Avatar size={60} />

                <View style={styles.matchInfo}>
                  <View style={styles.matchHeader}>
                    <Text style={styles.matchName}>
                      {match.otherUser?.name || 'Unknown User'}
                    </Text>
                    <Text style={styles.matchDate}>
                      {match.lastMessage
                        ? new Date(
                            match.lastMessage.createdAt
                          ).toLocaleDateString()
                        : ''}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.lastMessage,
                      match.unreadCount > 0 && styles.unreadMessage,
                    ]}
                    numberOfLines={1}
                  >
                    {match.lastMessage?.content || 'No messages yet'}
                  </Text>
                </View>

                {match.unreadCount > 0 && (
                  <View style={styles.unreadIndicator} />
                )}
              </View>
            </AppCard>
          </Pressable>
        ))}

        {matches.length === 0 && (
          <View style={styles.emptyContainer}>
            <AppCard>
              <Text style={styles.emptyTitle}>No matches yet</Text>
              <Text style={styles.emptySubtitle}>
                Start swiping to find your connections!
              </Text>
            </AppCard>
          </View>
        )}
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
  matchPressable: {
    marginBottom: 12,
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchInfo: {
    flex: 1,
    marginLeft: 16,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  matchName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
  },
  matchDate: {
    fontSize: 14,
    color: '#737373',
  },
  lastMessage: {
    fontSize: 14,
    color: '#525252',
  },
  unreadMessage: {
    color: '#171717',
    fontWeight: '500',
  },
  unreadIndicator: {
    width: 12,
    height: 12,
    backgroundColor: '#ef4444',
    borderRadius: 6,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
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
})

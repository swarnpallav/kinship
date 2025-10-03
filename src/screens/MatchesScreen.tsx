import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AppCard, Avatar } from '../components'
import { useMatches } from '../hooks'
import { useTheme } from '../theme'
import type { MatchesStackScreenProps } from '../navigation/types'

type Props = MatchesStackScreenProps<'MatchesList'>

export default function MatchesScreen({ navigation }: Props) {
  const { matches, isLoading } = useMatches()
  const { theme, isDark } = useTheme()
  const styles = createStyles(theme)

  // Scroll animation for header shadow
  const [scrollY] = useState(new Animated.Value(0))
  const headerShadowOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const handleMatchPress = (matchId: string, matchName: string) => {
    navigation.navigate('Chat', {
      matchId,
      matchName,
      matchAvatar: undefined,
    })
  }

  // Update navigation header with animated shadow
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDark
          ? 'rgba(26, 23, 33, 0.95)'
          : 'rgba(255, 255, 255, 0.95)',
        ...(Platform.OS === 'ios' && {
          shadowColor: theme.colors.text.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
        }),
      },
      headerShadowVisible: Platform.OS === 'android',
    })
  }, [navigation, isDark, theme])

  return (
    <LinearGradient
      colors={theme.gradients.pureLove as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        {/* Decorative background elements */}
        <View style={styles.decorativeContainer}>
          <Text style={[styles.decorativeEmoji, styles.emoji1]}>💕</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji2]}>💖</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji3]}>💗</Text>
          <Text style={[styles.decorativeEmoji, styles.emoji4]}>❤️</Text>
        </View>

        {/* Animated shadow below header */}
        <Animated.View
          style={[
            styles.headerShadow,
            {
              opacity: headerShadowOpacity,
              shadowColor: theme.colors.text.primary,
            },
          ]}
        />

        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior='automatic'
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

                    {match.unreadCount > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadCount}>
                          {match.unreadCount}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </AppCard>
            </Pressable>
          ))}

          {matches.length === 0 && !isLoading && (
            <AppCard>
              <Text style={styles.emptyTitle}>No matches yet</Text>
              <Text style={styles.emptySubtitle}>
                Keep swiping to find your perfect match!
              </Text>
            </AppCard>
          )}
        </Animated.ScrollView>
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
      opacity: 0.08,
    },
    emoji1: {
      top: '15%',
      left: '8%',
      fontSize: 42,
      transform: [{ rotate: '-15deg' }],
    },
    emoji2: {
      top: '35%',
      right: '10%',
      fontSize: 38,
    },
    emoji3: {
      top: '60%',
      left: '12%',
      fontSize: 40,
    },
    emoji4: {
      top: '80%',
      right: '15%',
      fontSize: 36,
      transform: [{ rotate: '20deg' }],
    },
    headerShadow: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 8,
      zIndex: 10,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    scrollView: {
      flex: 1,
      zIndex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      padding: theme.spacing.md,
      paddingTop: theme.spacing.xl, // Account for semi-transparent header
      paddingBottom: 100, // Account for tab bar
    },
    title: {
      fontSize: theme.typography.fontSizes['2xl'],
      fontWeight: theme.typography.fontWeights.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.lg,
      marginTop: 0, // Removed extra margin since we have paddingTop on container
    },
    matchPressable: {
      marginBottom: theme.spacing.md,
    },
    matchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    matchInfo: {
      flex: 1,
      marginLeft: theme.spacing.md,
    },
    matchHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    matchName: {
      fontSize: theme.typography.fontSizes.lg,
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.text.primary,
    },
    matchDate: {
      fontSize: theme.typography.fontSizes.sm,
      color: theme.colors.text.tertiary,
    },
    lastMessage: {
      fontSize: theme.typography.fontSizes.base,
      color: theme.colors.text.secondary,
    },
    unreadMessage: {
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.text.primary,
    },
    unreadBadge: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.primary[500],
      borderRadius: theme.borderRadius.full,
      minWidth: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.xs,
    },
    unreadCount: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSizes.xs,
      fontWeight: theme.typography.fontWeights.bold,
    },
    emptyTitle: {
      fontSize: theme.typography.fontSizes.xl,
      fontWeight: theme.typography.fontWeights.bold,
      color: theme.colors.text.primary,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    },
    emptySubtitle: {
      fontSize: theme.typography.fontSizes.base,
      color: theme.colors.text.secondary,
      textAlign: 'center',
    },
  })

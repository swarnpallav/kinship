import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AppButton, AppCard } from '../components'
import { useTheme } from '../theme'

export default function HomeScreen({ navigation }: any) {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  return (
    <LinearGradient
      colors={theme.gradients.passionateRose as any}
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

        <AppCard style={styles.card}>
          <Text style={styles.title}>Kinship</Text>
          <Text style={styles.subtitle}>Welcome to your home screen</Text>
          <AppButton
            title='Explore Features'
            onPress={() => console.log('Explore features')}
            size='lg'
          />
        </AppCard>
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
      fontSize: 40,
      opacity: 0.12,
    },
    emoji1: {
      top: '15%',
      left: '12%',
      transform: [{ rotate: '-15deg' }],
      fontSize: 45,
    },
    emoji2: {
      top: '25%',
      right: '10%',
      fontSize: 42,
    },
    emoji3: {
      top: '70%',
      left: '10%',
      fontSize: 35,
      transform: [{ rotate: '10deg' }],
    },
    emoji4: {
      top: '80%',
      right: '15%',
      fontSize: 38,
    },
    card: {
      width: '100%',
      alignItems: 'center',
      zIndex: 1,
    },
    title: {
      fontSize: theme.typography.fontSizes['3xl'],
      fontWeight: theme.typography.fontWeights.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      fontSize: theme.typography.fontSizes.lg,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.lg,
      textAlign: 'center',
    },
  })

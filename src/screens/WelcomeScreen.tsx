import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AppButton, AppCard } from '../components'
import { useTheme } from '../theme'
import type { AuthStackScreenProps } from '../navigation/types'

type Props = AuthStackScreenProps<'Welcome'>

export default function WelcomeScreen({ navigation }: Props) {
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
        {/* Decorative hearts in background */}
        <View style={styles.decorativeContainer}>
          <Text style={[styles.decorativeHeart, styles.heart1]}>❤️</Text>
          <Text style={[styles.decorativeHeart, styles.heart2]}>💕</Text>
          <Text style={[styles.decorativeHeart, styles.heart3]}>💖</Text>
          <Text style={[styles.decorativeHeart, styles.heart4]}>💗</Text>
          <Text style={[styles.decorativeHeart, styles.heart5]}>💓</Text>
        </View>

        {/* App Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>K</Text>
          </View>
          <Text style={styles.title}>Kinship</Text>
          <Text style={styles.subtitle}>
            Find meaningful connections in your college community
          </Text>
        </View>

        {/* Sign In Card */}
        <AppCard style={styles.card}>
          <Text style={styles.cardTitle}>Ready to connect?</Text>
          <AppButton
            title='Continue with Google'
            onPress={() => navigation.navigate('GoogleSignIn')}
            size='lg'
          />
          <Text style={styles.disclaimer}>
            Use your college email or personal account with college ID
            verification
          </Text>
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
    decorativeHeart: {
      position: 'absolute',
      fontSize: 40,
      opacity: 0.15,
    },
    heart1: {
      top: '15%',
      left: '10%',
      transform: [{ rotate: '-15deg' }],
    },
    heart2: {
      top: '25%',
      right: '15%',
      transform: [{ rotate: '20deg' }],
      fontSize: 50,
    },
    heart3: {
      top: '60%',
      left: '8%',
      transform: [{ rotate: '10deg' }],
      fontSize: 35,
    },
    heart4: {
      top: '70%',
      right: '10%',
      transform: [{ rotate: '-10deg' }],
      fontSize: 45,
    },
    heart5: {
      top: '40%',
      right: '5%',
      transform: [{ rotate: '15deg' }],
      fontSize: 30,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing['2xl'],
      zIndex: 1,
    },
    logoCircle: {
      width: 96,
      height: 96,
      backgroundColor: theme.colors.primary[500],
      borderRadius: theme.borderRadius.full,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.lg,
      ...theme.shadows.xl,
    },
    logoText: {
      fontSize: theme.typography.fontSizes['4xl'],
      fontWeight: theme.typography.fontWeights.bold,
      color: theme.colors.text.inverse,
    },
    title: {
      fontSize: theme.typography.fontSizes['4xl'],
      fontWeight: theme.typography.fontWeights.bold,
      textAlign: 'center',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      fontSize: theme.typography.fontSizes.lg,
      textAlign: 'center',
      color: theme.colors.text.secondary,
    },
    card: {
      marginTop: theme.spacing.lg,
      zIndex: 1,
    },
    cardTitle: {
      fontSize: theme.typography.fontSizes.xl,
      fontWeight: theme.typography.fontWeights.semibold,
      textAlign: 'center',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.lg,
    },
    disclaimer: {
      fontSize: theme.typography.fontSizes.sm,
      textAlign: 'center',
      color: theme.colors.text.tertiary,
      marginTop: theme.spacing.md,
    },
  })

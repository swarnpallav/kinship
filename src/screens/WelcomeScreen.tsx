import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AppButton, AppCard } from '../components'
import type { AuthStackScreenProps } from '../navigation/types'

type Props = AuthStackScreenProps<'Welcome'>

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
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
          We'll verify your student status with your college email
        </Text>
      </AppCard>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 96,
    height: 96,
    backgroundColor: '#ef4444',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#171717',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#525252',
  },
  card: {
    marginTop: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#171717',
    marginBottom: 24,
  },
  disclaimer: {
    fontSize: 14,
    textAlign: 'center',
    color: '#737373',
    marginTop: 16,
  },
})

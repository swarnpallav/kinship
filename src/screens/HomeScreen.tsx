import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AppButton, AppCard } from '../components'

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
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
  card: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#171717',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#525252',
    marginBottom: 24,
    textAlign: 'center',
  },
})

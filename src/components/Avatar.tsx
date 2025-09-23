import React from 'react'
import { View, Image, StyleSheet, ViewStyle } from 'react-native'

interface AvatarProps {
  source?: { uri: string }
  size?: number
  style?: ViewStyle
}

export default function Avatar({ source, size = 50, style }: AvatarProps) {
  const avatarStyle = [
    styles.avatar,
    { width: size, height: size, borderRadius: size / 2 },
    style,
  ]

  return (
    <View style={avatarStyle}>
      {source ? (
        <Image source={source} style={styles.image} />
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    overflow: 'hidden',
    backgroundColor: '#e5e5e5',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d4d4d4',
  },
})

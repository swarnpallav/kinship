import React from 'react'
import { View, Image, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../theme'

interface AvatarProps {
  source?: { uri: string }
  size?: number
  style?: ViewStyle
}

export default function Avatar({ source, size = 50, style }: AvatarProps) {
  const { theme } = useTheme()
  const styles = createStyles(theme)

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

const createStyles = (theme: any) =>
  StyleSheet.create({
    avatar: {
      overflow: 'hidden',
      backgroundColor: theme.colors.neutral[200],
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    placeholder: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.neutral[300],
    },
  })

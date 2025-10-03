import React from 'react'
import { Pressable, Text, PressableProps, StyleSheet } from 'react-native'
import { useTheme } from '../theme'

type Props = PressableProps & { title: string }

export default function Button({ title, style, ...rest }: Props) {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
      backgroundColor: theme.colors.primary[500],
    },
    text: {
      color: theme.colors.text.inverse,
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
    },
  })

  return (
    <Pressable style={[styles.button, style] as any} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

import React from 'react'
import { Pressable, Text, PressableProps, StyleSheet } from 'react-native'

type Props = PressableProps & { title: string }

export default function Button({ title, style, ...rest }: Props) {
  return (
    <Pressable style={[styles.button, style] as any} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#2563eb',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
})

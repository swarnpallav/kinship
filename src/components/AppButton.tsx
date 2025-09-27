import React from 'react'
import {
  Pressable,
  Text,
  PressableProps,
  StyleSheet,
  Platform,
} from 'react-native'
import { getAccessibleProps } from '../utils'

type Variant = 'primary' | 'secondary' | 'outline'
type Size = 'sm' | 'md' | 'lg'

type Props = PressableProps & {
  title: string
  variant?: Variant
  size?: Size
}

export default function AppButton({
  title,
  variant = 'primary',
  size = 'md',
  style,
  ...rest
}: Props) {
  const buttonStyle = [styles.base, styles[variant], styles[size], style]

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
  ]

  // Debug logging for web
  if (Platform.OS === 'web' && __DEV__) {
    console.log('AppButton render:', { title, variant, size, style })
  }

  return (
    <Pressable
      style={[buttonStyle, Platform.OS === 'web' && styles.webButton] as any}
      {...getAccessibleProps('button', title)}
      {...rest}
    >
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    minHeight: 44, // Minimum touch target size for accessibility
    minWidth: 44,
  },
  webButton: Platform.select({
    web: {
      cursor: 'pointer',
      userSelect: 'none',
      outline: 'none',
      display: 'flex', // Ensure button is visible on web
      visibility: 'visible',
      opacity: 1,
    },
    default: {},
  }),
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  primary: {
    backgroundColor: '#ef4444',
  },
  secondary: {
    backgroundColor: '#0ea5e9',
  },
  outline: {
    borderWidth: 1,
    borderColor: '#ef4444',
    backgroundColor: 'transparent',
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  lg: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#ffffff',
  },
  outlineText: {
    color: '#ef4444',
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
})

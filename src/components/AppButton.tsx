import React from 'react'
import {
  Pressable,
  Text,
  PressableProps,
  StyleSheet,
  Platform,
} from 'react-native'
import { getAccessibleProps } from '../utils'
import { useTheme } from '../theme'

type Variant = 'primary' | 'secondary' | 'outline' | 'danger'
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
  const { theme, isDark } = useTheme()

  const styles = createStyles(theme, isDark)
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

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    base: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.md,
      minHeight: 44, // Minimum touch target size for accessibility
      minWidth: 44,
    },
    webButton: Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
        outline: 'none',
        display: 'flex',
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
      // Use softer, desaturated color in dark mode
      backgroundColor: isDark ? '#D14A82' : theme.colors.primary[500],
    },
    secondary: {
      backgroundColor: isDark ? '#D1456A' : theme.colors.secondary[500],
    },
    outline: {
      borderWidth: 2,
      borderColor: isDark ? '#D14A82' : theme.colors.primary[500],
      backgroundColor: 'transparent',
    },
    danger: {
      borderWidth: 2,
      borderColor: isDark ? '#C76B6B' : theme.colors.error[500],
      backgroundColor: 'transparent',
    },
    sm: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
    },
    md: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    lg: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
    text: {
      fontWeight: theme.typography.fontWeights.semibold,
    },
    primaryText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSizes.base,
    },
    secondaryText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSizes.base,
    },
    outlineText: {
      color: isDark ? '#E896BA' : theme.colors.primary[600],
      fontSize: theme.typography.fontSizes.base,
    },
    dangerText: {
      color: isDark ? '#E8A0A0' : theme.colors.error[600],
      fontSize: theme.typography.fontSizes.base,
    },
    smText: {
      fontSize: theme.typography.fontSizes.sm,
    },
    mdText: {
      fontSize: theme.typography.fontSizes.base,
    },
    lgText: {
      fontSize: theme.typography.fontSizes.lg,
    },
  })

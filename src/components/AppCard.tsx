import React from 'react'
import { View, ViewProps, StyleSheet } from 'react-native'
import { useTheme } from '../theme'

type Props = ViewProps & {
  children: React.ReactNode
}

export default function AppCard({ children, style, ...rest }: Props) {
  const { theme, isDark } = useTheme()
  const styles = createStyles(theme, isDark)

  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  )
}

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    card: {
      // Use tertiary background for cards to stand out from screen background
      backgroundColor: isDark
        ? theme.colors.background.tertiary
        : theme.colors.background.primary,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      ...theme.shadows.md,
      borderWidth: 1,
      borderColor: isDark
        ? theme.colors.border.medium
        : theme.colors.border.light,
    },
  })

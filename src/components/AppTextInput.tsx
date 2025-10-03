import React from 'react'
import { TextInput, TextInputProps, StyleSheet } from 'react-native'
import { getAccessibleProps } from '../utils'
import { useTheme } from '../theme'

type Props = TextInputProps

export default function AppTextInput({ style, placeholder, ...rest }: Props) {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={theme.colors.neutral[400]}
      placeholder={placeholder}
      accessible={true}
      accessibilityLabel={placeholder}
      {...rest}
    />
  )
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border.medium,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      fontSize: theme.typography.fontSizes.base,
      color: theme.colors.text.primary,
      backgroundColor: theme.colors.background.primary,
    },
  })

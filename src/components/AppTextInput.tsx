import React from 'react'
import { TextInput, TextInputProps, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../theme'

type Props = TextInputProps & {
  label?: string
}

export default function AppTextInput({
  style,
  placeholder,
  label,
  ...rest
}: Props) {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  const textInput = (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={theme.colors.neutral[400]}
      placeholder={placeholder}
      accessible={true}
      accessibilityLabel={label || placeholder}
      {...rest}
    />
  )

  // Only wrap in container if there's a label
  if (label) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        {textInput}
      </View>
    )
  }

  return textInput
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginBottom: theme.spacing.lg,
    },
    label: {
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
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

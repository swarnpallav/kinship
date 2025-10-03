import React, { ReactNode } from 'react'
import { View, ViewProps, StyleSheet } from 'react-native'
import { useTheme } from '../theme'

type Props = ViewProps & { children: ReactNode }

export default function Card({ children, style, ...rest }: Props) {
  const { theme } = useTheme()

  const dynamicStyles = StyleSheet.create({
    card: {
      borderRadius: 12,
      backgroundColor: theme.colors.background.primary,
      padding: 16,
      shadowColor: theme.colors.text.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      borderWidth: 1,
      borderColor: theme.colors.border.light,
    },
  })

  return (
    <View style={[dynamicStyles.card, style]} {...rest}>
      {children}
    </View>
  )
}

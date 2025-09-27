import React from 'react'
import { TextInput, TextInputProps, StyleSheet } from 'react-native'
import { getAccessibleProps } from '../utils'

type Props = TextInputProps

export default function AppTextInput({ style, placeholder, ...rest }: Props) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor='#a3a3a3'
      placeholder={placeholder}
      accessible={true}
      accessibilityLabel={placeholder}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#171717',
    backgroundColor: '#ffffff',
  },
})

import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import AppButton from '../AppButton'

describe('AppButton', () => {
  it('renders with correct title', () => {
    const { getByText } = render(
      <AppButton title='Test Button' onPress={() => {}} />
    )

    expect(getByText('Test Button')).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn()
    const { getByRole } = render(
      <AppButton title='Clickable Button' onPress={mockOnPress} />
    )

    fireEvent.press(getByRole('button'))
    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  it('renders with different variants', () => {
    const { getByText, rerender } = render(
      <AppButton title='Primary Button' variant='primary' onPress={() => {}} />
    )

    expect(getByText('Primary Button')).toBeTruthy()

    rerender(
      <AppButton
        title='Secondary Button'
        variant='secondary'
        onPress={() => {}}
      />
    )

    expect(getByText('Secondary Button')).toBeTruthy()

    rerender(
      <AppButton title='Outline Button' variant='outline' onPress={() => {}} />
    )

    expect(getByText('Outline Button')).toBeTruthy()
  })

  it('renders with different sizes', () => {
    const { getByText, rerender } = render(
      <AppButton title='Small Button' size='sm' onPress={() => {}} />
    )

    expect(getByText('Small Button')).toBeTruthy()

    rerender(<AppButton title='Medium Button' size='md' onPress={() => {}} />)

    expect(getByText('Medium Button')).toBeTruthy()

    rerender(<AppButton title='Large Button' size='lg' onPress={() => {}} />)

    expect(getByText('Large Button')).toBeTruthy()
  })

  it('disables button when disabled prop is true', () => {
    const mockOnPress = jest.fn()
    const { getByRole } = render(
      <AppButton title='Disabled Button' disabled onPress={mockOnPress} />
    )

    fireEvent.press(getByRole('button'))

    // onPress should not be called when button is disabled
    expect(mockOnPress).not.toHaveBeenCalled()
  })

  it('applies custom styles', () => {
    const customStyle = { marginTop: 20 }
    const { getByRole } = render(
      <AppButton title='Styled Button' onPress={() => {}} style={customStyle} />
    )

    const button = getByRole('button')
    expect(button.props.style).toContainEqual(customStyle)
  })

  it('passes through additional props', () => {
    const { getByRole } = render(
      <AppButton
        title='Test Button'
        onPress={() => {}}
        testID='custom-button'
        accessibilityLabel='Custom Button'
      />
    )

    const button = getByRole('button')
    expect(button.props.testID).toBe('custom-button')
    expect(button.props.accessibilityLabel).toBe('Custom Button')
  })
})

/**
 * Accessibility utilities for React Native Web
 * Helps prevent common accessibility issues like aria-hidden focus conflicts
 */

import { Platform } from 'react-native'

/**
 * Common accessibility props for interactive elements
 */
export const getAccessibleProps = (
  role: 'button' | 'text' | 'link' | 'image',
  label?: string,
  hint?: string
) => {
  const baseProps = {
    accessible: true,
    accessibilityRole: role,
    ...(label && { accessibilityLabel: label }),
    ...(hint && { accessibilityHint: hint }),
  }

  // Web-specific fixes for aria-hidden conflicts
  if (Platform.OS === 'web') {
    return {
      ...baseProps,
      // Prevent focus conflicts by ensuring focusable elements are not hidden
      'aria-hidden': false,
      // Ensure proper focus management
      focusable: role === 'button' || role === 'link',
    }
  }

  return baseProps
}

/**
 * Props for container elements that should not interfere with focus
 */
export const getContainerAccessibilityProps = () => {
  if (Platform.OS === 'web') {
    return {
      // Prevent containers from being hidden from assistive technology
      'aria-hidden': false,
      // Allow focus to pass through containers
      focusable: false,
    }
  }
  return {}
}

/**
 * Props for decorative elements that should be hidden from screen readers
 */
export const getDecorativeProps = () => ({
  accessible: false,
  importantForAccessibility: 'no-hide-descendants' as const,
  ...(Platform.OS === 'web' && {
    'aria-hidden': true,
    focusable: false,
  }),
})

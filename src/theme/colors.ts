// Light Mode - Vibrant romantic color palette
export const lightColors = {
  // Primary - Vibrant Rose Pink (Bold and romantic)
  primary: {
    50: '#ffe6f0',
    100: '#ffcce0',
    200: '#ff99c2',
    300: '#ff66a3',
    400: '#ff3385',
    500: '#FF006E', // Main brand color - Vibrant Rose
    600: '#e6005f',
    700: '#cc0050',
    800: '#b30041',
    900: '#990032',
  },
  // Secondary - Deep Passionate Red (Rich and intense)
  secondary: {
    50: '#ffe8ec',
    100: '#ffd1d9',
    200: '#ffa3b3',
    300: '#ff758d',
    400: '#ff4767',
    500: '#E81948', // Deep vibrant red
    600: '#d11540',
    700: '#ba1138',
    800: '#a30e30',
    900: '#8c0a28',
  },
  // Accent - Rich Purple (Deep and mysterious)
  accent: {
    50: '#f5e6f3',
    100: '#ebcce7',
    200: '#d799cf',
    300: '#c366b7',
    400: '#af339f',
    500: '#9B1D87', // Rich romantic purple
    600: '#8c1a7a',
    700: '#7d176d',
    800: '#6e1460',
    900: '#5f1153',
  },
  // Neutral/Gray scale
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#2d2937',
    900: '#1a1721',
  },
  // Semantic colors
  background: {
    primary: '#ffffff',
    secondary: '#fff8fb',
    tertiary: '#ffe6f0',
    soft: '#fff0f6',
  },
  text: {
    primary: '#1a1721',
    secondary: '#2d2937',
    tertiary: '#525252',
    inverse: '#ffffff',
    pink: '#E81948',
  },
  border: {
    light: '#ffcce0',
    medium: '#ff99c2',
    dark: '#ff66a3',
  },
  // Button colors for light mode
  button: {
    primary: '#FF006E',
    primaryHover: '#e6005f',
    secondary: '#E81948',
    secondaryHover: '#d11540',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
  },
}

// Dark Mode - Enhanced romantic color palette (better balanced)
export const darkColors = {
  // Primary - Vibrant Rose (brighter for dark mode)
  primary: {
    50: '#4d001f',
    100: '#660029',
    200: '#800033',
    300: '#990032',
    400: '#cc0050',
    500: '#FF006E', // Bright on dark
    600: '#ff3385',
    700: '#ff66a3',
    800: '#ff99c2',
    900: '#ffcce0',
  },
  // Secondary - Deep Red (adjusted for dark mode)
  secondary: {
    50: '#3d0612',
    100: '#520818',
    200: '#8c0a28',
    300: '#a30e30',
    400: '#ba1138',
    500: '#E81948', // Bold on dark
    600: '#ff4767',
    700: '#ff758d',
    800: '#ffa3b3',
    900: '#ffd1d9',
  },
  // Accent - Rich Purple (more vibrant)
  accent: {
    50: '#2e0926',
    100: '#3d0c32',
    200: '#5f1153',
    300: '#6e1460',
    400: '#7d176d',
    500: '#9B1D87', // Vibrant on dark
    600: '#af339f',
    700: '#c366b7',
    800: '#d799cf',
    900: '#ebcce7',
  },
  // Neutral/Gray scale (better mid-tones)
  neutral: {
    50: '#1a1721',
    100: '#2d2937',
    200: '#3d3646',
    300: '#4d4556',
    400: '#6b6477',
    500: '#8a8694',
    600: '#a8a3b1',
    700: '#c6c3ce',
    800: '#e4e3eb',
    900: '#f5f5f7',
  },
  // Semantic colors (lighter, less faded)
  background: {
    primary: '#1a1721', // Lighter than before (was #0f0d13)
    secondary: '#252233', // More visible purple tint
    tertiary: '#2f2b3a', // Better contrast
    soft: '#28243a', // Richer purple
  },
  text: {
    primary: '#f5f5f7', // Almost white
    secondary: '#d1cdd8', // Lighter than before for better readability
    tertiary: '#a8a3b1', // Medium gray
    inverse: '#1a1721', // Dark (for light backgrounds)
    pink: '#ff3385', // Bright pink for emphasis
  },
  border: {
    light: '#3d3646', // More visible
    medium: '#4d4556', // Better contrast
    dark: '#6b6477', // Clearly visible
  },
  // Button colors for dark mode (desaturated for comfort)
  button: {
    primary: '#D14A82', // Softer, desaturated pink
    primaryHover: '#E896BA', // Lighter hover
    secondary: '#D1456A', // Softer red
    secondaryHover: '#E67A99', // Lighter hover
  },
  success: {
    50: '#0a2e1a',
    100: '#144d2a',
    500: '#4ade80',
    600: '#22c55e',
  },
  error: {
    50: '#2e0a0f',
    100: '#4d1419',
    500: '#f87171',
    600: '#ef4444',
  },
  warning: {
    50: '#2e2208',
    100: '#4d390d',
    500: '#fbbf24',
    600: '#f59e0b',
  },
}

// Type definitions for color palette
export type ColorPalette = typeof lightColors

// Export colors based on theme (will be used by ThemeContext)
export const colors = lightColors

import { lightColors, darkColors } from './colors'

// Typography system
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  fontWeights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
}

// Spacing system (8px base unit)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
}

// Border radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
}

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
  },
}

// Dark mode shadows (more prominent)
export const darkShadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
  },
}

// Gradient type definition
type GradientColors = readonly [string, string, string]

type Gradients = {
  passionateRose: GradientColors
  blushingRomance: GradientColors
  velvetAffection: GradientColors
  tenderEmbrace: GradientColors
  lovesIntensity: GradientColors
  romanticSunset: GradientColors
  deepDesire: GradientColors
  pureLove: GradientColors
}

// Light mode gradients
export const lightGradients: Gradients = {
  passionateRose: ['#ffe6f0', '#ffcce0', '#ff99c2'],
  blushingRomance: ['#ffcce0', '#ff99c2', '#ff66a3'],
  velvetAffection: ['#f5e6f3', '#ebcce7', '#d799cf'],
  tenderEmbrace: ['#fff8fb', '#ffe6f0', '#ffcce0'],
  lovesIntensity: ['#ff66a3', '#ff4767', '#ff3385'],
  romanticSunset: ['#ffcce0', '#ff99c2', '#ebcce7'],
  deepDesire: ['#ff99c2', '#ff66a3', '#d799cf'],
  pureLove: ['#ffffff', '#fff8fb', '#ffe6f0'],
}

// Dark mode gradients (ENHANCED - more vibrant and romantic)
export const darkGradients: Gradients = {
  // Rich purple-pink gradient (elegant and visible)
  passionateRose: ['#3d2438', '#4d2d47', '#5d3656'],

  // Deep romantic purple (warm and inviting)
  blushingRomance: ['#4a2d4a', '#5d3656', '#6d4066'],

  // Rich magenta-purple (passionate and bold)
  velvetAffection: ['#4d1f42', '#6d2856', '#8d3169'],

  // Soft dark purple (gentle and romantic)
  tenderEmbrace: ['#2d2438', '#3d2d47', '#4d3656'],

  // Deep rose gradient (intense but not harsh)
  lovesIntensity: ['#6d1f3d', '#8d284d', '#a6325d'],

  // Purple-pink blend (dreamy and romantic)
  romanticSunset: ['#4d3656', '#5d3d66', '#6d4576'],

  // Rich purple with pink undertones (luxurious)
  deepDesire: ['#5d3656', '#6d4066', '#7d4a76'],

  // Deep elegant base (sophisticated)
  pureLove: ['#2d2438', '#3d2d47', '#4d3656'],
}

// Theme type definition
export type Theme = {
  colors: typeof lightColors | typeof darkColors
  typography: typeof typography
  spacing: typeof spacing
  borderRadius: typeof borderRadius
  shadows: typeof shadows | typeof darkShadows
  gradients: Gradients
}

// Light theme
export const theme: Theme = {
  colors: lightColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  gradients: lightGradients,
}

// Dark theme
export const darkTheme: Theme = {
  colors: darkColors,
  typography,
  spacing,
  borderRadius,
  shadows: darkShadows,
  gradients: darkGradients,
}

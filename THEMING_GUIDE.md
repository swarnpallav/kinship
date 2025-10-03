# Theming Guide

## Overview

The Kinship app now uses a comprehensive, configurable theming system that makes it easy to maintain
consistent design and quickly change themes across the entire application.

## Current Theme: Bumble-Inspired

The app currently uses a **Bumble-inspired** color palette featuring:

- **Primary Color**: Yellow/Gold (#f59e0b) - Bumble's signature warm, inviting color
- **Secondary Color**: Warm coral/peach tones
- **Background**: Light warm backgrounds with subtle yellow tints
- **Typography**: Clear hierarchy with bold headings
- **Shadows**: Subtle elevation for depth

## Architecture

### Theme Provider

All theme values are managed through a React Context provider (`ThemeProvider`) that wraps the
entire app in `App.tsx`.

```tsx
<ThemeProvider>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  </QueryClientProvider>
</ThemeProvider>
```

### Using the Theme in Components

#### 1. Import the hook

```tsx
import { useTheme } from '../theme'
```

#### 2. Access theme values

```tsx
function MyComponent() {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  return <View style={styles.container}>...</View>
}
```

#### 3. Create dynamic styles

```tsx
const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background.primary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
    },
    text: {
      fontSize: theme.typography.fontSizes.base,
      color: theme.colors.text.primary,
      fontWeight: theme.typography.fontWeights.medium,
    },
  })
```

## Theme Structure

### Colors

```tsx
theme.colors.primary[500] // Main brand color
theme.colors.secondary[500] // Secondary accent
theme.colors.background.primary // White background
theme.colors.background.secondary // Light gray background
theme.colors.background.tertiary // Light yellow tint
theme.colors.text.primary // Dark text
theme.colors.text.secondary // Gray text
theme.colors.text.tertiary // Light gray text
theme.colors.text.inverse // White text (for dark backgrounds)
theme.colors.border.light // Light borders
theme.colors.success[500] // Success green
theme.colors.error[500] // Error red
theme.colors.warning[500] // Warning yellow
```

### Typography

```tsx
theme.typography.fontSizes.xs // 12
theme.typography.fontSizes.sm // 14
theme.typography.fontSizes.base // 16
theme.typography.fontSizes.lg // 18
theme.typography.fontSizes.xl // 20
theme.typography.fontSizes['2xl'] // 24
theme.typography.fontSizes['3xl'] // 30
theme.typography.fontSizes['4xl'] // 36

theme.typography.fontWeights.normal // '400'
theme.typography.fontWeights.medium // '500'
theme.typography.fontWeights.semibold // '600'
theme.typography.fontWeights.bold // '700'
```

### Spacing (8px base unit)

```tsx
theme.spacing.xs // 4
theme.spacing.sm // 8
theme.spacing.md // 16
theme.spacing.lg // 24
theme.spacing.xl // 32
theme.spacing['2xl'] // 48
theme.spacing['3xl'] // 64
```

### Border Radius

```tsx
theme.borderRadius.none // 0
theme.borderRadius.sm // 4
theme.borderRadius.md // 8
theme.borderRadius.lg // 12
theme.borderRadius.xl // 16
theme.borderRadius['2xl'] // 24
theme.borderRadius.full // 9999 (pill shape)
```

### Shadows

```tsx
theme.shadows.sm // Subtle shadow
theme.shadows.md // Medium shadow
theme.shadows.lg // Large shadow
theme.shadows.xl // Extra large shadow
```

## Changing the Theme

### Option 1: Update Colors (Quick Change)

To change just the colors (e.g., switch to a different color scheme), edit `src/theme/colors.ts`:

```tsx
export const colors = {
  primary: {
    // Change these hex values to your desired color scale
    500: '#YOUR_PRIMARY_COLOR',
    // ... other shades
  },
  // ... other color groups
}
```

### Option 2: Override Theme Values

You can override theme values when initializing the `ThemeProvider`:

```tsx
import { ThemeProvider, theme } from './src/theme'

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      ...theme.colors.primary,
      500: '#FF0000', // Change primary to red
    },
  },
}

<ThemeProvider customTheme={customTheme}>
  {/* app content */}
</ThemeProvider>
```

### Option 3: Complete Theme Replacement

For a complete redesign, modify `src/theme/theme.ts` to change typography, spacing, shadows, etc.

## Best Practices

1. **Always use theme values** instead of hardcoding colors/sizes
   - ✅ `backgroundColor: theme.colors.primary[500]`
   - ❌ `backgroundColor: '#f59e0b'`

2. **Use semantic color names** for better maintainability
   - ✅ `theme.colors.text.primary`
   - ❌ `theme.colors.neutral[900]`

3. **Leverage spacing system** for consistent layouts
   - ✅ `padding: theme.spacing.md`
   - ❌ `padding: 16`

4. **Use createStyles pattern** for dynamic theming

   ```tsx
   const createStyles = (theme: any) => StyleSheet.create({...})
   ```

5. **Test with different themes** before committing changes

## Examples

### Button with theme

```tsx
const createStyles = (theme: any) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary[500],
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      ...theme.shadows.md,
    },
    buttonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSizes.base,
      fontWeight: theme.typography.fontWeights.semibold,
    },
  })
```

### Card with theme

```tsx
const createStyles = (theme: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      ...theme.shadows.md,
      borderWidth: 1,
      borderColor: theme.colors.border.light,
    },
  })
```

## Future Enhancements

Consider implementing these features in the future:

- Dark mode support with theme switching
- Multiple theme presets (e.g., "Bumble", "Minimalist", "Bold")
- User-selectable themes in settings
- Persistent theme preference with AsyncStorage
- Seasonal themes or special event themes

## Migration Notes

All components and screens have been updated to use the theme system. If you create new components:

1. Import `useTheme`
2. Create a `createStyles` function that accepts `theme`
3. Use theme values instead of hardcoded values
4. Follow the patterns in existing components

## Support

For questions about theming, refer to:

- `src/theme/colors.ts` - Color palette definitions
- `src/theme/theme.ts` - Complete theme object
- `src/theme/ThemeContext.tsx` - Theme provider implementation
- Existing components for usage examples

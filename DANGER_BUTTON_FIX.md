# Sign-Out Button Color Consistency Fix

## Problem

The sign-out button looked like it was "coming from a different world" - it had mismatched colors:

- **Border**: Red error color (`#ef4444`)
- **Text**: Pink primary color (`#E896BA`)

This created a jarring visual experience where the button had inconsistent styling compared to the
rest of the app.

### Root Cause

The button was using the `outline` variant (which uses primary pink colors) but with a custom style
override to change only the border to red. This left the text color in pink while the border was
red, creating a visual mismatch.

```typescript
// Before - Inconsistent styling
<AppButton
  variant='outline'           // Pink text from outline variant
  style={styles.signOutButton} // Red border from custom style
/>

// Custom style
signOutButton: {
  borderColor: theme.colors.error[500], // Red border
}
```

## Solution

Created a new **`danger` variant** for buttons that handles destructive actions with consistent,
themed colors.

### New Button Variant

```typescript
type Variant = 'primary' | 'secondary' | 'outline' | 'danger'
```

### Danger Variant Styling

**Light Mode:**

```typescript
danger: {
  borderWidth: 2,
  borderColor: '#ef4444', // Red border
  backgroundColor: 'transparent',
}
dangerText: {
  color: '#dc2626', // Matching red text
}
```

**Dark Mode:**

```typescript
danger: {
  borderWidth: 2,
  borderColor: '#C76B6B', // Softer, desaturated red
  backgroundColor: 'transparent',
}
dangerText: {
  color: '#E8A0A0', // Matching softer red text
}
```

## Color Consistency

### Light Mode

- Border: `#ef4444` (error red)
- Text: `#dc2626` (darker red for better contrast)
- Result: ✅ Consistent red theme for danger action

### Dark Mode

- Border: `#C76B6B` (desaturated red - 40% less intense)
- Text: `#E8A0A0` (desaturated light red)
- Result: ✅ Consistent, comfortable red theme without glare

## Implementation

### Updated AppButton Component

```typescript
// New danger variant styles
danger: {
  borderWidth: 2,
  borderColor: isDark ? '#C76B6B' : theme.colors.error[500],
  backgroundColor: 'transparent',
},
dangerText: {
  color: isDark ? '#E8A0A0' : theme.colors.error[600],
  fontSize: theme.typography.fontSizes.base,
},
```

### Updated Usage in Screens

**Before:**

```typescript
<AppButton
  title='Sign Out'
  variant='outline'
  style={styles.signOutButton} // Custom override
  size='lg'
/>
```

**After:**

```typescript
<AppButton
  title='Sign Out'
  variant='danger' // Dedicated variant
  size='lg'
/>
```

### Removed Custom Styles

No longer need custom `signOutButton` style overrides - the variant handles everything consistently.

## Visual Comparison

### Before (Inconsistent)

```
┌─────────────────────────────┐
│  ┏━━━━━━━━━━━━━━━━━━━━━━┓  │  ← Red border
│  ┃    Sign Out [pink]   ┃  │  ← Pink text ❌ Mismatch!
│  ┗━━━━━━━━━━━━━━━━━━━━━━┛  │
└─────────────────────────────┘
```

### After (Consistent)

```
┌─────────────────────────────┐
│  ┏━━━━━━━━━━━━━━━━━━━━━━┓  │  ← Soft red border
│  ┃    Sign Out [red]    ┃  │  ← Matching red text ✅
│  ┗━━━━━━━━━━━━━━━━━━━━━━┛  │
└─────────────────────────────┘
```

## Design Principles

### 1. **Semantic Color Usage**

- Danger actions use error/red colors consistently
- No mixing of pink (primary) and red (error) colors
- Clear visual indication of destructive action

### 2. **Dark Mode Adaptation**

- Desaturated red in dark mode prevents glare
- Maintains visibility without being harsh
- Consistent with other dark mode button colors

### 3. **Accessibility**

- Maintains WCAG contrast ratios
- Clear visual distinction from other buttons
- Recognizable as a warning/destructive action

### 4. **Consistency**

- Border and text use the same color family
- Matches the app's overall theming approach
- Reusable pattern for future danger buttons

## Benefits

### ✅ Visual Harmony

- Button now looks cohesive with the rest of the app
- No more "different world" feeling
- Consistent color story

### ✅ Semantic Clarity

- Danger variant clearly indicates destructive action
- Users immediately recognize high-stakes button
- Follows platform conventions

### ✅ Better UX

- Dark mode: Soft red, easy on the eyes
- Light mode: Clear red warning
- Consistent across both themes

### ✅ Maintainable

- Reusable `danger` variant
- No custom style overrides needed
- Easy to apply to other destructive actions

## Color Psychology

### Red for Danger

- **Universal signal**: Red = warning/caution
- **Psychological impact**: Prompts careful consideration
- **Cultural consistency**: Widely recognized for important actions

### Desaturation in Dark Mode

- Prevents visual fatigue
- Maintains urgency without aggression
- Comfortable for extended use

## Usage Examples

### When to Use Danger Variant

```typescript
// Destructive actions
<AppButton title='Sign Out' variant='danger' />
<AppButton title='Delete Account' variant='danger' />
<AppButton title='Remove Photo' variant='danger' />
<AppButton title='Clear Data' variant='danger' />

// When to NOT use
<AppButton title='Cancel' variant='outline' />    // Use outline
<AppButton title='Go Back' variant='outline' />   // Use outline
<AppButton title='Skip' variant='outline' />      // Use outline
```

### Variant Selection Guide

| Action Type        | Variant     | Color       | Use Case                 |
| ------------------ | ----------- | ----------- | ------------------------ |
| Primary action     | `primary`   | Pink        | Main CTAs, confirmations |
| Secondary action   | `secondary` | Deep red    | Alternative actions      |
| Neutral action     | `outline`   | Pink border | Cancel, skip, back       |
| Destructive action | `danger`    | Red border  | Delete, sign out, remove |

## Testing Checklist

- [x] Sign out button in Profile screen - consistent colors
- [x] Sign out button in Settings screen - consistent colors
- [x] Dark mode - soft red, no glare
- [x] Light mode - clear red warning
- [x] Text contrast meets WCAG standards
- [x] Border and text colors match
- [x] Removed custom style overrides
- [x] TypeScript compilation successful
- [x] No linter errors

## Files Modified

1. ✅ `src/components/AppButton.tsx`
   - Added `danger` variant type
   - Implemented danger button styles
   - Added dark mode color adjustments

2. ✅ `src/screens/ProfileScreen.tsx`
   - Changed variant from `outline` to `danger`
   - Removed custom `signOutButton` style

3. ✅ `src/screens/SettingsScreen.tsx`
   - Changed variant from `outline` to `danger`
   - Removed custom `signOutButton` style

## Future Enhancements

Potential improvements:

- Add filled danger variant (`variant='danger-filled'`)
- Add danger button hover states
- Create icon variants for danger actions
- Add confirmation modals for danger buttons
- Implement haptic feedback on danger button press

## Result

The sign-out button now:

- ✅ Uses consistent red colors (border + text match)
- ✅ Fits naturally with the app's theme
- ✅ Clearly indicates a destructive action
- ✅ Looks comfortable in dark mode (desaturated red)
- ✅ Maintains visual hierarchy
- ✅ Follows design system patterns

**The button no longer looks like it's "coming from a different world" - it's now a cohesive part of
the app's design language!** 🎨✨

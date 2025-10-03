# Theme Toggle Update

## Summary

Updated the theme system to use a single toggle switch instead of three separate buttons, with
automatic system theme detection as the default behavior.

## Changes Made

### 1. Fixed System Theme Detection (`app.json`)

**Before:**

```json
"userInterfaceStyle": "light"
```

**After:**

```json
"userInterfaceStyle": "automatic"
```

This change allows the app to properly detect the device's system theme (light/dark) on both iOS and
Android.

### 2. Improved ThemeContext (`src/theme/ThemeContext.tsx`)

**Key Updates:**

- **Default to system theme**: App now automatically follows the device's theme setting
- **Added `Appearance` listener**: Dynamically updates when system theme changes
- **New toggle behavior**:
  - When in system mode and toggled → switches to manual mode (opposite of current system theme)
  - When in manual mode and toggled → switches between light/dark
- **Better TypeScript types**: Improved type safety with `ThemeContextValue` interface

**New API:**

```typescript
interface ThemeContextValue {
  theme: Theme // Current theme object
  isDark: boolean // Is dark mode active?
  themeMode: ThemeMode // 'light' | 'dark' | 'system'
  setThemeMode: (mode: ThemeMode) => void // Manually set mode
  toggleTheme: () => void // Toggle between light/dark
}
```

### 3. Redesigned Settings Screen (`src/screens/SettingsScreen.tsx`)

**Before:**

- Three separate buttons for Light/Dark/System modes
- No visual indication of system mode

**After:**

- **Single toggle switch** with emoji indicator (☀️ for light, 🌙 for dark)
- **"AUTO" badge** when following system theme
- **Dynamic description** showing current state:
  - "Following system (currently dark)"
  - "Manually set to light mode"
- **"Reset to System Theme" button** appears when in manual mode

**UI Layout:**

```
┌─────────────────────────────────────┐
│ 🌙 Dark Mode              [AUTO] ●──│
│ Following system (currently dark)   │
│                                     │
│ 📱 Reset to System Theme            │
└─────────────────────────────────────┘
```

## User Experience Flow

### Scenario 1: First Launch

1. App loads with system theme automatically
2. User sees toggle matching their system preference
3. Badge shows "AUTO" indicating it's following system

### Scenario 2: Manual Override

1. User toggles the switch
2. Theme changes immediately
3. "AUTO" badge disappears
4. "Reset to System Theme" button appears
5. Theme stays in manual mode until reset or toggled again

### Scenario 3: System Theme Changes

1. If in "AUTO" mode → app updates automatically
2. If in manual mode → app stays in chosen theme

## Benefits

✅ **Simpler UI**: One toggle instead of three buttons  
✅ **Smart defaults**: Respects user's device preferences automatically  
✅ **Clear feedback**: Visual indicators show current state and mode  
✅ **Flexible control**: Easy to override or reset to system  
✅ **Better UX**: Familiar toggle pattern users expect

## Technical Notes

### Android System Theme Detection

The change to `"userInterfaceStyle": "automatic"` in `app.json` is crucial for Android devices.
Without this setting, `useColorScheme()` may always return 'light' even when the system is in dark
mode.

### Persistence

- Theme preference is saved to `AsyncStorage` under the key `@kinship_theme_mode`
- Loads on app startup
- Updates immediately when changed

### Performance

- Minimal re-renders: only updates when theme actually changes
- Loading state prevents flash of wrong theme
- Efficient listener cleanup on unmount

## Testing Checklist

- [ ] Test on device with light system theme
- [ ] Test on device with dark system theme
- [ ] Toggle theme and verify it stays after app restart
- [ ] Change system theme while app is open in AUTO mode
- [ ] Toggle to manual mode, change system theme, verify app doesn't change
- [ ] Reset to system theme and verify it follows system again
- [ ] Test on iOS
- [ ] Test on Android

## Future Enhancements

Potential additions:

- Schedule-based theme switching (e.g., dark mode at night)
- Per-screen theme overrides
- Custom accent color selection
- High contrast mode for accessibility

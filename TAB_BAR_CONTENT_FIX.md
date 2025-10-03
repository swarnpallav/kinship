# Tab Bar Content Overlap Fix

## Problem

After making the tab bar `position: 'absolute'` for the translucent effect, content was going
underneath it, causing buttons and text to be hidden behind the tab bar.

## Root Cause

When an element has `position: 'absolute'`, it's removed from the normal document flow. Other
elements behave as if it doesn't exist, so content extends all the way to the bottom of the screen,
going under the floating tab bar.

## Solution Applied

Added **bottom padding/margin of 100-120px** to all main screens to account for:

- Tab bar height: ~60px
- Safe area inset: varies by device
- Extra breathing room: ~40-60px

## Files Fixed

### ✅ 1. DiscoverScreen.tsx

```typescript
instructions: {
  // ...
  marginBottom: 100, // Account for floating tab bar
}
```

### ✅ 2. ProfileScreen.tsx

```typescript
contentContainer: {
  // ...
  paddingBottom: 120, // Account for floating tab bar
}
```

### ✅ 3. SettingsScreen.tsx

```typescript
contentContainer: {
  // ...
  paddingBottom: 120, // Account for floating tab bar
}
```

### ✅ 4. MatchesScreen.tsx

```typescript
contentContainer: {
  // ...
  paddingBottom: 100, // Already had this
}
```

### ✅ 5. ChatScreen (in stack, no tab bar visible)

No changes needed - Chat screen is in a stack navigator with its own header.

## Result

✅ All content now properly stops above the floating tab bar ✅ No overlap on Discover, Profile,
Settings, or Matches screens ✅ Smooth scrolling with proper spacing ✅ Tab bar remains translucent
with gradient showing through

## Quick Reference

**For any new screens added:**

- ScrollView: Add `paddingBottom: 120` to `contentContainerStyle`
- Fixed layout: Add `marginBottom: 100` to the last element
- Always test on both iOS and Android (safe area varies)

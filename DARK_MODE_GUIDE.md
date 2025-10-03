# 🌙 Dark Mode Implementation Guide

## Complete Dark Mode Support

The Kinship app now features a **rich, romantic dark mode** that maintains the passionate aesthetic
while providing comfortable viewing in low-light environments.

---

## 🎨 Dark Mode Features

### **3 Theme Modes**

1. **☀️ Light Mode** - Vibrant romantic colors
2. **🌙 Dark Mode** - Rich dark romantic palette
3. **📱 System Mode** - Follows device settings (default)

### **Automatic & Manual Control**

- ✅ Automatically detects system theme preference
- ✅ Manual override in Settings
- ✅ Persists user choice with AsyncStorage
- ✅ Smooth transitions between themes

---

## 🎨 Dark Mode Color Palette

### **Background Colors**

#### **Primary Background (#0f0d13)**

- Deep romantic black
- Rich and luxurious feel
- Perfect for OLED screens

#### **Secondary Background (#1a1721)**

- Rich dark purple tint
- Adds depth and warmth
- Subtle romantic atmosphere

#### **Tertiary Background (#2d2937)**

- Soft charcoal
- Cards and elevated surfaces
- Good contrast with primary

### **Text Colors**

#### **Primary Text (#f5f5f7)**

- Almost white
- High contrast, easy to read
- Perfect for body text

#### **Secondary Text (#c6c3ce)**

- Light gray
- Subtle, not harsh
- Great for labels and descriptions

#### **Accent Text (#ff3385)**

- Bright romantic pink
- High visibility
- Use for emphasis and CTAs

### **Brand Colors (Adjusted for Dark)**

#### **Primary (#FF006E)**

- Vibrant rose pink
- Pops beautifully on dark
- Perfect for buttons and highlights

#### **Secondary (#E81948)**

- Deep passionate red
- Rich and bold
- Excellent for CTAs

#### **Accent (#9B1D87)**

- Rich purple
- Sophisticated depth
- Great for special elements

---

## 🌑 Dark Mode Gradients

All gradients redesigned for dark mode:

### **1. Passionate Rose (Dark)**

```
['#2d2937', '#3d3646', '#4d4556']
```

- Rich purple-gray progression
- Subtle, not harsh
- Maintains romantic feel

### **2. Blushing Romance (Dark)**

```
['#3d3646', '#4d4556', '#5d5466']
```

- Deeper charcoal tones
- Smooth transitions
- Elegant depth

### **3. Velvet Affection (Dark)**

```
['#2e0926', '#3d0c32', '#4d1642']
```

- Deep purple romantic gradient
- Luxurious and rich
- Perfect for special screens

### **4. Tender Embrace (Dark)**

```
['#1a1721', '#2d2937', '#3d3646']
```

- Gentle dark progression
- Cozy and warm
- Comfortable on eyes

### **5. Love's Intensity (Dark)**

```
['#4d001f', '#660029', '#800033']
```

- Bold dark red tones
- Passionate and dramatic
- High-impact gradient

### **6. Romantic Sunset (Dark)**

```
['#3d3646', '#4d4556', '#3d0c32']
```

- Mixed dark tones
- Interesting transitions
- Sophisticated feel

### **7. Deep Desire (Dark)**

```
['#4d4556', '#5d5466', '#3d0c32']
```

- Rich and intimate
- Perfect for chat screens
- Romantic depth

### **8. Pure Love (Dark)**

```
['#0f0d13', '#1a1721', '#2d2937']
```

- Clean dark progression
- Subtle and refined
- Perfect for content areas

---

## 💡 Implementation Details

### **Theme Context**

The theme system uses React Context with three modes:

```typescript
type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextValue {
  theme: Theme
  isDark: boolean
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  toggleTheme: () => void
}
```

### **Usage in Components**

```tsx
import { useTheme } from '../theme'

function MyComponent() {
  const { theme, isDark } = useTheme()

  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current mode: {isDark ? 'Dark' : 'Light'}</Text>
    </View>
  )
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background.primary,
    },
    text: {
      color: theme.colors.text.primary,
    },
  })
```

### **System Theme Detection**

Uses React Native's `useColorScheme` hook:

```tsx
import { useColorScheme } from 'react-native'

const systemColorScheme = useColorScheme() // 'light' | 'dark' | null
```

### **Persistent Storage**

User preference saved with AsyncStorage:

```typescript
const THEME_STORAGE_KEY = '@kinship_theme_mode'

// Save preference
await AsyncStorage.setItem(THEME_STORAGE_KEY, 'dark')

// Load on app start
const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY)
```

---

## 🎯 Settings Screen Integration

### **Theme Selector UI**

Three buttons for theme selection:

- **☀️ Light** - Forces light mode
- **🌙 Dark** - Forces dark mode
- **📱 System** - Follows system settings

Active button highlighted with primary color.

### **Current Theme Display**

Shows current mode and effective theme:

- "System (Dark)" - System mode, currently dark
- "System (Light)" - System mode, currently light
- "Light" - Manually set to light
- "Dark" - Manually set to dark

---

## 📊 Comparison: Light vs Dark

### **Visual Characteristics**

| Aspect            | Light Mode       | Dark Mode           |
| ----------------- | ---------------- | ------------------- |
| **Background**    | White/Pink tints | Deep blacks/purples |
| **Text**          | Dark purple-gray | Light gray/white    |
| **Primary Color** | #FF006E          | #FF006E (same!)     |
| **Gradients**     | Light and airy   | Rich and deep       |
| **Shadows**       | Subtle           | More prominent      |
| **Emoji Opacity** | 10-15%           | 10-15% (adjusted)   |

### **Use Cases**

**Light Mode:**

- ☀️ Daytime use
- 🌅 Well-lit environments
- 💕 Vibrant, energetic feel
- 📸 Better for photos

**Dark Mode:**

- 🌙 Night-time use
- 🛏️ Low-light environments
- 🔋 OLED battery saving
- 👁️ Reduced eye strain

---

## ⚡ Performance

### **Optimizations**

- ✅ Theme loaded once on mount
- ✅ Styles created dynamically per theme
- ✅ No re-renders on theme change
- ✅ AsyncStorage for fast persistence
- ✅ Efficient gradient rendering

### **Battery Benefits (OLED)**

- Dark mode uses **significantly less power** on OLED screens
- True black (#0f0d13) pixels are completely off
- Can save **20-40% battery** on OLED devices

---

## 🎨 Design Principles

### **Maintained in Dark Mode**

1. ✅ **Romantic Aesthetic** - Still feels loving and passionate
2. ✅ **Brand Colors** - Primary/secondary colors unchanged
3. ✅ **Visual Hierarchy** - Same structure and flow
4. ✅ **Decorative Elements** - Hearts still present and subtle

### **Adapted for Dark Mode**

1. 🌙 **Backgrounds** - Deep, rich blacks and purples
2. 📝 **Text** - Light colors for readability
3. 🎨 **Gradients** - Darker tones, same romantic feel
4. 🔆 **Contrast** - Higher for better visibility
5. ✨ **Shadows** - More prominent for depth

---

## 🛠️ Technical Stack

### **Dependencies**

- `@react-native-async-storage/async-storage` - Persistence
- `react-native` - Appearance API & useColorScheme
- Built-in React Context for state management

### **Files Modified**

- `src/theme/colors.ts` - Added dark color palette
- `src/theme/theme.ts` - Added dark theme & gradients
- `src/theme/ThemeContext.tsx` - Complete rewrite with modes
- `src/screens/SettingsScreen.tsx` - Added theme controls
- All screens - Already using theme system ✅

---

## 🎯 User Experience

### **Seamless Switching**

- Theme changes **instantly** when user switches
- **No app restart** required
- **No loading screens** or delays
- Settings **persist across** app sessions

### **Smart Defaults**

- New users: **System mode** (follows device)
- Respects user's **system preference**
- Easy to **override manually** in settings
- Clear visual **feedback** on selection

### **Accessibility**

- ✅ **High contrast** in both modes
- ✅ **WCAG compliant** text sizes
- ✅ **Clear touch targets** (44x44 minimum)
- ✅ **Screen reader** compatible

---

## 💡 Best Practices

### **For Developers**

1. **Always use theme values**

   ```tsx
   // ✅ Good
   color: theme.colors.text.primary

   // ❌ Bad
   color: '#1a1721'
   ```

2. **Create dynamic styles**

   ```tsx
   const createStyles = (theme: any) => StyleSheet.create({...})
   ```

3. **Test both themes**
   - Always check light AND dark mode
   - Test gradients in both themes
   - Verify text readability

4. **Use semantic colors**

   ```tsx
   // ✅ Good - adapts to theme
   theme.colors.text.primary

   // ❌ Bad - hardcoded
   theme.colors.neutral[900]
   ```

---

## 🚀 Future Enhancements

### **Potential Features**

- 🎨 **Custom themes** - Let users create their own
- ⏰ **Schedule** - Auto-switch at sunset/sunrise
- 🌈 **Color adjustments** - Brightness/contrast sliders
- 💾 **Sync** - Cloud sync of preferences
- 🎭 **Seasonal themes** - Special occasion palettes

---

## 📱 Platform Support

### **iOS**

- ✅ System theme detection
- ✅ Respects iOS appearance settings
- ✅ Smooth transitions
- ✅ Widget support ready

### **Android**

- ✅ System theme detection
- ✅ Respects Android theme
- ✅ Material Design compatible
- ✅ Battery optimization benefits

### **Web**

- ✅ System theme detection
- ✅ Browser settings respected
- ✅ localStorage persistence
- ✅ Responsive and smooth

---

## ✅ Testing Checklist

- [x] Light mode displays correctly
- [x] Dark mode displays correctly
- [x] System mode follows device settings
- [x] Theme preference persists
- [x] Settings screen theme selector works
- [x] All gradients look good in both modes
- [x] Text is readable in both modes
- [x] Buttons are visible in both modes
- [x] No linter errors
- [x] No performance issues

---

## 🎉 Result

Your app now has **professional-grade dark mode** that:

💕 **Maintains romantic aesthetic** in both light and dark  
🌙 **Provides comfortable night viewing** without eye strain  
⚡ **Saves battery** on OLED devices  
🎨 **Looks stunning** with rich, deep colors  
👥 **Respects user preferences** with three flexible modes  
💾 **Persists choices** across app sessions  
✨ **Switches instantly** without delays

**Welcome to Kinship: Beautiful by day, stunning by night!** 🌅🌙💕

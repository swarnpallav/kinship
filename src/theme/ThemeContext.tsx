import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { useColorScheme as useRNColorScheme, Appearance } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { theme as lightTheme, darkTheme, Theme } from './theme'

type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextValue {
  theme: Theme
  isDark: boolean
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const THEME_STORAGE_KEY = '@kinship_theme_mode'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useRNColorScheme()
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system')
  const [isReady, setIsReady] = useState(false)

  // Load saved theme preference on mount
  useEffect(() => {
    loadThemePreference()
  }, [])

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === 'system') {
        // Force re-render when system theme changes and we're in system mode
        setIsReady(false)
        setTimeout(() => setIsReady(true), 0)
      }
    })

    return () => subscription.remove()
  }, [themeMode])

  const loadThemePreference = async () => {
    try {
      const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY)
      if (
        savedMode &&
        (savedMode === 'light' ||
          savedMode === 'dark' ||
          savedMode === 'system')
      ) {
        setThemeModeState(savedMode as ThemeMode)
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error)
    } finally {
      setIsReady(true)
    }
  }

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode)
      setThemeModeState(mode)
    } catch (error) {
      console.error('Failed to save theme preference:', error)
    }
  }

  const toggleTheme = () => {
    // When toggling, switch between light and dark (not system)
    if (themeMode === 'system') {
      // If currently in system mode, toggle based on current appearance
      const newMode = systemColorScheme === 'dark' ? 'light' : 'dark'
      setThemeMode(newMode)
    } else {
      // Otherwise just toggle between light and dark
      const newMode = themeMode === 'dark' ? 'light' : 'dark'
      setThemeMode(newMode)
    }
  }

  // Determine actual theme based on mode
  const getActualTheme = (): 'light' | 'dark' => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light'
    }
    return themeMode
  }

  const actualTheme = getActualTheme()
  const isDark = actualTheme === 'dark'
  const currentTheme: Theme = isDark ? darkTheme : lightTheme

  // Don't render until theme is loaded
  if (!isReady) {
    return null
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        isDark,
        themeMode,
        setThemeMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

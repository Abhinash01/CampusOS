import React, { createContext, useContext, useState, useMemo } from 'react'
import type { ThemeConfig, ThemeId } from './theme.types'
import { THEMES, THEME_TEAL } from './themes'

interface ThemeContextValue {
  currentTheme: ThemeConfig
  setThemeId: (id: ThemeId) => void
  themeId: ThemeId
}

const ThemeContext = createContext<ThemeContextValue>({
  currentTheme: THEME_TEAL,
  setThemeId: () => {},
  themeId: 'teal',
})

export interface ThemeProviderProps {
  children: React.ReactNode
  initialThemeId?: ThemeId
  theme?: ThemeConfig
  className?: string
  style?: React.CSSProperties
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialThemeId = 'teal',
  theme,
  className = '',
  style = {},
}) => {
  const [themeId, setThemeId] = useState<ThemeId>(initialThemeId)

  const activeTheme = useMemo(() => {
    if (theme) return theme
    return THEMES[themeId] || THEME_TEAL
  }, [theme, themeId])

  const cssVariables = useMemo(() => {
    return {
      '--theme-primary': activeTheme.colors.primary,
      '--theme-primary-hover': activeTheme.colors.primaryHover,
      '--theme-secondary': activeTheme.colors.secondary,
      '--theme-accent': activeTheme.colors.accent,
      '--theme-soft-accent': activeTheme.colors.softAccent,
      '--theme-bg': activeTheme.colors.background,
      '--theme-surface': activeTheme.colors.surface,
      '--theme-text': activeTheme.colors.text,
      '--theme-text-secondary': activeTheme.colors.textSecondary,
      '--theme-border': activeTheme.colors.border,
      ...style,
    } as React.CSSProperties
  }, [activeTheme, style])

  return (
    <ThemeContext.Provider value={{ currentTheme: activeTheme, setThemeId, themeId: activeTheme.id }}>
      <div className={className} style={cssVariables}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

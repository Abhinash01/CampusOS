import React, { createContext, useContext, useMemo } from 'react'
import type { ThemeConfig } from './theme.types'
import { CAMPUS_CORAL_THEME } from './themes'

interface ThemeContextValue {
  currentTheme: ThemeConfig
}

const ThemeContext = createContext<ThemeContextValue>({
  currentTheme: CAMPUS_CORAL_THEME,
})

export interface ThemeProviderProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

/**
 * Static Campus Coral theme provider for CampusOS production
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  className = '',
  style = {},
}) => {
  const cssVariables = useMemo(() => {
    return {
      '--theme-primary': CAMPUS_CORAL_THEME.colors.primary,
      '--theme-primary-hover': CAMPUS_CORAL_THEME.colors.primaryHover,
      '--theme-secondary': CAMPUS_CORAL_THEME.colors.secondary,
      '--theme-accent': CAMPUS_CORAL_THEME.colors.accent,
      '--theme-soft-accent': CAMPUS_CORAL_THEME.colors.softAccent,
      '--theme-bg': CAMPUS_CORAL_THEME.colors.background,
      '--theme-surface': CAMPUS_CORAL_THEME.colors.surface,
      '--theme-text': CAMPUS_CORAL_THEME.colors.text,
      '--theme-text-secondary': CAMPUS_CORAL_THEME.colors.textSecondary,
      '--theme-border': CAMPUS_CORAL_THEME.colors.border,
      ...style,
    } as React.CSSProperties
  }, [style])

  return (
    <ThemeContext.Provider value={{ currentTheme: CAMPUS_CORAL_THEME }}>
      <div className={className} style={cssVariables}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

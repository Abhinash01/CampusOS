export type ThemeId = 'teal' | 'blue' | 'coral'

export interface ThemeColors {
  primary: string
  primaryHover: string
  secondary: string
  accent: string
  softAccent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  heroGlowFrom: string
  heroGlowTo: string
  headlineGradient: string
  badgeBg: string
  badgeText: string
  badgeBorder: string
  activeNavBg: string
  activeNavText: string
  darkCtaBg: string
  ringColor: string
}

export interface ThemeCharacteristics {
  primaryColor: string
  primaryContrast: string
  heroAppearance: string
  dashboardAppearance: string
  buttonAppearance: string
  navigationAppearance: string
  accessibility: string
  overallVisualCharacter: string
}

export interface ThemeConfig {
  id: ThemeId
  code: string
  name: string
  concept: string
  description: string
  colors: ThemeColors
  characteristics: ThemeCharacteristics
}

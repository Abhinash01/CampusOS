import type { ThemeConfig } from './theme.types'

/**
 * Official CampusOS Production Theme: Campus Coral
 * Primary: #E11D48 (Rose 600)
 * Primary Hover: #BE123C (Rose 700)
 * Secondary: #F97316 (Orange 500)
 * Accent: #F59E0B (Amber 500)
 * Soft Accent: #FFE4E6 (Rose 100)
 */
export const CAMPUS_CORAL_THEME: ThemeConfig = {
  id: 'coral',
  code: 'PRODUCTION',
  name: 'Campus Coral',
  concept: 'Energetic • Human • Modern',
  description: 'Warm rose-coral with gentle amber undercurrents on a tailored soft canvas. Puts student humanity and warmth at the center.',
  colors: {
    primary: '#E11D48',
    primaryHover: '#BE123C',
    secondary: '#F97316',
    accent: '#F59E0B',
    softAccent: '#FFE4E6',
    background: '#FFFDFB',
    surface: '#FFFFFF',
    text: '#18181B',
    textSecondary: '#71717A',
    border: '#E4E4E7',
    heroGlowFrom: 'rgba(225, 29, 72, 0.14)',
    heroGlowTo: 'rgba(249, 115, 22, 0.12)',
    headlineGradient: 'from-rose-600 via-rose-600 to-orange-500',
    badgeBg: '#FFF1F2',
    badgeText: '#BE123C',
    badgeBorder: '#FECDD3',
    activeNavBg: '#FFF1F2',
    activeNavText: '#BE123C',
    darkCtaBg: 'from-zinc-950 via-zinc-900 to-rose-950',
    ringColor: 'rgba(225, 29, 72, 0.35)',
  },
  characteristics: {
    primaryColor: '#E11D48 (Rose 600)',
    primaryContrast: '4.9:1 on white (WCAG AA compliant)',
    heroAppearance: 'Warm sunrise ambient glow with welcoming, human energy',
    dashboardAppearance: 'Approachable student community feel without losing discipline',
    buttonAppearance: 'High-energy vivid crimson with soft tactile warmth',
    navigationAppearance: 'Warm rose highlight that breaks away from cold IT dashboards',
    accessibility: 'Strong on light surfaces; secondary text tuned to Zinc 500 for contrast',
    overallVisualCharacter: 'Human-centric, youthful yet rigorous university campus vitality',
  },
}

export const THEME_CORAL = CAMPUS_CORAL_THEME
export const PRODUCTION_THEME = CAMPUS_CORAL_THEME

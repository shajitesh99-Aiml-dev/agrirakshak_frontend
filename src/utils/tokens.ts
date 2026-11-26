/**
 * Agri Rakshak Design Tokens
 * 
 * Official color palette and design values for Agri Rakshak:
 * AI-assisted crop disease and pest detection & agricultural case management platform.
 * SIH 2026 (SIH26131)
 */

export const THEME_COLORS = {
  primary: '#2E7D32',       // Primary green
  darkGreen: '#1B5E20',     // Dark green
  background: '#F7FBF5',    // Light natural background
  cards: '#FFFFFF',         // Crisp white card surface
  accent: '#FFB300',        // Warm harvest amber
  ai: '#0288D1',            // AI & informational sky blue
  text: '#263238',          // Deep charcoal text
} as const;

export const SEMANTIC_COLORS = {
  success: {
    main: '#2E7D32',
    light: '#E8F5E9',
    dark: '#1B5E20',
    border: '#C8E6C9',
  },
  warning: {
    main: '#F57C00',
    light: '#FFF3E0',
    dark: '#E65100',
    border: '#FFE0B2',
  },
  error: {
    main: '#D32F2F',
    light: '#FFEBEE',
    dark: '#C62828',
    border: '#FFCDD2',
  },
  info: {
    main: '#0288D1',
    light: '#E1F5FE',
    dark: '#01579B',
    border: '#B3E5FC',
  },
  neutral: {
    main: '#546E7A',
    light: '#ECEFF1',
    dark: '#263238',
    border: '#CFD8DC',
  },
} as const;

export const THEME_FONTS = {
  family: '"Times New Roman", Times, serif',
} as const;

export const RADIUS_TOKENS = {
  small: '8px',
  medium: '12px',
  large: '16px',
  full: '9999px',
} as const;

export type ThemeColorKey = keyof typeof THEME_COLORS;
export type SemanticStateKey = keyof typeof SEMANTIC_COLORS;

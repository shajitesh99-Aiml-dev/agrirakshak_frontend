/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E7D32', // Primary Agricultural Green
          dark: '#1B5E20',    // Deep Brand Green
          light: '#E8F5E9',   // Light Organic Green Surface
          pale: '#C8E6C9',    // Accent Pale Green
        },
        'dark-green': '#1B5E20',
        background: '#F5FAF3',
        card: '#FFFFFF',
        'surface-cream': '#FFFDF9',
        'surface-muted': '#E8F5E9',
        neo: {
          black: '#172117',
          border: '#172117',
          shadow: '#172117',
          green: '#2E7D32',
          dark: '#1B5E20',
          light: '#E8F5E9',
          pale: '#C8E6C9',
          cream: '#FFFDF9',
          bg: '#F5FAF3',
          muted: '#D7E5D5',
        },
        accent: {
          DEFAULT: '#FFB300', // Accent Amber
          hover: '#FFA000',
          light: '#FFF8E1',
        },
        ai: {
          DEFAULT: '#0288D1', // AI / Information
          light: '#E1F5FE',
          dark: '#01579B',
        },
        text: {
          DEFAULT: '#172117', // Main Text (High-contrast near-black)
          muted: '#496274',   // Muted Blue-Gray Secondary
          subtle: '#607D8B',
        },
        // Central semantic colors
        semantic: {
          success: '#2E7D32',
          'success-bg': '#E8F5E9',
          'success-text': '#1B5E20',
          warning: '#E65100',
          'warning-bg': '#FFF8E1',
          'warning-text': '#B73E00',
          error: '#D32F2F',
          'error-bg': '#FFEBEE',
          'error-text': '#C62828',
          info: '#0288D1',
          'info-bg': '#E1F5FE',
          'info-text': '#01579B',
          neutral: '#496274',
          'neutral-bg': '#ECEFF1',
          'neutral-text': '#172117',
        },
      },
      fontFamily: {
        serif: ['"Times New Roman"', 'Times', '"Noto Sans"', '"Noto Sans Telugu"', '"Noto Sans Devanagari"', '"Noto Sans Kannada"', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Noto Sans"', 'sans-serif'],
      },
      boxShadow: {
        'neo-sm': '2px 2px 0px #172117',
        'neo': '4px 4px 0px #172117',
        'neo-lg': '6px 6px 0px #172117',
        'neo-xl': '8px 8px 0px #172117',
        'neo-press': '1px 1px 0px #172117',
        'card': '4px 4px 0px #172117',
        'soft': '2px 2px 0px #172117',
        'elevated': '6px 6px 0px #172117',
      },
      borderWidth: {
        'neo': '2px',
        'neo-thick': '3px',
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '6px',
        'lg': '8px',
        'xl': '8px',
        'small': '4px',
        'medium': '6px',
        'large': '8px',
        'natural': '6px',
        'card': '6px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
};

// @ts-check
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          surface: '#fbf9f8',
          'surface-dim': '#dbd9d9',
          'surface-low': '#f5f3f3',
          'surface-container': '#efeded',
          'surface-high': '#eae8e7',
          'surface-highest': '#e4e2e2',
          'on-surface': '#1b1c1c',
          'on-surface-variant': '#44474d',
          outline: '#75777e',
          'outline-variant': '#c5c6cd',
          primary: '#000000',
          'on-primary': '#ffffff',
          secondary: '#735c00',
          'on-secondary': '#ffffff',
          'secondary-container': '#fed65b',
          'on-secondary-container': '#745c00',
          'primary-container': '#0d1c32',
          'on-primary-container': '#76849f',
          error: '#ba1a1a',
        },
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        'sans-semibold': ['Inter_600SemiBold'],
        'sans-bold': ['Inter_700Bold'],
        display: ['PlayfairDisplay_700Bold'],
        'display-semibold': ['PlayfairDisplay_600SemiBold'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      spacing: {
        'container': '20px',
        'section': '48px',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          50: '#fefce8',
          100: '#fffbd5',
          200: '#fff69a',
          300: '#ffed4e',
          400: '#ffdc0d',
          500: '#f5d006',
          600: '#d4a302',
          700: '#a87d04',
          800: '#896409',
          900: '#735d0f',
        },
        radiation: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
        oxide: {
          50: '#fff7ed',
          100: '#fed7aa',
          200: '#fdba74',
          300: '#fb923c',
          400: '#f97316',
          500: '#ea580c',
          600: '#c2410c',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        'fallout-dark': '#0a0e11',
        'fallout-darker': '#050708',
      },
      fontFamily: {
        fallout: ['VT323', 'Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}

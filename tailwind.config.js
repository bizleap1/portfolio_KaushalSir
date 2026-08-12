/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          deep: '#050505',
          secondary: '#0B0B0B',
          charcoal: '#111111',
        },
        gold: {
          primary: '#D6A11F',
          warm: '#E0AE2B',
          muted: '#B67A03',
        },
        red: {
          primary: '#C8102E', // Deep vibrant red
          dark: '#8B0A1C',
        },
        white: {
          primary: '#F5F3EE',
        },
        grey: {
          secondary: '#A8A8A8',
          muted: '#666666',
        }
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        accent: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}

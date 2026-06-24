/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        avocado: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#2d6a4f',
          600: '#256e4b',
          700: '#1b5e3a',
          800: '#14532d',
          900: '#0f3d23',
        },
        surface: {
          50: '#f8fafc',
          100: '#1e293b',
          200: '#1a1a2e',
          300: '#16213e',
          400: '#0f172a',
          500: '#0a0f1e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

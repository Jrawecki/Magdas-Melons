/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans 3', 'sans-serif'],
        display: ['Newsreader', 'serif'],
      },
      colors: {
        ink: '#141313',
        rindDark: '#1f4f3d',
        rindLight: '#cfe8d7',
        melonPink: '#f6d8df',
        melonDeep: '#d75872',
      },
      boxShadow: {
        soft: '0 14px 28px rgba(20, 19, 19, 0.12)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ffffff', // light background (white)
          DEFAULT: '#FFD600', // yellow accent
          dark: '#18181b', // dark background (black)
        },
        text: {
          light: '#18181b', // black text for light mode
          dark: '#FFD600', // yellow text for dark mode
        },
      },
    },
  },
  plugins: [lineClamp],
}

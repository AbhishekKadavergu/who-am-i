import type { Config } from 'tailwindcss';
import lineClamp from '@tailwindcss/line-clamp';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ffffff',
          DEFAULT: '#FFD600',
          dark: '#18181b',
        },
        text: {
          light: '#18181b',
          dark: '#FFD600',
        },
      },
    },
  },
  plugins: [lineClamp],
};

export default config;

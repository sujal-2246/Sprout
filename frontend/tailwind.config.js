/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base surfaces — cool near-black, not a flat #000, so cards and
        // borders still read as distinct layers.
        base: {
          DEFAULT: '#0B0C0E',
          surface: '#131417',
          raised: '#1A1B1F',
          border: '#212226',
        },
        ink: {
          DEFAULT: '#F2F3F5',
          muted: '#8A8D93',
          faint: '#55575D',
        },
        // "Sprout" green — the growth/new-leaf accent used for primary
        // actions, active filter states, and the stock indicator.
        sprout: {
          DEFAULT: '#6CDB8C',
          bright: '#8CF2A8',
          dim: '#3D8C56',
        },
        // Soil — an earthy secondary accent used sparingly (vendor badges)
        // so the whole UI isn't riding on a single green note.
        soil: {
          DEFAULT: '#B08968',
          dim: '#6E5640',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        breathe: 'breathe 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

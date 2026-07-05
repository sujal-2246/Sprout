/** @type {import('tailwindcss').Config} */

// Every color resolves through a CSS variable (see index.css :root / .dark)
// using the "rgb(var(--x) / <alpha-value>)" pattern. This is what lets
// `bg-base`, `text-ink`, etc. automatically repaint when the `dark` class
// is toggled on <html> — no component ever hardcodes a hex value.
function withOpacity(variable) {
  return `rgb(var(${variable}) / <alpha-value>)`;
}

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: withOpacity('--color-base'),
          surface: withOpacity('--color-surface'),
          raised: withOpacity('--color-raised'),
          border: withOpacity('--color-border'),
        },
        ink: {
          DEFAULT: withOpacity('--color-ink'),
          muted: withOpacity('--color-ink-muted'),
          faint: withOpacity('--color-ink-faint'),
        },
        sprout: {
          DEFAULT: withOpacity('--color-sprout'),
          bright: withOpacity('--color-sprout-bright'),
          dim: withOpacity('--color-sprout-dim'),
        },
        soil: {
          DEFAULT: withOpacity('--color-soil'),
          dim: withOpacity('--color-soil-dim'),
        },
        danger: {
          DEFAULT: withOpacity('--color-danger'),
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
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        breathe: 'breathe 1.8s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -12px rgb(0 0 0 / 0.18)',
        'soft-lg': '0 4px 12px rgb(0 0 0 / 0.08), 0 24px 48px -16px rgb(0 0 0 / 0.28)',
      },
    },
  },
  plugins: [],
};

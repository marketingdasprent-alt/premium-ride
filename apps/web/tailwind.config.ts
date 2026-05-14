import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#f5f0e8',
        card: {
          DEFAULT: '#111111',
        },
        muted: {
          foreground: '#9a9a9a',
        },
        gold: '#C9A84C',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      boxShadow: {
        gold: '0 0 40px rgba(201, 168, 76, 0.25), 0 8px 32px rgba(201, 168, 76, 0.12)',
      },
    },
  },
  plugins: [],
}

export default config

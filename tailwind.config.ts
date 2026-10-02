import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // JUFAJA Primary Design Tokens
        jufaja: {
          forest: {
            DEFAULT: '#163024',
            950: '#0d1e16',
            900: '#163024',
            800: '#1e4131',
            700: '#295540',
            600: '#387256',
            100: '#e5eee9',
            50: '#f2f7f4',
          },
          gold: {
            DEFAULT: '#c5a059',
            700: '#7a5e26',
            600: '#80622b',
            500: '#c5a059',
            400: '#dfc17b',
            300: '#ecd9a8',
            100: '#f9f5ec',
            50: '#fcfaf5',
          },
          burgundy: {
            DEFAULT: '#6b1d2f',
            900: '#3f0f1b',
            800: '#541624',
            700: '#6b1d2f',
            600: '#86253b',
            500: '#9e3049',
            100: '#f7eef0',
            50: '#fdf9fa',
          },
          ivory: '#faf8f5',
          stone: '#f4f1ea',
          cream: '#fdfbf7',
          charcoal: '#1a1a1a',
          muted: '#5c5852',
          border: '#e6e2da',
        },
        // Mapped for backwards-compatibility to existing code
        brand: {
          navy: '#163024', // Deep Forest Green
          surface: '#1e4131', // Forest Surface
          orange: '#c5a059', // Antique Gold
          'orange-hover': '#b58e45', // Deep Gold Hover
          dark: '#0d1e16',
          slate: '#5c5852',
          light: '#faf8f5', // Warm Ivory
          card: '#ffffff',
          border: '#e6e2da',
        },
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'Arial', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(22, 48, 36, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(22, 48, 36, 0.15)',
        'gold-glow': '0 0 25px -5px rgba(197, 160, 89, 0.35)',
        'jufaja-soft': '0 8px 24px rgba(22, 48, 36, 0.06)',
        'jufaja-card': '0 18px 40px rgba(22, 48, 36, 0.09)',
        'jufaja-elevated': '0 24px 56px rgba(22, 48, 36, 0.14)',
      },
    },
  },
  plugins: [],
};

export default config;

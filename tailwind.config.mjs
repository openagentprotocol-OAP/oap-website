/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        ink: {
          900: '#0A0A0B',
          800: '#101012',
          700: '#17171A',
          600: '#1E1E22',
          500: '#2A2A2F',
        },
        accent: {
          DEFAULT: '#818CF8',
          dim: '#6366F1',
          glow: 'rgba(99,102,241,0.18)',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgba(255,255,255,0.78)',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [],
};

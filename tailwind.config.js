export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#5dade2',
          DEFAULT: '#3498db',
          dark: '#2980b9',
        },
        secondary: {
          light: '#bb8fce',
          DEFAULT: '#9b59b6',
          dark: '#8e44ad',
        },
        accent: {
          light: '#eb984e',
          DEFAULT: '#e67e22',
          dark: '#d35400',
        },
        sorted: {
          light: '#7dcea0',
          DEFAULT: '#27ae60',
          dark: '#1e8449',
        },
        comparing: {
          light: '#ec7063',
          DEFAULT: '#e74c3c',
          dark: '#c0392b',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Jetbrains Mono', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
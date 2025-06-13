/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#25D366',
        secondary: '#075E54',
        accent: '#128C7E',
        surface: '#FFFFFF',
        background: '#F0F2F5',
        success: '#25D366',
        warning: '#FFA726',
        error: '#EF5350',
        info: '#29B6F6',
        'surface-50': '#f8fafc',
        'surface-100': '#f1f5f9',
        'surface-200': '#e2e8f0',
        'surface-300': '#cbd5e1',
        'surface-400': '#94a3b8',
        'surface-500': '#64748b',
        'surface-600': '#475569',
        'surface-700': '#334155',
        'surface-800': '#1e293b',
        'surface-900': '#0f172a'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        'bubble': '18px'
      },
      animation: {
        'typing': 'typing 1.5s ease-in-out infinite',
        'bounce-stagger': 'bounce 1.5s ease-in-out infinite'
      },
      keyframes: {
        typing: {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#090514',
        'secondary-bg': '#110B29',
        card: 'rgba(17, 11, 41, 0.6)',
        'card-hover': 'rgba(28, 19, 58, 0.7)',
        border: 'rgba(255, 255, 255, 0.1)',
        foreground: '#F5F7FA',
        'muted-foreground': '#94A3B8',
        adaptive: '#10B981',
        static: '#0EA5E9',
        warning: '#F59E0B',
        drift: '#EC4899',
        critical: '#F43F5E',
        neutral: '#8B5CF6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0C10',
          secondary: '#161A21',
          panel: '#1D2228',
          panel2: '#262C35',
          moss: '#4A5D4E',
          smoke: '#475569',
        },
        vanguard: {
          ice: '#A78BFA',
          teal: '#2DD4BF',
          ember: '#FB923C',
          breach: '#EF4444',
          verdant: '#4ADE80',
          slate: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Alegreya Sans SC', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 20px 80px rgba(0, 0, 0, 0.35), inset 0 0 1px rgba(255, 255, 255, 0.08)',
        'glass-hover': '0 24px 96px rgba(0, 0, 0, 0.45), inset 0 0 1px rgba(255, 255, 255, 0.12)',
        'vanguard': '0 0 40px rgba(45, 212, 191, 0.18), inset 0 0 1px rgba(255, 255, 255, 0.1)',
        'orb': '0 0 30px rgba(167, 139, 250, 0.35)',
      },
      backgroundImage: {
        'nebula': 'radial-gradient(circle at 20% 20%, rgba(45, 212, 191, 0.12), transparent 30%), radial-gradient(circle at 80% 10%, rgba(167, 139, 250, 0.14), transparent 24%), radial-gradient(circle at 50% 80%, rgba(251, 146, 60, 0.1), transparent 25%)',
      }
    },
  },
  plugins: [],
}

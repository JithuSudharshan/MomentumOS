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
          DEFAULT: '#050816',
          secondary: '#0B1020',
        },
        aurora: {
          purple: '#8B5CF6',
          cyan: '#22D3EE',
          green: '#34D399',
          orange: '#FDBA74',
          pink: '#FB7185',
        },

      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // We can use Inter or Clash Display if imported
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'orb-cyan': '0 0 40px 10px rgba(34, 211, 238, 0.3)',
        'orb-orange': '0 0 40px 10px rgba(253, 186, 116, 0.2)',
        'orb-purple': '0 0 40px 10px rgba(139, 92, 246, 0.3)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
}

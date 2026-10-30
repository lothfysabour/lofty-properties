/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette « Marrakech Luxury » — noms conservés pour ne pas toucher aux composants
        navy: {
          50:  '#F8F4EC',
          100: '#EFE6D8',
          200: '#DCC8AE',
          300: '#B9AA96',
          400: '#8C8277',
          500: '#625D57',
          600: '#47433F',
          700: '#33302D',
          800: '#262422',
          900: '#1C1C1C',
          950: '#121212',
        },
        miami: {
          cyan:   '#DCC8AE',
          pink:   '#A83232',
          orange: '#B76E50',
          gold:   '#DCC8AE',
        },
      },
      fontFamily: {
        sans:    ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'miami-gradient':        'linear-gradient(135deg, #A83232 0%, #B76E50 100%)',
        'miami-gradient-subtle': 'linear-gradient(135deg, rgba(220,200,174,0.10) 0%, rgba(183,110,80,0.08) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'from-miami-pink', 'to-miami-orange',
    'from-miami-orange', 'to-miami-pink',
    'from-navy-600', 'to-navy-800',
    'from-miami-cyan', 'to-navy-300',
  ],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px'
    },
    container: {
      center: true
    },
    extend: {
      keyframes: {
        loadingDot1: {
          '0%, 44%': { bottom: '0px' },
          '22%': { bottom: '3px' }
        },
        loadingDot2: {
          '0%, 66%': { bottom: '0px' },
          '44%': { bottom: '3px' }
        },
        loadingDot3: {
          '0%, 88%': { bottom: '0px' },
          '66%': { bottom: '3px' }
        },
        loadingRotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        ufo: {
          '0%': {top: '0px', left: '0px', transform: 'rotate(-30deg)'},
          '15%': {transform: 'rotate(-15deg)'},
          '45%': {top: '-8px',left: '15px', transform: 'rotate(-15deg)'},
          '50%': {top: '-12px'},
          '55%': {top: '-8px',left: '217px', transform: 'rotate(15deg)'},
          '85%': {transform: 'rotate(15deg)'},
          '100%': {top: '0px', left: '220px', transform: 'rotate(30deg)'}
        }
      }
    },
  },
  plugins: [],
}


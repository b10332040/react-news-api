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
          '0%': {top: '4px', left: '92px', transform: 'rotate(0deg)'},
          '20%': {top: '-2px', left: '90px', transform: 'rotate(-6deg)'},
          '50%': {top: '-8px', left: '92px', transform: 'rotate(0deg)'},
          '80%': {top: '-2px', left: '94px', transform: 'rotate(4deg)'},
          '100%': {top: '4px', left: '92px', transform: 'rotate(0deg)'}
        },
        float: {
          '0%': { bottom: '72px', transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(3deg)' },
          '50%': { bottom: '52px', transform: 'rotate(0deg)' },
          '80%': { transform: 'rotate(-2deg)' },
          '100%': { bottom: '72px', transform: 'rotate(0deg)' }
        }
      }
    },
  },
  plugins: [],
}


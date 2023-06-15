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
        }
      }
    },
  },
  plugins: [],
}


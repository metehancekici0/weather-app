/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "inter": ["'Inter'", "sans-serif"]
      },
      textShadow: {
        'custom': "0 2px 3px rgb(0 0 0 / 40%), 0 2px 5px rgb(0 0 0 / 10%), 0 18px 23px rgb(0 0 0 / 10%)"
      },
    },
    screens: {
      '2xl': { 'max': '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '1023px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-custom': {
          textShadow: '0px 2px 3px rgb(0 0 0 / 40%), 0px 2px 5px rgb(0 0 0 / 10%), 0px 18px 23px rgb(0 0 0 / 10%)',
        },
      }

      addUtilities(newUtilities)
    }
  ],
}


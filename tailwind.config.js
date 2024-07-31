/** @type {import('tailwindcss').Config} */
export default {
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


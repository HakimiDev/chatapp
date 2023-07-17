/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '300px',
      },
      colors: {
        primary: {
          50: "#162e30",
          100: "#1b3e42",
          200: "#ffffff",
          300: "#21646b",
          400: "#15373b",
          500: "#385457"
        }
      }
    },
  },
  plugins: [],
}
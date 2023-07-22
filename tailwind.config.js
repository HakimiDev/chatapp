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
        // primary: {
        //   50: "#162e30",
        //   100: "#1b3e42",
        //   200: "#ffffff",
        //   300: "#21646b",
        //   400: "#15373b",
        //   500: "#385457"
        // },

        // primary: {
        //   50: "#131c23",
        //   100: "#1e2b31",
        //   200: "#eee",
        //   300: "#005d4b",
        //   400: "#1e2b31",
        //   500: "#424b52"
        // },

        primary: {
          50: "#0f1526",
          100: "#151c30",
          200: "#f3f2f5",
          300: "#19223b"
        },

        secondary: {
          50: "#363e57",
          100: "#78c9b6",
          200: "#064220",
          300: "#128243",
          400: "#07572a"
        }
      }
    },
  },
  plugins: [],
}
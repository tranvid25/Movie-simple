/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM-Sans", "sans-serif"],
      },
      colors: {
        primary: "#f62682",
        secondary:"#6f5cf1",
        Three:"#9f4cf3"
      },
    },
  },
  plugins: [],
};

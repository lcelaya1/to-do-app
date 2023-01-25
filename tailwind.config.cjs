/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      lineHeight: {
        'extra-loose': '0.1',
      },
      colors: {
        'ikea-blue': '#4A88BC',
        'ikea-yellow': '#FCE34A',
      },
      container: {
        center: true,
        screens: {
          lg: "1124px",
          xl: "1124px",
          "2xl": "1124px",
        }
      }
    },
  },
  plugins: [],
};

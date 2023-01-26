/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      six: "375px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};

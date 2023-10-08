/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{pug, html}",
    "./views/**/*.{pug, html}",
    "./views/**/**/*.{pug, html}",
    "./views/**/**/**/*.{pug, html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  separator: "_",
};

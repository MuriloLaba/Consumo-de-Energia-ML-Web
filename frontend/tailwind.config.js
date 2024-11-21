/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: true, // Garante que o Preflight está ativado
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'html, body': {
          margin: 0,
          padding: 0,
          height: '100%',
          width: '100%',
          overflow: 'hidden', // Impede a rolagem
        },
        '*': {
          boxSizing: 'border-box',
        },
      });
    },
  ],
});

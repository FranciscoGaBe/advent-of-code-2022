/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f23',
        text: '#009900',
        glow: '#00cc00',
        'text-hover': '#99ff99',
      }
    },
  },
  plugins: [],
}

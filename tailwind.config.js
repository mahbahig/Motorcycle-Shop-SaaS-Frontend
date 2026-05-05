/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './node_modules/flowbite/**/*.js'],
  dark: 'selector',
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#e8edf5',
          100: '#c5d0e6',
          200: '#9fb1d5',
          300: '#7892c4',
          400: '#577db8',
          500: '#3568ab',
          600: '#2a5696',
          700: '#1e4080',
          800: '#132c6a',
          900: '#071854',
          950: '#030e36',
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};

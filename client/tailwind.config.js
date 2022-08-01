const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {

    fontFamily: {
      sans: ['Open Sauce Two', 'sans-serif'],
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: 'var(--c-primary)',
        white: 'var(--c-white)',
        black: 'var(--c-black)',
        slate: colors.slate,
        gray: colors.gray, // temporary, replace later with proper colors
      },
    },
  },
  plugins: [],
};

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: 'var(--c-primary)',
      white: 'var(--c-white)',
      black: 'var(--c-black)',
      slate: colors.slate,
      gray: colors.gray, // temporary, replace later with proper colors
    },
    fontFamily: {
      sans: ['Open Sauce Two', 'sans-serif'],
    },
    fontSize: {
      '3xs': '.438rem',
      '2xs': '.5rem',
      'xs': '.625rem',
      'sm': '.812rem',
      'base': '1rem',
      'lg': '1.25rem',
      'xl': '1.562rem',
      '2xl': '1.938rem',
      '3xl': '2.438rem',
      '4xl': '3.062rem',
      '5xl': '3.812rem',
    },
    spacing: {
      '1': '.312rem',
      '2': '.438rem',
      '3': '.5rem',
      '4': '.625rem',
      '5': '.812rem',
      '6': '1rem',
      '7': '1.25rem',
      '8': '1.562rem',
      '9': '1.938rem',
      '10': '2.438rem',
      '12': '3.062rem',
      '13': '3.812rem',
    },
    extend: {},
  },
  plugins: [],
};

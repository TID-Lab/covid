/**
 * custom tailwind configuration
 * refer to docs to see how this changes things: https://tailwindcss.com/docs/configuration
 * for css variables, refer to ./src/css/variables.css
 */

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
    fontSize: {
      '3xs': '.438rem',
      '2xs': '.5rem',
      xs: '.625rem',
      sm: '.812rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.562rem',
      '2xl': '1.938rem',
      '3xl': '2.438rem',
      '4xl': '3.062rem',
      '5xl': '3.812rem',
    },

    spacing: {
      0: '0px',
      0.5: '0.188rem',
      1: '.312rem',
      2: '.438rem',
      3: '.5rem',
      4: '.625rem',
      5: '.812rem',
      6: '1rem',
      7: '1.25rem',
      8: '1.562rem',
      9: '1.938rem',
      10: '2.438rem',
      12: '3.062rem',
      13: '3.812rem',
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: 'var(--c-primary)',
        white: 'var(--c-white)',
        black: colors.black,
        slate: colors.slate,
        tailwhite: colors.white,
        emerald: colors.emerald,
        red: colors.red,
        yellow: colors.yellow,

        gray: colors.gray, // temporary, replace later with proper colors
        blue: {
          100: 'var(--c-blue-100)',
          200: 'var(--c-blue-200)',
          300: 'var(--c-blue-300)',
          400: 'var(--c-blue-400)',
          500: 'var(--c-blue-500)',
          600: 'var(--c-blue-600)',
          700: 'var(--c-blue-700)',
          800: 'var(--c-blue-800)',
          900: 'var(--c-blue-900)',
        },
      },
      borderRadius: {
        none: '0',
        '3xs': '.438rem',
        '2xs': '.5rem',
        xs: '.625rem',
        sm: '.812rem',
        DEFAULT: '1rem',
        base: '1rem',
        lg: '1.25rem',
        xl: '1.562rem',
        '2xl': '1.938rem',
        '3xl': '2.438rem',
        '4xl': '3.062rem',
        '5xl': '3.812rem',
        full: '9999px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};

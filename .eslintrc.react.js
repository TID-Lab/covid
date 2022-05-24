module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  plugins: ['react-hooks', 'react'],
  rules: {
    'react/prop-types': [0],
    quotes: ['error', 'single'],
    semi: [1],
    'react/jsx-indent': [1],
    'no-multi-spaces': [1],
    indent: [2],
    'react/jsx-newline': [2, { prevent: true }],
    'no-trailing-spaces': [1],
    'no-multiple-empty-lines': [1, { max: 1 }],
    'space-infix-ops': [1],
    'object-curly-spacing': [1, 'always'],
    'comma-spacing': [1],
    'react-hooks/rules-of-hooks': 'error',
    'react/self-closing-comp': 1,
    'react/jsx-closing-tag-location': 1,
    'no-unreachable': 1,
    'react-hooks/exhaustive-deps': 'warn',
  },
};

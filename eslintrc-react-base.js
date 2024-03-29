module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    // 'plugin:react/recommended',
    // 'plugin:react-hooks/recommended',
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
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react-hooks', 'react'],
  rules: {
    'react/prop-types': [0],
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: [1],
    'react/jsx-indent': [1],
    'react/jsx-newline': [1],
    'no-multi-spaces': [1],
    'no-unused-vars': 'warn',
    'no-case-declarations': 'warn',
    'no-undef': 'warn',
    indent: ['warn', 2, {       // avoid conflict with jsx elements
      ignoredNodes: [
        'JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
    }],
    'react/jsx-key': 'warn',
    'no-trailing-spaces': [1],
    'no-multiple-empty-lines': [1, { max: 1 }],
    'space-infix-ops': [1],
    'object-curly-spacing': [1, 'always'],
    'comma-spacing': [1],
    'react-hooks/rules-of-hooks': 'warn',
    'react/self-closing-comp': 1,
    'react/jsx-closing-tag-location': 1,
    'no-unreachable': 1,
    'react-hooks/exhaustive-deps': 'off',
  },
};

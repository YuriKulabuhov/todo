module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'react/state-in-constructor': [0, 'never'],
    'class-methods-use-this': ['error', { enforceForClassFields: false }],
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/destructuring-assignment': [0, 'always', { ignoreClassFields: true, destructureInSignature: 'ignore' }],
  },
};

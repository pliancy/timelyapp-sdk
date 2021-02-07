module.exports = {
  root: true,
  extends: ['standard-with-typescript', 'prettier', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
  },
  ignorePatterns: ['.eslintrc.js', 'dist/**/*'],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 0,
  },
}

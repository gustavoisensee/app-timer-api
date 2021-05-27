module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    es6: true,
    'jest/globals': true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'standard'
  ],
  globals: {
    require: true,
    process: true,
    module: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-console': 1,
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ]
  }
}
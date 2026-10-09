const js = require('@eslint/js')
const prettier = require('eslint-config-prettier')
const globals = require('globals')

module.exports = [
  js.configs.recommended,
  prettier,
  {
    files: ['components/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: globals.node,
    },
  },
]

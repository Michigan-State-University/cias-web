const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

const baseRules = {
  'prettier/prettier': ['error', prettierOptions],
  'arrow-body-style': [2, 'as-needed'],
  'class-methods-use-this': 0,
  'import/imports-first': 0,
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'ignorePackages',
      jsx: 'ignorePackages',
      ts: 'ignorePackages',
      tsx: 'ignorePackages',
    },
  ],
  'import/newline-after-import': 0,
  'import/no-dynamic-require': 0,
  'import/no-extraneous-dependencies': 0,
  'import/no-named-as-default': 0,
  'import/no-unresolved': 2,
  'import/no-webpack-loader-syntax': 0,
  'import/prefer-default-export': 0,
  'jsdoc/no-undefined-types': 1,
  'jsx-a11y/aria-props': 2,
  'jsx-a11y/heading-has-content': 0,
  'jsx-a11y/label-has-associated-control': [
    2,
    {
      // NOTE: If this error triggers, either disable it or add
      // your custom components, labels and attributes via these options
      // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
      controlComponents: ['Input'],
    },
  ],
  'jsx-a11y/label-has-for': 0,
  'jsx-a11y/mouse-events-have-key-events': 2,
  'jsx-a11y/click-events-have-key-events': 0,
  'jsx-a11y/no-static-element-interactions': 0,
  'jsx-a11y/role-has-required-aria-props': 2,
  'jsx-a11y/role-supports-aria-props': 2,
  'max-len': 0,
  'newline-per-chained-call': 0,
  'no-confusing-arrow': 0,
  'no-console': 1,
  'no-case-declarations': 0,
  'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
  'no-unused-vars': 2,
  'no-use-before-define': 0,
  'prefer-template': 2,
  'react/destructuring-assignment': 0,
  'react-hooks/rules-of-hooks': 'error',
  'react/jsx-closing-tag-location': 0,
  'react/forbid-prop-types': 0,
  'react/jsx-first-prop-new-line': [2, 'multiline'],
  'react/jsx-filename-extension': 0,
  'react/jsx-no-target-blank': 0,
  'react/jsx-uses-vars': 2,
  'react/require-default-props': 0,
  'react/require-extension': 0,
  'react/self-closing-comp': 0,
  'react/sort-comp': 0,
  'react/no-array-index-key': 0,
  'redux-saga/no-yield-in-race': 2,
  'redux-saga/yield-effects': 2,
  'require-yield': 0,
  'consistent-return': 0,
  'react/no-danger': 0,
  'react/jsx-props-no-spreading': 0,
  'react/jsx-fragments': 1,
};

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: [
    'prettier',
    'redux-saga',
    'react',
    'react-hooks',
    'jsx-a11y',
    'jsdoc',
  ],
  env: {
    jest: true,
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: baseRules,
  settings: {
    'import/resolver': {
      webpack: {
        config: './internals/webpack/webpack.prod.babel.js',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    jsdoc: {
      mode: 'typescript',
    },
  },
  ignorePatterns: [
    'mjml',
    'internals/**/*',
    '*.setup.js',
    'cypress/support/*.ts',
    'app/utils/libraries/*',
    '.vscode/.history/**/*',
  ],
  globals: {
    cy: 'readonly',
    Cypress: 'readonly',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      extends: ['airbnb', 'airbnb-typescript', 'plugin:prettier/recommended'],
      plugins: ['@typescript-eslint', 'import'],
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
            project: './tsconfig.json',
          },
        },
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
      },
      rules: {
        ...baseRules,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-use-before-define': 0,
        'react/no-unused-prop-types': 0,
      },
    },
  ],
};

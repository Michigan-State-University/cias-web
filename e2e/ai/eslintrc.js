// Lint rules for e2e code the AI pipeline writes (see CONVENTIONS.md). Runs
// standalone on those files only: the existing suite wouldn't pass them.
const fs = require('fs');
const path = require('path');

const { e2e } = require('./pipeline.config.json');

const repoRoot = path.resolve(__dirname, '../..');
const prettierOptions = JSON.parse(
  fs.readFileSync(path.join(repoRoot, '.prettierrc'), 'utf8'),
);

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: path.join(repoRoot, e2e.dir, 'tsconfig.json'),
  },
  plugins: ['@typescript-eslint', 'playwright', 'prettier'],
  extends: ['plugin:playwright/recommended'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],

    '@typescript-eslint/no-floating-promises': 'error',
    'playwright/missing-playwright-await': 'error',
    'playwright/no-useless-await': 'error',

    'playwright/no-wait-for-timeout': 'error',
    'playwright/no-networkidle': 'error',
    'playwright/no-wait-for-selector': 'error',
    'playwright/no-wait-for-navigation': 'error',
    'playwright/prefer-web-first-assertions': 'error',

    'playwright/no-force-option': 'error',
    'playwright/no-element-handle': 'error',
    'playwright/no-eval': 'error',
    'playwright/no-page-pause': 'error',
    'playwright/no-focused-test': 'error',
    'playwright/no-conditional-in-test': 'error',
    'playwright/no-conditional-expect': 'error',
    'playwright/valid-expect': 'error',

    // Page-object assertion helpers (expectSessionCount, …) count as assertions.
    'playwright/expect-expect': [
      'error',
      { assertFunctionPatterns: ['^expect[A-Z]'] },
    ],
  },
  overrides: [
    {
      // CommonJS scripts sit outside e2e/tsconfig.json: no type-aware rules.
      files: ['*.js'],
      parserOptions: { project: null },
      rules: { '@typescript-eslint/no-floating-promises': 'off' },
    },
  ],
};

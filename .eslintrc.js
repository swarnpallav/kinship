module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  globals: {
    __DEV__: 'readonly',
    document: 'readonly',
    window: 'readonly',
  },
  extends: ['eslint:recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    // General ESLint rules
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': 'off', // TypeScript handles this
    'prefer-const': 'error',
    'no-var': 'error',
  },
  overrides: [
    // Test files
    {
      files: ['**/__tests__/**/*', '**/*.test.*', '**/*.spec.*'],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
    // Configuration files
    {
      files: ['*.config.js', '*.config.ts', 'babel.config.js', 'jest.setup.js'],
      env: {
        node: true,
        jest: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    '.expo/',
    'web-build/',
    'coverage/',
    '*.generated.*',
  ],
}

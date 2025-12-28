
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  // JavaScript files config
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser, // or globals.node if Node environment
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    extends: [
      'plugin:js/recommended',       // js plugin recommended rules
      'plugin:prettier/recommended', // prettier plugin recommended to enable prettier as an eslint rule
    ],
    rules: {
      // override or add any JS specific rules here
      'no-debugger': 'warn',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'all',
          printWidth: 100,
          tabWidth: 2,
        },
      ],
    },
  },

  // TypeScript files config
  {
    files: ['**/*.{ts,mts,cts}'],
    languageOptions: {
      globals: globals.browser, // or node, depending on environment
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.eslint.json',      
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended', // to run prettier as eslint rule
    ],
    rules: {
      // Your custom rules here, for example:
      '@typescript-eslint/no-unused-vars': ['error'],
      'no-undef': 'off', // TS handles this
      'no-debugger': 'warn',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'all',
          printWidth: 100,
          tabWidth: 2,
        },
      ],
      // You can spread prettierConfig.rules here if you want
      ...prettierConfig.rules,
    },
  },

  // Ignore common build output folders
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
]);

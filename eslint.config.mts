import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintPluginPrettier from "eslint-plugin-prettier";
import prettier from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js, prettier: eslintPluginPrettier },
    extends: ["js/recommended", prettier],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser, // Use TypeScript parser for TS files
      parserOptions: {
        project: "./tsconfig.eslint.json", // Path to tsconfig for TypeScript rules
        sourceType: "module",
      },
    },

    rules: {
      "no-unused-vars": "error",
      "no-undef": "off", // Disable `no-undef` for better compatibility with globals
      "prefer-const": "error",
      // "no-console": "warn",
      "no-debugger": "warn",
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: true,
          trailingComma: "all",
          printWidth: 100,
          tabWidth: 2,
        },
      ],
    },
  },
  tseslint.configs.recommended,
  tseslint.configs.recommended, // Integrate TypeScript linting
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"], // Ignore common build folders
  },
]);

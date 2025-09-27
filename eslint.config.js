// Importing base ESLint JavaScript rules
import js from '@eslint/js'

// Importing commonly used global variables (like window, document, etc.)
import globals from 'globals'

// ESLint plugin to enforce React hooks rules (ensures proper hook usage)
import reactHooks from 'eslint-plugin-react-hooks'

// ESLint plugin to support React Fast Refresh (hot reloading in dev mode)
import reactRefresh from 'eslint-plugin-react-refresh'

// TypeScript-specific ESLint configuration and rules
import tseslint from 'typescript-eslint'

// ESLint utility to specify global ignore patterns (files/folders to exclude)
import { globalIgnores } from 'eslint/config'

/** 
  Export the ESLint configuration object.
 Function:
  Specifies linting rules and environment for a TypeScript + React project
  using ESLint. Enforces a consistent code style, avoids bugs,
  and works with current React development tools.
 Input:
  Accepts no runtime input (this is a static config).
  The config is automatically applied by ESLint as it scans
  project files.
 Output:
Returns a formatted ESLint config object that ESLint employs to figure out how to lint `.ts` and `.tsx` files.
Business Logic:
 1. Exclude build output (`dist`) so ESLint does not waste time on compiled code.
 2. Only enforce linting rules on TypeScript files (`.ts`, `.tsx`).
 3. Extend recommended configs:
 - ESLint's base JavaScript rules (`@eslint/js`).
 - Recommended TypeScript rules (`typescript-eslint`).
 - Latest React hook best practices (`eslint-plugin-react-hooks`).
 - React Fast Refresh rules for Vite (`eslint-plugin-react-refresh`).
 4. Configure the JavaScript language environment:
  - Set ECMAScript version to 2020 for supporting modern syntax.
  - Allow browser globals (`window`, `document`, etc.). */

export default tseslint.config([
  // Exclude dist/ from linting
  globalIgnores(['dist']),
  {
    // Target only TypeScript and TSX files
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,               // Base ESLint JS rules
      tseslint.configs.recommended,         // Recommended TypeScript rules
      reactHooks.configs['recommended-latest'], // Enforce React hooks best practices
      reactRefresh.configs.vite,            // Ensure compatibility with Vite React Refresh
    ],
    languageOptions: {
      ecmaVersion: 2020,    // Allow modern JS syntax (e.g., optional chaining, nullish coalescing)
      globals: globals.browser, // Allow common browser globals
    },
  },
])

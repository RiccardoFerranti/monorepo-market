import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      import: importPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "next/**", group: "external", position: "before" },

            // monorepo packages first
            { pattern: "@repo/**", group: "internal", position: "before" },

            // app alias after monorepo packages, but still internal
            { pattern: "@/**", group: "internal", position: "after" },
          ],
          // exclude whole groups, not package names
          pathGroupsExcludedImportTypes: ["builtin"],

          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
  // allow console in tests
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"],
    rules: { "no-console": "off" },
  },

  // allow console in this specific util
  {
    files: ["**/log-group.{js,ts}"],
    rules: { "no-console": "off" },
  },
  // enforce I/T/E naming only in src
  {
    files: ["**/src/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "interface", format: ["PascalCase"], prefix: ["I"] },
        { selector: "typeAlias", format: ["PascalCase"], prefix: ["T"] },
        { selector: "enum", format: ["StrictPascalCase"], prefix: ["E"] },
      ],
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", ".next/**", "out/**", "build/**"],
  },
];

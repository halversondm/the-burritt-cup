import js from "@eslint/js";
import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist"] },
  js.configs.recommended,
  ...tsPlugin.configs["flat/recommended"],
  reactHooks.configs["recommended-latest"],
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2020 },
    },
    plugins: { "react-refresh": reactRefresh },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  prettier,
];

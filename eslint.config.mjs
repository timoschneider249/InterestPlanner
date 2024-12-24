import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import eslintPluginImport from "eslint-plugin-import";
import eslintConfigGoogle from "eslint-config-google";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        MAIN_WINDOW_VITE_DEV_SERVER_URL: "readonly",
        MAIN_WINDOW_VITE_NAME: "readonly",
      },
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      import: eslintPluginImport,
      vue: pluginVue,
    },
    rules: {
      ...eslintConfigGoogle.rules,
      "quotes": ["error", "double"],
      "object-curly-spacing": ["off"], // Allow no space inside curly braces
      "max-len": ["error", { code: 120 }], // Set max line length to 120
    },
  },
];

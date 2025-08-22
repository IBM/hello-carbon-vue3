import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginCypress from "eslint-plugin-cypress/flat";
import stylistic from "@stylistic/eslint-plugin";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],

  {
    ...pluginCypress.configs.recommended,
    files: [
      "**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}",
      "cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
      "cypress/support/**/*.{js,ts,jsx,tsx}",
    ],
  },
  stylistic.configs.customize({
    "quotes": "double",
    "semi": true,
    "arrow-parens": "as-needed",
  }),
  {
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "vue/component-tags-order": [
        "warn",
        {
          order: ["script", "template", "style"],
        },
      ],
    },
  },
];

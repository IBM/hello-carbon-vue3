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
  stylistic.configs["recommended-flat"],
  stylistic.configs.customize({
    quotes: "double",
    semi: true,
  }),
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
  {
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "vue/no-deprecated-slot-attribute": "off",
      "vue/multi-word-component-names": "off",
      "vue/component-tags-order": [
        "warn",
        {
          order: [
            "script",
            "template",
            "style",
          ],
        },
      ],
    },
  },
];

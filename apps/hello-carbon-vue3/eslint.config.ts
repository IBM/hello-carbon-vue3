import { globalIgnores } from "eslint/config";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pluginCypress from "eslint-plugin-cypress";
import stylistic from "@stylistic/eslint-plugin";

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,

  {
    plugins: {
      cypress: pluginCypress,
    },
  },
  stylistic.configs.customize({
    "quotes": "double",
    "semi": true,
    // @ts-expect-error does too exist
    "arrow-parens": "as-needed",
  }),
  {
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "vue/multi-word-component-names": "off",
      "vue/component-tags-order": [
        "warn",
        {
          order: ["script", "template", "style"],
        },
      ],
      "vue/component-name-in-template-casing": ["error", "PascalCase", {
        registeredComponentsOnly: true,
        ignores: [],
      }],
    },
  },

);

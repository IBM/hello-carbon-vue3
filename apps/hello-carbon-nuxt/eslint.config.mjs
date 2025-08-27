// @ts-check
import js from '@eslint/js'
// @ts-ignore
import tailwind from 'eslint-plugin-tailwindcss'
// @ts-ignore
import pluginCypress from 'eslint-plugin-cypress/flat'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...tailwind.configs['flat/recommended'],

  {
    ...pluginCypress.configs.recommended,
    files: [
      '**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
  },

  {
    rules: {
      // baseline rules
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'vue/multi-word-component-names': 'off',
      'vue/block-order': [
        'warn',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: true,
          ignores: [],
        },
      ],

      // Existing Nuxt app preferences
      'tailwindcss/no-custom-classname': 'off',
    },
  },
],
)

// @ts-check
import stylistic from '@stylistic/eslint-plugin'
import tailwind from 'eslint-plugin-tailwindcss'
import pluginVue from 'eslint-plugin-vue'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  stylistic.configs['recommended-flat'],
  ...tailwind.configs['flat/recommended'],
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'vue/component-tags-order': [
        'warn',
        {
          order: [
            'script',
            'template',
            'style',
          ],
        },
      ],
    },
  },
],
)

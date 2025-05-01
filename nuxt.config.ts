// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@sidebase/nuxt-auth',
  ],
  devtools: { enabled: import.meta.env.DEV },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET,
  },
  sourcemap: import.meta.env.DEV,
  devServer: {
    port: 4507,
  },
  compatibilityDate: '2024-11-01',
  auth: {
    // Override with AUTH_ORIGIN environment variable in production
    // https://auth.sidebase.io/guide/application-side/configuration#originenvkey
    baseURL: 'http://localhost:4507/api/auth',
    isEnabled: true,
    provider: {
      type: 'authjs',
      defaultProvider: process.env.AUTH_PROVIDER || 'ibmid',
    },
    sessionRefresh: {
      enablePeriodically: 1000 * 60 * 10, // 10 minutes
      enableOnWindowFocus: true,
    },
    globalAppMiddleware: true, // enable to protect the entire app
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  i18n: {
    // See other options here https://i18n.nuxtjs.org/docs/guide#strategies
    strategy: 'no_prefix',
    // I prefer the cookie-less option but other options are available
    // https://i18n.nuxtjs.org/docs/guide/browser-language-detection
    detectBrowserLanguage: {
      useCookie: false,
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en-US.json',
      },
      {
        code: 'fr',
        name: 'French',
        file: 'fr-FR.json',
      },
    ],
    lazy: true,
    defaultLocale: 'en',
  },

  // TODO: revisit this for Carbon 11
  // Do not add Carbon anything here - it will cause loops and fail
  // css: ['@/assets/scss/theme.scss'],
  // You might see this solution from a search. This does not work either.
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: '@use "@/assets/scss/theme.scss" as *;',
  //       },
  //     },
  //   },
  // },
})

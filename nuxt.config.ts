// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@sidebase/nuxt-auth',
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET,
  },
  devServer: {
    port: 4507,
  },
  compatibilityDate: '2024-11-01',
  auth: {
    isEnabled: true,
    provider: {
      type: 'authjs',
      trustHost: true,
      defaultProvider: 'ibmid',
    },
    sessionRefresh: {
      enablePeriodically: 1000 * 60 * 10, // 10 minutes
      enableOnWindowFocus: true,
    },
    globalAppMiddleware: false, // enable to protect the entire app
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

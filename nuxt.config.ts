// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 4507,
  }
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

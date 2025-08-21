export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (message, instance) => {
    console.error('OUR ERROR HANDLER', message, instance)
  }
})

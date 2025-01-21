export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (mesaage, instance) => {
    console.error('ERROR', mesaage, instance)
  }
})

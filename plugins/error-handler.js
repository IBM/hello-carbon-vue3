export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (warning, instance) => {
    // if (warning?.includes('rendered on server: id=')) return

    console.warn('WARNING', warning, instance)
  }
})

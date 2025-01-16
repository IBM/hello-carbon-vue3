const characterData = ref({})
export const useMarvelCharacters = () =>
  useState('marvel-characters', () => {
    const nuxtApp = useNuxtApp()
    useLazyFetch('/api/characters', {
      onResponse({ response }) {
        // Process the response data
        characterData.value = response._data
      },
      onResponseError() {
        // Handle the response errors
        characterData.value.data.results = [{ error: true }]
      },
      getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      },
    })

    return characterData
  })

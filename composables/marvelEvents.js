const marvelEventData = ref({
  copyright: '© 2024 MARVEL',
  attributionText: 'Data provided by Marvel. © 2024 MARVEL',
  data: {
    offset: 0,
    limit: 0,
    total: 0,
    count: 0,
    results: [
      { loading: true },
      { loading: true },
      { loading: true },
      { loading: true },
    ],
  },
})

export const useMarvelEvents = () =>
  useState('marvel-events', () => {
    const nuxtApp = useNuxtApp()
    useLazyFetch('/api/events', {
      onResponse({ response }) {
        // Process the response data
        marvelEventData.value = response._data
      },
      onResponseError() {
        // Handle the response errors
        marvelEventData.value.data.results = [{ error: true }]
      },
      getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      },
    })

    return marvelEventData
  })

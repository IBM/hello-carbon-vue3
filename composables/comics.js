/** @typedef {object} ComicsData
 * @property {number} code
 * @property {string} status
 * @property {string} copyright
 * @property {string} attributionText
 * @property {string} attributionHTML
 * @property {string} etag
 * @property {object} data
 * @property {number} data.offset
 * @property {number} data.limit
 * @property {number} data.total
 * @property {number} data.count
 * @property {Array<object>} data.results
 */

const comicData = ref({
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

export const useComics = () =>
  useState('counter', () => {
    const nuxtApp = useNuxtApp()
    useLazyFetch('/api/comics', {
      onResponse({ response }) {
        // Process the response data
        comicData.value = response._data
      },
      onResponseError() {
        // Handle the response errors
        comicData.value.data.results = [{ error: true }]
      },
      getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      },
    })

    return comicData
  })

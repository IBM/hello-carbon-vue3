export default defineCachedEventHandler(
  (event) => {
    console.log('calling marvel')
    return $fetch(`${event.context.marvel.url}v1/public/comics`, {
      query: { ...event.context.marvel.query },
    })
  },
  { maxAge: 60 * 60 * 24,
    name: 'marvel-comics', getKey: () => 'default' })

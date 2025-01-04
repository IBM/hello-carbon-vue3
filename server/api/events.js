export default defineEventHandler((event) => {
  return $fetch(`${event.context.marvel.url}v1/public/events`, {
    query: { ...event.context.marvel.query },
  })
})

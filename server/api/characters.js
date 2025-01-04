export default defineEventHandler(async (event) => {
  return $fetch(`${event.context.marvel.url}v1/public/characters`, {
    query: { ...event.context.marvel.query },
  })
})

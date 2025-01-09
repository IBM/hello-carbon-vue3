export default defineCachedEventHandler(
  (event) => {
    const logger = useWinstonLogger('characters')

    const offset = Math.floor(Math.random() * 1400)
    logger.log('info', `calling marvel for characters at offset ${offset}`)
    return $fetch(`${event.context.marvel.url}v1/public/characters`, {
      query: { ...event.context.marvel.query, offset, limit: 10 },
    })
  },
  { maxAge: 60 * 60 * 24,
    name: 'marvel-characters', getKey: () => 'default' })

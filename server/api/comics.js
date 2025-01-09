export default defineCachedEventHandler(
  (event) => {
    const logger = useWinstonLogger('comics')

    const offset = Math.floor(Math.random() * 60000)
    logger.log('info', `calling marvel for comics at offset ${offset}`)
    return $fetch(`${event.context.marvel.url}v1/public/comics`, {
      query: { ...event.context.marvel.query, offset },
    })
  },
  { maxAge: 60 * 60 * 24,
    name: 'marvel-comics', getKey: () => 'default' })

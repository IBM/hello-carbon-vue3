export default defineCachedEventHandler(
  (event) => {
    const logger = useWinstonLogger('marvel-events')

    const offset = Math.floor(Math.random() * 50)
    logger.log('info', `calling marvel for events at offset ${offset}`)
    return $fetch(`${event.context.marvel.url}v1/public/events`, {
      query: { ...event.context.marvel.query, offset },
    })
  },
  { maxAge: 60 * 60 * 24,
    name: 'marvel-events', getKey: () => 'default' })

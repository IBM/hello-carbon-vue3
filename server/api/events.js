export default defineCachedEventHandler(
  (event) => {
    const logger = useWinstonLogger('marvel-events')

    logger.log('info', 'calling marvel for events')
    return $fetch(`${event.context.marvel.url}v1/public/events`, {
      query: { ...event.context.marvel.query, limit: 100 },
    })
  },
  { maxAge: 60 * 60 * 24,
    name: 'marvel-events', getKey: () => 'default' })

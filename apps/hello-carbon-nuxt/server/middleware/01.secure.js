export default eventHandler(async (event) => {
  const exclude = event?.req?.headers?.['x-middleware-subrequest']
  if (exclude) {
    throw createError({
      statusCode: 400,
    })
  }
})

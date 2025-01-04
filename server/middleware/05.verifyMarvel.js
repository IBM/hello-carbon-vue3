import crypto from 'node:crypto'

export default defineEventHandler((event) => {
  const apikey = process.env.MARVEL_APIKEY
  if (!apikey) {
    throw createError({
      statusCode: 400,
      statusMessage: 'apikey not defined',
    })
  }
  const privateKey = process.env.MARVEL_PRIVATE_KEY
  if (!privateKey) {
    throw createError({
      statusCode: 400,
      statusMessage: 'private key not defined',
    })
  }
  const url = process.env.MARVEL_URL
  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'marvel url not defined',
    })
  }
  const ts = `${Date.now()}`
  const data = `${ts}${privateKey}${apikey}`
  const hash = crypto.createHash('md5').update(data).digest('hex')
  event.context.marvel = { url, query: { ts, apikey, hash } }
})

// file: ~/server/middleware/auth.ts
import { getServerSession } from '#auth'

const protectedPaths = [
  '/api/comics',
  '/api/characters',
  '/api/events',
]
export default eventHandler(async (event) => {
  const path = event.path.split('?')[0]

  if (protectedPaths.includes(path)) {
    const session = await getServerSession(event)
    if (!session) {
      throw createError({
        statusMessage: 'Unauthenticated',
        statusCode: 403,
      })
    }
  }
})

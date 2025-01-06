import merge from 'lodash.merge'
import { NuxtAuthHandler } from '#auth'

const runtimeConfig = useRuntimeConfig()

console.log({
  secret: runtimeConfig.authSecret.slice(0, 3) + '...',
  type: 'oauth',
  id: process.env.AUTH_ID,
  name: process.env.AUTH_NAME,
  clientId: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET.slice(0, 3) + '...',
  wellKnown: process.env.NUXT_AUTH_DISCOVERY,
})
export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption - NUXT_AUTH_SECRET required in production
  secret: runtimeConfig.authSecret,
  providers: [
    {
      type: 'oauth',
      id: process.env.AUTH_ID,
      name: process.env.AUTH_NAME,
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      wellKnown: process.env.AUTH_DISCOVERY,
      authorization: { params: { scope: 'openid email' } },
      profile(profile) {
        // enable these to debug
        // console.log('profile callback', profile)
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        }
      },
    },
  ],
  callbacks: {
    jwt({ token, account, profile }) {
      // enable these to debug
      // console.log('jwt profile', profile)
      // console.log('jwt account', account)
      // console.log('jwt token', token)
      if (account) {
        token.provider = account.provider
      }
      if (profile) {
        token.emailVerified = profile.email_verified
      }
      return token
    },
    session({ session, token }) {
      // enable these to debug
      // console.log('session', session)
      // console.log('session token', token)

      // Return the modified session
      return merge(session, { user: { sub: token.sub, provider: token.provider, emailVerified: token.emailVerified } })
    },
  },
})

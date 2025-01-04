import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption - NUXT_AUTH_SECRET required in production
  secret: useRuntimeConfig().authSecret,
  providers: [
    {
      id: 'ibmid',
      name: 'IBMid',
      type: 'oauth',
      authorization: { params: { scope: 'openid email profile' } },
      clientId: '123456',
      clientSecret: '789012',
      wellKnown: 'http://localhost:8080/realms/ibmid/.well-known/openid-configuration',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        }
      },
    },
  ],
})

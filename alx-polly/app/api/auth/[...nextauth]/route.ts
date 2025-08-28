import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more configuration, such as an
     * environment variable for the client ID and client secret.
     * https://next-auth.js.org/configuration/providers
     */
  ],
  /**
   * Callbacks are asynchronous functions you can use to control what happens
   * when an action is performed.
   * https://next-auth.js.org/configuration/callbacks
   */
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  },
})

export { handler as GET, handler as POST }

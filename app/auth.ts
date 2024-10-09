import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async credentials => {
				// TODO: Maybe use Zod for schema validationss?
				// HACK: Why is this hardcoded?
				if (
					credentials.email === process.env.DEFAULT_EMAIL &&
					credentials.password === process.env.DEFAULT_PASS
				)
					return {}

				throw new CredentialsSignin('Invalid credentials.')
			},
		}),
	],

	callbacks: {
		authorized: async ({ auth }) => !!auth,
	},

	pages: {
		signIn: '/login',
	},
})

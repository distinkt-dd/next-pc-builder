import { prisma } from '@/lib/db'
import * as bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, auth, signIn, signOut } = NextAuth({
	trustHost: true,
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		Credentials({
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
				},
				password: {
					label: 'Пароль',
					type: 'password',
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || typeof credentials.email !== 'string') {
					return null
				}

				if (
					!credentials?.password ||
					typeof credentials.password !== 'string'
				) {
					return null
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				})

				if (!user) {
					return null
				}

				const valid = await bcrypt.compare(credentials.password, user?.password)

				if (!valid) {
					return null
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
				}
			},
		}),
	],
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/login',
	},
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.name = user.name
				token.email = user.email
			}
			return token
		},
		session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string
				session.user.email = token.email as string
				session.user.name = token.name
			}
			return session
		},
	},
})

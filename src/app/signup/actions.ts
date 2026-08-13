'use server'

import { prisma } from '@/lib/db'

import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'

const MIN_PASSWORD_LENGTH = 8
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type SignupState = {
	error?: string
}

export async function signupAction(
	_prevState: SignupState | null,
	formData: FormData,
): Promise<SignupState> {
	const name = formData.get('name') as string | undefined
	const email = formData.get('email') as string | undefined
	const password = formData.get('password') as string | undefined

	if (!email) {
		return {
			error: 'Введите email!',
		}
	}

	if (!EMAIL_REGEX.test(email)) {
		return {
			error: 'Email не корректен!',
		}
	}

	if (!password || password.length < MIN_PASSWORD_LENGTH) {
		return {
			error: 'Пароля нет или он слишком короткий! Не менее 8 символов!',
		}
	}

	const existing = await prisma.user.findUnique({
		where: { email },
	})

	if (existing) {
		return {
			error: 'Email уже занят!',
		}
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	try {
		await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
			},
		})
	} catch (error) {
		return {
			error: 'Ошибка регистрации!',
		}
	}

	redirect('/login')
}

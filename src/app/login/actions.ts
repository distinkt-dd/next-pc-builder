'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

export type LoginState = {
	error?: string
}

export async function loginAction(
	_prevState: LoginState | null,
	formData: FormData,
): Promise<LoginState> {
	const email = String(formData.get('email')).trim() as string
	const password = String(formData.get('password')).trim() as string

	if (!email || !password) {
		return {
			error: 'Введите email или пароль!',
		}
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: '/dashboard',
		})
		redirect('/dashboard')
	} catch (err) {
		if (err instanceof AuthError) {
			if (err.type === 'CredentialsSignin') {
				return {
					error: 'Не верный email или пароль!',
				}
			}
			return { error: 'Ошибка авторизации!' }
		}
		throw err
	}
}

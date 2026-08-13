'use client'

import { loginAction, LoginState } from '@/app/login/actions'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useActionState } from 'react'

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const [state, formAction] = useActionState<LoginState | null, FormData>(
		loginAction,
		null,
	)
	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className='text-mono'>Вход в аккаунт</CardTitle>
					<CardDescription>
						Введите email, чтобы войти в аккаунт
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={formAction}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor='email'>Email</FieldLabel>
								<Input
									id='email'
									type='email'
									name='email'
									placeholder='example@example.com'
									required
								/>
							</Field>
							<Field>
								<div className='flex items-center'>
									<FieldLabel htmlFor='password'>Пароль</FieldLabel>
								</div>
								<Input id='password' type='password' required name='password' />
							</Field>
							<Field>
								<Button type='submit'>Войти</Button>
								<FieldDescription className='text-center'>
									У вас нет аккаунта?{' '}
									<Link href='/signup'>Зарегистрироваться</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
					{state?.error && <p className='text-red-500'>{state.error}</p>}
				</CardContent>
			</Card>
		</div>
	)
}

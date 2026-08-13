'use client'

import { signupAction, SignupState } from '@/app/signup/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useActionState } from 'react'

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
	const [state, formAction] = useActionState<SignupState | null, FormData>(
		signupAction,
		null,
	)

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Создать аккаунт</CardTitle>
			</CardHeader>
			<CardContent>
				<form action={formAction}>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor='name'>Имя</FieldLabel>
							<Input
								id='name'
								name='name'
								type='text'
								placeholder='John Doe'
								required
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor='email'>Email</FieldLabel>
							<Input
								name='email'
								id='email'
								type='email'
								placeholder='example@example.com'
								required
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor='password'>Пароль</FieldLabel>
							<Input name='password' id='password' type='password' required />
							<FieldDescription>
								Пароль должен быть больше 8 символов
							</FieldDescription>
						</Field>
						<FieldGroup>
							<Field>
								<Button type='submit'>Создать аккаунт</Button>
								<FieldDescription className='px-6 text-center'>
									У вас уже есть аккаунт? <Link href='/login'>Войти</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
				{state?.error ? <p className='text-red-500'>{state.error}</p> : ''}
			</CardContent>
		</Card>
	)
}

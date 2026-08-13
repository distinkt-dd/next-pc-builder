'use client'

import { getTabValue } from '@/lib/utils'
import { LayoutList, Plus, Users } from 'lucide-react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'

interface Props {
	session: Session | null
}

export function HeaderNav({ session }: Props) {
	const pathname = usePathname()

	const tabValue = getTabValue(pathname)
	if (!session?.user) {
		return (
			<div className='flex items-center justify-end'>
				<Button variant='secondary'>
					<Link href='/login'>Войти</Link>
				</Button>
				<Button variant='secondary'>
					<Link href='/signup'>Зарегистрироваться</Link>
				</Button>
			</div>
		)
	}

	return (
		<div className='flex flex-1 justify-between items-center gap-4'>
			<div />
			<div className='flex justify-center'>
				<Tabs value={tabValue} className='w-fit'>
					<TabsList>
						<TabsTrigger value='dashboard' asChild>
							<Link href='/dashboard'>
								<Plus className='h-4 w-4' />
								Создать сборку
							</Link>
						</TabsTrigger>
						<TabsTrigger value='builds' asChild>
							<Link href='/builds'>
								<LayoutList className='h-4 w-4' />
								Мои сборки
							</Link>
						</TabsTrigger>
						<TabsTrigger value='explore' asChild>
							<Link href='/builds/explore'>
								<Users className='h-4 w-4' />
								Публичные сборки
							</Link>
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
			<div className='flex justify-end'>
				<Button
					className='cursor-pointer'
					variant='secondary'
					size='sm'
					type='button'
					onClick={() => signOut({ redirectTo: '/' })}
				>
					Выйти
				</Button>
			</div>
		</div>
	)
}

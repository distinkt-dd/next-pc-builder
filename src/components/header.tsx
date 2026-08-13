import { auth } from '@/auth'
import Link from 'next/link'
import { HeaderNav } from './header-nav'
import { TypographyH3 } from './ui/typography'

export async function Header() {
	const session = await auth()
	return (
		<header className='container mx-auto flex items-center p-10'>
			<div className='shrink-0'>
				<TypographyH3>
					<Link href={session?.user ? '/dashboard' : '/'}>ПК Сборщик</Link>
				</TypographyH3>
			</div>
			<nav className='min-w-0 flex justify-end flex-1'>
				<HeaderNav session={session} />
			</nav>
		</header>
	)
}

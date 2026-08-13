import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({
	subsets: ['latin'],
	variable: '--font-geist',
})

const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-geist-mono',
})
export const metadata: Metadata = {
	title: 'ПК Собиратель',
	description: 'Собери свой пк мечты',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang='ru'
			className={`dark ${geist.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className='min-h-full flex flex-col'>
				<Header />
				{children}
				<Toaster position='top-center' />
			</body>
		</html>
	)
}

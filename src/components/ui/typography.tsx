import React from 'react'

interface TypographyProps {
	children: React.ReactNode
}

export function TypographyH3({ children }: TypographyProps) {
	return (
		<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
			{children}
		</h3>
	)
}

export function TypographyH1({ children }: TypographyProps) {
	return (
		<h2 className='scroll-m-20 text-4xl font-semibold tracking-tight'>
			{children}
		</h2>
	)
}

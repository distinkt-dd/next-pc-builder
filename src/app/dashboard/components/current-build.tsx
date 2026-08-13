'use client'
import { Button } from '@/components/ui/button'
import { TypographyH1 } from '@/components/ui/typography'
import { COMPONENT_CATEGORIES } from '@/lib/constants'
import type { Component } from '@/lib/types'
import { useCallback, useState } from 'react'
import { SaveBuildDialog } from './save-build-dialog'
import { TableParts } from './table'

export const CurrentBuild = () => {
	const [selectedByCategory, setSelectedByCategory] = useState<
		Record<string, Component | null>
	>({})
	const [saveDialogOpen, setSaveDialogOpen] = useState(false)

	const onSelectComponent = useCallback(
		(categoryId: string, component: Component | null) => {
			setSelectedByCategory(prev => ({
				...prev,
				[categoryId]: component,
			}))
		},
		[],
	)

	return (
		<>
			<div className='flex justify-between mb-8'>
				<TypographyH1>Собери свою сборку</TypographyH1>
				<Button onClick={() => setSaveDialogOpen(true)}>Собрать</Button>
			</div>
			<div className='min-w-0 overflow-x-auto'>
				<TableParts
					components={COMPONENT_CATEGORIES}
					onSelectedComponent={onSelectComponent}
					selectedByCategory={selectedByCategory}
				/>
				<SaveBuildDialog
					open={saveDialogOpen}
					onOpenChange={setSaveDialogOpen}
					selectedByCategory={selectedByCategory}
				/>
			</div>
		</>
	)
}

'use client'

import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { toast } from 'sonner'

type Props = {
	buildId: string
	deleteAction: (formData: FormData) => Promise<void>
}

export function DeleteBuildButton({ buildId, deleteAction }: Props) {
	const [isPending, startTransition] = useTransition()

	const handleClick = () => {
		if (!confirm('Удалить сборку?')) {
			return
		}

		const fd = new FormData()
		fd.set('buildId', buildId)
		startTransition(async () => {
			try {
				await deleteAction(fd)
				toast.success('Сборка успешно удалена!')
			} catch (err) {
				const message =
					err instanceof Error ? err.message : 'Неизвестная ошибка'
				toast.error(`Ошибка при удалении: ${message}`)
			}
		})
	}

	return (
		<Button
			type='button'
			variant='destructive'
			size='sm'
			disabled={isPending}
			onClick={handleClick}
			className='cursor-pointer'
		>
			Удалить
		</Button>
	)
}

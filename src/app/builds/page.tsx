import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { TypographyH3 } from '@/components/ui/typography'
import { getMyBuilds } from '@/lib/builds'
import { Share2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { deleteBuildAction, setBuildPublicAction } from './actions'
import { BuildCard } from './components/build-card'
import { DeleteBuildButton } from './components/delete-build-button'

export default async function BuildsPage() {
	const session = await auth()
	if (!session?.user.id) {
		redirect('/login')
	}

	const builds = await getMyBuilds(session.user.id)

	return (
		<div className='py-6'>
			<TypographyH3>Мои сборки</TypographyH3>
			<br />
			<div className='grid gap-4 lg:grid-cols-3'>
				{builds.length > 0 ? (
					builds.map(b => (
						<BuildCard key={b.id} build={b}>
							<DeleteBuildButton
								buildId={b.id}
								deleteAction={deleteBuildAction}
							/>
							<form action={setBuildPublicAction} className='contents'>
								<input type='hidden' name='buildId' value={b.id} />
								<input
									type='hidden'
									name='isPublic'
									value={b.isPublic ? 'false' : 'true'}
								/>
								<Button
									type='submit'
									className='cursor-pointer'
									variant={`${b.isPublic ? 'default' : 'ghost'}`}
								>
									<Share2
										className={`h-4 w-4 mr-1 ${b.isPublic ? 'fill-background' : ''}`}
									/>
								</Button>
							</form>
						</BuildCard>
					))
				) : (
					<p className='text-muted-foreground'>Пока нет сохраненных сборок</p>
				)}
			</div>
		</div>
	)
}

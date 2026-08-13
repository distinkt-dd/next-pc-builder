import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { TypographyH1 } from '@/components/ui/typography'
import { getPublicBuilds } from '@/lib/builds'
import { ThumbsUp } from 'lucide-react'
import { notFound } from 'next/navigation'
import { toggleLikeAction } from '../actions'
import { BuildCard } from '../components/build-card'

export default async function ExplorePage() {
	const session = await auth()

	if (!session?.user.id) {
		notFound()
	}

	const builds = await getPublicBuilds(session.user.id)

	return (
		<div className='py-6'>
			<TypographyH1>Публичные сборки</TypographyH1>
			<br />
			{builds.length > 0 ? (
				<div className='grid gap-4 lg:grid-cols-3'>
					{builds.map(b => {
						const isLiked = Array.isArray(b.likes) && b.likes.length > 0

						return (
							<BuildCard key={b.id} build={b}>
								<div className='flex felx-wrap gap-2'>
									<form className='contents' action={toggleLikeAction}>
										<input type='hidden' name='buildId' value={b.id} />
										<Button
											className='cursor-pointer'
											type='submit'
											variant={isLiked ? 'ghost' : 'secondary'}
											size='sm'
										>
											<ThumbsUp
												className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`}
											/>
											{b._count.likes}
										</Button>
									</form>
								</div>
							</BuildCard>
						)
					})}
				</div>
			) : (
				<p className='text-muted-foreground'>Нет публичных сборок</p>
			)}
		</div>
	)
}

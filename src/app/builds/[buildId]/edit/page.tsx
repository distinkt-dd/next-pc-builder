import { auth } from '@/auth'
import { getBuildEdit } from '@/lib/builds'
import { notFound } from 'next/navigation'
import { EditBuildForm } from './components/edit-build-form'

type Props = {
	params: Promise<{ buildId: string }>
}

export default async function EditBuildPage({ params }: Props) {
	const session = await auth()

	if (!session?.user.id) {
		notFound()
	}

	const { buildId } = await params

	const build = await getBuildEdit(buildId)

	if (!build) {
		return
	}

	const buildComponents = build.components.map(bc => ({
		id: bc.component.id,
		name: bc.component.name,
		price: bc.component.price,
		type: bc.component.type,
		socket: bc.component.socket,
	}))

	return (
		<div className='py-6'>
			<EditBuildForm buildComponents={buildComponents} buildName={build.name} />
		</div>
	)
}

export type ComponentCategory = {
	id: string
	name: string
	icon: string
}

export type Component = {
	id: string
	name: string
	price: number
	type: ComponentType
	socket: string | null
}

export type ComponentType =
	| 'cpu'
	| 'gpu'
	| 'ram'
	| 'ssd'
	| 'motherboard'
	| 'psu'
	| 'case'
	| 'cooler'

export const categoryIdToDbType: Record<string, ComponentType> = {
	gpu: 'gpu',
	cpu: 'cpu',
	ram: 'ram',
	storage: 'ssd',
	motherboard: 'motherboard',
	psu: 'psu',
	case: 'case',
	cooling: 'cooler',
}

export const dbTypeToCategoryId: Record<ComponentType, string> = {
	gpu: 'gpu',
	cpu: 'cpu',
	ram: 'ram',
	ssd: 'storage',
	motherboard: 'motherboard',
	psu: 'psu',
	case: 'case',
	cooler: 'cooling',
}

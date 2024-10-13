import { Godown, Item } from '@/typings'

export const getItems = async () => {
	const res = await fetch('/api/items')
	if (res.status !== 200) return null
	const items: Item[] = await res.json()
	return items
}

export const getGodowns = async () => {
	const res = await fetch('/api/godowns')
	if (res.status !== 200) return null
	const godowns: Godown[] = await res.json()
	return godowns
}

export const randomColor = () => {
	const colors = [
		'#f2cdcd',
		'#f5c2e7',
		'#cba6f7',
		'#f38ba8',
		'#eba0ac',
		'#fab387',
		'#f9e2af',
		'#a6e3a1',
		'#94e2d5',
		'#89dceb',
		'#74c7ec',
		'#89b4fa',
		'#b4befe',
	]

	return colors[Math.floor(Math.random() * colors.length)]
}

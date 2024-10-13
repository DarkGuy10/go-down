import type { Godown, Item } from '@/typings'
import { TreeList, TreeListItem } from './TreeList/TreeList'
import { randomColor } from '@/utils'

interface TreeViewerProps {
	items: Item[]
	godowns: Godown[]
	sidebarOpen: boolean
	updateCurrentItem: (arg0: Item | null) => void
}

export const TreeViewer = ({
	items,
	godowns,
	sidebarOpen,
	updateCurrentItem,
}: TreeViewerProps) => {
	const tree = processData(items, godowns)

	return (
		<div
			className={`py-5 flex-none bg-crust flex-col overflow-y-auto overflow-x-hidden z-50 absolute lg:static h-full ${sidebarOpen ? 'w-full lg:w-96' : 'w-0'} transition-all `}
		>
			<TreeList items={tree} updateCurrentItem={updateCurrentItem} />
		</div>
	)
}

const processGodown = (
	godown: Godown,
	arr: TreeListItem[],
	itemMap: Map<string, Item>,
	godownMap: Map<string, Godown>
) => {
	godownMap.forEach(g => {
		if (g.parent_godown === godown.id) {
			arr.push({
				type: 'category',
				data: g,
				subItems: [],
				color: randomColor(),
			})
			godownMap.delete(g.id)
		}
	})

	for (const e of arr) {
		if (e.type !== 'category') continue
		const { data, subItems } = e
		processGodown(data, subItems, itemMap, godownMap)
	}

	itemMap.forEach(i => {
		if (i.godown_id === godown.id) {
			arr.push({ type: 'element', data: i })
			itemMap.delete(i.item_id)
		}
	})
}

const processData = (items: Item[], godowns: Godown[]) => {
	const itemMap = new Map(items.map(i => [i.item_id, i]))
	const godownMap = new Map(godowns.map(g => [g.id, g]))

	const arr: TreeListItem[] = []

	godownMap.forEach(g => {
		if (!g.parent_godown) {
			arr.push({
				type: 'category',
				data: g,
				subItems: [],
				color: randomColor(),
			})
			godownMap.delete(g.id)
		}
	})

	for (const e of arr) {
		if (e.type !== 'category') continue
		const { data, subItems } = e

		processGodown(data, subItems, itemMap, godownMap)
	}

	return arr
}

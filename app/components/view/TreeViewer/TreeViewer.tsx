'use client'

import type { Godown, Item } from '@/typings'
import { TreeList, TreeListItem } from './TreeList/TreeList'
import { randomColor } from '@/utils'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/model'

interface TreeViewerProps {
	items: Item[]
	godowns: Godown[]
	sidebarOpen: boolean
	updateCurrentItem(item: Item | null): void
}

export const TreeViewer = ({
	items,
	godowns,
	sidebarOpen,
	updateCurrentItem,
}: TreeViewerProps) => {
	const [searchParam, updateSearchParam] = useState('')
	const [tree, updateTree] = useState<TreeListItem[]>([])
	const [filter, updateFilter] = useState<null | string>(null)
	const filterCategories = [...new Set(items.map(i => i.category))]

	useEffect(() => {
		updateTree(processData(items, godowns, searchParam, filter))
	}, [items, godowns, searchParam, filter])

	return (
		<div
			className={`py-5 flex-none bg-crust flex-col overflow-y-auto overflow-x-hidden z-50 absolute lg:static h-full ${sidebarOpen ? 'w-full lg:w-96' : 'w-0'} transition-all `}
		>
			<div className='px-6 mb-2 grow text-subtext1 flex items-stretch'>
				<div className='flex items-center bg-mantle rounded-l-md px-3'>
					<Search size={16} strokeWidth={1} absoluteStrokeWidth />
				</div>
				<input
					name='searchParam'
					placeholder='Search godowns and items'
					onChange={e => {
						e.preventDefault()
						updateSearchParam(e.currentTarget.value)
					}}
					value={searchParam}
					className='bg-mantle w-full pr-4 py-2 rounded-r-md border-none outline-none text-sm'
				/>
			</div>
			<div className='flex flex-wrap gap-4 py-3 px-6'>
				{filterCategories.map(e => (
					<Badge
						onClick={() => {
							if (e === filter) updateFilter(null)
							else updateFilter(e)
						}}
						active={e === filter}
						key={e}
					>
						{e}
					</Badge>
				))}
			</div>
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

const processData = (
	items: Item[],
	godowns: Godown[],
	searchParam: string = '',
	filter: string | null
) => {
	//HACK: This works somehow
	//Please dont touch

	items = items.filter(i => !filter || i.category === filter)

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

	const pruneTree = (node: TreeListItem): boolean => {
		switch (node.type) {
			case 'element':
				return node.data.name
					.toLocaleLowerCase()
					.includes(searchParam.toLocaleLowerCase())
			case 'category':
				const keepChildren = node.subItems.map(e => pruneTree(e))
				const allChildrenKept = keepChildren.reduce<boolean>(
					(prev, curr) => prev && curr,
					true
				)

				if (
					!node.data.name
						.toLocaleLowerCase()
						.includes(searchParam.toLocaleLowerCase())
				)
					node.subItems = node.subItems.filter((_, idx) => keepChildren[idx])
				else if (!allChildrenKept) {
					const itemMap = new Map(items.map(i => [i.item_id, i]))
					const godownMap = new Map(godowns.map(g => [g.id, g]))
					if (node.subItems[0].type === 'element') {
						node.subItems = items
							.filter(i => i.godown_id === node.data.id)
							.map(i => ({ type: 'element', data: i }))
					} else {
						for (const e of node.subItems) {
							if (e.type !== 'category') continue
							e.subItems = []
							const { data, subItems } = e
							processGodown(data, subItems, itemMap, godownMap)
						}
					}
				}

				return (
					node.data.name
						.toLocaleLowerCase()
						.includes(searchParam.toLocaleLowerCase()) ||
					keepChildren.reduce<boolean>((prev, curr) => prev || curr, false)
				)
		}
	}

	return arr.filter(e => pruneTree(e))
}

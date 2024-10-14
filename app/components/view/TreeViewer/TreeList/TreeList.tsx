'use client'

import { Godown, Item } from '@/typings'
import { Box, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export type TreeListItem =
	| { type: 'element'; data: Item }
	| {
			type: 'category'
			data: Godown
			color: string
			subItems: TreeListItem[]
	  }

export type TreeListProps = {
	items: TreeListItem[]
	updateCurrentItem: (arg0: Item | null) => void
}

export const TreeList = (props: TreeListProps) => {
	return (
		<div className='flex flex-col items-stretch'>{DomainExpansion(props)}</div>
	)
}

const DomainExpansion = ({ items, updateCurrentItem }: TreeListProps) => {
	return items.map(item => {
		switch (item.type) {
			case 'element':
				return (
					<Element
						data={item.data}
						updateCurrentItem={updateCurrentItem}
						key={item.data.item_id}
					/>
				)
			case 'category':
				return (
					<Category
						key={item.data.id}
						data={item.data}
						subItems={item.subItems}
						color={item.color}
						updateCurrentItem={updateCurrentItem}
					/>
				)
		}
	})
}

const Element = ({
	data,
	updateCurrentItem,
}: {
	data: Item
	updateCurrentItem: (arg0: Item | null) => void
}) => (
	<div
		className='px-4 py-3 text-sm sm:text-base sm:text-subtext1 text-subtext1 transition-all hover:text-text hover:bg-surface2/15 cursor-pointer flex items-center'
		onClick={() => updateCurrentItem(data)}
	>
		<Box
			strokeWidth={1}
			size={18}
			absoluteStrokeWidth
			className='text-surface2 mr-2'
		/>
		<span
			className='overflow-hidden whitespace-nowrap text-ellipsis'
			title={data.name}
		>
			{data.name}
		</span>
	</div>
)

const Category = ({
	data,
	color,
	updateCurrentItem,
	subItems,
}: {
	data: Godown
	color: string
	updateCurrentItem: (arg0: Item | null) => void
	subItems: TreeListItem[]
}) => {
	const [collapsed, setCollapsed] = useState(false)
	const [hover, setHover] = useState(false)

	const findItem = (node: TreeListItem): boolean => {
		if (node.type === 'element') return true
		return !!node.subItems.find(one => findItem(one))
	}

	const hasAnItem = subItems.find(one => findItem(one))

	if (!hasAnItem) return <></>

	return (
		<div className='flex flex-col select-none'>
			<div
				className='flex flex-col items-stretch px-3 py-3 hover:bg-surface2/15 cursor-pointer transition'
				onClick={() => setCollapsed(!collapsed)}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<div
					className='text-sm sm:text-base sm:text-subtext1 text-subtext1 flex items-center overflow-hidden whitespace-nowrap'
					style={hover ? { color } : {}}
				>
					<ChevronRight
						size={20}
						strokeWidth={1}
						absoluteStrokeWidth
						className={`mr-2 ${collapsed ? '' : 'rotate-90'} transition-all`}
					/>
					{data.name}
				</div>

				{!collapsed && (
					<div className='text-xs ml-7 mt-1 text-subtext0/60 font-mono '>
						id:{data.id}
					</div>
				)}
			</div>

			<div
				className={`ml-6 border-l border-l-surface0 overflow-hidden ${collapsed ? 'h-0' : 'h-auto'}`}
				style={hover ? { borderLeftColor: color } : {}}
			>
				{DomainExpansion({ items: subItems, updateCurrentItem })}
			</div>

			<div></div>
		</div>
	)
}

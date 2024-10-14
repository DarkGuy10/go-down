'use client'

import { Logo } from '@/components/model'
import { ActionRow } from '@/components/model/ActionRow/ActionRow'
import { TreeViewer, ProductViewer } from '@/components/view'
import { useWindowDimensions } from '@/hooks'
import { Godown, Item } from '@/typings'
import { getGodowns, getItems } from '@/utils'
import { Box, LoaderCircle, Timer, Warehouse } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Data {
	godowns: Godown[]
	items: Item[]
	loaded: boolean
	latency?: number
}

export const ViewWrapper = () => {
	const initialData: Data = { godowns: [], items: [], loaded: false }

	const [{ godowns, items, loaded, latency }, updateData] =
		useState(initialData)
	const [currentItem, updateCurrentItem] = useState<Item | null>(null)
	const [sidebarOpen, updateSidebarState] = useState(true)

	const toggleSidebarState = () => {
		updateSidebarState(!sidebarOpen)
	}

	const { width } = useWindowDimensions()

	useEffect(() => {
		const fetchData = async () => {
			const now = Date.now()
			const items = await getItems()
			const godowns = await getGodowns()
			if (items && godowns)
				updateData({
					items,
					godowns,
					loaded: true,
					latency: Date.now() - now,
				})
		}

		fetchData()
	}, [])

	const godownsMapped = new Map(godowns.map(g => [g.id, g]))

	if (!loaded)
		return (
			<div className='w-full h-full top-0 left-0 fixed flex items-center justify-center'>
				<LoaderCircle
					size={40}
					absoluteStrokeWidth
					strokeWidth={2}
					className='text-text animate-spin'
				/>
			</div>
		)

	return (
		<div className='w-full h-full top-0 left-0 fixed flex flex-col '>
			<div className='h-16 flex-none bg-mantle flex items-stretch justify-between'>
				<Logo />
				<div className='flex items-stretch'>
					<ActionRow toggleSidebarState={toggleSidebarState} />
				</div>
			</div>
			<div className='flex grow relative justify-stretch overflow-hidden'>
				<TreeViewer
					items={items}
					godowns={godowns}
					sidebarOpen={sidebarOpen}
					updateCurrentItem={item => {
						if (width && width < 768) updateSidebarState(false)
						updateCurrentItem(item)
					}}
				/>

				<ProductViewer
					currentItem={currentItem}
					belongsTo={
						currentItem ? godownsMapped.get(currentItem.godown_id) : null
					}
				/>
			</div>

			<div className='h-7 flex-none bg-mantle text-xs text-subtext1 font-mono font-thin flex items-center justify-between px-4 select-none'>
				{width > 640 ? (
					<>
						<div className='text-green'>● All systems operational</div>
						<div className='flex items-center gap-1'>
							<div className='text-blue'>
								Loaded {items.length} items & {godowns.length} godowns
							</div>{' '}
							<div className='text-surface1'>•</div>{' '}
							<div className='text-yellow'>{latency} ms</div>
						</div>
					</>
				) : (
					<>
						<div className='flex items-stretch grow justify-between text-blue'>
							<div className='text-green'>● Systems online</div>
							<div className='flex gap-1 items-start'>
								<Box size={12} strokeWidth={1} absoluteStrokeWidth />
								<div>{items.length}</div>
							</div>
							<div className='flex gap-1 items-start'>
								<Warehouse size={12} strokeWidth={1} absoluteStrokeWidth />
								<div>{godowns.length}</div>
							</div>
							<div className='flex gap-1 items-start'>
								<Timer
									size={12}
									strokeWidth={1}
									absoluteStrokeWidth
									className='text-yellow'
								/>
								<div className='text-yellow'>{latency}ms</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

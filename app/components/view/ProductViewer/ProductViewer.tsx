'use client'

import { Godown, Item } from '@/typings'
import {
	Box,
	Braces,
	Hash,
	IndianRupee,
	Layers,
	ListTodo,
	LucideIcon,
	Tag,
	Warehouse,
	Wind,
} from 'lucide-react'

export const ProductViewer = ({
	currentItem,
	belongsTo,
}: {
	currentItem: Item | null
	belongsTo: Godown | undefined | null
}) => {
	return (
		<div className='bg-base flex grow px-6 lg:px-16 overflow-hidden'>
			<div className='flex-1 overflow-x-hidddden overflow-y-auto'>
				{currentItem ? (
					<ProductSection item={currentItem} godown={belongsTo!} />
				) : (
					<div className='h-full w-full flex items-center justify-center'>
						<div className='flex flex-col bg-mantle rounded-lg p-10 items-center'>
							<Wind className='text-subtext0 opacity-50 mb-3' size={50} />
							<div className='text-xl sm:text-2xl text-subtext1'>
								Nothing to show
							</div>
							<div className='text-sm sm:text-base sm:text-subtext0 text-subtext0'>
								Select an item first
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

const ProductSection = ({ item, godown }: { item: Item; godown: Godown }) => {
	return (
		<main className='flex flex-col h-full overflow-x-hidden my-6 lg:my-10'>
			<div className='flex gap-2 items-center text-text mb-3'>
				<Box size={24} />
				<h1 className='text-xl md:text-2xl font-bold'>{item.name}</h1>
			</div>
			<div className='text-xs md:text-sm text-subtext0 font-mono mb-10'>
				<span className='bg-mantle px-2 py-1 rounded-md'>
					id:{item.item_id}
				</span>
			</div>
			<div className=' grow flex flex-col lg:flex-row gap-10 items-center lg:items-start'>
				<div className='w-2/3 sm:w-1/2 lg:w-1/3 flex-none'>
					<img
						src={item.image_url}
						key={item.image_url}
						alt={item.name}
						className='rounded-md bg-mantle w-full max-h-full'
					/>
				</div>
				<div className='grow max-sm:w-full'>
					<div className=' grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 lg:gap-8 '>
						<Card heading='Category' className='text-sapphire' Icon={Layers}>
							{item.category}
						</Card>
						<Card heading='Brand' className='text-teal' Icon={Tag}>
							{item.brand}
						</Card>
						<Card heading='Quantity' className='text-blue' Icon={Hash}>
							{item.quantity}
						</Card>
						<Card heading='Price' className='text-lavender' Icon={IndianRupee}>
							{item.price}
						</Card>
						<Card heading='Status' className='text-green' Icon={ListTodo}>
							{item.status === 'in_stock' ? (
								<div className='text-green'>In Stock</div>
							) : (
								<div className='text-red'>Out of Stock</div>
							)}
						</Card>
						<Card heading='Godown' className='text-mauve' Icon={Warehouse}>
							{godown.name}
						</Card>

						{Object.entries(item.attributes).map(([k, v]) => (
							<Card
								key={k}
								heading={k.replaceAll('_', ' ')}
								Icon={Braces}
								className='text-pink'
							>
								{v}
							</Card>
						))}
					</div>
				</div>
			</div>
		</main>
	)
}

const Card = ({
	heading,
	className,
	children,
	Icon,
}: {
	heading: string
	className?: string
	children: React.ReactNode
	Icon: LucideIcon
}) => {
	return (
		<div
			className={`bg-surface2/10 hover:bg-surface2/15 ${className} rounded-md p-3 md:p-4 h-fit`}
		>
			<div className='flex items-center gap-2 text-xs md:text-sm'>
				<div className='p-1 md:p-2 text-current bg-base rounded-md'>
					<Icon size={14} strokeWidth={1} absoluteStrokeWidth />
				</div>
				<div className='text-subtext0 capitalize'>{heading}</div>
			</div>
			<div className='flex text-base md:text-lg text-text justify-center mt-2'>
				<span className='overflow-hidden whitespace-nowrap text-ellipsis'>
					{typeof children === 'boolean' ? children.toString() : children}
				</span>
			</div>
		</div>
	)
}

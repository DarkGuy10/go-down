'use client'

import { MouseEventHandler } from 'react'

export const ActionRowButton = ({
	children,
	title,
	onClick,
}: {
	children: React.ReactNode
	title: string
	onClick?: MouseEventHandler<HTMLDivElement>
}) => (
	<div
		className='p-2 bg-crust rounded-md text-subtext0 cursor-pointer hover:text-green'
		title={title}
		onClick={onClick}
	>
		{children}
	</div>
)

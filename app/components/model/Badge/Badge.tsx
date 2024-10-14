import { MouseEventHandler } from 'react'

export const Badge = ({
	active,
	onClick,
	children,
}: {
	active: boolean
	onClick: MouseEventHandler<HTMLDivElement>
	children: React.ReactNode
}) => {
	return (
		<div
			onClick={onClick}
			className={`text-xs ${active ? 'text-blue bg-blue/15' : '  text-subtext0 bg-surface2/15 hover:bg-surface2/25'} cursor-pointer  px-3 py-1 rounded-full select-none capitalize`}
		>
			{children}
		</div>
	)
}

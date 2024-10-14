import { LucideIcon } from 'lucide-react'
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	Icon: LucideIcon
}

export const Input = ({ label, className, Icon, ...options }: InputProps) => {
	return (
		<div className={`flex flex-col items-stretch ${label ? 'my-4' : ''}`}>
			{label && (
				<label className='text-subtext0 text-sm mb-1' htmlFor={options.name}>
					{label}
				</label>
			)}
			<div className='flex text-subtext1'>
				<div className='flex items-center rounded-l-md bg-crust pl-4 pr-2'>
					<Icon size={22} strokeWidth={1} absoluteStrokeWidth />
				</div>
				<input
					className={`bg-crust min-w-72 pl-2 pr-4 py-4 rounded-r-md text-subtext1 placeholder:text-subtext0/40 border-none outline-none ${className}`}
					{...options}
				/>
			</div>
		</div>
	)
}

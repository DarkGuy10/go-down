import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
}

export const Input = ({ label, ...options }: InputProps) => {
	return (
		<div className={`flex flex-col items-stretch ${label ? 'my-4' : ''}`}>
			{label && (
				<label className='text-subtext0 text-sm mb-1' htmlFor={options.name}>
					{label}
				</label>
			)}
			<input
				className='bg-crust min-w-72 px-4 py-4 rounded-md text-subtext1 border-none outline-none'
				{...options}
			/>
		</div>
	)
}

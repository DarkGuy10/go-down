import { ButtonHTMLAttributes } from 'react'

export const Button = (options: ButtonHTMLAttributes<HTMLElement>) => {
	return (
		<button
			className='bg-blue text-crust rounded-sm px-6 py-2 active:bg-blue-400 transition-all'
			{...options}
		/>
	)
}

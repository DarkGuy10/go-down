'use client'

import { useFormStatus } from 'react-dom'

export const LoginButton = () => {
	const { pending } = useFormStatus()

	return (
		<button
			aria-disabled={pending}
			type='submit'
			onClick={event => {
				if (pending) event.preventDefault()
			}}
		>
			Login
		</button>
	)
}

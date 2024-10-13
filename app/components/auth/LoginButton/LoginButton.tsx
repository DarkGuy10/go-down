'use client'

import { Button } from '@/components/model'
import { useFormStatus } from 'react-dom'

export const LoginButton = () => {
	const { pending } = useFormStatus()

	return (
		<Button
			aria-disabled={pending}
			type='submit'
			onClick={event => {
				if (pending) event.preventDefault()
			}}
		>
			Login
		</Button>
	)
}

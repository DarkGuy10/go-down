'use client'

//import styles from './LoginForm.module.scss'
import { authenticate } from '@/lib/actions'
import { useFormState } from 'react-dom'
import { LoginButton } from '@/components/auth'

// TODO: replace useFormState with useActionState once
// it comes out of canary into stable

export const LoginForm = ({ callbackUrl }: { callbackUrl?: string }) => {
	const [errorMessage, dispatch] = useFormState(authenticate, undefined)

	return (
		<div>
			<form action={dispatch}>
				<input
					type='email'
					name='email'
					placeholder='cereal@soup.org'
					required
				/>
				<input
					type='password'
					name='password'
					placeholder='••••••••••'
					required
				/>
				<input type='hidden' name='redirectTo' value={callbackUrl} />
				<div>
					{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
				</div>
				<LoginButton />
			</form>
		</div>
	)
}

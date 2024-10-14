'use client'

import { authenticate } from '@/lib/actions'
import { useFormState } from 'react-dom'
import { LoginButton } from '@/components/auth'
import { Input } from '@/components/model'
import { AtSign, Key } from 'lucide-react'

// TODO: replace useFormState with useActionState once
// it comes out of canary into stable

export const LoginForm = ({ callbackUrl }: { callbackUrl?: string }) => {
	const [errorMessage, dispatch] = useFormState(authenticate, undefined)

	return (
		<form
			className='h-auto flex flex-col bg-mantle p-10 rounded-md items-stretch'
			action={dispatch}
		>
			<div className='text-text text-2xl text-center'>Go.Down</div>
			<div className='text-base text-overlay1 text-center mb-2'>
				Login to get started
			</div>

			<Input
				label='Email'
				name='email'
				type='email'
				placeholder='cereal@soup.org'
				required
				Icon={AtSign}
				autoComplete='email'
			/>
			<Input
				label='Password'
				name='password'
				type='password'
				Icon={Key}
				placeholder='* * * * *'
				required
			/>
			<input type='hidden' name='redirectTo' value={callbackUrl} />
			<div className='text-sm text-red'> {errorMessage}</div>
			<div className='flex justify-center mt-5'>
				<LoginButton />
			</div>
		</form>
	)
}

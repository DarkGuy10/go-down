import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Go.Down | Login',
	description: 'Login to access the application',
}

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex h-full w-full fixed bg-base items-center justify-center top-0 left-0'>
			{children}
		</div>
	)
}

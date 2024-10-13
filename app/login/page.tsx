import { auth } from '@/auth'
import { LoginForm } from '@/components/auth'
import { redirect } from 'next/navigation'

export default async function LoginPage(props: {
	searchParams: { callbackUrl?: string }
}) {
	const session = await auth()
	if (session) redirect('/')

	return <LoginForm callbackUrl={props.searchParams.callbackUrl} />
}

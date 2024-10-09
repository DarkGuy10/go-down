import { LoginForm } from '@/components/auth'

export default function LoginPage(props: {
	searchParams: { callbackUrl?: string }
}) {
	return <LoginForm callbackUrl={props.searchParams.callbackUrl} />
}

import type { Metadata } from 'next'
import '@/styles/globals.scss'

// TODO: Add SEO and stuff

export const metadata: Metadata = {
	title: 'Go.Down',
	description: 'Product overview and management',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	)
}

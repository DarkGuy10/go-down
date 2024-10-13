import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'

// TODO: Add SEO and stuff

export const metadata: Metadata = {
	title: 'Go.Down',
	description: 'Product overview and management',
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
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

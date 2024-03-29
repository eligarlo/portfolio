import type { Metadata } from 'next'

import { montserrat, nunitoSans } from '@/lib/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

const cx = (...classes: any[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			className={cx(
				'text-text-primary bg-background-primary',
				montserrat.variable,
				nunitoSans.variable
			)}
		>
			<body>{children}</body>
		</html>
	)
}

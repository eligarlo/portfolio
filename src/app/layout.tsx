import type { Metadata } from 'next'

import { montserrat, nunitoSans } from '@/lib/fonts'
import { defaultMetadata } from '@/lib/meta-tags'
import '@/styles/globals.css'

export const metadata: Metadata = defaultMetadata

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

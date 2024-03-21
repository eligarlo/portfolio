import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'

import { montserrat, nunitoSans } from '@/lib/fonts'
import { defaultMetadata } from '@/lib/meta-tags'
import TagManager from '@/components/tag-manager/tag-manager'
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
			<body>
				<TagManager />
				{children}
				<Analytics />
			</body>
		</html>
	)
}

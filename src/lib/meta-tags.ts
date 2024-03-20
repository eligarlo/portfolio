import { Metadata } from 'next'

import { BASE_URL, BRAND_NAME } from '@/lib/constants'
import { isProduction } from '@/lib/utils'
import ROUTES, { StaticPagesType } from '@/lib/routes'

export const defaultMetadata: Metadata = {
	generator: 'Next.js',
	referrer: 'origin-when-cross-origin',
	title: {
		default: `${BRAND_NAME}'s Website`,
		template: '%s',
	},
	metadataBase: new URL(BASE_URL),
	applicationName: BRAND_NAME,
	authors: [{ name: BRAND_NAME, url: BASE_URL }],
	creator: BRAND_NAME,
	publisher: BRAND_NAME,
	keywords: [
		BRAND_NAME,
		'eligarlo',
		'eligarlo.dev',
		'Next.js',
		'React',
		'JavaScript',
		'TypeScript',
		'Node.js',
		'Portfolio',
		'Blog',
		'Web Development',
		'Frontend',
		'Backend',
		'Fullstack',
		'Software Development',
		'Programming',
		'Tailwind CSS',
		'PostgreSQL',
		'Prisma',
		'Supabase',
		'Vercel',
	],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
}

export const getMetaData = (
	url: string,
	image: string,
	title: string,
	description: string
): Metadata => ({
	title,
	description,
	openGraph: {
		title,
		description,
		url,
		siteName: BRAND_NAME,
		images: [
			{
				url: isProduction()
					? `${BASE_URL}/images/og/${image}`
					: `https://${process.env.VERCEL_BRANCH_URL}/images/og/${image}`,
				width: 1200,
				height: 630,
			},
		],
		locale: 'en_US',
		type: 'website',
	},
})

const METATAGS: Record<StaticPagesType, Metadata> = {
	home: getMetaData(
		ROUTES.home,
		'og-default.png',
		`${BRAND_NAME}'s Website`,
		'This is my personal website where I share my thoughts and experiences about web development, programming, and software development.'
	),
	blog: getMetaData(
		ROUTES.blog,
		'og-default.png',
		`Blog | ${BRAND_NAME}'s Website`,
		'This is my blog where I write about web development, programming, and software development.'
	),
}

export default METATAGS

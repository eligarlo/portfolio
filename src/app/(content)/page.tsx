import { Metadata } from 'next'

import METATAGS from '@/lib/meta-tags'

export const metadata: Metadata = METATAGS['home']

export default function HomePage() {
	return (
		<section className='h-svh'>
			<h1 className='text-center'>My portfolio</h1>
		</section>
	)
}

import { Metadata } from 'next'

import METATAGS from '@/lib/meta-tags'
import FeaturedBlogPosts from '@/components/blog/featured'

export const metadata: Metadata = METATAGS['home']

export default function HomePage() {
	return (
		<>
			<FeaturedBlogPosts />
		</>
	)
}

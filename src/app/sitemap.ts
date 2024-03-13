import { getAllBlogPosts, getTagsFromBlogPosts } from '@/db/blog'
import ROUTES from '@/lib/routes'
import { BASE_URL } from '@/lib/constants'

export default function sitemap() {
	const staticRoutes = Object.entries(ROUTES).map(([, value]) => ({
		url: `${BASE_URL}${value}`,
		lastModified: new Date().toISOString().split('T')[0],
	}))

	const blogPosts = getAllBlogPosts().map(post => ({
		url: `${BASE_URL}${ROUTES.blog}/${post.slug}`,
		lastModified: post.metadata.updatedAt,
	}))

	const tags = getTagsFromBlogPosts().map(tag => ({
		url: `${BASE_URL}${ROUTES.blog}/tag/${tag}`,
		lastModified: new Date().toISOString().split('T')[0],
	}))

	return [...staticRoutes, ...blogPosts, ...tags]
}

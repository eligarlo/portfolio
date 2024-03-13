import { getPublishedBlogPosts } from '@/db/blog'
import Posts from '@/components/blog/posts'

export default async function BlogPage() {
	const posts = getPublishedBlogPosts()
	const sortedPostsByDate = posts.sort((a, b) => {
		return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
	})

	return (
		<>
			<h1 className='text-4xl font-bold md:px-6 mb-6 md:mb-4 font-nunito'>All Posts</h1>
			<Posts posts={sortedPostsByDate} />
		</>
	)
}

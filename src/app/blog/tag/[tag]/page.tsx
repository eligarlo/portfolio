import { getBlogPostByTag, getTagsFromBlogPosts } from '@/db/blog'
import Posts from '@/components/blog/posts'

export async function generateStaticParams() {
	const tags = getTagsFromBlogPosts()

	return tags
		.filter(tag => tag.trim() !== '')
		.map(tag => ({
			tag,
		}))
}

export default function TagPage({ params }: { params: { tag: string } }) {
	const decodedTag = decodeURIComponent(params.tag)
	const posts = getBlogPostByTag(decodedTag)
	const sortedPostsByDate = posts.sort((a, b) => {
		return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
	})

	return (
		<>
			<h1 className='text-4xl font-bold md:px-6 mb-6 md:mb-4 font-nunito'>#{decodedTag}</h1>
			<Posts posts={sortedPostsByDate} />
		</>
	)
}

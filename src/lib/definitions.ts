export type PostMetadata = {
	title: string
	description: string
	ogImage: string
	publishedAt: string
	updatedAt: string
	tags: string
	status: string
	featured: string
}

export type BlogPost = {
	metadata: PostMetadata
	slug: string
	content: string
}

export type PostMetadata = {
	title: string
	description: string
	publishedAt: string
	updatedAt: string
	tags: string
	status: string
	image: string
}

export type BlogPost = {
	metadata: PostMetadata
	slug: string
	content: string
}

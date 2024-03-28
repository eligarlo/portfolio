import path from 'path'
import fs from 'fs'
import { BlogPost, PostMetadata } from '@/lib/definitions'

function parseFrontMatter(fileContent: string) {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
	const match = frontmatterRegex.exec(fileContent)
	const frontMatterBlock = match![1]
	const content = fileContent.replace(frontmatterRegex, '').trim()
	const frontMatterLines = frontMatterBlock.trim().split('\n')
	const metadata: Partial<PostMetadata> = {}

	frontMatterLines.forEach(line => {
		const [key, ...valueArr] = line.split(': ')
		let value = valueArr.join(': ').trim()
		value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
		metadata[key.trim() as keyof PostMetadata] = value
	})

	return { metadata: metadata as PostMetadata, content }
}

function getMDXFiles(dir: fs.PathLike) {
	return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: fs.PathLike) {
	const rawContent = fs.readFileSync(filePath, 'utf-8')
	return parseFrontMatter(rawContent)
}

function getMDXData(dir: string): BlogPost[] {
	const mdxFiles = getMDXFiles(dir)
	return mdxFiles.map(file => {
		const { metadata, content } = readMDXFile(path.join(dir, file))
		const slug = path.basename(file, path.extname(file))

		return {
			metadata,
			slug,
			content,
		}
	})
}

export function getAllBlogPosts() {
	return getMDXData(path.join(process.cwd(), 'src/content/blog'))
}

export function getPublishedBlogPosts() {
	return getAllBlogPosts().filter(post => post.metadata.status === 'published')
}

export function getArchivedBlogPosts() {
	return getAllBlogPosts().filter(post => post.metadata.status === 'archived')
}

export function getBlogPost(slug: string) {
	return getAllBlogPosts().find(post => post.slug === slug)
}

export function getBlogPostByTag(tag: string) {
	return getAllBlogPosts().filter(post => post.metadata.tags.toLowerCase().includes(tag))
}

export function getFeaturedBlogPosts() {
	const sortedPosts = getAllBlogPosts()
		.filter(post => post.metadata.featured !== '')
		.sort((a, b) => (a.metadata.featured > b.metadata.featured ? 1 : -1))

	const [firstPost, secondPost, thirdPost] = sortedPosts

	return { firstPost, secondPost, thirdPost }
}

export function getTagsFromBlogPosts() {
	const posts = getAllBlogPosts()
	const tags = posts.map(post => post.metadata.tags.split(',')).flat()
	const uniqueTags = Array.from(new Set(tags))

	return uniqueTags
}

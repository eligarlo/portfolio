import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getBlogPost, getPublishedBlogPosts } from '@/db/blog'
import { isProduction, formatDate, readingTime } from '@/lib/utils'
import ROUTES from '@/lib/routes'
import IncrementPostView from '@/components/blog/increment-post-view'
import Views from '@/components/blog/views'
import CustomMDX from '@/components/mdx/mdx'

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}): Promise<Metadata | undefined> {
	const post = getBlogPost(params.slug)
	if (!post) {
		return
	}

	const { title, publishedAt: publishedTime, description, image } = post.metadata
	const ogImage = isProduction()
		? `${process.env.NEXT_PUBLIC_ORIGIN}/images/og/blog/${image}`
		: `${process.env.VERCEL_BRANCH_URL}/images/og/blog/${image}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `${process.env.NEXT_PUBLIC_ORIGIN}/blog/${post.slug}`,
			type: 'article',
			publishedTime,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	}
}

export async function generateStaticParams() {
	const posts = getPublishedBlogPosts()

	return posts.map(post => ({
		slug: post.slug,
	}))
}

export default async function Blog({ params }: { params: { slug: string } }) {
	const post = getBlogPost(params.slug)

	if (!post) {
		notFound()
	}

	return (
		<>
			<script
				type='application/ld+json'
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: post.metadata.title,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.updatedAt,
						description: post.metadata.description,
						image: `${process.env.NEXT_PUBLIC_ORIGIN}/images/og/blog/${post.metadata.image}`,
						url: `${process.env.NEXT_PUBLIC_ORIGIN}/blog/${post.slug}`,
						author: {
							'@type': 'Person',
							name: 'Eliahu Garcia Lozano',
						},
					}),
				}}
			/>

			<IncrementPostView slug={post.slug} />

			<Link href={ROUTES.blog} className='mb-4'>
				Go back
			</Link>

			<h1 className='text-white font-nunito font-medium text-2xl tracking-tighter max-w-[650px]'>
				{post.metadata.title}
			</h1>

			<div className='flex justify-between items-center mt-2 mb-8 text-sm opacity-70 max-w-[650px]'>
				<Suspense fallback={<p className='h-6' />}>
					<p className='flex flex-row space-x-2 items-center text-sm'>
						<span>{formatDate(post.metadata.publishedAt)}</span>
						<span className='h-1 w-1 bg-text-primary rounded-full'></span>
						<span>{readingTime(post.content)}</span>
					</p>

					<Views slug={post.slug} />
				</Suspense>
			</div>

			<article className='prose prose-quoteless prose-invert'>
				<CustomMDX source={post.content} />
			</article>
		</>
	)
}

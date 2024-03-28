import { Suspense } from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getBlogPost, getPublishedBlogPosts } from '@/db/blog'
import { formatDate, readingTime } from '@/lib/utils'
import { BRAND_NAME } from '@/lib/constants'
import GoBack from '@/components/buttons/go-back'
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

	const { title, publishedAt: publishedTime, description, ogImage } = post.metadata
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
						image: post.metadata.ogImage,
						url: `${process.env.NEXT_PUBLIC_ORIGIN}/blog/${post.slug}`,
						author: {
							'@type': 'Person',
							name: BRAND_NAME,
						},
					}),
				}}
			/>

			<IncrementPostView slug={post.slug} />

			<span>
				<GoBack className='mb-4' />
			</span>

			{post.metadata.ogImage && (
				<Image
					alt={post.metadata.title}
					src={post.metadata.ogImage}
					style={{ maxWidth: '100%', height: 'auto' }}
					width={672}
					height={352}
					quality={100}
					priority
					className='rounded mb-7'
				/>
			)}

			<h1 className='text-white font-nunito font-medium text-2xl tracking-tighter max-w-[650px]'>
				{post.metadata.title}
			</h1>

			<div className='flex justify-between mt-2 mb-8 text-sm opacity-70 max-w-[650px]'>
				<Suspense fallback={<p className='h-6' />}>
					<p className='flex flex-col md:flex-row md:space-x-2 items-start md:items-center text-sm'>
						<span>{formatDate(post.metadata.publishedAt)}</span>
						<span className='hidden md:block h-1 w-1 bg-text-primary rounded-full'></span>
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

'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'

import { BlogPost } from '@/lib/definitions'
import { formatDateToLocal, readingTime } from '@/lib/utils'
import { getBlogPostsBySlugs } from '@/lib/blog'
import ROUTES from '@/lib/routes'
import ViewCounter from '@/components/blog/view-counter'
import Tags from '@/components/blog/tags'

type PostsProps = {
	posts: BlogPost[]
}

export default function Posts({ posts }: PostsProps) {
	const [allViews, setAllViews] = useState<
		{
			slug: string
			count: string
		}[]
	>([])

	useEffect(() => {
		const getViews = async () => {
			const blogPostsSlugs = posts.map(post => post.slug)
			const { data: views } = await getBlogPostsBySlugs(blogPostsSlugs)
			setAllViews(views)
		}

		getViews()
	}, [posts])

	return (
		<ul className='grid grid-cols-1 gap-6 md:gap-1 md:px-2'>
			{posts.map(post => {
				return (
					<li key={post.slug}>
						<div className='relative flex flex-col justify-between duration-300 md:max-w-xl md:hover:bg-hover-background md:p-4 rounded-lg cursor-pointer'>
							<Link href={`${ROUTES.blog}/${post.slug}`}>
								<p className='tracking-tight'>{post.metadata.title}</p>
								<span aria-hidden='true' className='absolute inset-0'></span>
								<p className='flex flex-row space-x-2 items-center opacity-70 h-6 text-sm'>
									<span>{formatDateToLocal(post.metadata.publishedAt)}</span>
									<span className='h-1 w-1 bg-text-primary rounded-full'></span>
									<span>{readingTime(post.content)}</span>
									<Suspense fallback={<p className='h-6' />}>
										{allViews.length > 0 && (
											<span className='h-1 w-1 bg-text-primary rounded-full'></span>
										)}
										<ViewCounter slug={post.slug} allViews={allViews} />
									</Suspense>
								</p>
							</Link>

							<Tags tags={post.metadata.tags} />
						</div>
					</li>
				)
			})}
		</ul>
	)
}

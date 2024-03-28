import Link from 'next/link'
import Image from 'next/image'

import { getFeaturedBlogPosts } from '@/db/blog'
import { formatDateToLocal, readingTime } from '@/lib/utils'
import { BlogPost } from '@/lib/definitions'
import ROUTES from '@/lib/routes'
import ArrowRight from '@/components/icons/arrow-right'

function FeaturedFooter({ post }: { post: BlogPost }) {
	return (
		<footer className='text-xs flex items-center space-x-2'>
			<span>{readingTime(post.content)}</span>
			<span className='h-1 w-1 bg-text-primary rounded-full'></span>
			<span>{formatDateToLocal(post.metadata.publishedAt)}</span>
		</footer>
	)
}

export default function FeaturedBlogPosts() {
	const { firstPost, secondPost, thirdPost } = getFeaturedBlogPosts()

	return (
		<>
			<h2 className='text-center mb-5 md:mb-12 font-nunito font-bold text-xl md:text-3xl'>
				Featured Posts
			</h2>

			<div className='flex flex-col md:flex-row md:space-x-10 mb-6 md:mb-10 pb-6 md:pb-10 border-b border-gray-700'>
				<Link
					href={`/blog/${firstPost.slug}`}
					className='mb-5 md:mb-0 inline-block overflow-hidden'
				>
					<Image
						className='rounded hover:scale-105 duration-500'
						alt={firstPost.metadata.title}
						src={firstPost.metadata.ogImage}
						width={680}
						height={357}
						style={{ maxWidth: '100%', height: 'auto' }}
						quality={100}
						priority
					/>
				</Link>

				<div className='md:basis-1/4 flex flex-col justify-center'>
					<Link href={`/blog/${firstPost.slug}`} className='mb-5'>
						<article>
							<span className='block mb-3 text-xl md:text-3xl font-nunito font-bold leading-none md:leading-9'>
								{firstPost.metadata.title}
							</span>
							<span className='block'>{firstPost.metadata.description}</span>
						</article>
					</Link>

					<FeaturedFooter post={firstPost} />
				</div>
			</div>

			<div className='flex flex-col md:flex-row md:gap-x-6 md:mb-10 md:pb-10 md:border-b border-gray-700'>
				{[secondPost, thirdPost].map(post => (
					<div
						key={post.slug}
						className='flex-1 mb-6 md:mb-0 pb-6 md:pb-0 border-b md:border-none border-gray-700'
					>
						<Link href={`/blog/${post.slug}`} className='inline-block mb-5 md:mb-3'>
							<Image
								className='rounded hover:scale-105 duration-500 w-full h-auto'
								alt={post.metadata.title}
								src={post.metadata.ogImage}
								width={0}
								height={0}
								sizes='100vw'
								quality={100}
							/>
						</Link>

						<div className='md:pr-10 flex flex-col'>
							<Link href={`/blog/${post.slug}`} className='mb-3'>
								<span className='block mb-3 text-xl md:text-xl font-nunito font-bold leading-none md:leading-7'>
									{post.metadata.title}
								</span>
								<span className='block'>{post.metadata.description}</span>
							</Link>

							<FeaturedFooter post={post} />
						</div>
					</div>
				))}
			</div>

			<Link
				href={ROUTES.blog}
				className='hover:underline underline-offset-4 decoration-text-secondary group flex items-center justify-center space-x-1'
			>
				<span>See all posts</span>
				<span className='group-hover:text-text-secondary group-hover:translate-x-1 duration-200'>
					<ArrowRight />
				</span>
			</Link>
		</>
	)
}

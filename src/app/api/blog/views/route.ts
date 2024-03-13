import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/db/prisma'

export async function POST(req: NextRequest): Promise<NextResponse> {
	const { slugs } = await req.json()

	if (!process.env.DATABASE_URL) {
		return new NextResponse('Database not found', { status: 500 })
	}

	try {
		const postsViews = await prisma.blog_post_views.findMany({
			where: {
				slug: { in: slugs },
			},
		})

		const data = postsViews.map(post => {
			return {
				slug: post.slug,
				count: post.count.toLocaleString(),
			}
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.error('Error getting views', error)
		return new NextResponse('Error getting views', { status: 500 })
	}
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/db/prisma'

export async function POST(req: NextRequest): Promise<NextResponse> {
	const body = await req.json()
	let slug: string | undefined = undefined

	if ('slug' in body) {
		slug = body.slug
	}

	if (!slug) {
		return new NextResponse('Slug not found', { status: 400 })
	}

	try {
		const data = await prisma.blog_post_views.upsert({
			where: {
				slug,
			},
			update: {
				count: {
					increment: 1,
				},
			},
			create: {
				slug,
				count: 1,
			},
		})

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.error('Error incrementing views', error)
		return new NextResponse('Error incrementing views', { status: 500 })
	}
}

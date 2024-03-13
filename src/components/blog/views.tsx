'use client'

import { useEffect, useState } from 'react'

import { getBlogPostsBySlugs } from '@/lib/blog'
import ViewCounter from '@/components/blog/view-counter'

type ViewsProps = {
	slug: string
}

export default function Views({ slug }: ViewsProps) {
	const [views, setViews] = useState<
		{
			slug: string
			count: string
		}[]
	>([])

	useEffect(() => {
		const getViews = async () => {
			const { data: views } = await getBlogPostsBySlugs([slug])
			setViews(views)
		}

		getViews()
	}, [slug])

	return <ViewCounter slug={slug} allViews={views} />
}

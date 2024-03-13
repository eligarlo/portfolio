'use client'

import { useEffect } from 'react'

export default function IncrementPostView({ slug }: { slug: string }) {
	useEffect(() => {
		fetch('/api/blog/increment-views', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ slug }),
		})
	}, [slug])

	return null
}

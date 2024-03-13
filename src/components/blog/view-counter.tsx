type ViewCounterProps = {
	slug: string
	allViews: { slug: string; count: string }[]
}

export default function ViewCounter({ slug, allViews }: ViewCounterProps) {
	const viewsForSlug = allViews && allViews.find(view => view.slug === slug)
	const numberOfViews = viewsForSlug ? `${viewsForSlug?.count.toLocaleString()} views` : ''

	return <span className='h-6'>{numberOfViews}</span>
}

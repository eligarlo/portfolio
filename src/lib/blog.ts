export async function getBlogPostsBySlugs(slugs: string[]) {
	const data = await fetch('/api/blog/views', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ slugs }),
	})

	return data.json()
}

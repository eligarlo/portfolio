import Link from 'next/link'

import ROUTES from '@/lib/routes'

type TagsProps = {
	tags: string
}

export default function Tags({ tags }: TagsProps) {
	return (
		<div>
			{tags.split(',').map(tag => (
				<Link
					key={tag}
					href={`${ROUTES.tag}/${tag}`}
					className='first:pl-0 rounded-lg py-0.5 px-1.5 text-xs opacity-70 hover:opacity-100 hover:text-text-secondary duration-200 inline-flex relative'
				>
					<span>#{tag}</span>
					<span aria-hidden='true' className='absolute inset-0'></span>
				</Link>
			))}
		</div>
	)
}

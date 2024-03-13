import Link from 'next/link'

import { navItems } from '@/lib/routes'
import './navbar.css'

export function Navbar() {
	return (
		<aside className='mb-20 tracking-tight max-w-2xl mx-auto pt-2'>
			<div className='lg:sticky lg:top-20'>
				<nav
					className='flex flex-row items-start px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative'
					id='nav'
				>
					<div className='flex flex-row space-x-0 pr-10'>
						{Object.entries(navItems).map(([path, { name }]) => {
							return (
								<Link
									key={path}
									href={path}
									className='transition-all flex align-middle first:pl-0 py-1 px-2'
								>
									<span className='link-underline link-underline-color'>{name}</span>
								</Link>
							)
						})}
					</div>
				</nav>
			</div>
		</aside>
	)
}

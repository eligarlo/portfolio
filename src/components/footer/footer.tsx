import Link from 'next/link'

import ROUTES, { footerItems } from '@/lib/routes'
import { BRAND_NAME } from '@/lib/constants'

export default function Footer() {
	return (
		<footer className='flex flex-col gap-3 md:gap-0 md:flex-row justify-evenly items-center bg-background-secondary py-4 text-sm'>
			<Link href={ROUTES.home} className='order-2 md:order-1'>
				{BRAND_NAME}&apos;s Website {new Date().getFullYear()}
			</Link>

			<ul className='flex gap-3 order-1 md:order-2'>
				{Object.entries(footerItems).map(([path, { name }], index) => {
					return (
						<li key={path} className='flex flex-row space-x-2 items-center'>
							<Link
								href={path}
								className='hover:text-text-secondary duration-200'
								target={`${path.startsWith('/') ? '_self' : '_blank'}`}
								rel='noopener noreferrer'
							>
								{name}
							</Link>

							{index !== Object.entries(footerItems).length - 1 && (
								<span className='h-1 w-1 bg-text-primary rounded-full'></span>
							)}
						</li>
					)
				})}
			</ul>
		</footer>
	)
}

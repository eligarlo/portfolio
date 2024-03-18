export const navItems = {
	'/': {
		name: 'Home',
	},
	'/blog': {
		name: 'Blog',
	},
}

export const footerItems = {
	'/blog': {
		name: 'Latest Posts',
		isInternal: true,
	},
	'https://twitter.com/eligarlo': {
		name: 'Twitter',
		isInternal: false,
	},
	'https://www.github.com/eligarlo': {
		name: 'GitHub',
		isInternal: false,
	},
	'https://www.linkedin.com/in/eliahu-garcia-lozano/': {
		name: 'LinkedIn',
		isInternal: false,
	},
}

const ROUTES: Record<PagesType, string> = {
	home: '/',
	blog: '/blog',
	tag: '/blog/tag',
}

export type PagesType = StaticPagesType | DynamicPagesType

export type StaticPagesType = 'home' | 'blog'

export type DynamicPagesType = 'tag'

export default ROUTES

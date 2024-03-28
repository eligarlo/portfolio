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
	},
	'https://twitter.com/eligarlo': {
		name: 'Twitter',
	},
	'https://www.github.com/eligarlo': {
		name: 'GitHub',
	},
	'https://www.linkedin.com/in/eliahu-garcia-lozano/': {
		name: 'LinkedIn',
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

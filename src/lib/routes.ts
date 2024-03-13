export const navItems = {
	'/': {
		name: 'Home',
	},
	'/blog': {
		name: 'Blog',
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

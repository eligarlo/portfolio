export const navItems = {
	'/': {
		name: 'Home',
	},
	'/blog': {
		name: 'Blog',
	},
}

const ROUTES: Record<StaticPagesType, string> = {
	home: '/',
	blog: '/blog',
	tag: '/blog/tag',
}

export type StaticPagesType = 'home' | 'blog' | 'tag'

export default ROUTES

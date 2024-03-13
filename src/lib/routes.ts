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
}

export type StaticPagesType = 'home' | 'blog'

export default ROUTES

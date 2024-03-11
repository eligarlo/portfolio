import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
	content: ['./src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}', './src/content/**/*.mdx'],
	theme: {
		extend: {
			colors: {
				'text-primary': 'var(--text-primary)',
				'text-secondary': 'var(--text-secondary)',
				'background-primary': 'var(--background-primary)',
				'background-secondary': 'var(--background-secondary)',
				'background-footer': 'var(--background-footer)',
			},
			typography: {
				quoteless: {
					css: {
						'blockquote p:first-of-type::before': { content: 'none' },
						'blockquote p:first-of-type::after': { content: 'none' },
					},
				},
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [typography],
}

export default config

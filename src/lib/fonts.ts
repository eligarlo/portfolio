import { Montserrat, Nunito_Sans } from 'next/font/google'

export const montserrat = Montserrat({
	subsets: ['latin'],
	style: ['normal', 'italic'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	display: 'swap',
	variable: '--font-family-primary',
})

export const nunitoSans = Nunito_Sans({
	subsets: ['latin'],
	style: ['normal', 'italic'],
	weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
	display: 'swap',
	variable: '--font-family-secondary',
})

import { Navbar } from '@/components/navbar/navbar'

export default function BlogLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Navbar />

			<main className='antialiased max-w-2xl flex flex-col mx-4 lg:mx-auto'>
				<section className='flex-auto min-w-0 flex flex-col px-2 md:px-0'>{children}</section>
			</main>
		</>
	)
}

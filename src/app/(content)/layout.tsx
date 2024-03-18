import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'

export default function ContentLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Navbar />

			<main>{children}</main>

			<Footer />
		</>
	)
}

import { Navbar } from '@/components/navbar/navbar'

export default function ContentLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Navbar />

			<main>{children}</main>
		</>
	)
}

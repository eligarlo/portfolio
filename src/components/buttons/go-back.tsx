'use client'

import { useRouter } from 'next/navigation'

type GoBackProps = {
	children?: React.ReactNode
	className?: string
}

export default function GoBack({ children = 'Go back', className }: GoBackProps) {
	const router = useRouter()
	return (
		<button type='button' onClick={() => router.back()} className={className}>
			{children}
		</button>
	)
}

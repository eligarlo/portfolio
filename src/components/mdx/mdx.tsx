import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'

import TweetComponent from '@/components/tweet/tweet'

function Table({ data }: { data: any }) {
	const headers = data.headers.map((header: any, index: number) => <th key={index}>{header}</th>)
	const rows = data.rows.map((row: any, index: number) => (
		<tr key={index}>
			{row.map((cell: any, cellIndex: number) => (
				<td key={cellIndex}>{cell}</td>
			))}
		</tr>
	))

	return (
		<table>
			<thead>
				<tr>{headers}</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	)
}

function CustomLink(props: any) {
	const href = props.href

	if (href.startsWith('/')) {
		return (
			<Link href={href} {...props}>
				{props.children}
			</Link>
		)
	}

	if (href.startsWith('#')) {
		return <a {...props} />
	}

	return <a target='_blank' rel='noopener noreferrer' {...props} />
}

function RoundedImage(props: any) {
	return <Image alt={props.alt} className='rounded-lg' {...props} />
}

function Callout({ emoji, children }: { emoji?: string; children: React.ReactNode }) {
	return (
		<div className='px-4 py-3 border border-neutral-700 bg-neutral-800 rounded p-1 text-sm flex items-center mb-8'>
			{emoji && <div className='flex items-center w-4 mr-4'>{emoji}</div>}
			<div className='w-full callout'>{children}</div>
		</div>
	)
}

function Code({ children, ...props }: { children: string; [key: string]: any }) {
	const codeHTML = highlight(children)
	return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str: string) {
	return str
		.toString()
		.toLowerCase()
		.trim() // Remove whitespace from both ends of a string
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/&/g, '-and-') // Replace & with 'and'
		.replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level: number) {
	// eslint-disable-next-line react/display-name
	return ({ children }: { children: any }) => {
		const slug = slugify(children)
		return React.createElement(`h${level}`, { id: slug, className: 'font-nunito text-white' }, [
			React.createElement('a', {
				href: `#${slug}`,
				key: `link-${slug}`,
				className: 'anchor font-nunito text-white',
			}),
			children,
		])
	}
}

const components = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: RoundedImage,
	a: CustomLink,
	Callout,
	StaticTweet: TweetComponent,
	code: Code,
	Table,
}

export default function CustomMDX(props: { source: string; components?: any }) {
	return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
}

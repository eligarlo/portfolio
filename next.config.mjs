/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: '*.cloudinary.com',
			},
			{
				hostname: 'media.giphy.com',
			},
		],
	},
}

export default nextConfig

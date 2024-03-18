/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
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

import { MetadataRoute } from 'next';
import { env } from '@/env';

export default function manifest(): MetadataRoute.Manifest {
	return {
		// scope: '/',
		lang: 'en',
		name: 'ZOE',
		description: 'ZOE',
		short_name: 'zoe',
		start_url: '/',
		display: 'standalone',
		theme_color: 'rgb(203 213 225)',
		background_color: 'rgb(203 213 225)',
		icons: [
			{
				src: '/favicon.ico',
				sizes: '32x32',
				type: 'image/x-icon',
			},
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
			{
				src: '/apple-touch-icon.png',
				sizes: '180x180',
				type: 'image/png',
			},
			{
				src: '/favicon-16x16.png',
				sizes: '16x16',
				type: 'image/png',
			},
			{
				src: '/favicon-32x32.png',
				sizes: '32x32',
				type: 'image/png',
			},
		],
		protocol_handlers: [
			{
				protocol: 'web+zoe',
				url: env.BASE_URL ? `${env.BASE_URL}/%s` : `http://localhost:${process.env.PORT ?? 4500}/%s`,
			},
		],
	};
}

import { MetadataRoute } from 'next';

import { env } from '@/env';

export default function manifest(): MetadataRoute.Manifest {
	return {
		// scope: '/',
		lang: 'en',
		name: 'Task Drive: Streamline Task Management & Boost Productivity',
		description: 'Boost productivity with TaskDrive. Prioritize tasks, manage files, and organize workflow effortlessly. Sign up now to transform your work efficiency.',
		short_name: 'taskdrive',
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
			{
				src: '/logo.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/logo-128.png',
				sizes: '128x128',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/logo-64.png',
				sizes: '64x64',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
		protocol_handlers: [
			{
				protocol: 'web+taskdrive',
				url: env.BASE_URL ? `${env.BASE_URL}/%s` : `http://localhost:${process.env.PORT ?? 4550}/%s`,
			},
		],
	};
}

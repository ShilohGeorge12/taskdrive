import { Metadata } from 'next/types';

import { BreadCrumbs } from '@/components/UI/breadCrumbs';
import Header from '@/components/UI/header';

import { env } from '@/env';
import { Form } from './form';

const url = env.BASE_URL;
const title = 'Welcome Back to TaskDrive';
const description = 'Log in to access your personalized dashboard, manage your tasks, and organize your files seamlessly.';
const currentUrl = `${url}/login`;

export const metadata: Metadata = {
	title,
	description,
	authors: [{ name: 'Shiloh George' }],
	publisher: 'Shiloh George',
	robots: 'index, follow',
	openGraph: {
		title,
		description,
		siteName: 'taskdrive',
	},
	twitter: {
		card: 'summary',
		site: currentUrl,
		creator: 'Shiloh George',
		images: '/logo.png',
	},
	alternates: { canonical: currentUrl },
};

export default async function LoginPage() {
	const links: { label: string; link: string }[] = [
		{ label: 'Home', link: '/' },
		{ label: 'login', link: '/login' },
	];
	return (
		<main className='w-full h-screen bg-gradient-to-br from-purple-400 to-purple-800'>
			<Header />
			<h1 className='hidden'>{title}</h1>
			<h2 className='hidden'>{description}</h2>

			<section className='w-[90%] mx-auto flex py-2'>
				<BreadCrumbs
					links={links}
					labelStyles='text-black'
					seperatorStyles='text-black'
				/>
			</section>

			<Form />
		</main>
	);
}

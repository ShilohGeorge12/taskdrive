import { Metadata } from 'next/types';

import { BreadCrumbs } from '@/components/UI/breadCrumbs';
import Header from '@/components/UI/header';

import { env } from '@/env';
import { SignUpForm } from './signUpForm';

const url = env.BASE_URL;
const title = 'Create Your TaskDrive Account';
const description =
	'Sign up to unlock the full potential of TaskDrive. Effortlessly manage your tasks and organize files with a personalized dashboard designed for productivity.';
const currentUrl = `${url}/signup`;

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

export default async function SignUpPage() {
	const links: { label: string; link: string }[] = [
		{ label: 'Home', link: '/' },
		{ label: 'signup', link: '/signup' },
	];
	return (
		<main className='w-full h-screen bg-gradient-to-br from-purple-400 to-purple-600'>
			<Header />
			<h1 className='hidden'>{title}</h1>
			<h2 className='hidden'>{description}</h2>

			<section className='w-[90%] mx-auto flex py-2'>
				<BreadCrumbs
					links={links}
					labelStyles='text-white '
					seperatorStyles='text-white'
				/>
			</section>

			<SignUpForm />
		</main>
	);
}

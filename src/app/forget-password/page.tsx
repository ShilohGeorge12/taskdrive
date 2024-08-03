import { Metadata } from 'next/types';

import { BreadCrumbs } from '@/components/UI/breadCrumbs';
import Header from '@/components/UI/header';

import { env } from '@/env';
import { ForgetPasswordForm } from './forgetPasswordForm';

const url = env.BASE_URL;
const title = 'Forgot Your Password? Recover It Here On TaskDrive Recovery Page';
const description = `Don't worry if you forgot your password. Just enter your email address, and we'll send you a code to reset it, so you can quickly get back to using TaskDrive.`;
const currentUrl = `${url}/forget-password`;

export const metadata: Metadata = {
	title: {
		absolute: title,
	},
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

export default async function ForgetPasswordPage() {
	const links: { label: string; link: string }[] = [
		{ label: 'Home', link: '/' },
		{ label: 'login', link: '/login' },
		{ label: 'forget-password', link: '/forget-password' },
	];
	return (
		<main className='w-full h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-800'>
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

			<ForgetPasswordForm />
		</main>
	);
}

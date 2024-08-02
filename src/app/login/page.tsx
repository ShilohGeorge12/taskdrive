import { Metadata } from 'next/types';

import { BreadCrumbs } from '@/components/UI/breadCrumbs';
import Header from '@/components/UI/header';

import { Form } from './form';

export const metadata: Metadata = {
	title: 'login',
	description: 'login into zeo',
};

export default async function LoginPage() {
	const links: { label: string; link: string }[] = [
		{ label: 'Home', link: '/' },
		{ label: 'login', link: '/login' },
	];
	return (
		<main className='w-full h-screen bg-gradient-to-br from-purple-400 to-purple-800'>
			<Header />

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

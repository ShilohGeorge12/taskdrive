import { Metadata } from 'next/types';

import { BreadCrumbs } from '@/components/UI/breadCrumbs';
import Header from '@/components/UI/header';

import { SignUpForm } from './signUpForm';

export const metadata: Metadata = {
	title: 'sign up',
	description: 'create an account',
};

export default async function SignUpPage() {
	const links: { label: string; link: string }[] = [
		{ label: 'Home', link: '/' },
		{ label: 'signup', link: '/signup' },
	];
	return (
		<main className='w-full h-screen bg-gradient-to-br from-purple-400 to-purple-600'>
			<Header />

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

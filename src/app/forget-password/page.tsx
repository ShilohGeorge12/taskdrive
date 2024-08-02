import Image from 'next/image';

import { BreadCrumbs } from '@/components/UI/breadCrumbs';
import Header from '@/components/UI/header';

import login from '@/assets/login.jpg';
import { ForgetPasswordForm } from './forgetPasswordForm';

export default async function ForgetPasswordPage() {
	const links: { label: string; link: string }[] = [
		{ label: 'Home', link: '/' },
		{ label: 'login', link: '/login' },
		{ label: 'forget-password', link: '/forget-password' },
	];
	return (
		<main className='w-full h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-800'>
			<Header />

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

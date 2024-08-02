import Image from 'next/image';
import { redirect } from 'next/navigation';

import { BreadCrumbs } from '@/components/UI/breadCrumbs';
import Header from '@/components/UI/header';

import { EMAIL_REGEX } from '@/types';

import signUp from '@/assets/signup.jpg';
import { ResetPasswordForm } from './ResetPasswordForm';

interface searchParamsType {
	email: string | undefined;
}

export default async function ResetPasswordPage({ searchParams }: { params: { slug: string }; searchParams: searchParamsType }) {
	const email = searchParams.email;

	if (!email) redirect('/forget-password');
	if (!EMAIL_REGEX.test(email)) redirect('/forget-password');
	const links: { label: string; link: string }[] = [
		{ label: 'Home', link: '/' },
		{ label: 'login', link: '/login' },
		{ label: 'forget-password', link: '/forget-password' },
		{ label: 'confirm-code', link: '/forget-password/confirm-code' },
		{ label: 'reset-password', link: '/forget-password/reset-password' },
	];

	return (
		<main className='w-full h-screen bg-gradient-to-br from-purple-400 via-purple-600 to-purple-800'>
			<Header />

			<section className='w-[90%] mx-auto flex py-2'>
				<BreadCrumbs
					links={links}
					labelStyles='text-white'
					seperatorStyles='text-white'
				/>
			</section>

			<ResetPasswordForm email={email} />
		</main>
	);
}

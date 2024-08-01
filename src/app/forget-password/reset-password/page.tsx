import Image from 'next/image';
import { redirect } from 'next/navigation';
import { EMAIL_REGEX } from '@/types';
import Header from '@/components/UI/header';
import { BreadCrumbs } from '@/components/UI/breadCrumbs';
import { ResetPasswordForm } from './ResetPasswordForm';
import signUp from '@/assets/signup.jpg';

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
		{ label: 'confirm-code', link: '/confirm-code' },
		{ label: 'reset-password', link: '/reset-password' },
	];

	return (
		<main className='w-full h-screen'>
			<Image
				src={signUp}
				alt=''
				priority
				className='fixed top-0 object-center md:object-cover size-full -z-10'
			/>
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

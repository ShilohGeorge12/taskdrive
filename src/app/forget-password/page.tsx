import Image from 'next/image';
import Header from '@/components/UI/header';
import { BreadCrumbs } from '@/components/UI/breadCrumbs';
import { ForgetPasswordForm } from './forgetPasswordForm';
import login from '@/assets/login.jpg';

export default async function ForgetPasswordPage() {
	const links: { label: string; link: string }[] = [
		{ label: 'Home', link: '/' },
		{ label: 'login', link: '/login' },
		{ label: 'forget-password', link: '/forget-password' },
	];
	return (
		<main className='w-full h-screen'>
			<Image
				src={login}
				alt=''
				priority
				className='fixed top-0 object-center md:object-cover size-full -z-10'
			/>
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

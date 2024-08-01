import Image from 'next/image';
import { Metadata } from 'next/types';
import Header from '@/components/UI/header';
import { BreadCrumbs } from '@/components/UI/breadCrumbs';
import { SignUpForm } from './signUpForm';
import signUp from '@/assets/signup.jpg';

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
					labelStyles='text-white '
					seperatorStyles='text-white'
				/>
			</section>

			<SignUpForm />
		</main>
	);
}

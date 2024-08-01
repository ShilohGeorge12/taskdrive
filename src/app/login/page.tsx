import Image from 'next/image';
import { Metadata } from 'next/types';
import Header from '@/components/UI/header';
import { BreadCrumbs } from '@/components/UI/breadCrumbs';
import { Form } from './form';
import login from '@/assets/login.jpg';

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

			<Form />
		</main>
	);
}

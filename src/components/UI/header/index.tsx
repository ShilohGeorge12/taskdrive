import Image from 'next/image';

import { getSession } from '@/lib/sessions';

import logo from '@/assets/logo.png';
import { Client } from './client';

export default async function Header() {
	const session = await getSession();

	return (
		<header className={`w-[90%] mx-auto py-4 flex items-center justify-between`}>
			<Image
				src={logo}
				alt="zoe's Logo"
				title="zoe's Logo"
				priority
				className='size-12 object-cover'
			/>

			<Client userId={session?.user._id.toString() ?? ''}>
				<p className='font-bold text-lg tracking-wide capitalize'>Welcome {session?.user.firstname}</p>
			</Client>
		</header>
	);
}

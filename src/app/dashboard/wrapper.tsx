'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import landing from '@/assets/Landing.jpg';
import login from '@/assets/login.jpg';
import files from '@/assets/files.jpg';

export function Wrapper({ children }: { children: React.ReactNode }) {
	const path = usePathname();

	const bgImage = () => {
		if (path.includes('dashboard') && path.includes('files')) return files;
		if (path.includes('dashboard') && !path.includes('files')) return login;
		return landing;
	};

	return (
		<main className={`w-full h-screen overflow-hidden ${path.includes('dashboard') && !path.includes('files') && 'bg-gradient-to-br from-[#EF5C09] to-[#DADADA]'}`}>
			{path.includes('dashboard') && path.includes('files') && (
				<Image
					src={bgImage()}
					alt=''
					priority
					className='fixed top-0 object-center md:object-cover size-full -z-10'
				/>
			)}
			{children}
		</main>
	);
}

import type { Metadata } from 'next';
import Image from 'next/image';

import { NotFoundAnimate } from '@/components/UI/notFound';
import { NotFoundClient } from '@/components/UI/notfoundClient';

import notFoundImage from '@/assets/notFound.png';

export const metadata: Metadata = {
	title: `404 - Page Not Found`,
	description: `404 Error - The Page you are looking for was Not Found.`,
};

// from-[#a72cc5] to-[#DADADA]'>
export default function NotFound() {
	return (
		<main className='w-full h-screen flex flex-col bg-gradient-to-br from-purple-400 to-purple-600'>
			<NotFoundAnimate>
				<>
					<section className='flex items-center justify-center gap-4 w-[90%]'>
						<Image
							src={notFoundImage}
							loading='eager'
							alt='sadhime'
							title='sadhime'
							className={`w-[15%] hover:scale-105 transition duration-300 ease-in-out`}
						/>
						<div className='w-1 h-20 bg-gray-300 md:h-36 rounded-xl' />
						<p className='text-justify'>The Page you are looking for was Not Found</p>
					</section>
					<NotFoundClient />
					{/* <Link
						href={'/'}
						className={`px-4 h-10 flex items-center justify-center bg-white/30 text-black font-medium rounded-2xl transition-all duration-500 hover:bg-white/50 hover:shadow-md hover:scale-105`}>
						Back To Home Page
					</Link> */}
				</>
			</NotFoundAnimate>
		</main>
	);
}
// change link color

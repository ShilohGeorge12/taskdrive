'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Btn } from '@/components/UI/button';

import ErrorImage from '@/assets/error.png';
import { motion } from 'framer-motion';

export default function Error({ reset }: { error: Error; reset: () => void }) {
	return (
		<main className='w-full h-screen flex flex-col bg-gradient-to-br from-purple-400 via-purple-600 to-purple-800'>
			<motion.section
				className='w-full h-full flex flex-col'
				initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
				animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
				exit={{ opacity: 0, translateZ: -100 }}
				transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
				<section className='w-full h-full flex items-center gap-4 justify-center'>
					<Image
						src={ErrorImage}
						className={`w-[30%] md:w-[15%] hover:scale-105 transition duration-300 ease-in-out`}
						title='error Something went wrong'
						alt='error Something went wrong'
					/>
					<hr className='w-[2px] md:h-40 h-36 rounded-xl bg-black/50' />
					<section className='flex flex-col gap-4 items-center'>
						<p className='text-sm md:text-lg font-bold tracking-wider'>Something Went Wrong! </p>
						<Btn
							title='Try again'
							style={{
								size: 'w-[6rem] h-10',
								color: 'bg-white/50 text-black hover:bg-white/80',
								shadow: 'hover:shadow-lg',
								more: 'font-semibold tracking-wider',
							}}
							onClick={() => reset()}
						/>
						<Link
							href={'/'}
							title='Back To Home'
							className={`w-3/4 h-10 flex items-center justify-center bg-white/50 text-black hover:bg-white/80 hover:shadow-lg font-semibold tracking-wider rounded-lg transition-all duration-500 ease-in-out`}>
							Back To Home
						</Link>
					</section>
				</section>
			</motion.section>
		</main>
	);
}

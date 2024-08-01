'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Btn } from '@/components/UI/button';
import ErrorImage from '@/assets/error.png';
import landing from '@/assets/Landing.jpg';

export default function Error({ reset }: { error: Error; reset: () => void }) {
	return (
		<main className='w-full h-full flex flex-col'>
			<Image
				src={landing}
				alt=''
				priority
				className='fixed top-0 object-center md:object-cover size-full '
			/>
			<motion.section
				className='w-full h-full flex flex-col'
				initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
				animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
				exit={{ opacity: 0, translateZ: -100 }}
				transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
				{/* <Header /> */}
				<section className='w-full min-h-screen h-full flex items-center gap-4 justify-center'>
					<Image
						src={ErrorImage}
						className={`w-[30%] md:w-[15%] hover:scale-105 transition duration-300 ease-in-out`}
						title='error Something went wrong'
						alt='error Something went wrong'
					/>
					<hr className='w-1 md:h-40 h-36 rounded-xl bg-black' />
					<section className='flex flex-col gap-4 items-center'>
						<p className='text-sm md:text-lg font-bold tracking-wider text-black'>Something Went Wrong! </p>
						<Btn
							title='Try again'
							style={{
								size: 'w-[5.5rem] h-10',
								color: 'bg-white hover:bg-black hover:text-white',
								shadow: 'hover:shadow-xl',
								more: '',
							}}
							onClick={() => reset()}
						/>
					</section>
				</section>
			</motion.section>
		</main>
	);
}

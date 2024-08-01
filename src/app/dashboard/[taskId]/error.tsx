'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ErrorImage from '@/assets/error.png';
import { Btn } from '@/components/UI/button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
	return (
		<section className='flex flex-col w-full h-full col-span-11'>
			<motion.section
				className='flex flex-col w-full h-full'
				initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
				animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
				exit={{ opacity: 0, translateZ: -100 }}
				transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
				<section className='flex items-center justify-center w-full h-full gap-4'>
					<Image
						src={ErrorImage}
						className={`w-[30%] md:w-[15%] hover:scale-105 transition duration-300 ease-in-out`}
						title='error Something went wrong'
						alt='error Something went wrong'
					/>
					<hr className='w-1 bg-black/50 md:h-40 h-36 rounded-xl' />
					<section className='flex flex-col items-center gap-4'>
						<p className='text-sm font-bold tracking-wider text-black/70 md:text-lg'>Something Went Wrong! </p>
						<Btn
							title='Try again'
							style={{
								size: 'w-[5.5rem] h-10',
								color: 'bg-white/30 hover:bg-white/50',
								shadow: 'hover:shadow-lg hover:shadow-white/50',
								more: 'border border-white/30',
							}}
							onClick={() => reset()}
						/>
					</section>
				</section>
			</motion.section>
		</section>
	);
}

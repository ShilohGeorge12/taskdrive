import Link from 'next/link';

import Header from '@/components/UI/header';

export default function LandingPage() {
	return (
		<main className='w-full h-screen bg-gradient-to-br from-purple-300 to-purple-500'>
			<Header />
			<section className='fixed bottom-24 md:bottom-28 left-1 w-full gap-8 flex flex-col '>
				<h2 className='w-3/4 flex items-center justify-center mx-auto p-2 text-2xl text-black font-semibold tracking-wider'>Take Control of Your Day</h2>
				<p className='w-3/4 flex items-center justify-center text-justify mx-auto p-2 text-lg text-black font-normal tracking-wider'>
					Elevate your productivity with TaskDrive. Effortlessly prioritize tasks and manage files using our intuitive, streamlined dashboard. Organize your workflow with
					precision and experience the power of efficient task management. Sign up today and transform the way you work.
				</p>
				<div className='w-[90%] md:w-[50%] mx-auto flex items-center justify-between'>
					<Link
						href={'login'}
						className='w-32 h-10 flex items-center justify-center bg-white/50 hover:bg-white/80 hover:shadow-xl hover:scale-105 rounded-md font-semibold tracking-wider transition-all duration-500 ease-in-out'>
						LOGIN
					</Link>

					<Link
						href={'signup'}
						className='w-32 h-10 flex items-center justify-center bg-white/50 hover:bg-white/80 rounded-md font-semibold tracking-wider hover:shadow-lg hover:scale-105 transition-all duration-500 ease-in-out'>
						SIGN UP
					</Link>
				</div>
			</section>
		</main>
	);
}

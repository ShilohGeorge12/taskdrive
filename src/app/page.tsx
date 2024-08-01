import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/UI/header';
import landing from '@/assets/Landing.jpg';

export default function LandingPage() {
	return (
		<main className='w-full h-screen '>
			<Image
				src={landing}
				alt=''
				priority
				className='fixed top-0 object-center md:object-cover size-full -z-10'
			/>
			<Header />
			<section className='fixed bottom-24 md:bottom-28 left-1 w-full flex'>
				<div className='w-[90%] md:w-[50%] mx-auto flex items-center justify-between'>
					<Link
						href={'login'}
						className='w-32 h-10 flex items-center justify-center bg-white hover:bg-black hover:text-white hover:shadow-xl hover:scale-105 rounded-md font-semibold tracking-wider transition-all duration-500 ease-in-out'>
						LOGIN
					</Link>

					<Link
						href={'signup'}
						className='w-32 h-10 flex items-center justify-center bg-white hover:bg-black hover:text-white rounded-md font-semibold tracking-wider hover:shadow-lg hover:scale-105 transition-all duration-500 ease-in-out'>
						SIGN UP
					</Link>
				</div>
			</section>
		</main>
	);
}

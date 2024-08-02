import { Spinner } from '@/components/UI/spinner';

export default function Loading() {
	return (
		<section className='flex flex-col items-center justify-center w-full h-full col-span-11 bg-gradient-to-br from-purple-400 to-purple-800'>
			<Spinner height />
		</section>
	);
}

import { Spinner } from '@/components/UI/spinner';

export default function Loading() {
	return (
		<section className='flex flex-col items-center justify-center w-full h-full col-span-11 '>
			<Spinner height />
		</section>
	);
}

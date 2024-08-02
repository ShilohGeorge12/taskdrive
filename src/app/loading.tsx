import { Spinner } from '@/components/UI/spinner';

export default function Loading() {
	return (
		<main className='w-full h-full min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-purple-800'>
			<Spinner />
		</main>
	);
}

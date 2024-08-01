import { TaskGroup } from '@/types';
import Link from 'next/link';
// import { FaCheckCircle } from 'react-icons/fa';

interface taskProps {
	_id: TaskGroup['_id'];
	title: TaskGroup['title'];
	description: TaskGroup['description'];
}

export const Task = ({ _id, title, description }: taskProps) => {
	return (
		<Link
			href={`/dashboard/${_id}`}
			className='relative grid w-full grid-rows-4 gap-2 px-4 py-6 text-white transition-all duration-500 ease-in-out h-52 rounded-3xl shadow-white/20 hover:shadow-2xl bg-white/20 hover:scale-105'>
			<p className='flex items-center justify-center row-span-1 overflow-hidden font-semibold tracking-wider size-full whitespace-nowrap'>
				<span className='overflow-hidden text-lg md:text-xl text-ellipsis'>{title}</span>
			</p>

			<p className='row-span-3 py-1 tracking-wide whitespace-pre-wrap size-full line-clamp-4 text-ellipsis'>{description}</p>
			{/* {isCompleted && (
				<p className='flex items-start justify-end w-full '>
					<span className='p-2 text-lg text-white/80 rounded-xl bg-green-600/50'>
						<FaCheckCircle />
					</span>
				</p>
			)} */}
		</Link>
	);
};

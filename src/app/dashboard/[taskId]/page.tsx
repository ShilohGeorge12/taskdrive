import { notFound, redirect } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next/types';
import { deleteTaskGroup, onDeleteTask } from '@/actions';

import { DeleteTask } from './deleteTask';
import { CompleteTask } from './completeTask';
import { AddSubTask } from './addSubTask';
import { BreadCrumbs } from '@/components/UI/breadCrumbs';
import { Task } from '@/components/UI/tasks';
import { TaskGroup } from '@/types';

import { FaCheck, FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { EditSubTask } from './editSubTask';
import { MongoDB } from '@/db';
import { getSession } from '@/lib/sessions';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { DeleteTaskGroup } from './deleteTaskGroup';

type generateMetadataProps = {
	params: { taskId: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params: { taskId } }: generateMetadataProps, parent: ResolvingMetadata): Promise<Metadata> {
	const session = await getSession();
	const task = await MongoDB.getTasks().findOne({ _id: taskId, userId: session?.user._id.toString() });

	if (!task) notFound();

	const previousImages = (await parent).openGraph?.images || [];
	return {
		title: `${task.title}`,
		description: `${task.description} description`,
		openGraph: {
			images: [...previousImages],
		},
	};
}

export default async function TaskPage({ params: { taskId } }: { params: { taskId: string } }) {
	const session = await getSession();
	const task = await MongoDB.getTasks().findOne({ _id: taskId, userId: session?.user._id.toString() });
	if (!task) notFound();

	const links: { label: string; link: string }[] = [{ label: 'back to dashboard', link: '/dashboard' }];
	const urgent = task.subTasks.filter((subTask) => subTask.tag === 'urgent');
	const important = task.subTasks.filter((subTask) => subTask.tag === 'important');
	const mustDo = task.subTasks.filter((subTask) => subTask.tag === 'must do');
	const normal = task.subTasks.filter((subTask) => subTask.tag === 'normal');

	return (
		<section className='flex flex-col w-full h-full col-span-12 gap-4 overflow-y-hidden md:col-span-11 md:pl-2 md:py-2'>
			<div className='flex flex-col w-full gap-0 py-1'>
				<div className='w-full flex items-center justify-center'>
					<div className='w-full'>
						<BreadCrumbs
							links={links}
							labelStyles='text-black'
							seperatorStyles='text-black'
						/>
					</div>

					<DeleteTaskGroup taskId={task._id.toString()} />
				</div>
				<h1 className='flex items-center justify-center w-full text-2xl font-bold tracking-wider text-balance'>{task.title}</h1>

				<div className='flex flex-col items-center justify-center w-full mt-5'>
					<p className=''>{task.description}</p>
				</div>
			</div>

			<section className='grid w-full h-full grid-cols-5 gap-10 py-3 overflow-y-scroll border rounded-3xl md:px-4 md:grid-cols-10 border-white/50'>
				<Category
					_id={task._id}
					tag='urgent'
					subTasks={urgent}
				/>
				<Category
					_id={task._id}
					tag='important'
					subTasks={important}
				/>
				<Category
					_id={task._id}
					tag='must do'
					subTasks={mustDo}
				/>
				<Category
					_id={task._id}
					tag='normal'
					subTasks={normal}
				/>
			</section>

			{/* <div className='flex flex-wrap items-center justify-center w-full gap-2 font-medium md:gap-4'>
				<p className='flex h-10 gap-1 w-fit bg-white/30 rounded-2xl overflow-clip'>
					{result.task.tag === 'urgent' && <span className='w-10 h-full bg-red-500' />}
					{result.task.tag === 'important' && <span className='w-10 h-full bg-yellow-400' />}
					{result.task.tag === 'must do' && <span className='w-10 h-full bg-green-500' />}
					{result.task.tag === 'normal' && <span className='w-10 h-full bg-gray-400' />}
					<span className='flex items-center justify-center px-3 text-base font-medium tracking-wider capitalize text-balance'>{result.task.tag}</span>
				</p>

				<CompleteTask taskId={taskId}>
					<>
						{!result.task.isCompleted && (
							<button
								type='submit'
								name={`Mark ${result.task.title} as Completed`}
								className={`px-4 h-10 rounded-2xl bg-white/20 transition-all duration-500 ease-in-out hover:bg-white/60`}>
								Mark as Completed
							</button>
						)}

						{result.task.isCompleted && (
							<button
								type='submit'
								name={`Mark ${result.task.title} as Un-Completed`}
								className='flex items-center justify-center w-32 h-10 px-4 text-2xl text-green-600 transition-all duration-500 ease-in-out rounded-2xl bg-white/20 hover:bg-white/60'>
								<FaCheckCircle />
							</button>
						)}
					</>
				</CompleteTask>

				<DeleteTask taskId={taskId}>
					<button
						type='submit'
						name={``}
						className={`px-4 h-10 rounded-2xl bg-white/20 transition-all duration-500 ease-in-out hover:bg-white/60 `}>
						Delete Task
					</button>
				</DeleteTask>
			</div> */}
		</section>
	);
}

interface CategoryProps {
	_id: TaskGroup['_id'];
	tag: TaskGroup['subTasks'][0]['tag'];
	subTasks: TaskGroup['subTasks'];
}

const Category = ({ _id, tag, subTasks }: CategoryProps) => {
	return (
		<>
			<div className="className='relative grid w-full col-span-5 grid-rows-4 gap-2 px-4 py-4 text-white transition-all duration-500 ease-in-out min-h-[400px] mx-h-[600px] h-[400px] rounded-3xl shadow-white/20 hover:shadow-2xl bg-white/20 md:hover:scale-105">
				<p className='flex items-center justify-center row-span-1 overflow-hidden font-semibold tracking-wider size-full whitespace-nowrap'>
					<span className='overflow-hidden text-lg capitalize md:text-xl text-ellipsis'>{tag} Task</span>
				</p>

				<ul className='flex flex-col row-span-3 gap-2 py-1 tracking-wide md:gap-4 size-full'>
					{subTasks.length > 0 &&
						subTasks.map((subTask) => (
							<li
								key={subTask._id.toString()}
								className={`grid w-full grid-cols-12 gap-4 ${subTask.isCompleted && 'line-through text-white/70'}`}>
								<span className='flex w-full h-12 col-span-9 overflow-hidden font-medium tracking-wide whitespace-pre-wrap items-centers text-ellipsis'>
									{subTask.task}
								</span>

								<div className='flex items-center w-full col-span-3 justify-evenly'>
									<CompleteTask
										subTaskId={subTask._id.toString()}
										taskId={_id.toString()}>
										<button
											type='submit'
											name={`toggle task as completed`}
											className={`p-2 flex items-center justify-center rounded-lg font-medium ${subTask.isCompleted ? 'text-white/80 bg-green-600/50' : 'bg-white/50 text-black'} transition-all duration-500 ease-in-out`}>
											<FaCheck />
										</button>
									</CompleteTask>

									<EditSubTask
										taskId={_id.toString()}
										subTaskId={subTask._id.toString()}
										tag={tag}
										task={subTask.task}
									/>

									<DeleteTask
										taskId={_id.toString()}
										subTaskId={subTask._id.toString()}>
										<button
											type='submit'
											name={`delete sub Task`}
											className={`size-[32px] flex items-center justify-center rounded-lg bg-white/50 text-black font-medium `}>
											<FaTrash />
										</button>
									</DeleteTask>
								</div>
							</li>
						))}

					{subTasks.length === 0 && <span className='flex items-center justify-center w-full mt-5'>There is no Task with this priority</span>}
				</ul>

				<div className='flex items-center justify-end w-full gap-2'>
					{tag === 'urgent' && <span className='p-2 text-lg bg-red-600 rounded-xl' />}

					{tag === 'important' && <span className='p-2 text-lg bg-yellow-600 rounded-xl' />}

					{tag === 'must do' && <span className='p-2 text-lg bg-green-600 rounded-xl' />}

					{tag === 'normal' && <span className='p-2 text-lg bg-gray-400 rounded-xl' />}

					<AddSubTask
						_id={_id.toString()}
						tag={tag}
					/>
				</div>
			</div>
		</>
	);
};

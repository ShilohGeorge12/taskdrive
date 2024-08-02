import { getSession } from '@/lib/sessions';

import { Task } from '@/components/UI/tasks';

import { MongoDB } from '@/db';

export default async function HomePage() {
	const session = await getSession();

	const tasks = await MongoDB.getTasks().find({ userId: session?.user._id.toString() });
	return (
		<section className='w-full h-full col-span-12 overflow-y-hidden md:col-span-11 md:pl-2'>
			<section className={`grid grid-cols-1 p-3 overflow-y-scroll justify-items-center gap-6 md:gap-4 size-full md:grid-cols-4`}>
				{tasks.length === 0 && <p className='md:col-span-4 w-full flex items-center justify-center'>There are no current task</p>}

				{tasks.length > 0 &&
					tasks.map((task) => (
						<Task
							key={task._id.toString()}
							_id={task._id}
							title={task.title}
							description={task.description}
						/>
					))}
			</section>
		</section>
	);
}

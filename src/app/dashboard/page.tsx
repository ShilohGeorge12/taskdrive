import { Metadata } from 'next/types';

import { getSession } from '@/lib/sessions';

import { Task } from '@/components/UI/tasks';

import { MongoDB } from '@/db';
import { env } from '@/env';

const url = env.BASE_URL;
const title = 'Master Your Tasks, Elevate Your Productivity with Task Drive';
const description = `Boost productivity with Task Drives task management. Prioritize, organize, and streamline your tasks effortlessly with our intuitive dashboard.`;
const currentUrl = `${url}/dashboard`;

export const metadata: Metadata = {
	title: {
		absolute: title,
	},
	description,
	authors: [{ name: 'Shiloh George' }],
	publisher: 'Shiloh George',
	robots: 'index, follow',
	openGraph: {
		title,
		description,
		siteName: 'taskdrive',
	},
	twitter: {
		card: 'summary',
		site: currentUrl,
		creator: 'Shiloh George',
		images: '/logo.png',
	},
	alternates: { canonical: currentUrl },
};

export default async function HomePage() {
	const session = await getSession();

	const tasks = await MongoDB.getTasks().find({ userId: session?.user._id.toString() });
	return (
		<section className='w-full h-full col-span-12 overflow-y-hidden md:col-span-11 md:pl-2'>
			<h1 className='hidden'>{title}</h1>
			<h2 className='hidden'>{description}</h2>
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

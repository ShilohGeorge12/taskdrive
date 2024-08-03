import { Metadata } from 'next/types';

import { getSession } from '@/lib/sessions';

import { FileList } from '@/components/UI/files/fileList';

import { Files_DB } from '@/types';

import { MongoDB } from '@/db';
import { env } from '@/env';

const url = env.BASE_URL;
const title = 'Organize Your Files Efficiently with Task Drives File Management';
const description = `Manage and store your files effortlessly with TaskDrive. Enjoy a user-friendly interface for organizing, uploading, and accessing your documents and media.`;
const currentUrl = `${url}/dashboard/files`;

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

export default async function FilesPage() {
	const session = await getSession();
	const files = await MongoDB.getFiles().find({ userId: session?.user._id });

	const reStructureFile = (file: (typeof files)[0]) => {
		const File = JSON.parse(JSON.stringify(file)) as unknown as Files_DB;
		return File;
	};

	return (
		<section className='w-full h-full col-span-12 overflow-y-hidden md:col-span-11 md:pl-2'>
			<h1 className='hidden'>{title}</h1>
			<h2 className='hidden'>{description}</h2>
			<section className={`grid grid-cols-2 p-3 overflow-y-scroll justify-items-center gap-6 md:gap-4 size-full md:grid-cols-6`}>
				{files.length === 0 && <p className='col-span-2 md:col-span-6 w-full flex items-center justify-center tracking-wide'>This directory is empty</p>}
				{files.length > 0 &&
					files.map((file) => (
						<FileList
							key={file._id.toString()}
							file={reStructureFile(file)}
						/>
					))}
			</section>
		</section>
	);
}

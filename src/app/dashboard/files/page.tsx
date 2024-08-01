import { MongoDB } from '@/db';
import { Files_DB } from '@/types';
import { FileList } from '@/components/UI/files/fileList';
import { getSession } from '@/lib/sessions';

export default async function FilesPage() {
	const session = await getSession();
	const files = await MongoDB.getFiles().find({ userId: session?.user._id });

	const reStructureFile = (file: (typeof files)[0]) => {
		const File = JSON.parse(JSON.stringify(file)) as unknown as Files_DB;
		return File;
	};

	return (
		<section className='w-full h-full col-span-12 overflow-y-hidden md:col-span-11 md:pl-2'>
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

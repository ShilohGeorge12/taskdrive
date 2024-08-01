import { notFound } from 'next/navigation';
import { MongoDB } from '@/db';
import { Files_DB, isFolder } from '@/types';
import { FolderList } from '@/components/UI/files/folderList';
import { FolderBreadCrumbs } from './FolderBreadCrumbs';

export default async function DynamicFolderPage({ params: { folder } }: { params: { folder: string | string[] } }) {
	const id = typeof folder === 'string' ? folder : folder.length === 1 ? folder[folder.length - 1] : folder[folder.length - 2];
	const file = await MongoDB.getFiles().findOne({ _id: id });

	if (!file) return notFound();
	if (!isFolder(file)) return notFound();

	const subFiles = isFolder(file) && file.content.find((eachContent) => eachContent._id.toString() === folder[folder.length - 1]);

	const reStructureFile = (content: any) => {
		const File = JSON.parse(JSON.stringify(content)) as unknown as Files_DB;
		return File;
	};

	return (
		<section className='w-full h-full col-span-12 overflow-y-hidden md:col-span-11 md:pl-2'>
			<div className='flex flex-col w-full gap-0 py-1'>
				<FolderBreadCrumbs />
			</div>
			<section className={`grid grid-cols-2 p-3 overflow-y-scroll justify-items-center gap-6 md:gap-4 size-full md:grid-cols-6`}>
				{isFolder(file) &&
					folder.length === 1 &&
					file.content.map((eachContent) => (
						<FolderList
							key={eachContent._id.toString()}
							file={reStructureFile(eachContent)}
						/>
					))}

				{subFiles &&
					isFolder(subFiles) &&
					folder.length >= 1 &&
					subFiles.content.map((eachContent) => (
						<FolderList
							key={eachContent._id.toString()}
							file={reStructureFile(eachContent)}
						/>
					))}
			</section>
		</section>
	);
}

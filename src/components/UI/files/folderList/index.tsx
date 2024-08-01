'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Files_DB, isFileClient } from '@/types';
import { RightClickMenu } from '../../contextMenu';
import { deleteFile, deleteFolder } from '@/actions';
import { toast } from 'sonner';
import { FaTrash } from 'react-icons/fa';

interface FileListProps {
	file: Omit<Files_DB, '_id' | 'createdAt' | 'updatedAt'> & { _id: string };
}

export const FolderList = ({ file }: FileListProps) => {
	const path = usePathname();
	const level = `${file.level}/${file._id}`;

	const PickMimieType = () => {
		if (isFileClient(file) && file.fileType === 'file' && file.mimeType === 'audio') {
			return 'pt-4';
		}
		if (isFileClient(file) && file.fileType === 'file' && file.mimeType === 'doc') {
			return 'pt-4';
		}
		if (isFileClient(file) && file.fileType === 'file' && file.mimeType === 'image') {
			return 'pt-4';
		}
		return 'pt-2';
	};

	const imageSize = () => {
		if (isFileClient(file) && file.fileType === 'file' && file.mimeType === 'audio') {
			return 'w-14';
		}
		if (isFileClient(file) && file.fileType === 'file' && file.mimeType === 'doc') {
			return 'w-14';
		}
		if (isFileClient(file) && file.fileType === 'file' && file.mimeType === 'image') {
			return 'w-14';
		}
		return 'w-16';
	};

	const onDeleteFile = async () => {
		if (file.fileType === 'file') {
			toast.promise(
				async () => {
					const error = await deleteFile({ fileId: file._id, path });

					if (error) throw new Error(error);

					return 'file deletion was successfull';
				},
				{
					loading: 'Loading...',
					success: (data) => data,
					error: (e: Error) => e.message,
				}
			);
			return;
		}

		toast.promise(
			async () => {
				const error = await deleteFolder({ folderId: file._id, path });

				if (error) throw new Error(error);

				return 'folder deletion was successfull';
			},
			{
				loading: 'deletion in progress...',
				success: (data) => data,
				error: (e: Error) => e.message,
			}
		);
	};

	const linkToDownload = () => {
		if (isFileClient(file)) {
			return file.resource;
		}
		return '';
	};

	const buttons = [
		// <button
		// 	type='button'
		// 	name={``}
		// 	className={``}
		// 	onClick={() => console.log('rename')}>
		// 	Rename
		// </button>,
		<button
			type='button'
			key={`delete button in folder routes`}
			name={`delete file`}
			className={`border border-red-500 w-full h-8 flex items-center justify-center bg-red-500 text-white hover:bg-red-600 rounded-md font-semibold tracking-wider text-lg transition-all duration-500 ease-in-out`}
			onClick={onDeleteFile}>
			<FaTrash />
		</button>,
	];

	return (
		<>
			{level && file.fileType === 'folder' && (
				<RightClickMenu buttons={buttons}>
					<Link
						href={`${path}/${file._id}`}
						className='w-[126px] h-[120px] gap-2 grid grid-rows-6 place-items-center bg-white/20 hover:bg-white/40 transition-all duration-500 ease-in-out rounded-2xl'>
						<Image
							src={file.icon}
							alt={file.name}
							width={80}
							height={80}
							priority
							className={`w-20 row-span-4`}
						/>
						<p className='font-medium tracking-wide w-[80%] h-full mx-auto text-center row-span-2 overflow-hidden text-ellipsis'>{file.name}</p>
					</Link>
				</RightClickMenu>
			)}

			{level && file.fileType === 'file' && (
				<RightClickMenu buttons={buttons}>
					<Link
						href={linkToDownload()}
						target='_blank'
						download={file.name}
						className={`w-[126px] h-[120px] gap-2 grid grid-rows-6 place-items-center bg-white/20 hover:bg-white/40 transition-all duration-500 ease-in-out rounded-2xl ${PickMimieType()}`}>
						<Image
							src={file.icon}
							alt={file.name}
							width={80}
							height={80}
							priority
							className={`${imageSize()} row-span-4`}
						/>
						<p className='font-medium tracking-wide w-[80%] h-[80%] md:h-full mx-auto text-center row-span-2 overflow-hidden text-ellipsis'>{file.name}</p>
					</Link>
				</RightClickMenu>
			)}
		</>
	);
};

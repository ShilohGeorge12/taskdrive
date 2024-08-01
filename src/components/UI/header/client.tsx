'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, ReactNode, useRef, useState, useTransition } from 'react';
import { onCreateNewTask, addFile, addFolder, onLogout } from '@/actions';
import { DESCRIPTION_REGEX, TITLE_REGEX } from '@/types';

import { Aside } from '../aside';
import NavLinks from '../navLInks';
import { motion } from 'framer-motion';

import { FiMenu } from 'react-icons/fi';
import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import logo from '@/assets/ZOEacad Logo.svg';

export function Client({ children, userId }: { children: ReactNode; userId: string }) {
	const path = usePathname();
	const { push } = useRouter();
	const btnRef = useRef<HTMLButtonElement | null>(null);
	const addTaskBtnRef = useRef<HTMLButtonElement | null>(null);
	const addFileBtnRef = useRef<HTMLButtonElement | null>(null);
	const addTaskInitState = {
		title: '',
		description: '',
		// tag: '',
	};
	const createFolderInitState = {
		name: '',
	};

	const [formData, setFormData] = useState<typeof addTaskInitState>(addTaskInitState);
	const [folderName, setFolderName] = useState<typeof createFolderInitState>(createFolderInitState);
	const [canCreateFolder, setCanCreateFolder] = useState<boolean>(false);
	const [file, setFile] = useState<File | null>(null);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [isPending, startTransition] = useTransition();

	const onLogOut = async () => {
		await onLogout();
		btnRef.current?.click();
		push('/login');
	};

	const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage([]);

		if (!canCreateFolder) {
			if (!file) {
				setErrorMessage(['File input must not be left empty']);
				return;
			}

			startTransition(async () => {
				const formData = new FormData();

				formData.append('file', file);

				const error = await addFile({ formData, path, userId });

				if (error) {
					setErrorMessage([error]);
					return;
				}

				setFile(null);
				setErrorMessage([]);
				addFileBtnRef.current?.click();
			});
			return;
		}

		startTransition(async () => {
			const error = await addFolder({ name: folderName.name.trim(), path, userId });

			if (error) {
				setErrorMessage([error]);
				return;
			}
			setFile(null);
			setErrorMessage([]);
			addFileBtnRef.current?.click();
		});
	};

	const onCreateTask = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage([]);

		let hasError: boolean = false;

		if (!TITLE_REGEX.test(formData.title)) {
			setErrorMessage((prev) => [...prev, 'Please input a valid title']);
			hasError = true;
		}

		if (!DESCRIPTION_REGEX.test(formData.description)) {
			setErrorMessage((prev) => [...prev, 'Please input a valid description']);
			hasError = true;
		}

		if (hasError) return;
		startTransition(async () => {
			const error = await onCreateNewTask({
				userId,
				title: formData.title.trim(),
				description: formData.description.trim(),
				// tag: formData.tag as TAG,
			});

			if (error) {
				setErrorMessage([error]);
				return;
			}

			setFormData(addTaskInitState);
			setErrorMessage([]);
			addTaskBtnRef.current?.click();
		});
	};

	const triggerButton = (
		<button
			type='button'
			name={``}
			ref={btnRef}
			className={`md:hidden flex items-center justify-center p-2 bg-white/30 hover:bg-white/50 rounded-lg transition-all duration-500 ease-in-out`}>
			<FiMenu className='text-lg' />
		</button>
	);

	const addTaskTrggerBtn = (
		<button
			type='button'
			name={`Add Task`}
			ref={addTaskBtnRef}
			className={`flex items-center justify-center p-2 bg-white/30 hover:bg-white/50 rounded-lg text-lg transition-all duration-500 ease-in-out`}>
			<FaPlusCircle />
		</button>
	);

	const addFileTrggerBtn = (
		<button
			type='button'
			name={`Add File`}
			ref={addFileBtnRef}
			className={`flex items-center justify-center p-2 bg-white/30 hover:bg-white/50 rounded-lg text-lg transition-all duration-500 ease-in-out`}>
			<FaPlusCircle />
		</button>
	);

	return (
		<section className='flex items-center gap-3'>
			{path.includes('dashboard') && !path.includes('files') && (
				<Aside
					title='Create a new task'
					position='right'
					triggerButton={addTaskTrggerBtn}>
					<form
						onSubmit={onCreateTask}
						className='flex flex-col w-full h-full gap-6 py-4'>
						<div className='w-full h-10'>
							<input
								type='text'
								name='title'
								placeholder='Task Title...'
								inputMode='text'
								required
								disabled={isPending}
								value={formData.title}
								onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
								className='w-full h-full px-4 text-lg font-semibold tracking-wider transition-all duration-500 ease-in-out bg-white rounded-lg outline-0 ring-0 ring-white hover:ring-1 focus:ring-2'
							/>
						</div>
						<div className='w-full h-10'>
							<input
								type='text'
								name='description'
								placeholder='Task Description...'
								inputMode='text'
								required
								disabled={isPending}
								value={formData.description}
								onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
								className='w-full h-full px-4 text-lg font-semibold tracking-wider transition-all duration-500 ease-in-out bg-white rounded-lg outline-0 ring-0 ring-white hover:ring-1 focus:ring-2'
							/>
						</div>
						<button
							type='submit'
							name={`Create Task`}
							className={`w-full h-10 flex items-center justify-center gap-4 text-white bg-[#EF5C09]/70 disabled:bg-[#EF5C09]/50 rounded-lg font-semibold text-lg tracking-wider transition-all duration-500 ease-in-out`}
							disabled={isPending}>
							{isPending && (
								<span className='animate-rotate'>
									<FaSpinner />
								</span>
							)}
							Create Task
						</button>

						{errorMessage.length > 0 && (
							<ul className='flex flex-col items-center w-full min-h-[20vh] py-4 gap-4 text-red-500 bg-white rounded-lg'>
								{errorMessage.map((message) => (
									<li
										key={message}
										className='text-base font-medium'>
										{message}
									</li>
								))}
							</ul>
						)}
					</form>
				</Aside>
			)}

			{path.includes('dashboard') && path.includes('files') && (
				<Aside
					position='right'
					triggerButton={addFileTrggerBtn}>
					<form
						onSubmit={onSubmitForm}
						className='flex flex-col w-full h-full gap-6 py-4'>
						<div className='w-full flex items-center justify-end'>
							<button
								type='button'
								onClick={() => setCanCreateFolder((prev) => !prev)}
								className='w-1/3 h-8 flex items-center justify-start rounded-3xl bg-white/50 p-1 relative overflow-hidden'>
								<motion.div
									initial={false}
									animate={{ marginLeft: canCreateFolder ? '67%' : '0%' }}
									transition={{ ease: 'easeOut', duration: 0.3 }}
									className='w-1/4 h-[90%] bg-[#EF5C09]/70 rounded-2xl absolute top-1/2 transform -translate-y-1/2'
								/>
							</button>
						</div>
						{canCreateFolder && (
							<div className='w-full h-10'>
								<input
									type='text'
									name='text'
									placeholder='Folder name...'
									inputMode='text'
									required
									pattern='^[a-zA-Z\d\s]{2,}$'
									title='Please enter only alphabets, white space and numbers'
									disabled={isPending}
									value={folderName.name}
									onChange={(e) => setFolderName((prev) => ({ ...prev, name: e.target.value }))}
									className='w-full h-full px-4 text-lg font-semibold tracking-wider transition-all duration-500 ease-in-out bg-white rounded-lg outline-0 ring-0 ring-white hover:ring-1 focus:ring-2'
								/>
							</div>
						)}
						{!canCreateFolder && (
							<div className='w-full h-10'>
								<input
									type='file'
									name='file'
									placeholder='file...'
									inputMode='none'
									required
									disabled={isPending}
									onChange={(e) => e.target.files && setFile(e.target.files[0])}
									className='w-full h-full px-4 text-lg font-semibold tracking-wider transition-all duration-500 ease-in-out bg-white rounded-lg outline-0 ring-0 ring-white hover:ring-1 focus:ring-2'
								/>
							</div>
						)}
						<button
							type='submit'
							name={canCreateFolder ? 'Create Folder' : 'Upload File'}
							className={`w-full h-10 flex items-center justify-center gap-4 text-white bg-[#EF5C09]/70 disabled:bg-[#EF5C09]/50 rounded-lg font-semibold text-lg tracking-wider transition-all duration-500 ease-in-out`}
							disabled={isPending}>
							{isPending && (
								<span className='animate-rotate'>
									<FaSpinner />
								</span>
							)}
							{canCreateFolder ? 'Create Folder' : 'Upload File'}
						</button>

						{errorMessage.length > 0 && (
							<ul className='flex flex-col items-center w-full min-h-[20vh] py-4 gap-4 text-red-500 bg-white rounded-lg'>
								{errorMessage.map((message) => (
									<li
										key={message}
										className='text-base font-medium'>
										{message}
									</li>
								))}
							</ul>
						)}
					</form>
				</Aside>
			)}

			{path.includes('dashboard') && (
				<Aside
					position='left'
					triggerButton={triggerButton}>
					<nav className='flex flex-col items-center justify-start gap-5 py-6 size-full'>
						<Image
							src={logo}
							alt="zoe's Logo"
							title="zoe's Logo"
							className='object-cover size-12'
						/>

						<NavLinks
							onLogOut={onLogOut}
							onClose={() => btnRef.current?.click()}
						/>
					</nav>
				</Aside>
			)}

			{path === '/' || path === '/login' || path === '/signup' || path.includes('forget-password') ? <></> : children}
		</section>
	);
}

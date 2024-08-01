'use client';

import { FormEvent, useRef, useState, useTransition } from 'react';

import { TaskGroup } from '@/types';
import { Aside } from '@/components/UI/aside';

import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import { toast } from 'sonner';
import { onAddSubTask } from '@/actions';

interface EditTaskProps {
	_id: string;
	tag: TaskGroup['subTasks'][0]['tag'];
}

export function AddSubTask({ _id, tag }: EditTaskProps) {
	const initState: { task: string }[] = [
		{
			task: '',
		},
	];
	const editTriggerBtnRef = useRef<HTMLButtonElement | null>(null);
	const [formData, setFormData] = useState<typeof initState>(initState);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [isPending, startTransition] = useTransition();

	const handleInputChange = (index: number, value: string) => {
		const updatedTasks = [...formData];
		updatedTasks[index] = { ...updatedTasks[index], task: value };
		setFormData(updatedTasks);
	};

	const addNewTask = () => {
		if (formData.length === 3) {
			toast.error(`can't create more that 4 subTask at once`);
			return;
		}
		setFormData((prev) => [...prev, { task: '' }]);
	};

	const reduceTasks = () => {
		if (formData.length === 1) {
			toast.error(`can't remove all subTask inputs`);
			return;
		}
		setFormData((prev) => prev.filter((_, index) => index !== prev.length - 1));
	};

	const onAdd = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage([]);

		startTransition(async () => {
			const data = new FormData();

			Object.entries(formData).forEach(([key, val]) => data.append(`${key}`, val.task));
			const error = await onAddSubTask({ _id, tag, data });

			if (error) {
				setErrorMessage([error]);
				return;
			}
			setFormData(initState);
			editTriggerBtnRef.current?.click();
		});
	};

	const editTriggerBtn = (
		<button
			type='button'
			name={`edit ${tag} task group`}
			ref={editTriggerBtnRef}
			className={`p-2 flex items-center justify-center rounded-lg bg-white/50 text-black font-medium`}>
			<FaPlusCircle />
		</button>
	);

	return (
		<Aside
			title={`Edit task under ${tag}`}
			position='right'
			triggerButton={editTriggerBtn}>
			<form
				onSubmit={onAdd}
				className='flex flex-col w-full h-full gap-6 py-4'>
				{formData.map((eachTask, index) => (
					<div
						className='w-full h-12'
						key={index}>
						<input
							type='text'
							name='task'
							placeholder='Task Title...'
							inputMode='text'
							required
							disabled={isPending}
							value={eachTask.task}
							onChange={(e) => handleInputChange(index, e.target.value)}
							className='w-full h-full px-4 text-lg font-semibold tracking-wider transition-all duration-500 ease-in-out bg-white rounded-lg outline-0 ring-0 ring-white hover:ring-1 focus:ring-2'
						/>
					</div>
				))}

				<button
					type='button'
					onClick={addNewTask}
					className='flex items-center justify-center w-full h-10 gap-4 text-lg font-semibold tracking-wider text-white transition-all duration-500 ease-in-out bg-blue-500 rounded-lg'>
					Add New Subtask
				</button>

				<button
					type='button'
					onClick={reduceTasks}
					className='flex items-center justify-center w-full h-10 gap-4 text-lg font-semibold tracking-wider text-white transition-all duration-500 ease-in-out bg-red-500 rounded-lg'>
					Remove a Subtask
				</button>

				<button
					type='submit'
					name={`Create Subtask`}
					className={`w-full h-10 flex items-center justify-center gap-4 text-white bg-[#EF5C09]/70 disabled:bg-[#EF5C09]/50 rounded-lg font-semibold text-lg tracking-wider transition-all duration-500 ease-in-out`}
					disabled={isPending}>
					{isPending && (
						<span className='animate-rotate'>
							<FaSpinner />
						</span>
					)}
					Create Subtask
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
	);
}

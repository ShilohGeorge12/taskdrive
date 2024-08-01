'use client';

import { onEditSubTask } from '@/actions';
import { ChangeEvent, FormEvent, useRef, useState, useTransition } from 'react';
import { Aside } from '@/components/UI/aside';
import { TaskGroup } from '@/types';
import { FaSpinner } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';

interface EditSubTaskProps {
	taskId: string;
	subTaskId: string;
	task: string;
	tag: TaskGroup['subTasks'][0]['tag'];
}

export function EditSubTask({ taskId, subTaskId, task, tag }: EditSubTaskProps) {
	const editTriggerBtnRef = useRef<HTMLButtonElement | null>(null);
	const initState = {
		task,
	};

	const [formData, setFormData] = useState<typeof initState>(initState);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [isPending, startTransition] = useTransition();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setFormData((prev) => ({ ...prev, task: value }));
	};

	const onEdit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage([]);

		if (formData.task === task) {
			editTriggerBtnRef.current?.click();
			return;
		}

		startTransition(async () => {
			const error = await onEditSubTask({
				taskId,
				subTaskId,
				newSubTask: formData.task.trim(),
			});

			if (error) {
				setErrorMessage([error]);
				return;
			}
			editTriggerBtnRef.current?.click();
		});
	};

	const editTriggerBtn = (
		<button
			type='button'
			name={`edit ${tag} task group`}
			ref={editTriggerBtnRef}
			className={`size-[32px] flex items-center justify-center rounded-lg bg-white/50 text-black font-medium transition-all duration-500 ease-in-out`}>
			<FiEdit />
		</button>
	);

	return (
		<Aside
			title={`Edit task under ${tag}`}
			position='right'
			triggerButton={editTriggerBtn}>
			<form
				onSubmit={onEdit}
				className='flex flex-col w-full h-full gap-6 py-4'>
				<div className='w-full h-12'>
					<input
						type='text'
						name='task'
						placeholder='Task Title...'
						inputMode='text'
						required
						disabled={isPending}
						value={formData.task}
						onChange={onChange}
						className='w-full h-full px-4 text-lg font-semibold tracking-wider transition-all duration-500 ease-in-out bg-white rounded-lg outline-0 ring-0 ring-white hover:ring-1 focus:ring-2'
					/>
				</div>

				<button
					type='submit'
					name={`Finalize Edit`}
					className={`w-full h-10 flex items-center justify-center gap-4 text-white bg-[#EF5C09]/70 disabled:bg-[#EF5C09]/50 rounded-lg font-semibold text-lg tracking-wider transition-all duration-500 ease-in-out`}
					disabled={isPending}>
					{isPending && (
						<span className='animate-rotate'>
							<FaSpinner />
						</span>
					)}
					Finalize Edit
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

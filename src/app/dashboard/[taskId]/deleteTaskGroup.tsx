'use client';

import { deleteTaskGroup } from '@/actions';
import { useRouter } from 'next/navigation';
import { FormEvent, useTransition } from 'react';
import { FaSpinner, FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';

export function DeleteTaskGroup({ taskId }: { taskId: string }) {
	const { push } = useRouter();
	const [isPending, startTransition] = useTransition();
	const onDeleteTaskGroup = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		startTransition(async () => {
			const error = await deleteTaskGroup({ _id: taskId });
			if (error) toast.error(error);
			push('/dashboard');
		});
	};
	return (
		<form onSubmit={onDeleteTaskGroup}>
			<button
				className='p-2 rounded-lg bg-red-500 disabled:bg-red-300 text-white text-xs flex items-center justify-center gap-2'
				type='submit'
				disabled={isPending}>
				{isPending && <FaSpinner />}
				<FaTrash />
			</button>
		</form>
	);
}

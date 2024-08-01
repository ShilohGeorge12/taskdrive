'use client';

import { onDeleteTask } from '@/actions';
import { ReactNode } from 'react';
import { toast } from 'sonner';

export function DeleteTask({ children, taskId, subTaskId }: { taskId: string; subTaskId: string; children: ReactNode }) {
	const onDelete = async () => {
		toast.promise(
			async () => {
				const error = await onDeleteTask({ taskId, subTaskId });
				if (error) throw new Error(error);
				return 'task deletion was successfull';
			},
			{
				loading: `sub task deletion in progress....`,
				success: (data) => data,
				error: (e: Error) => e.message,
			}
		);
	};
	return <form action={onDelete}>{children}</form>;
}

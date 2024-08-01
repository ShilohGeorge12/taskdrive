'use client';

import { onCompleteTask, onDeleteTask } from '@/actions';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { toast } from 'sonner';

export function CompleteTask({ children, taskId, subTaskId }: { taskId: string; subTaskId: string; children: ReactNode }) {
	// const { push } = useRouter();

	const onComplete = async () => {
		const error = await onCompleteTask({ taskId, subTaskId });

		if (error) {
			toast.error(error);
			return;
		}

		// push('/dashboard');
	};
	return <form action={onComplete}>{children}</form>;
}

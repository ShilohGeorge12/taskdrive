'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Btn } from '@/components/UI/button';

interface NavLinksProps {
	onLogOut: () => Promise<void>;
	onClose?: () => void;
}

export default function NavLinks({ onLogOut, onClose }: NavLinksProps) {
	const currentPath = usePathname();
	const taskUrl = '/dashboard';
	const filesUrl = '/dashboard/files';

	const isActiveLink = (path: typeof taskUrl | typeof filesUrl) => {
		if (path === currentPath) {
			return 'bg-white';
		}
		return 'bg-white/30 hover:bg-white/60';
	};

	return (
		<>
			<Link
				href={taskUrl}
				className={`w-[92%] h-10 flex items-center justify-center ${isActiveLink(taskUrl)} rounded-lg ease-linear transition duration-300 hover:scale-105 font-semibold tracking-wide`}
				onClick={onClose}>
				Tasks
			</Link>
			<Link
				href={filesUrl}
				className={`w-[92%] h-10 flex items-center justify-center ${isActiveLink(filesUrl)} rounded-lg ease-linear transition duration-300 hover:scale-105 font-semibold tracking-wide`}
				onClick={onClose}>
				Files
			</Link>

			<Btn
				title='Log Out'
				style={{
					size: 'w-[92%] h-10',
					color: 'bg-white/30 hover:bg-white/60',
					shadow: '',
					more: 'font-semibold tracking-wide flex items-center justify-center',
				}}
				onClick={onLogOut}
			/>
		</>
	);
}

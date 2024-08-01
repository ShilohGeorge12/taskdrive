'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NotFoundClient() {
	const path = usePathname();

	let reRouteTo: string = '/';

	if (path.includes('dashboard')) reRouteTo = '/dashboard';
	if (path.includes('dashboard') && path.includes('files')) reRouteTo = '/dashboard/files';

	return (
		<Link
			href={reRouteTo}
			className={`px-4 h-10 flex items-center justify-center bg-white/30 text-black font-medium rounded-2xl transition-all duration-500 hover:bg-white/50 hover:shadow-md hover:scale-105`}>
			{path.includes('dashboard') ? 'Back to dashboard' : 'Back To Home Page'}
		</Link>
	);
}

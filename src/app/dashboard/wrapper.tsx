'use client';

import { usePathname } from 'next/navigation';

export function Wrapper({ children }: { children: React.ReactNode }) {
	const path = usePathname();

	return (
		<main
			className={`w-full h-screen overflow-hidden ${path.includes('dashboard') && !path.includes('files') ? 'bg-gradient-to-br from-purple-400 to-purple-800' : 'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-800'}`}>
			{children}
		</main>
	);
}

'use client';
import { onLogout } from '@/actions';
import NavLinks from '@/components/UI/navLInks';
import { useRouter } from 'next/navigation';

export function Nav() {
	const { push } = useRouter();
	const logOut = async () => {
		await onLogout();
		push('/login');
	};

	return (
		<nav className='flex-col items-center justify-start hidden w-full h-full gap-5 py-4 md:col-span-1 md:flex'>
			<NavLinks onLogOut={logOut} />
		</nav>
	);
}

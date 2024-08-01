import Header from '@/components/UI/header';
import { Nav } from './nav';
import { Wrapper } from './wrapper';

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<Wrapper>
			<Header />
			<section className='w-[90%] mx-auto h-[86%] grid grid-cols-12 gap-2'>
				<Nav />
				{children}
			</section>
		</Wrapper>
	);
}

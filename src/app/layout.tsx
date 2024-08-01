import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { env } from '@/env';
import { Toaster } from 'sonner';
import { ContextProvider } from '@/context';

const inter = Inter({ subsets: ['latin'] });

const title_longName = 'zoe';
const title = `${title_longName}`;
const description = '' + title_longName; //add description
const url = env.BASE_URL;

export const metadata: Metadata = {
	metadataBase: new URL(url),
	title: {
		default: title,
		template: `%s | ${title_longName}`,
	},
	description,
	keywords: 'zoe, ZOE',
	authors: [{ name: 'Shiloh George' }, { name: 'Emelu Caleb' }],
	robots: 'index, follow',
	openGraph: {
		title,
		description,
		siteName: 'zoe', // cross checl later
	},
	twitter: {
		card: 'summary',
		site: url,
		creator: 'Shiloh George',
		images: '/save-time-512.png',
	},
	alternates: { canonical: url },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<body className={`${inter.className} text-black text-sm md:text-base`}>
				<ContextProvider>{children}</ContextProvider>
				<Toaster
					richColors
					position='bottom-left'
					duration={4000}
					closeButton
					theme={'light'}
				/>
			</body>
		</html>
	);
}

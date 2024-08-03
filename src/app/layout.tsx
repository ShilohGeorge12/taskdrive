import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ContextProvider } from '@/context';
import { env } from '@/env';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const title_longName = 'Task Drive: Streamline Task Management & Boost Productivity';
const title = `${title_longName}`;
const description =
	'Boost productivity with TaskDrive. Prioritize tasks, manage files, and organize workflow effortlessly. Sign up now to transform your work efficiency.';
const url = env.BASE_URL;

export const metadata: Metadata = {
	metadataBase: new URL(url),
	title: {
		default: title,
		template: `%s | Streamline Task Management & Boost Productivity`,
	},
	description,
	keywords: 'task drive, tasks, drive, taskdrive',
	authors: [{ name: 'Shiloh George' }],
	publisher: 'Shiloh George',
	robots: 'index, follow',
	openGraph: {
		title,
		description,
		siteName: 'taskdrive',
	},
	twitter: {
		card: 'summary',
		site: url,
		creator: 'Shiloh George',
		images: '/logo.png',
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

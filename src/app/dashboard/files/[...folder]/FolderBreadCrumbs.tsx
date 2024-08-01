'use client';

import { BreadCrumbs } from '@/components/UI/breadCrumbs';
import { usePathname } from 'next/navigation';

export function FolderBreadCrumbs() {
	const path = usePathname();
	const basePath = '/dashboard/files';
	const links: { label: string; link: string }[] = [{ label: 'files', link: basePath }];
	const pathWithoutBase = path.replace(basePath, '');
	const splittedPath = pathWithoutBase.split('/').filter(Boolean);

	let currentLink = basePath;
	splittedPath.forEach((segment) => {
		currentLink += `/${segment}`;
		links.push({ label: segment, link: currentLink });
	});

	return (
		<BreadCrumbs
			links={links}
			labelStyles='text-black'
			seperatorStyles='text-black'
		/>
	);
}

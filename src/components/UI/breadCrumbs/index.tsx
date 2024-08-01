import Link from 'next/link';
import { Fragment } from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface breadCrumbsProps {
	links: { label: string; link: string }[];
	labelStyles: string;
	seperatorStyles: string;
}

export function BreadCrumbs({ labelStyles, seperatorStyles, links }: breadCrumbsProps) {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{links.length > 0 &&
					links.map((link, index) => (
						<Fragment key={link.label}>
							<BreadcrumbItem>
								<BreadcrumbLink
									href={link.link}
									className={labelStyles}>
									{link.label}
								</BreadcrumbLink>
							</BreadcrumbItem>
							{index !== links.length - 1 && <BreadcrumbSeparator className={seperatorStyles} />}
						</Fragment>
					))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

'use client';

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';

interface RightClickMenuProps {
	children: React.ReactNode;
	buttons: React.ReactNode[];
}

export function RightClickMenu({ buttons, children }: RightClickMenuProps) {
	return (
		<ContextMenu>
			<ContextMenuTrigger className=''>{children}</ContextMenuTrigger>

			<ContextMenuContent className='w-40 flex flex-col items-center justify-center gap-2'>
				{buttons.map((button, index) => (
					<ContextMenuItem
						key={index}
						className='w-full'
						inset>
						{button}
					</ContextMenuItem>
				))}
			</ContextMenuContent>
		</ContextMenu>
	);
}

/** @format */

'use client';

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/app/components/ui/sidebar';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {FC, SVGProps} from 'react';
export function SidebarBottomMenu({
	items,
}: {
	items: {
		icon: FC<SVGProps<SVGSVGElement>>;
		title: string;
		url: string;
		isActive?: boolean;
		handleFunc?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	}[];
}) {
	const pathname = usePathname();
	return (
		<SidebarGroup className='py-1'>
			<SidebarGroupContent className='flex flex-col  gap-2'>
				<SidebarMenu className='gap-2 group-data-[collapsible=icon]:gap-[5px] group-data-[collapsible=icon]:items-center'>
					{items.map((item) => (
						<SidebarMenuItem
							key={item.title}
							className='group-data-[collapsible=icon]:mx-0  mx-3'
						>
							<Link href={item.url}>
								{' '}
								<SidebarMenuButton
									tooltip={item.title}
									isActive={item.url === pathname}
									size={'sm'}
									className={`${
										item.url === pathname ? 'active group-data-[collapsible=icon]:rounded-md' : 'hover:border hover:text-[#224762] hover:bg-[#f1f5f4] group-data-[collapsible=icon]:hover:rounded-md '
									} rounded-full px-4 py-4 group/navButton`}
									onClick={item.handleFunc}
								>
									{item.icon && (
										<item.icon
											className={`${
												item.url === pathname
													? 'svg-icon-active '
													: 'fill-[var(--foreground)]'
											}`}
										/>
									)}
									<span className='font-semibold'>{item.title}</span>
								</SidebarMenuButton>
							</Link>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}

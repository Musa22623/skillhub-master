/** @format */

'use client';

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar
} from '@/app/components/ui/sidebar';
import {ChevronRight, Plus} from 'lucide-react';
import Link from 'next/link';
import {usePathname, useSearchParams} from 'next/navigation';
import {FC, SVGProps} from 'react';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/app/components/ui/collapsible';
export function NavMain({
	items,
	label,
	openSubMenu,
	setOpenSubMenu,
}: {
	items: {
		icon: FC<SVGProps<SVGSVGElement>>;
		title: string;
		url: string;
		isActive?: boolean;
		add?: boolean;
		handleFunc?: (e: React.MouseEvent<HTMLDivElement>) => void;
		subMenu?: {
			title: string;
			url: string;
			icon?: FC<SVGProps<SVGSVGElement>>;
		}[];
	}[];
	label?: string;
	openSubMenu?: string | null;
	setOpenSubMenu?: (key: string | null) => void;
}) {
		const { setOpenMobile} = useSidebar();
	const pathname = usePathname();
	const searchParams = useSearchParams(); 
	const currentFullUrl = `${pathname}${
		searchParams.toString() ? `?${searchParams.toString()}` : ''
	}`;
	return (
		<SidebarGroup className='py-1'>
			{label && (
				<SidebarGroupLabel className='text-[10px]  tracking-wider ml-4 group-data-[collapsible=icon]:mx-0 group-data-[collapsible=icon]:mb-[5px] group-data-[collapsible=icon]:opacity-100 group-data-[collapsible=icon]:h-3 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:-mt-1 font-bold text-gray-500 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center'>
					{label}
				</SidebarGroupLabel>
			)}
			<SidebarGroupContent className='flex flex-col gap-2'>
				<SidebarMenu className='gap-2 group-data-[collapsible=icon]:gap-[5px]'>
					{items.map((item) => (
						<Collapsible
							key={item.title}
							asChild
							open={openSubMenu === item.title}
							onOpenChange={(open) => setOpenSubMenu && setOpenSubMenu(open ? item.title : null)}
							className='group/collapsible'
						>
							<SidebarMenuItem
								key={item.title}
								className='group-data-[collapsible=icon]:mx-0 mx-3'
							>
								<Link
									href={item.url}
									onClick={() => setOpenMobile(false)}
									className='group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center'
								>
									<SidebarMenuButton
										tooltip={item.title}
										isActive={item.url === pathname}
										size={'sm'}
										className={`${
											item.url === pathname
												? ' group-data-[collapsible=icon]:rounded-md active '
												: 'hover:border hover:bg-[#f1f5f4] group-data-[collapsible=icon]:hover:rounded-md group-data-[state=expanded]:group-data-[state=open]/collapsible:border group-data-[state=expanded]:group-data-[state=open]/collapsible:text-[#224762] group-data-[state=expanded]:group-data-[state=open]/collapsible:bg-[#f1f5f4]'
										} rounded-full px-4 py-4 group/navButton`}
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
										<span className='font-semibold '>{item.title}</span>

										<div className='flex sm:hidden ml-auto gap-4 group-hover/navButton:flex group-data-[state=open]/collapsible:flex'>
											{item.add && (
												<div
													className=' transition-transform duration-200 flex items-center justify-center group-hover/navButton:bg-[#E8E9ED] group-data-[state=open]/collapsible:bg-[#E8E9ED] rounded-full size-4.5'
													onClick={(e) => {
														e.stopPropagation(); // Prevent Link from triggering
														e.preventDefault();
														item.handleFunc?.(e);
														// Stop page refresh
													}}
												>
													<Plus className='size-3.5 text-[#666]' />
												</div> 
											)}

											{item.subMenu && (
												<div
													className={`transition-transform duration-200 flex items-center size-4.5 justify-center rotate-90 group-data-[state=open]/collapsible:rotate-270 group-hover/navButton:bg-[#E8E9ED] group-data-[state=open]/collapsible:bg-[#E8E9ED] rounded-full `}
													onClick={(e) => {
														e.stopPropagation(); // Prevent Link from triggering
														e.preventDefault(); // Stop page refresh
													}}
												>
													<CollapsibleTrigger asChild>
														<ChevronRight className='size-3.5 text-[#666]' />
													</CollapsibleTrigger>
												</div>
											)}
										</div>
									</SidebarMenuButton>
								</Link>

								<CollapsibleContent className='ml-2'>
									<SidebarMenuSub className='border-none mt-1.5 gap-0.5'>
										{item.subMenu?.map((subItem) => (
											<SidebarMenuSubItem
												key={subItem.title}
												className={`before:bg-gray-200  before:absolute before:-left-[11px] before:top-0 before:w-px before:h-[108%]  hover:before:block ${subItem.url === currentFullUrl ? 'before:bg-teal-500' : 'hover:before:bg-teal-500'}`}
											>
												<SidebarMenuSubButton
													onClick={(e) => {
														e.stopPropagation(); // Prevent Link from triggering
														// e.preventDefault(); // Stop page refresh
													}}
													asChild
													size='sm'
													className={`hover:text-[#224762] hover:bg-transparent active:bg-transparent  ${subItem.url === currentFullUrl ? 'text-[#2584bf]' : ''}`}
												>
													<Link href={subItem.url}>
														{subItem?.icon && <span>🏫</span>}
														<span className='font-semibold'>{subItem.title}</span>
													</Link>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}

/** @format */

'use client';

import {useState} from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import {menuItems, type MenuItem} from '@/app/components/ui/menu-items';
import {ArrowRightIcon, VerticalDotsIcon} from '@/app/components/svg';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/app/components/ui/hover-card';
import {HoverSubmenuItem} from '../Instructor/Products/components/ProductsGrid/ProductCard/Menu';
import {
	getBundleItems,
	getSessionItems,
	getSubscriptionItems,
} from '../Instructor/Products/components/ProductsGrid/ProductCard/Menu/hoverSubmenuData';
import img5 from '@/assets/img5.jpg';
import {useIsMobile} from '@/hooks/use-mobile';
import {Drawer, DrawerContent, DrawerHeader, DrawerTitle} from './drawer';
interface ProductDropdownMenuProps {
	type: string;
	product_id: string;
	onMenuItemClick?: (item: MenuItem, product_id: string) => void;
	onUnlinkItem?: (itemId: number) => void;
}

export function ProductDropdownMenu({
	type,
	product_id,
	onMenuItemClick,
	onUnlinkItem,
}: ProductDropdownMenuProps) {
	const [open, setOpen] = useState(false);


	const handleMenuClick = (item: MenuItem) => {
		if (item.onClick) {
			item.onClick();
		}
		if (onMenuItemClick) {
			onMenuItemClick(item,product_id);
		}

		// Only close dropdown if not opening a submenu
		if (!item.hasSubmenu) {
			setOpen(false);
		}
	};

	const getSubmenuItems = (label: string) => {
		switch (label) {
			case 'Add to Bundle':
			case 'Link to Course':
				return getSessionItems();
			case 'View Linked Courses':
				return getBundleItems();
			case 'Link to Session':
			case 'Included Products':
				return getBundleItems();
			case 'View Linked Sessions':
				return getSessionItems();
			case 'Add to Subscription':
				return getSubscriptionItems();
			default:
				return [];
		}
	};

	// Get menu items based on product type, fallback to default if type not found
	const items = menuItems[type] || menuItems.default;
	const isMobile = useIsMobile();
	if (isMobile) {
		return (
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle></DrawerTitle>
					</DrawerHeader>

					<section className='overflow-y'>
						{items.map((item, index) =>
							item.hasSubmenu ? (
								<div key={index}>
									<div className='flex items-center gap-3 flex-1'>
										<item.icon className='size-4 text-gray-600' />
										<span className='text-gray-700'>{item.label}</span>
									</div>
									<ArrowRightIcon className='fill-gray-700' />
								</div>
							) : (
								// {getSubmenuItems(item.label).map((subItem) => (
								//   <HoverSubmenuItem
								//     key={subItem.id}
								//     imageUrl={img5}
								//     title={subItem.title}
								//     price={subItem.price}
								//     showCheck={subItem.isSelected}
								//   />
								// ))}

								<div key={index} className='flex items-center gap-3 flex-1'>
									<item.icon className='w-5 h-5 text-gray-600' />
									<span className='text-gray-700'>{item.label}</span>
								</div>
							)
						)}
					</section>
				</DrawerContent>
			</Drawer>
		);
	} else {
		return (
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<button
						onClick={() => setOpen(true)}
						className='ml-3 w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f5]'
					>
						<VerticalDotsIcon className='w-4 h-4' fill='#666' />
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align='end' className='w-70'>
					{items.map((item, index) =>
						item.hasSubmenu ? (
							<HoverCard key={index} openDelay={100} closeDelay={100}>
								<HoverCardTrigger asChild>
									<DropdownMenuItem className='flex items-center gap-2 font-semibold cursor-pointer py-2.5'>
										<div className='flex items-center gap-3 flex-1'>
											<item.icon className='size-4 text-gray-600' />
											<span className='text-gray-700'>{item.label}</span>
										</div>
										<ArrowRightIcon className='fill-gray-700 size-2' />
									</DropdownMenuItem>
								</HoverCardTrigger>
								<HoverCardContent side='left'  className='w-[400px] p-2'>
									{getSubmenuItems(item.label).map((subItem) => (
										<HoverSubmenuItem
											key={subItem.id}
											imageUrl={img5}
											title={subItem.title}
											price={subItem.price}
											showCheck={subItem.isSelected}
											onUnlink={() => onUnlinkItem?.(subItem.id)}
										/>
									))}
								</HoverCardContent>
							</HoverCard>
						) : (
							<div key={index}>
								{item.label === 'Delete School' && <hr className='w-full my-2' />}
								<DropdownMenuItem
									onClick={() => handleMenuClick(item)}
									className={`flex items-center font-semibold gap-2 cursor-pointer py-2.5 ${item.label === 'Delete School' ? 'hover:!bg-[#FFF1F1]' : ''}`}
								>
									<div className='flex items-center gap-3 flex-1'>
										<item.icon className='w-5 h-5 text-gray-600' />
										<span className='text-gray-700'>{item.label}</span>
									</div>
								</DropdownMenuItem>
							</div>
						)
					)}
				</DropdownMenuContent>
				
			</DropdownMenu>
		);
	}
}
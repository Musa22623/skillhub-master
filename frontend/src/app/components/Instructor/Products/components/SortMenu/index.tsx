/** @format */

import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';
import {useIsMobile} from '@/hooks/use-mobile';
import {X} from 'lucide-react';
import React, { useState } from 'react';

interface SortMenuProps {
	selectedSort: string;
	onChangeSort: (value: string) => void;
}

const SortMenu: React.FC<SortMenuProps> = ({selectedSort, onChangeSort}) => {
	const menuRef = React.useRef<HTMLDivElement>(null);
	const [open, setOpen] = React.useState(false);
	const [tempSort, setTempSort] = useState(selectedSort);

	const handleSortChange = (sortValue: string) => {
		onChangeSort(sortValue);
		setOpen(false);
	};

	const toggleDrawer = () => {
		setOpen(!open);
	};

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [setOpen]);

	const isMobile = useIsMobile();
	const sortLabels: Record<string, string> = {
		newest: 'Recently Created',
		popularity: 'Popularity',
		modified: 'Recently Modified',
		az: 'Title: A-Z',
		za: 'Title: Z-A',
	};
	const sortMenuItemClass =
		'px-4 py-2 text-sm text-gray-900 cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f5]';

	if (isMobile) {
		return (
			<div className='relative inline-block max-xs:w-full'>
				<button
					className='flex max-xs:w-full items-center cursor-pointer gap-2 px-3 py-2 bg-[#f5f5f] border border-[#e0e0e0] rounded-md text-sm text-[#333] font-semibold hover:bg-[#ebebeb]'
					onClick={() => {
						setOpen(!open);
					}}
				>
					Sort: {sortLabels[selectedSort] || 'Sort'}
					<svg
						viewBox='0 0 24 24'
						fill='none'
						stroke='#666'
						className='w-4 h-4 max-xs:ml-auto'
					>
						<path
							d='M19 9l-7 7-7-7'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
				<Drawer open={open} onOpenChange={setOpen}>
					<DrawerContent>
						<DrawerHeader className='flex-row justify-between items-center border-b'>
							<DrawerTitle className='font-semibold text-lg text-gray-800'>
								Sort By
							</DrawerTitle>
							<button className='' onClick={toggleDrawer}>
								<X className='size-4' />
							</button>
						</DrawerHeader>

						<div className='border-b border-gray-100'>
							<div className='flex flex-col gap-3 px-4 py-4'>
								<div
									className={`relative p-3 rounded-lg cursor-pointer transition-all ${
										tempSort === 'newest' ? 'bg-blue-50' : 'bg-gray-50'
									}`}
									onClick={() => setTempSort('newest')}
								>
									<input
										type='radio'
										id='sort-newest'
										name='sort'
										className='absolute opacity-0'
										checked={tempSort === 'newest'}
										readOnly
									/>
									<label
										htmlFor='sort-newest'
										className={`flex items-center justify-between w-full cursor-pointer ${
											tempSort === 'newest'
												? 'text-blue-700 font-semibold'
												: 'text-gray-600'
										}`}
									>
										<span>Newest</span>
										<span
											className={`w-5 h-5 rounded-full flex items-center justify-center ${
												tempSort === 'newest'
													? 'border-2 border-blue-500 bg-blue-500'
													: 'border-2 border-gray-300'
											}`}
										>
											{tempSort === 'newest' && (
												<span className='w-2 h-2 rounded-full bg-white'></span>
											)}
										</span>
									</label>
								</div>

								<div
									className={`relative p-3 rounded-lg cursor-pointer transition-all ${
										tempSort === 'az' ? 'bg-blue-50' : 'bg-gray-50'
									}`}
									onClick={() => setTempSort('az')}
								>
									<input
										type='radio'
										id='sort-az'
										name='sort'
										className='absolute opacity-0'
										checked={tempSort === 'az'}
										readOnly
									/>
									<label
										htmlFor='sort-az'
										className={`flex items-center justify-between w-full cursor-pointer ${
											tempSort === 'az'
												? 'text-blue-700 font-semibold'
												: 'text-gray-600'
										}`}
									>
										<span>Title: A-Z</span>
										<span
											className={`w-5 h-5 rounded-full flex items-center justify-center ${
												tempSort === 'az'
													? 'border-2 border-blue-500 bg-blue-500'
													: 'border-2 border-gray-300'
											}`}
										>
											{tempSort === 'az' && (
												<span className='w-2 h-2 rounded-full bg-white'></span>
											)}
										</span>
									</label>
								</div>

								<div
									className={`relative p-3 rounded-lg cursor-pointer transition-all ${
										tempSort === 'za' ? 'bg-blue-50' : 'bg-gray-50'
									}`}
									onClick={() => setTempSort('za')}
								>
									<input
										type='radio'
										id='sort-za'
										name='sort'
										className='absolute opacity-0'
										checked={tempSort === 'za'}
										readOnly
									/>
									<label
										htmlFor='sort-za'
										className={`flex items-center justify-between w-full cursor-pointer ${
											tempSort === 'za'
												? 'text-blue-700 font-semibold'
												: 'text-gray-600'
										}`}
									>
										<span>Title: Z-A</span>
										<span
											className={`w-5 h-5 rounded-full flex items-center justify-center ${
												tempSort === 'za'
													? 'border-2 border-blue-500 bg-blue-500'
													: 'border-2 border-gray-300'
											}`}
										>
											{tempSort === 'za' && (
												<span className='w-2 h-2 rounded-full bg-white'></span>
											)}
										</span>
									</label>
								</div>
							</div>
						</div>
						<DrawerFooter>
							<button
								className='w-full py-3 px-4 bg-gray-800 text-white border-0 rounded-lg font-semibold text-sm cursor-pointer'
								onClick={() => {
									onChangeSort(tempSort);
									setOpen(false);
								}}
							>
								Sort
							</button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
		);
	} else {
		return (
			<div className='relative inline-block max-xs:w-full'>
				<button
					className='flex max-xs:w-full items-center cursor-pointer gap-2 px-3 py-2 bg-[#f5f5f] border border-[#e0e0e0] rounded-md text-sm text-[#333] font-semibold hover:bg-[#ebebeb]'
					onClick={() => {
						setOpen(!open);
					}}
				>
					Sort: {sortLabels[selectedSort] || 'Sort'}
					<svg
						viewBox='0 0 24 24'
						fill='none'
						stroke='#666'
						className='w-4 h-4 max-xs:ml-auto'
					>
						<path
							d='M19 9l-7 7-7-7'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
				<div
					ref={menuRef}
					className={`absolute top-full right-0 mt-2 z-50 bg-white rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-3 min-w-[200px] opacity-0 invisible transition-all duration-200 ${
						open ? 'opacity-100 visible' : ''
					}`}
				>
					<div
						onClick={() => handleSortChange('newest')}
						className={sortMenuItemClass}
					>
						Recently Created
					</div>
					<div
						onClick={() => handleSortChange('popularity')}
						className={sortMenuItemClass}
					>
						Popularity
					</div>
					<div
						onClick={() => handleSortChange('modified')}
						className={sortMenuItemClass}
					>
						Recently Modified
					</div>
					<div
						onClick={() => handleSortChange('az')}
						className={sortMenuItemClass}
					>
						Title: A-Z
					</div>
					<div
						onClick={() => handleSortChange('za')}
						className={sortMenuItemClass}
					>
						Title: Z-A
					</div>
				</div>
			</div>
		);
	}
};

export default SortMenu;

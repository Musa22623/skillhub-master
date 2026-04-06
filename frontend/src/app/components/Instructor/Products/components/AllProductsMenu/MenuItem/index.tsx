/** @format */

import React from 'react';

interface MenuItemProps {
	icon: React.ReactNode;
	title: string;
	count: number;
	setSelectedProduct: React.Dispatch<React.SetStateAction<string[]>>;
}

const MenuItem: React.FC<MenuItemProps> = ({
	icon,
	title,
	count,
	setSelectedProduct,
}) => {
	return (
		<div
			onClick={() => setSelectedProduct([title])}
			className='px-4 py-2 text-black font-[500] text-sm flex items-center justify-between cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f5]'
		>
			<div className='flex items-center gap-4'>
				{icon}
				{title}
			</div>
			<div className='font-normal'>{count}</div>
		</div>
	);
};

export default MenuItem;

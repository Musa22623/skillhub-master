/** @format */

import React from 'react';

interface StatCardProps {
	icon?: React.ReactNode;
	iconBg?: string;
	name?: string;
	value?: number;
	percent?: number;
	valueIcon?: boolean;
	content?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
	icon,
	iconBg = '#f1f5f9',
	name,
	value,
	percent,
	valueIcon = false,
}) => {
	let percentClass = '';
	if (percent) {
		percentClass =
			percent > 0
				? 'bg-green-100 text-green-600'
				: percent < 0
				? 'bg-red-100 text-red-600'
				: 'bg-slate-100 text-slate-500';
	}

	return (
		<div className='min-w-[260px] w-[260px] flex flex-shrink-0 scroll-snap-start bg-white rounded-xl p-4 border border-slate-200 gap-x-3 gap-y-1 transition-transform active:scale-95'>
			{/* Icon */}
			<div
				className=' w-10 h-10 rounded-md flex items-center justify-center'
				style={{backgroundColor: iconBg}}
			>
				{icon}
			</div>

			{/* Header */}
			<div>
				<div className=' text-slate-500 text-sm font-semibold mt-[2px]'>
					{name}
				</div>

				{/* Value */}
				<div className='col-span-2 flex items-center gap-2 text-slate-900 text-xl font-semibold'>
					{valueIcon && '$'}
					{new Intl.NumberFormat('en-US').format(value ?? 0)}
					<span
						className={`text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap ${percentClass}`}
					>
						{percent && percent > 0 ? '+' : ''}
						{percent}%
					</span>
				</div>

				{/* Comparison */}
				<div className='col-span-2 text-slate-500 text-xs'>
					Compared to last month
				</div>
			</div>
		</div>
	);
};

export default StatCard;

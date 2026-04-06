/** @format */

'use client';

import React from 'react';
import {StatCard} from './StatCard';
import {
	BundleSvg,
	SalesBookSvg,
	PaidDollerSvg,
	SalesDollerSvg,
} from '@/app/components/svg';

const StatsGrid = () => {
	return (
		<React.Fragment>
			<div className='min-xs:hidden p-0 flex flex-col gap-5 '>
				<div className=' no-scrollbar snap-x gap-2 flex overflow-x-auto scroll-smooth'>
					<StatCard.Mobile
						icon={
							<SalesBookSvg
								className='w-[22px] h-[22px] fill-[#2e90fa]'
								fill='none'
							/>
						}
						iconBg='#d7e9ff'
						name={'Sales'}
						value={527}
						percent={12.5}

					/>
					<StatCard.Mobile
						icon={
							<SalesDollerSvg className='w-[22px] h-[22px] fill-[#12b76a]' />
						}
						iconBg='#e5fef0'
						name={'Earnings'}
						value={5795}
            valueIcon={true}
						percent={28.0}

					/>
					<StatCard.Mobile
						icon={
							<PaidDollerSvg className='w-[22px] h-[22px] fill-[#9e77ed]' />
						}
						iconBg='#e9e3ff'
						name={'Total Paid'}
            valueIcon={true}
						value={3555}
						percent={0}

					/>
					<StatCard.Mobile
						icon={<BundleSvg className='w-[22px] h-[22px] fill-[#f79009]' />}
						iconBg='#fff3d7'
						name={'Unpaid'}
						value={455}
            
						percent={15.0}
			
					/>
				</div>
			</div>
			<div className='max-xs:hidden grid grid-cols-1 gap-[12px] justify-center xl:grid-cols-4 xl:gap-[24px] lg:grid-cols-3 lg:gap-[20px] md:grid-cols-3 md:gap-[15px] sm:grid-cols-2 sm:gap-[15px] xs:grid-cols-2 xs:gap-[12px]'>
				<StatCard.Desktop
					icon={
						<SalesBookSvg
							className='w-[22px] h-[22px] fill-[#2e90fa]'
							fill='none'
						/>
					}
					iconBg='#d7e9ff'
					name={'Sales'}
					value={527}
					percent={12.5}
					content={<>Compared to last month</>}
				/>
				<StatCard.Desktop
					icon={<SalesDollerSvg className='w-[22px] h-[22px] fill-[#12b76a]' />}
					iconBg='#e5fef0'
					name={'Earnings'}
					value={'$5,795'}
					percent={28.0}
					content={<>Compared to last month</>}
				/>
				<StatCard.Desktop
					icon={<PaidDollerSvg className='w-[22px] h-[22px] fill-[#9e77ed]' />}
					iconBg='#e9e3ff'
					name={'Total Paid'}
					value={'$3,555'}
					percent={0}
					content={<>All Time</>}
				/>
				<StatCard.Desktop
					icon={<BundleSvg className='w-[22px] h-[22px] fill-[#f79009]' />}
					iconBg='#fff3d7'
					name={'Unpaid'}
					value={'$455'}
					percent={15.0}
					content={<>Includes $275 unmatured</>}
				/>
			</div>
		</React.Fragment>
	);
};

export default StatsGrid;

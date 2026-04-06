/** @format */

'use client';
import {ArrowBottomtSvg} from '@/app/components/svg';
import {SalesCard} from './SalesCard';
import {useState} from 'react';

const sampleSales: {
	type: 'course' | 'event' | 'community';
	image: string;
	title: string;
	amount: number;
	status: 'completed' | 'refunded';
	date: string;
	id: number;
}[] = [
	{
		id: 1,
		image: 'https://i.ibb.co/jJ4GHXP/img1.jpg',
		type: 'course',
		title: 'Advanced Web Development',
		amount: 599,
		status: 'completed',
		date: 'Dec 22, 2024 4:33:00 PM',
	},
	{
		id: 2,
		image: 'https://i.ibb.co/jJ4GHXP/img1.jpg',
		type: 'course',
		title: 'Advanced Web Development',
		amount: 599,
		status: 'refunded',
		date: 'Dec 22, 2024 4:33:00 PM',
	},
	{
		id: 3,
		image: 'https://i.ibb.co/jJ4GHXP/img1.jpg',
		type: 'course',
		title: 'Advanced Web Development',
		amount: 599,
		status: 'completed',
		date: 'Dec 22, 2024 4:33:00 PM',
	},
	{
		id: 4,
		image: 'https://i.ibb.co/jJ4GHXP/img1.jpg',
		type: 'event',
		title: 'Web Design Workshop',
		amount: 299,
		status: 'completed',
		date: 'Dec 22, 2024 4:33:00 PM',
	},
	{
		id: 5,
		image: 'https://i.ibb.co/jJ4GHXP/img1.jpg',
		type: 'community',
		title: 'Web Developers Network',
		amount: 99,
		status: 'completed',
		date: 'Dec 22, 2024 4:33:00 PM',
	},
	{
		id: 6,
		image: 'https://i.ibb.co/jJ4GHXP/img1.jpg',
		type: 'course',
		title: 'React Fundamentals',
		amount: 399,
		status: 'completed',
		date: 'Dec 21, 2024 2:15:00 PM',
	},
	{
		id: 7,
		image: 'https://i.ibb.co/jJ4GHXP/img1.jpg',
		type: 'event',
		title: 'JavaScript Conference',
		amount: 199,
		status: 'refunded',
		date: 'Dec 20, 2024 10:45:00 AM',
	},
	{
		id: 8,
		image: 'https://i.ibb.co/jJ4GHXP/img1.jpg',
		type: 'community',
		title: 'UX Design Community',
		amount: 149,
		status: 'completed',
		date: 'Dec 19, 2024 3:30:00 PM',
	},
	{
		id: 9,
		image: 'https://i.ibb.co/jJ4GHXP/img1.jpg',
		type: 'course',
		title: 'Advanced CSS Techniques',
		amount: 349,
		status: 'completed',
		date: 'Dec 18, 2024 5:20:00 PM',
	},
	{
		id: 10,
		image: 'https://i.ibb.co/jJ4GHXP/img1.jpg',
		type: 'course',
		title: 'Node.js Masterclass',
		amount: 499,
		status: 'completed',
		date: 'Dec 17, 2024 11:10:00 AM',
	},
];
const RecentSales = () => {
	const [showMore, setShowMore] = useState(false);
	const displayedSales = showMore ? sampleSales : sampleSales.slice(0, 5);

	return (
		<div className='bg-white rounded-[8px] overflow-hidden border border-[#e5e7eb] py-4 xs:px-6'>
			<h2 className='max-xs:border-b max-xs:pb-4 max-xs:pl-4 text-[20px] font-semibold text-[#111827] xs:mb-[24px] '>
				Recent Sales
			</h2>
			<div className='hidden max-xs:block xs:mt-4'>
				{displayedSales.map((sale) => (
					<SalesCard.Mobile
						key={sale.id}
						image={sale.image}
						type={sale.type}
						title={sale.title}
						amount={sale.amount}
						status={sale.status}
						date={sale.date}
					/>
				))}
				<button
					onClick={() => setShowMore(!showMore)}
					className='flex h-full bg-accent py-4 w-full items-center justify-center gap-1  text-[#2563eb] font-semibold text-sm cursor-pointer    '
				>
					{showMore ? 'Show less' : 'Show more'}
					<ArrowBottomtSvg className='w-4 h-4 fill-none stroke-[#2563eb]' />
				</button>
			</div>
			<div className='max-xs:hidden flex flex-col gap-[8px]'>
				<div className='grid lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-[24px] sm:grid-cols-[2fr_1fr] sm:gap-[16px] mb-1'>
					<div className='hidden sm:block text-[#6b7280] text-[13px] pl-4 font-semibold'>
						Product
					</div>
					<div className='hidden sm:block text-[#6b7280] text-[13px] pl-4 font-semibold'>
						Amount
					</div>
					<div className='hidden lg:block text-[#6b7280] text-[13px] pl-4 font-semibold'>
						Sales
					</div>
					<div className='hidden lg:block text-[#6b7280] text-[13px] pl-4 font-semibold'>
						Date
					</div>
				</div>
				<div className='flex flex-col gap-[16px]'>
					<SalesCard.Desktop
						image={'https://i.ibb.co/jJ4GHXP/img1.jpg'}
						type='course'
						title='Advanced Web Development'
						amount={599}
						status={'completed'}
						date={'Dec 22, 2024 4:33:00 PM'}
					/>
					<SalesCard.Desktop
						image={'https://i.ibb.co/jJ4GHXP/img1.jpg'}
						type='course'
						title='Advanced Web Development'
						amount={599}
						status={'refunded'}
						date={'Dec 22, 2024 4:33:00 PM'}
					/>
					<SalesCard.Desktop
						image={'https://i.ibb.co/jJ4GHXP/img1.jpg'}
						type='course'
						title='Advanced Web Development'
						amount={599}
						status={'completed'}
						date={'Dec 22, 2024 4:33:00 PM'}
					/>
					<SalesCard.Desktop
						image={'https://i.ibb.co/jJ4GHXP/img1.jpg'}
						type='event'
						title='Advanced Web Development'
						amount={599}
						status={'completed'}
						date={'Dec 22, 2024 4:33:00 PM'}
					/>
					<SalesCard.Desktop
						image={'https://i.ibb.co/jJ4GHXP/img1.jpg'}
						type='community'
						title='Advanced Web Development'
						amount={599}
						status={'completed'}
						date={'Dec 22, 2024 4:33:00 PM'}
					/>
				</div>
			</div>
		</div>
	);
};

export default RecentSales;

/** @format */
'use client';
import React, {JSX, useState} from 'react';
import Image, {StaticImageData} from 'next/image';
// import {useIsMobile} from '@/hooks/use-mobile';
import {Star} from 'lucide-react';
// import {useState} from 'react';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/app/components/ui/hover-card';

import {
	CartSvg,
	ChevronDown,
	CourseSvg,
	StudentIcon,
} from '@/app/components/svg';
import {BundlePopup} from './component/ViewAll';
import img1 from '@/assets/c2.jpg';
import img2 from '@/assets/c1.jpg';
import img3 from '@/assets/c3.jpg';
import img4 from '@/assets/c4.jpg';
type Course = {
	title: string;
	img: StaticImageData;
	instructorimg: StaticImageData;
	instructor: string;
	instructorLabel: string;
	content: string;
	StatIcon: {
		studentSvg: JSX.Element;
		starSvg: JSX.Element;
		sessionSvg: JSX.Element;
	};
	postCount: string;
	memberCount: string;
	price: number;
};
interface BundleCardProps {
	course: Course;
}

interface Product {
	title: string;
	image: string | StaticImageData;
	level: string;
	type: 'course' | 'session';
	duration: string;
	students: string;
	units: string;
}

interface PaymentPlan {
	name: string;
	details: string;
}

export const BundleCard = ({course}: BundleCardProps) => {
	// const isMobile = useIsMobile();
	// const [isOpen, setIsOpen] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

	return (
		<div className=' bg-white rounded-lg white  shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]'>
			{/* Course Image */}
			<div className='relative w-full'>
				<Image
					alt={course.title}
					className='w-full h-48 object-cover rounded-t-lg'
					src={course.img}
					width={400}
					height={200}
				/>
			</div>

			{/* Course Details */}
			<div className='p-4'>
				<h3 className='text-lg font-semibold'>{course.title}</h3>
				<p className='text-sm text-gray-700 mb-4 line-clamp-3 '>
					{course.content}
				</p>

				<div className='bg-accent rounded-md p-2'>
					<div className='border-b py-2 flex gap-2 items-center'>
						<div>
							<Image
								alt={course.title}
								className='w-[30px] h-[30px] object-cover rounded-md'
								src={course.instructorimg}
								width={50}
								height={50}
							/>
						</div>
						<div>
							<Image
								alt={course.title}
								className='w-[30px] h-[30px] object-cover rounded-md'
								src={course.instructorimg}
								width={50}
								height={50}
							/>
						</div>
						<div>
							<Image
								alt={course.title}
								className='w-[30px] h-[30px] object-cover rounded-md'
								src={course.instructorimg}
								width={50}
								height={50}
							/>
						</div>
						<div>
							<Image
								alt={course.title}
								className='w-[30px] h-[30px] object-cover rounded-md'
								src={course.instructorimg}
								width={50}
								height={50}
							/>
						</div>
						<div>
							<Image
								alt={course.title}
								className='w-[30px] h-[30px] object-cover rounded-md'
								src={course.instructorimg}
								width={50}
								height={50}
							/>
						</div>
					</div>

					<button
						onClick={() => setIsPopupOpen(true)}
						className='flex gap-2 items-center justify-center w-full my-2'
					>
						<span className='text-nowrap text-sm'>View All</span>
						<ChevronDown className='size-4' />
					</button>

					{isPopupOpen && (
						<BundlePopup
							isOpen={isPopupOpen}
							onClose={setIsPopupOpen}
							bundleTitle='Web Development Master Bundle'
							bundleImage={img1}
							products={productData}
							paymentPlans={paymentPlanData}
						/>
					)}
				</div>

				<div className='flex items-baseline gap-2 my-3'>
					<span className='xs:text-xl font-semibold text-teal-500'>
						${course.price.toFixed(2)}
					</span>
					<span className='text-sm text-gray-500 line-through font-semibold'>
						${(course.price + 29).toFixed(2)}
					</span>
				</div>

				<HoverCard>
					<HoverCardTrigger>
						<button className='flex w-full rounded-md overflow-hidden items-center justify-center bg-[#13C4CC] text-white  shadow-md mb-2'>
							<CartSvg className='size-4' />
							<span className='p-2  text-center text-sm rounded-none font-semibold '>
								Buy Now
							</span>
							<ChevronDown fill='#fff' className='size-4 ' />
						</button>
					</HoverCardTrigger>
					<HoverCardContent side='top' className='w-60'>
						<div className=''>
							<div className='border-b py-2'>
								<h4 className='font-semibold text-sm mb-2'>PAY ONCE</h4>
								<p className='text-xs text-gray-700'>
									One-time payment of $499.99
								</p>
							</div>
							<div className='border-b py-2'>
								<h4 className='font-semibold text-sm mb-2'>Silver Bundle Plan</h4>
								<p className='text-xs text-gray-700'>
									5 Payments of $110/month (Total: $550)
								</p>
							</div>
							<div className='border-b py-2'>
								<h4 className='font-semibold text-sm mb-2'>Gold Bundle Plan</h4>
								<p className='text-xs text-gray-700'>
									10 Payments of $60/month (Total: $600)
								</p>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>

				{/* {isOpen && isMobile && (
					<Drawer open={isOpen} onOpenChange={setIsOpen}>
						<DrawerContent className='mb-4'>
							<DrawerHeader className='flex-row items-center justify-between border-b px-6 py-4'>
								<DrawerTitle>Session Details</DrawerTitle>
								<Button onClick={() => setIsOpen(false)} variant='secondary'>
									<X className='size-4' />
								</Button>
							</DrawerHeader>

							<section className='px-6 py-4 space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)]'>
								<div>
									<h3 className='text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1'>
										About the Session
									</h3>
									<p className='text-gray-700 text-sm'>
										A vibrant community of UI/UX designers focused on sharing
										knowledge, getting feedback, and staying updated with the
										latest design trends and best practices. Join us to connect
										with fellow designers and grow together.
									</p>
								</div>
							</section>
						</DrawerContent>
					</Drawer>
				)} */}
			</div>
			{/* Course Stats */}
			<div className='flex items-center justify-between text-sm bg-[rgb(248,_249,_251)] p-4 border-t rounded-b-lg'>
				<div className='relative group flex items-center gap-1'>
					<div className='text-[#4287C4] w-4 h-4'>
						<CourseSvg className='size-4' />
					</div>
					<span className='text-[14px] font-semibold text-[rgb(0, 0, 0)]'>
						{course.price}
					</span>

					{/* <div className='absolute left-8 -top-10 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10'>
						{`${course.price} Price`}

						<div className='absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45' />
					</div> */}
				</div>

				<div className='relative group flex items-center gap-1'>
					<div className='text-[#4287C4] w-4 h-4'>
						<StudentIcon className='size-4' />
					</div>
					<span className='text-[14px] font-semibold text-[rgb(0, 0, 0)]'>
						{course.memberCount}
					</span>
					{/* 
					<div className='absolute -top-10 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10'>
						Member Count
						<div className='absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45' />
					</div> */}
				</div>

				<div className='relative group flex items-center gap-1'>
					<div className='text-[#4287C4] fill-[#4287C4] size-3.5'>
						<Star className='size-3.5 fill-[#4287C4]' />
					</div>
					<span className='text-[14px] font-semibold text-[rgb(0, 0, 0)]'>
						4.7
					</span>
				</div>
			</div>
		</div>
	);
};
const productData: Product[] = [
	{
		title: 'The Complete Web Development Bootcamp',
		image: img1,
		level: 'Beginner',
		type: 'course',
		duration: '2.5 hrs',
		students: '15.2K',
		units: '5',
	},
	{
		title: 'Advanced JavaScript Concepts',
		image: img2,
		level: 'Advanced',
		type: 'course',
		duration: '3.5 hrs',
		students: '12.8K',
		units: '8',
	},
	{
		title: 'React Native Masterclass',
		image: img3,
		level: 'Intermediate',
		type: 'course',
		duration: '4 hrs',
		students: '9.5K',
		units: '6',
	},
	{
		title: 'UI/UX Design Workshop',
		image: img4,
		level: 'Beginner',
		type: 'session',
		duration: '1.5 hrs',
		students: '8.3K',
		units: '4',
	},
	{
		title: 'Design Systems Architecture',
		image: img2,
		level: 'Advanced',
		type: 'session',
		duration: '2 hrs',
		students: '7.1K',
		units: '3',
	},
];

const paymentPlanData: PaymentPlan[] = [
	{
		name: 'PAY ONCE',
		details: 'One-time payment of $499.99',
	},
	{
		name: 'Silver Bundle Plan',
		details: '5 payments of $110/month (Total: $550)',
	},
	{
		name: 'Gold Bundle Plan',
		details: '10 payments of $60/month (Total: $600)',
	},
];

/** @format */

'use client';

import {useState} from 'react';
import Image from 'next/image';
import {
	MoreHorizontal,
	Book,
	Video,
	// Clock,
	Star,
	// Share2,
	// Move,
	// Trash2,
	// ChevronRight,
	BarChart2,
	Search,
	ArrowRight,
	X,
	ChevronDown,
} from 'lucide-react';
import type {StaticImageData} from 'next/image';
import {Dialog} from '@headlessui/react';
import FilterBar from '../../ui/filter-bar';

import img3 from '@/assets/img3.png';
import img5 from '@/assets/img5.jpg';
import news from '@/assets/news.png';
import img1 from '@/assets/img-3.webp';
import {CalenderSvg1, MenuLogSvg, Searchsvg} from '../../svg';
import {Button} from '../../ui/button';
import FilterDrawer from './components/FilterDrawer';
import {useIsMobile} from '@/hooks/use-mobile';
import ReviewDrawer from './components/ReviewDrawer';
import BundleTooltipDrawer from './components/BundleTooltipDrawer';
import MenuTooltipDrawer from './components/MenuTooltipDrawer';
import ShortByDrawer from './components/ShortByDrawer';

type Course = {
	id: number;
	title: string;
	author: string;
	description: string;
	image: StaticImageData | string;
	type: 'course' | 'event';
	duration: string;
	level: string;
	students: string;
	units: number;
	rating: number;
	reviews: number;
	currentPrice: string;
	originalPrice: string;
	progress: number;
};

// Course data
const courses: Course[] = [
	{
		id: 1,
		title: 'Advanced UI/UX Design Masterclass: From Concept to Implementation',
		author: 'Sarah Johnson',
		description:
			'Master the complete UI/UX design workflow from research to final implementation with real-world projects.',
		image: img5,
		type: 'course',
		duration: '2.5h',
		level: 'Beginner',
		students: '12.5K',
		units: 16,
		rating: 4.9,
		reviews: 454,
		currentPrice: '$89.99',
		originalPrice: '$129.99',
		progress: 65,
	},
	{
		id: 2,
		title: 'Frontend Development: Master React, Redux & Modern Web Development',
		author: 'David Chen',
		description:
			'Learn modern frontend development with React, Redux and the latest web technologies through hands-on projects.',
		image: img1,
		type: 'event',
		duration: '3.5h',
		level: 'Advanced',
		students: '8.2K',
		units: 24,
		rating: 4.8,
		reviews: 389,
		currentPrice: '$59.99',
		originalPrice: '$89.99',
		progress: 45,
	},
	{
		id: 3,
		title: 'Full Stack Web Development: Build Modern Web Applications',
		author: 'Michael Brown',
		description:
			'Become a full-stack developer by mastering both frontend and backend technologies with practical projects.',
		image: img3,
		type: 'course',
		duration: '4.5h',
		level: 'Beginner',
		students: '15.7K',
		units: 32,
		rating: 4.9,
		reviews: 412,
		currentPrice: '$79.99',
		originalPrice: '$129.99',
		progress: 25,
	},
	{
		id: 4,
		title: 'Prompt Engineering Masterclass',
		author: 'Michael Brown',
		description:
			'Become a full-stack developer by mastering both frontend and backend technologies with practical projects.',
		image: news,
		type: 'event',
		duration: '4.5h',
		level: 'Beginner',
		students: '15.7K',
		units: 32,
		rating: 4.9,
		reviews: 412,
		currentPrice: '$79.99',
		originalPrice: '$129.99',
		progress: 25,
	},
];

export default function StudentCollection() {
	const [isOpen, setIsOpen] = useState(false);
	const [showShortByDrawer, setShowShortByDrawer] = useState<boolean>(false);

	return (
		<div className='max-w-7xl max-xs:rounded-5xl mx-auto px-2 xs:px-4 xs:py-6 max-xs:pb-[76px] xs:bg-white min-h-screen rounded-lg relative'>
			{/* Header */}
			<div className='flex max-xs:px-4 max-xs:pt-6 xs:items-center max-xs:flex-col xs:justify-between mb-2 xs:mb-6 relative max-xs:border-b max-xs:bg-white max-xs:rounded-t-5xl'>
			<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
					<span className='text-xl xs:text-2xl  max-xs:bg-accent max-xs:p-1.5 max-xs:rounded-md'>📚</span>
					<h1 className='xs:text-xl font-bold text-gray-800'>Collection ABC</h1>

					<div className='xs:hidden  bg-black p-px rounded-full '>
						<ChevronDown className='size-4 text-white'/>
					</div>
				</div>

					<Searchsvg  className='size-6 xs:hidden'/>
				
			</div>


				<div className='hidden xs:block relative'>
					<div className='flex items-center'>
						<div className='relative'>
							<Search className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
							<input
								type='text'
								placeholder='Search for anything...'
								className='pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64'
							/>
						</div>
						<button className='bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-r-lg'>
							<ArrowRight className='w-6 h-6' />
						</button>
					</div>
				</div>

				<div className=' xs:hidden flex  items-center justify-between gap-4'>
					<input
						type='text'
						placeholder='search...'
						className='border rounded-md py-2.5 px-4 outline-primary my-4 flex-1 placeholder:font-semibold text-sm w-20'
					/>

					<button
						onClick={() => setIsOpen(true)}
						className='size-10 border rounded-md p-2.5'
					>
						<span className='size-4 opacity-70'>
							<MenuLogSvg />
						</span>
					</button>
					<button
						onClick={() => setShowShortByDrawer(true)}
						className='size-10 border rounded-md p-2.5'
					>
						<span className='size-4 fill-gray-400'>
							<svg
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								className='opacity-70'
							>
								<path
									d='M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</span>
					</button>
				</div>
			</div>

			{/* Filter Bar */}
			<div className='hidden xs:block'>
				<FilterBar />
			</div>

			{/* Content */}

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-2 xs:gap-6'>
				{courses.map((course) => (
					<CourseCard key={course.id} course={course} />
				))}
			</div>

			<FilterDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
			<ShortByDrawer
				isOpen={showShortByDrawer}
				setIsOpen={setShowShortByDrawer}
			/>
		</div>
	);
}

interface CourseCardProps {
	course: Course;
}

function CourseCard({course}: CourseCardProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const [reason, setReason] = useState('');
	const [comments, setComments] = useState('');
	const [showOptions, setShowOptions] = useState(false);
	const [isOpenBundleTooltip, setIsOpenBundleTooltip] = useState(false);
	const isMobile = useIsMobile();

	return (
		<div className='bg-white rounded-xl shadow-md border border-gray-200 flex flex-col transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg relative'>
			<div className='p-3 flex justify-between rounded-t-xl items-center bg-gray-50 border-b border-gray-200'>
				<div
					className={`flex  items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${
						course.type === 'course'
							? 'bg-blue-100 text-blue-700'
							: 'bg-red-100 text-red-700'
					}`}
				>
					{course.type === 'course' ? (
						<Book className='size-3.5 xs:size-4' />
					) : (
						<Video className='size-3.5 xs:size-4' />
					)}
					<span className='capitalize'>{course.type}</span>
				</div>
				<Button
					variant={'outline'}
					size={'sm'}
					className='text-gray-600 border-none bg-accent  cursor-pointer'
					onClick={() => setShowOptions(!showOptions)}
				>
					<MoreHorizontal className='w-5 h-5' />
				</Button>

				{showOptions && isMobile ? (
					<MenuTooltipDrawer
						isOpen={showOptions}
						setIsOpen={setShowOptions}
						course={course}
					/>
				) : (
					// <div className='absolute top-full right-4 bg-white rounded-lg shadow-lg p-2 z-10 min-w-[180px] border border-gray-200'>
					// 	<div className='py-2 px-4 flex items-center gap-2 hover:bg-gray-50 rounded cursor-pointer'>
					// 		<Share2 className='w-4 h-4 text-gray-600' />
					// 		<span className='text-sm text-gray-700'>Share</span>
					// 	</div>
					// 	<div className='py-2 px-4 flex items-center gap-2 hover:bg-gray-50 rounded cursor-pointer justify-between'>
					// 		<div className='flex items-center gap-2'>
					// 			<Move className='w-4 h-4 text-gray-600' />
					// 			<span className='text-sm text-gray-700'>Move to</span>
					// 		</div>
					// 		<ChevronRight className='w-4 h-4 text-gray-600' />
					// 	</div>
					// 	<div className='py-2 px-4 flex items-center gap-2 hover:bg-gray-50 rounded cursor-pointer'>
					// 		<Star className='w-4 h-4 text-teal-500' />
					// 		<span className='text-sm text-gray-700'>Leave Rating</span>
					// 	</div>
					// 	<div className='py-2 px-4 flex items-center gap-2 hover:bg-gray-50 rounded cursor-pointer text-red-500'>
					// 		<Trash2 className='w-4 h-4' />
					// 		<span className='text-sm'>Remove</span>
					// 	</div>
					// </div>
					''
				)}
			</div>

			<div className='flex max-xs:p-4 max-sm:gap-4 xs:block '>
				<div className='relative w-[120] h-[80px] xs:w-full xs:h-[180px]'>
					<Image
						src={course.image || '/placeholder.svg'}
						alt={course.title}
						fill
						className='xs:object-cover max-xs:w-[120px] max-xs:h-[80px] max-xs:rounded-md'
					/>
				</div>

				<div className='xs:p-4 max-xs:w-3/5 xs:flex-grow flex flex-col max-xs:gap-2'>
					<h3 className='text-base font-semibold text-gray-900 xs:mb-2 line-clamp-2 xs:h-11'>
						{course.title}
					</h3>
					<div className='text-sm text-gray-500 italic xs:mb-3 h-5'>
						{course.author}
					</div>
					<p className='hidden xs:block text-sm text-gray-600 xs:mb-4 line-clamp-2 h-[42px]'>
						{course.description}
					</p>

					<div className='flex flex-col xs:flex-col-reverse '>
						<div className='flex items-baseline gap-2 xs:-mt-5'>
							<span className='xs:text-xl font-semibold text-teal-500'>
								{course.currentPrice}
							</span>
							<span className='text-sm text-gray-500 line-through font-semibold'>
								{course.originalPrice}
							</span>
						</div>

						<div
							className={`flex  items-center max-xs:flex-wrap gap-3 xs:gap-6 ${
								course.type === 'course' ? 'xs:mb-8' : 'xs:mb-4'
							}`}
						>
							{/* first */}
							<div className='flex items-center gap-1.5 text-xs text-gray-600 font-semibold relative group'>
								<svg
									version='1.1'
									id='Icons'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 32 32'
									className='w-4 h-4 stroke-gray-600 fill-none'
								>
									<polygon
										points='16,4 1,12 16,20 31,12'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeMiterlimit='10'
									/>
									<path
										d='M7,15.2V22c0,2.2,4,5,9,5c5,0,9-2.8,9-5v-6.8'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeMiterlimit='10'
									/>
									<line
										x1='31'
										y1='12'
										x2='31'
										y2='25'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeMiterlimit='10'
									/>
								</svg>
								{course.students}
								<span className='absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10'>
									{course.students} students enrolledgggg
									<div className='absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45' />
								</span>
							</div>

							{/* second */}
							<div className='flex items-center gap-1.5 text-xs text-gray-600 font-semibold relative group'>
								{course.type === 'event' ? (
									<svg
										className='w-4 h-4 text-gray-600'
										fill='none'
										viewBox='0 0 61 61'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											stroke='currentColor'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M27 26.8555H42M27 34.3555H42M49.5 9.98047H12C10.9645 9.98047 10.125 10.8199 10.125 11.8555V49.3555C10.125 50.391 10.9645 51.2305 12 51.2305H49.5C50.5355 51.2305 51.375 50.391 51.375 49.3555V11.8555C51.375 10.8199 50.5355 9.98047 49.5 9.98047ZM19.5 9.98047V51.2305'
										/>
									</svg>
								) : (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 15 15'
										className='w-4 h-4 text-gray-600'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z'
										/>
									</svg>
								)}

								{course.duration}
								<span className='absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10'>
									{course.type === 'event'
										? '24 sessions'
										: `${course.duration} total duration`}
									<div className='absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45' />
								</span>
							</div>

							{/* third */}
							<div className='flex items-center gap-1 text-xs text-gray-600 font-semibold relative group'>
								{/* Icon based on course type */}
								<div className='flex items-center'>
									{course.type === 'event' ? (
										<CalenderSvg1 className='size-8' />
									) : (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 32 32'
											className='w-4 h-4'
										>
											<path
												fill='currentColor'
												fillRule='evenodd'
												clipRule='evenodd'
												d='M8.00008 6.33331C7.91168 6.33331 7.82689 6.36843 7.76438 6.43094C7.70187 6.49346 7.66675 6.57824 7.66675 6.66665V25.3333C7.66675 25.4217 7.70187 25.5065 7.76438 25.569C7.82689 25.6315 7.91167 25.6666 8.00008 25.6666H11.0001V6.33331H8.00008ZM8.00008 4.33331C7.38124 4.33331 6.78775 4.57915 6.35017 5.01673C5.91258 5.45432 5.66675 6.04781 5.66675 6.66665V25.3333C5.66675 25.9522 5.91258 26.5456 6.35017 26.9832C6.78775 27.4208 7.38124 27.6666 8.00008 27.6666H11.0001V29.3333C11.0001 29.8856 11.4478 30.3333 12.0001 30.3333C12.5524 30.3333 13.0001 29.8856 13.0001 29.3333V27.6666H22.6667C23.6392 27.6666 24.5718 27.2803 25.2595 26.5927C25.9471 25.9051 26.3334 24.9724 26.3334 24V7.99998C26.3334 7.02752 25.9471 6.09489 25.2595 5.40725C24.5718 4.71962 23.6392 4.33331 22.6667 4.33331H8.00008ZM13.0001 6.33331V25.6666H22.6667C23.1088 25.6666 23.5327 25.4911 23.8453 25.1785C24.1578 24.8659 24.3334 24.442 24.3334 24V7.99998C24.3334 7.55795 24.1578 7.13403 23.8453 6.82147C23.5327 6.50891 23.1088 6.33331 22.6667 6.33331H13.0001ZM16.3334 10.6666C16.3334 10.1144 16.7811 9.66665 17.3334 9.66665H20.0001C20.5524 9.66665 21.0001 10.1144 21.0001 10.6666C21.0001 11.2189 20.5524 11.6666 20.0001 11.6666H17.3334C16.7811 11.6666 16.3334 11.2189 16.3334 10.6666ZM16.3334 16C16.3334 15.4477 16.7811 15 17.3334 15H20.0001C20.5524 15 21.0001 15.4477 21.0001 16C21.0001 16.5523 20.5524 17 20.0001 17H17.3334C16.7811 17 16.3334 16.5523 16.3334 16Z'
											/>
										</svg>
									)}

									{course.units}
								</div>

								{/* Tooltip */}
								<span className='absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10'>
									{course.type === 'event'
										? '1..1 session'
										: `${course.units} learning units`}
									<div className='absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45' />
								</span>
							</div>
						</div>
					</div>
					{/* <div className='max-xs:flex flex-col-reverse max-xs:gap-2 block'>
						<div className='flex items-center gap-4 xs:gap-6 xs:mb-4'>
							<div className='flex items-center gap-1.5 text-xs text-gray-600 font-semibold relative group'>
								<svg
									version='1.1'
									id='Icons'
									xmlns='http://www.w3.org/2000/svg'
									xmlnsXlink='http://www.w3.org/1999/xlink'
									viewBox='0 0 32 32'
									className='w-4 h-4'
									xmlSpace='preserve'
								>
									<polygon
										points='16,4 1,12 16,20 31,12'
										className='stroke-gray-600 fill-none'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeMiterlimit='10'
									/>
									<path
										d='M7,15.2V22c0,2.2,4,5,9,5c5,0,9-2.8,9-5v-6.8'
										className='stroke-gray-600 fill-none'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeMiterlimit='10'
									/>
									<line
										x1='31'
										y1='12'
										x2='31'
										y2='25'
										className='stroke-gray-600 fill-none'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeMiterlimit='10'
									/>
								</svg>
								{course.students}
								<span className='absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap'>
									{course.students} students enrolled
								</span>
							</div>

							<div className='flex items-center gap-1.5 text-xs text-gray-600 font-semibold relative group'>
								<Clock className='w-4 h-4 text-gray-600' />
								{course.duration}
								<span className='absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap'>
									{course.duration} total duration
								</span>
							</div>

							<div className='flex items-center gap-1 text-xs text-gray-600 font-semibold relative group'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 32 32'
									className='w-4 h-4'
								>
									<path
										fill='currentColor'
										fillRule='evenodd'
										clipRule='evenodd'
										d='M8.00008 6.33331C7.91168 6.33331 7.82689 6.36843 7.76438 6.43094C7.70187 6.49346 7.66675 6.57824 7.66675 6.66665V25.3333C7.66675 25.4217 7.70187 25.5065 7.76438 25.569C7.82689 25.6315 7.91167 25.6666 8.00008 25.6666H11.0001V6.33331H8.00008ZM8.00008 4.33331C7.38124 4.33331 6.78775 4.57915 6.35017 5.01673C5.91258 5.45432 5.66675 6.04781 5.66675 6.66665V25.3333C5.66675 25.9522 5.91258 26.5456 6.35017 26.9832C6.78775 27.4208 7.38124 27.6666 8.00008 27.6666H11.0001V29.3333C11.0001 29.8856 11.4478 30.3333 12.0001 30.3333C12.5524 30.3333 13.0001 29.8856 13.0001 29.3333V27.6666H22.6667C23.6392 27.6666 24.5718 27.2803 25.2595 26.5927C25.9471 25.9051 26.3334 24.9724 26.3334 24V7.99998C26.3334 7.02752 25.9471 6.09489 25.2595 5.40725C24.5718 4.71962 23.6392 4.33331 22.6667 4.33331H8.00008ZM13.0001 6.33331V25.6666H22.6667C23.1088 25.6666 23.5327 25.4911 23.8453 25.1785C24.1578 24.8659 24.3334 24.442 24.3334 24V7.99998C24.3334 7.55795 24.1578 7.13403 23.8453 6.82147C23.5327 6.50891 23.1088 6.33331 22.6667 6.33331H13.0001ZM16.3334 10.6666C16.3334 10.1144 16.7811 9.66665 17.3334 9.66665H20.0001C20.5524 9.66665 21.0001 10.1144 21.0001 10.6666C21.0001 11.2189 20.5524 11.6666 20.0001 11.6666H17.3334C16.7811 11.6666 16.3334 11.2189 16.3334 10.6666ZM16.3334 16C16.3334 15.4477 16.7811 15 17.3334 15H20.0001C20.5524 15 21.0001 15.4477 21.0001 16C21.0001 16.5523 20.5524 17 20.0001 17H17.3334C16.7811 17 16.3334 16.5523 16.3334 16Z'
									></path>
								</svg>

								{course.units}

								<span className='absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10'>
									{course.units} learning units
								</span>
							</div>
						</div>

						<div className='flex items-baseline gap-2 xs:mb-4 mt-auto'>
							<span className='xs:text-xl font-semibold text-teal-500'>
								{course.currentPrice}
							</span>
							<span className='text-sm text-gray-500 line-through font-semibold'>
								{course.originalPrice}
							</span>
						</div>
					</div> */}
				</div>
			</div>

			<div className='relative w-full h-0.5 xs:h-1 bg-gray-200 group rounded'>
				{/* Progress Bar */}
				<div
					className='absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded'
					style={{width: `${course.progress}%`}}
				/>

				{/* Tooltip */}
				<div
					className='absolute -top-10 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10'
					style={{left: `${course.progress}%`}}
				>
					{course.progress}% Complete
					{/* Tooltip Arrow */}
					<div className='absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45' />
				</div>
			</div>

			<div className='p-3 xs:p-4 bg-gray-50 rounded-b-2xl flex items-center justify-between'>
				<div className='flex items-center'>
					{/* First Icon */}
					<div className='w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-teal-500 z-0  transition-transform duration-200 hover:scale-110'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 18 18'
							className='w-4 h-4 text-teal-500'
						>
							<path
								fill='currentColor'
								d='M17 12.7992V13.5992C17.4418 13.5992 17.8 13.241 17.8 12.7992H17ZM17 8.39922H17.8C17.8 7.95739 17.4418 7.59922 17 7.59922V8.39922ZM4.96739 4.12628C4.59574 4.3652 4.48814 4.86017 4.72706 5.23183C4.96598 5.60348 5.46095 5.71108 5.83261 5.47216L4.96739 4.12628ZM11 1.19922L11.6315 0.708066C11.3773 0.381231 10.9157 0.302372 10.5674 0.526276L11 1.19922ZM13.1685 5.29037C13.4398 5.63913 13.9424 5.70196 14.2912 5.4307C14.6399 5.15945 14.7027 4.65682 14.4315 4.30807L13.1685 5.29037ZM17 11.9992H14.4V13.5992H17V11.9992ZM14.4 9.19922H17V7.59922H14.4V9.19922ZM16.2 8.39922V12.7992H17.8V8.39922H16.2ZM13 10.5992C13 9.82602 13.6268 9.19922 14.4 9.19922V7.59922C12.7431 7.59922 11.4 8.94237 11.4 10.5992H13ZM14.4 11.9992C13.6268 11.9992 13 11.3724 13 10.5992H11.4C11.4 12.2561 12.7431 13.5992 14.4 13.5992V11.9992ZM5.83261 5.47216L11.4326 1.87216L10.5674 0.526276L4.96739 4.12628L5.83261 5.47216ZM10.3685 1.69037L13.1685 5.29037L14.4315 4.30807L11.6315 0.708066L10.3685 1.69037ZM1.8 5.59922H15.4V3.99922H1.8V5.59922ZM15.4 15.9992H1.8V17.5992H15.4V15.9992ZM1.8 15.9992V5.59922H0.2V15.9992H1.8ZM1.8 15.9992H1.8H0.2C0.2 16.8829 0.916343 17.5992 1.8 17.5992V15.9992ZM15.4 15.9992H15.4V17.5992C16.2837 17.5992 17 16.8829 17 15.9992H15.4ZM15.4 5.59922H15.4H17C17 4.71556 16.2837 3.99922 15.4 3.99922V5.59922ZM1.8 3.99922C0.916344 3.99922 0.2 4.71556 0.2 5.59922H1.8H1.8V3.99922ZM15.4 13.3992V15.9992H17V13.3992H15.4ZM15.4 5.59922V7.69922H17V5.59922H15.4Z'
							></path>
						</svg>
					</div>

					{/* Second Icon */}
					<button
						onClick={() => setIsOpenBundleTooltip(true)}
						className='w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-teal-500 -ml-1 z-0  transition-transform duration-200 hover:scale-110'
					>
						<svg
							fill='none'
							viewBox='0 0 24 24'
							className='w-4 h-4 text-teal-500'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fill='currentColor'
								d='M3 1h18a3 3 0 0 1 3 3v8H2v5a1 1 0 0 0 1 1h7v2H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3ZM2 4v2h20V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1Zm11.8 10.81a2.7 2.7 0 0 1 4.2.43 2.7 2.7 0 0 1 4.2-.43 2.8 2.8 0 0 1 0 3.92L18 23l-4.2-4.27a2.8 2.8 0 0 1 0-3.92Z'
								clipRule='evenodd'
								fillRule='evenodd'
							></path>
						</svg>
					</button>

					{isMobile && (
						<BundleTooltipDrawer
							isOpen={isOpenBundleTooltip}
							setIsOpen={setIsOpenBundleTooltip}
						/>
					)}
				</div>

				<div className='flex items-center gap-1.5'>
					<BarChart2 className='w-4 h-4 text-gray-600' />
					<span className='text-sm font-bold text-gray-700'>
						{course.level}
					</span>
				</div>

				<div className='flex items-center gap-1'>
					<Star
						className='w-4 h-4 fill-current text-blue-400'
						onClick={() => setIsOpen(true)}
					/>
					<span className='text-sm font-semibold text-gray-900'>
						{course.rating}
					</span>
					<span className='text-xs text-gray-500'>({course.reviews})</span>
				</div>

				{isMobile ? (
					<ReviewDrawer isOpen={isOpen} setIsOpen={setIsOpen} course={course} />
				) : (
					<Dialog
						open={isOpen}
						onClose={() => setIsOpen(false)}
						className='relative z-50'
					>
						<div className='fixed inset-0 bg-black/30' aria-hidden='true' />
						<div className='fixed inset-0 flex items-center justify-center p-4'>
							<Dialog.Panel className='w-full max-w-lg rounded-lg bg-white p-6 shadow-xl'>
								{/* Header */}
								<div className='flex justify-between items-start mb-4'>
									<Dialog.Title className='text-lg font-semibold'>
										Review this Course
									</Dialog.Title>
									<button onClick={() => setIsOpen(false)}>
										<X className='w-5 h-5 text-gray-500 hover:text-black' />
									</button>
								</div>

								{/* Course Info */}
								<div className='flex items-center gap-3 mb-4'>
									<Image
										src={course.image}
										alt='Course Thumbnail'
										width={60}
										height={60}
										className='rounded-md'
									/>
									<div>
										<p className='font-semibold text-sm'>{course.title}</p>
										<p className='text-xs text-gray-500'>
											{course.author} • {course.duration}
										</p>
									</div>
								</div>

								{/* Info Note */}
								<p className='text-sm text-gray-600 bg-gray-100 p-3 rounded mb-4'>
									To help us improve this course, please leave a reason and a
									comment for your rating
								</p>

								{/* Star Rating */}
								<div className='mb-4'>
									<p className='text-sm font-semibold'>Your rating *</p>
									<div className='flex gap-1 mt-1'>
										{[1, 2, 3, 4, 5].map((star) => (
											<Star
												key={star}
												onMouseEnter={() => setHover(star)}
												onMouseLeave={() => setHover(0)}
												onClick={() => setRating(star)}
												className={`w-6 h-6 cursor-pointer transition ${
													(hover || rating) >= star
														? 'fill-blue-400 text-blue-400'
														: 'text-gray-300'
												}`}
											/>
										))}
									</div>
								</div>

								{/* Reason Dropdown */}
								<div className='mb-4'>
									<label className='text-sm font-semibold'>
										Main reason for your rating *
									</label>
									<select
										value={reason}
										onChange={(e) => setReason(e.target.value)}
										className='w-full mt-1 rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
									>
										<option value=''>-- Select --</option>
										<option value='too-basic'>Course Content</option>
										<option value='too-advanced'>Presentation Quality</option>
										<option value='not-clear'>Practical Exercises</option>
										<option value='not-clear'>Learning Pace</option>
										<option value='not-clear'>Support Materials</option>
									</select>
								</div>

								{/* Comments */}
								<div className='mb-4'>
									<label className='text-sm font-semibold'>
										Comments (optional)
									</label>
									<textarea
										value={comments}
										onChange={(e) => setComments(e.target.value)}
										rows={4}
										maxLength={2000}
										className='w-full mt-1 rounded border border-gray-300 p-2 text-sm'
										placeholder='Please describe the reason for your rating..'
									/>
									<p className='text-xs text-gray-400 mt-1'>
										Your rating and comments are{' '}
										<strong>publicly visible</strong>.
									</p>
								</div>

								{/* Action Buttons */}
								<div className='flex justify-end gap-2 mt-6'>
									<button
										className='px-4 py-2 rounded bg-gray-200 text-sm hover:bg-gray-300'
										onClick={() => setIsOpen(false)}
									>
										Cancel
									</button>
									<button
										className='px-4 py-2 rounded bg-blue-500 text-white text-sm hover:bg-blue-600'
										onClick={() => {
											// Handle submit here
											console.log({rating, reason, comments});
											setIsOpen(false);
										}}
									>
										Submit Review
									</button>
								</div>
							</Dialog.Panel>
						</div>
					</Dialog>
				)}
			</div>
		</div>
	);
}

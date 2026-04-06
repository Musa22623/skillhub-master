/** @format */

import React from 'react';
import Image from 'next/image';
import c1 from '@/assets/explore/c1.jpg';
import c2 from '@/assets/explore/c2.jpg';
import {
	InstructorsSVG,
	SessionSvg,
	StarBadge,
	StarRating,
	StudentSvg,
	TreeVerticalDots,
	VideoPlayerIcon,
} from '@/app/components/svg';

const instructors = [
	{
		name: 'Ariel Reichman',
		role: 'Instructor | Education | Investor',
		image: c1,
		stats: {
			rating: '4.7 Instructor Rating',
			ratingSvg: <StarBadge />,
			reviews: '45 Reviews',
			reviewSvg: <StarRating />,
			sessions: '3 Sessions',
			sessionSvg: <SessionSvg />,
			courses: '5 Courses',
			couresesSvg: <VideoPlayerIcon />,
		},
		highlights: [
			{
				title: 'The Complete Web Development Bootcamp',
				img: c1,
			},
			{
				title: 'Advanced JavaScript Concepts',
				img: c1,
			},
			{
				title: 'React Native - The Practical Guide',
				img: c1,
			},
		],
		profile: {
			studentsEnrolled: '35K',
			studentSvg: <StudentSvg className='w-[15] mr-1 ' />,
			treeVerticalDots: <TreeVerticalDots />,
		},
	},
	{
		name: 'Stephen Covey',
		role: 'Leadership Coach | Author',
		image: c2,
		stats: {
			rating: '4.8 Instructor Rating',
			reviews: '2.3k Reviews',
			sessions: '4 Sessions',
			courses: '7 Courses',
		},
		highlights: [
			{
				title: 'The 7 Habits of Highly Effective People',
				img: c2,
			},
			{
				title: 'Leadership Essentials',
				img: c2,
			},
			{
				title: 'Personal Productivity',
				img: c2,
			},
		],
		profile: {
			studentsEnrolled: '39K',
			studentSvg: <StudentSvg className='w-[15] mr-1 ' />,
			treeVerticalDots: <TreeVerticalDots />,
		},
	},
	{
		name: 'Ariel Reichman',
		role: 'Instructor | Education | Investor',
		image: c1,
		stats: {
			rating: '4.7 Instructor Rating',
			reviews: '45 Reviews',
			sessions: '3 Sessions',
			courses: '5 Courses',
		},
		highlights: [
			{
				title: 'The Complete Web Development Bootcamp',
				img: c1,
			},
			{
				title: 'Advanced JavaScript Concepts',
				img: c1,
			},
			{
				title: 'React Native - The Practical Guide',
				img: c1,
			},
		],
		profile: {
			studentsEnrolled: '35K',
			studentSvg: <StudentSvg className='w-[15] mr-1 ' />,
			treeVerticalDots: <TreeVerticalDots />,
		},
	},
	{
		name: 'Stephen Covey',
		role: 'Leadership Coach | Author',
		image: c2,
		stats: {
			rating: '4.8 Instructor Rating',
			reviews: '2.3k Reviews',
			sessions: '4 Sessions',
			courses: '7 Courses',
		},
		highlights: [
			{
				title: 'The 7 Habits of Highly Effective People',
				img: c2,
			},
			{
				title: 'Leadership Essentials',
				img: c2,
			},
			{
				title: 'Personal Productivity',
				img: c2,
			},
		],
		profile: {
			studentsEnrolled: '39K',
			studentSvg: <StudentSvg className='w-[15] mr-1 ' />,
			treeVerticalDots: <TreeVerticalDots />,
		},
	},
];

export const PopularInstructors = () => {
	return (
		<div className='mb-4 bg-white px-5 py-6 rounded-2xl'>
			<div className='flex items-center flex-col md:flex-row gap-4 justify-between mb-4'>
				<div className='flex items-center gap-2'>
					<InstructorsSVG />
					<h1 className='text-[22px] font-bold'>Popular Instructors</h1>
				</div>
				<div className='flex items-center justify-center  px-4 py-2 border-2 border-gray-200 p-2 rounded-full bg-white '>
					<div className=' w-full  flex items-center justify-between'>
						<div className='flex items-center  text-gray-600 cursor-pointer'>
							<svg
								width='14'
								height='8'
								viewBox='0 0 14 8'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M1.1665 4H12.8332'
									stroke='currentColor'
									strokeWidth='1.25'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M1.1665 4L4.49984 7.33333'
									stroke='currentColor'
									strokeWidth='1.25'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M1.1665 4.00002L4.49984 0.666687'
									stroke='currentColor'
									strokeWidth='1.25'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</div>
						<div className='sm:flex hidden '>
							<p className='text-sm font-semibold leading-none cursor-pointer text-gray-600 hover:text-indigo-700    pl-2'>
								1
							</p>
							<p className='text-sm font-semibold leading-none cursor-pointer text-gray-600   px-1'>
								of
							</p>
							<p className='text-sm font-semibold leading-none cursor-pointer text-gray-600 hover:text-indigo-700    pr-2'>
								4
							</p>
						</div>
						<div className='flex items-center  text-gray-600 hover:text-indigo-700 cursor-pointer'>
							{/* <p className="text-sm font-semibold leading-none mr-3">Next</p> */}
							<svg
								width='14'
								height='8'
								viewBox='0 0 14 8'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M1.1665 4H12.8332'
									stroke='currentColor'
									strokeWidth='1.25'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M9.5 7.33333L12.8333 4'
									stroke='currentColor'
									strokeWidth='1.25'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M9.5 0.666687L12.8333 4.00002'
									stroke='currentColor'
									strokeWidth='1.25'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{instructors.map((instructor, index) => (
					<div
						key={index}
						className='bg-white rounded-lg shadow-md overflow-hidden'
					>
						{/* Header */}
						<div className='bg-[rgb(240,_243,_250)] rounded-tl-[10px] rounded-tr-[10px] py-4 px-3 flex items-center justify-between'>
							<p className='flex text-xs text-gray-600 font-bold'>
								{instructor.profile.studentSvg}
								{instructor.profile.studentsEnrolled} Students
							</p>
							<span className='text-sm text-gray-600 cursor-pointer font-bold'>
								{/* {instructor.profile.treeVerticalDots} */}
								...
							</span>
						</div>

						{/* Content */}
						<div className='p-[18px] relative'>
							<h4 className='mt-2 mb-[7px] text-[18px] text-[#13c4cc] font-bold'>
								{instructor.name}
							</h4>
							<p className='text-[14px] text-gray-500 font-semibold'>
								{instructor.role}
							</p>

							<div className='flex items-center gap-3 my-3'>
								<Image
									alt={instructor.name}
									className='w-[80px] h-[80px] rounded-full object-cover'
									width={80}
									height={80}
									src={instructor.image}
								/>
								<div className='flex flex-col gap-2'>
									<div className='flex items-center gap-1'>
										<div>
											<StarBadge className='star-badge  ' fill='#13c4cc' />
										</div>
										<h3 className='text-[13px] font-semibold text-gray-500'>
											{instructor.stats.rating}
										</h3>
									</div>
									<div className='flex items-center gap-1'>
										<div>
											<StarRating className='star-rating' fill='#13c4cc' />
										</div>
										<h3 className='text-[13px] font-semibold text-gray-500'>
											{instructor.stats.reviews}
										</h3>
									</div>
									<div className='flex items-center gap-1'>
										<div>
											<SessionSvg
												className='video-player-icon w-5 h-5'
												fill='#13c4cc'
											/>
										</div>
										<h3 className='text-[13px] font-semibold text-gray-500'>
											{instructor.stats.sessions}
										</h3>
									</div>
									<div className='flex items-center gap-2'>
										<div>
											<VideoPlayerIcon className='' fill='#13c4cc' />
										</div>
										<h3 className='text-[13px] font-semibold text-gray-500'>
											{instructor.stats.courses}
										</h3>
									</div>
								</div>
							</div>

							{/* Highlighted Courses */}
							<div className='p-3 shadow-md rounded flex flex-col gap-2 bg-[#f8f9fb]'>
								{instructor.highlights.map((course, i) => (
									<div key={i} className='flex items-center gap-2.5'>
										<Image
											alt={course.title}
											className='rounded'
											width={40}
											height={40}
											src={course.img}
										/>
										<h4 className='text-gray-600 text-[13.5px]'>
											{course.title}
										</h4>
									</div>
								))}
							</div>

							<button className='text-white w-full py-2.5 rounded-lg text-sm mt-3 bg-[#13c4cc]'>
								View Profile
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

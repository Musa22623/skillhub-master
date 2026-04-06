/** @format */
'use client';
import React, {JSX} from 'react';
import Image, {StaticImageData} from 'next/image';
import {useIsMobile} from '@/hooks/use-mobile';
import {Info, Star, X} from 'lucide-react';
import {useState} from 'react';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';
import {Button} from '@/app/components/ui/button';
import { UserGroupSvg, UserSVG } from '@/app/components/svg';

type Course = {
	title: string;
	img: StaticImageData;
	instructorimg: StaticImageData;
	instructor: string;
	content: string;
	rating: string;
	reviews: string;
	students: string;
	duration: string;
	icon: {
		studentSvg: JSX.Element;
		starSvg: JSX.Element;
		sessionSvg: JSX.Element;
	};
};
interface SessionCardProps {
	course: Course;
}
export const SessionsCard = ({course}: SessionCardProps) => {
	const isMobile = useIsMobile();
	const [isOpen, setIsOpen] = useState(false);
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

				<div className='absolute bottom-[-25px] left-3'>
					<Image
						alt={course.title}
						className=' w-[50px] h-[50px] shadow-lg rounded-[12px]  border-3 border-white'
						src={course.instructorimg}
						width={50}
						height={50}
					/>
				</div>

				<div className='absolute -bottom-4 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-md transition-colors duration-300'>
					<span className='relative -top-2 text-2xl'>...</span>
				</div>
			</div>

			{/* Course Details */}
			<div className='p-4 mt-4'>
				<h3 className='text-lg font-semibold mb-1'>{course.title}</h3>
				<p className='text-sm text-gray-600 mb-2'>{course.instructor}</p>
				<p className='text-sm text-gray-700 mb-4 line-clamp-3 pr-4'>
					{course.content}
				</p>

				<div className='flex rounded-md overflow-hidden bg-[#13C4CC] text-white  shadow-md mb-2'>
					<button className='p-2 flex-grow text-center text-sm rounded-none font-semibold hover:bg-teal-500 transition-colors'>
						Book Now
					</button>
						<div className='w-px bg-gray-300'></div>
						<button
							className='p-2 hover:bg-teal-500 transition-colors'
							onClick={() => setIsOpen(true)}
						>
							<Info size={16} />
						</button>
				</div>
				{isOpen && isMobile && (
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
				)}
			</div>
			{/* Course Stats */}
			<div className='flex items-center justify-between text-sm bg-[rgb(248,_249,_251)] p-4 border-t rounded-b-lg'>
				<div className='relative group flex items-center gap-1'>
					<div className='text-[#4287C4] w-4 h-4'>{course.duration === '1on1' ? course.icon.sessionSvg : <UserGroupSvg className='size-4'/>}</div>
					<span className='text-[14px] font-semibold text-[rgb(0, 0, 0)]'>
						{course.duration}
					</span>

					{/* <div className='absolute left-8 -top-10 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10'>
						{course.duration === '1on1' ? '1on1 Session' : 'Group Session'}

						<div className='absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45' />
					</div> */}
				</div>

				<div className='relative group flex items-center gap-1'>
					<div className='text-[#4287C4] w-4 h-4'><UserSVG className='size-4 fill-black'/></div>
					<span className='text-[14px] font-semibold text-[rgb(0, 0, 0)]'>
						{course.students}
					</span>

					{/* <div className='absolute -top-10 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10'>
						Member Count
						<div className='absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45' />
					</div> */}
				</div>

				<div className='relative group flex items-center gap-1'>
					<div className='text-[#4287C4] size-3'>{<Star className='size-3 fill-[#4287C4]'/>}</div>
					<span className='font-semibold text-sm'>{course.rating}</span>
					<span className='text-[14px] font-semibold text-gray-600'>
						({course.reviews})
					</span>
				</div>
			</div>
		</div>
	);
};

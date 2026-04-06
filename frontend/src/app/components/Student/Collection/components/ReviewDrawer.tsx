/** @format */

'use client';

import type React from 'react';

import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';
import {Star, X} from 'lucide-react';
import Image, {StaticImageData} from 'next/image';
import {useState} from 'react';

interface ReviewDrawerProps {
	isOpen: boolean;
	setIsOpen: (state: boolean) => void;
	course: {
		image: string | StaticImageData;
		author: string;
		duration: string;
		title: string;
	};
}
export default function ReviewDrawer({
	isOpen,
	setIsOpen,
	course,
}: ReviewDrawerProps) {
	const [reason, setReason] = useState('');
	const [comments, setComments] = useState('');
	const [rating, setRating] = useState(0);
	return (
		<>
			{/* Review Drawer */}

			<Drawer open={isOpen} onOpenChange={setIsOpen}>
				<DrawerContent className='min-h-fit max-h-screen'>
					<DrawerHeader className='flex-row justify-between w-full border-b'>
						<DrawerTitle>
							<span className='font-semibold text-lg text-gray-800'>
								Reviews this Course
							</span>
						</DrawerTitle>
						<button onClick={() => setIsOpen(false)}>
								<X className='size-5'/>
							</button>
					</DrawerHeader>
					{/* Content Type Section */}

					<div className='overflow-y-auto'>
						{/* Course Info */}
						<div className='flex p-4 gap-3  border-b '>
							<div className='size-[70] relative flex-none'>
								<Image
									src={course.image}
									alt='Course Thumbnail'
									fill
									className='rounded-md object-fit'
								/>
							</div>
							<div>
								<p className='font-semibold text-sm line-clamp-2'>{course.title}</p>
								<p className='text-xs text-gray-500'>
									{course.author} • {course.duration}
								</p>
							</div>
						</div>

						{/* Info Note */}
						<p className='text-sm  bg-blue-50  p-3 m-4 rounded-md '>
							To help us improve this course, please leave a reason and a
							comment for your rating
						</p>

						{/* Star Rating */}
						<div className=' border-b p-4'>
							<p className='text-sm '>
								Your rating <span className='text-red-500'>*</span>
							</p>
							<div className='flex justify-center gap-1 mt-1'>
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										onClick={() => setRating(star)}
										className={`w-6 h-6 cursor-pointer transition ${
											rating >= star
												? 'fill-blue-400 text-blue-400'
												: 'text-gray-300'
										}`}
									/>
								))}
							</div>
						</div>

						{/* Reason Dropdown */}
						<div className=' p-4 border-b flex flex-col'>
							<label className='text-sm '>
								Main reason for your rating{' '}
								<span className='text-red-500'>*</span>
							</label>
							<select
								value={reason}
								onChange={(e) => setReason(e.target.value)}
								className=' rounded-md border border-gray-300 px-2 py-3 mt-2 text-sm focus:outline-none focus:ring-2 focus:ring-black-400'
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
						<div className='p-4'>
						<div className='flex items-center justify-between px-1'>
						<label className='text-sm '>Comments (optional)</label>
						<span className='text-sm'>{Number(2000) - comments.length}</span>
						</div>
							<textarea
								value={comments}
								onChange={(e) => setComments(e.target.value)}
								rows={4}
								maxLength={2000}
								className='w-full mt-1 rounded-md border border-gray-300 p-2 text-sm'
								placeholder='Please describe the reason for your rating..'
							/>
							<p className='text-xs  mt-4'>
								Your rating and comments are <strong>publicly visible</strong>.
							</p>
						</div>
					</div>

					{/* Show Results Button */}
					<DrawerFooter className='flex-row border-t'>
						<button
							className=' flex-1 py-2.5 rounded-md bg-gray-200 text-sm hover:bg-gray-300'
							onClick={() => setIsOpen(false)}
						>
							Cancel
						</button>
						<button
							className=' flex-1 py-2.5 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600'
							onClick={() => {
								// Handle submit here
								console.log({rating, reason, comments});
								setIsOpen(false);
							}}
						>
							Submit Review
						</button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}

/** @format */

'use client';

import type React from 'react';

import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';
import {X} from 'lucide-react';
import Image, {StaticImageData} from 'next/image';
import img3 from '@/assets/img3.png';
import img5 from '@/assets/img5.jpg';
import news from '@/assets/news.png';
import img1 from '@/assets/img-3.webp';
type Course = {
	id: number;
	title: string;
	image: StaticImageData | string;
	currentPrice: string;
	originalPrice: string;
};

// Course data
const courses: Course[] = [
	{
		id: 1,
		title: 'Advanced UI/UX Design Masterclass: From Concept to Implementation',
		image: img5,
		currentPrice: '$89.99',
		originalPrice: '$129.99',
	},
	{
		id: 2,
		title: 'Frontend Development: Master React, Redux & Modern Web Development',
		image: img1,

		currentPrice: '$59.99',
		originalPrice: '$89.99',
	},
	{
		id: 3,
		title: 'Full Stack Web Development: Build Modern Web Applications',
		image: img3,

		currentPrice: '$79.99',
		originalPrice: '$129.99',
	},
	{
		id: 4,
		title: 'Prompt Engineering Masterclass',
		image: news,
		currentPrice: '$79.99',
		originalPrice: '$129.99',
	},
];

interface BundleTooltipDrawerProps {
	isOpen: boolean;
	setIsOpen: (state: boolean) => void;
}
export default function BundleTooltipDrawer({
	isOpen,
	setIsOpen,
}: BundleTooltipDrawerProps) {
	return (
		<>
			{/* BundleTooltip Drawer */}

			<Drawer open={isOpen} onOpenChange={setIsOpen}>
				<DrawerContent className='min-h-fit max-h-screen'>
					<DrawerHeader className='flex-row justify-between w-full border-b'>
						<DrawerTitle>
							<span className='font-semibold text-lg text-gray-800'>
								Bundles
							</span>
						</DrawerTitle>
						<button
							className='bg-none border-none text-gray-500 text-2xl cursor-pointer p-1'
							onClick={() => setIsOpen(false)}
						>
							<X />
						</button>
					</DrawerHeader>
					{/* Content Type Section */}

					<div className='overflow-y-auto mb-4'>
						{/* Course Info */}
						{courses.map((course) => (
							<div key={course.id} className='flex p-4 gap-3 '>
								<div className='size-[70] relative flex-none'>
									<Image
										src={course.image}
										alt='Course Thumbnail'
										fill
										className='rounded-md object-fit'
									/>
								</div>
								<div>
									<p className='font-semibold text-sm line-clamp-2'>
										{course.title}
									</p>
                  <p className='text-teal-500'>
                    {course.currentPrice}
                  </p>
								</div>
							</div>
						))}
					</div>
				</DrawerContent>
			</Drawer>
		</>
	);
}

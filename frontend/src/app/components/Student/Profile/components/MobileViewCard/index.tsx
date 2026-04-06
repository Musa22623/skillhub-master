/** @format */

import {GraduationCap, Clock, FileText, MoreHorizontal} from 'lucide-react';
import {Card, CardContent, CardFooter} from '@/app/components/ui/card';
import Image, { StaticImageData } from 'next/image';
import { Button } from '@/app/components/ui/button';
import { BarChart3 } from '@/app/components/svg';

interface Course {
  title: string;
  image: string | StaticImageData;
  students: string;
  rating: number;
  reviews: string;
  duration: string;
  lectures: number;
  price: string;
  originalPrice: string;
}

export default function MobileCourseCard({course}: {course: Course}) {
	return (

			<Card className='overflow-hidden pb-0 rounded-md shadow-sm border border-gray-100'>
				<CardContent className='p-0'>
					<div className='px-4'>
						<div className='flex gap-4'>
							<div className='flex-shrink-0'>
								<Image
									src={course.image}
									alt=''
									className='w-[128px] h-[80px] rounded-lg object-cover'
								/>
							</div>
							<div className='flex-1'>
								<h3 className='font-semibold text-gray-800 text-base line-clamp-2 leading-tight'>
									{course.title}
								</h3>
								<p className='text-gray-500 text-sm mt-1'>James Ritchie</p>
								<div className='flex items-center mt-2'>
									<span className='text-teal-500 font-semibold'>${course.price}</span>
									<span className='text-gray-400 text-sm line-through ml-2'>
										${course.originalPrice}
									</span>
								</div>
                <div className='flex items-center gap-4 mt-2 flex-wrap text-sm text-gray-500'>
							<div className='flex items-center gap-1'>
								<GraduationCap className='h-4 w-4' />
								<span>{course.students}</span>
							</div>
							<div className='flex items-center gap-1'>
								<Clock className='h-4 w-4' />
								<span>{course.duration}</span>
							</div>
							<div className='flex items-center gap-1'>
								<FileText className='h-4 w-4' />
								<span>{course.lectures}</span>
							</div>
						</div>
							</div>
						</div>

				
					</div>
				</CardContent>

				<CardFooter className='bg-gray-50 border-t [.border-t]:pt-3 pb-3 flex items-center justify-between'>
					<div className='flex items-center gap-1'>
            <BarChart3 className='size-4'/>
						<span className='text-gray-700 font-semibold text-sm'>Advanced</span>
					</div>
					<div className='flex items-center gap-1'>
						<div className='flex items-center'>
							<span className='text-teal-500 text-lg'>★</span>
							<span className='text-gray-700 font-semibold text-sm ml-1'>
								{course.rating}
							</span>
							<span className='text-gray-500 text-xs ml-1'>({course.reviews})</span>
						</div>
					</div>
						<Button variant={'ghost'} className='ml-4 size-6 rounded-sm bg-accent'>
							<MoreHorizontal className='h-5 w-5 text-gray-400' />
						</Button>
				</CardFooter>
			</Card>
	
	);
}

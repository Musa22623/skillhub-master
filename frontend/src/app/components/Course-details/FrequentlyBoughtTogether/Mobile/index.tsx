/** @format */

'use client';

import {useState, useEffect, useCallback} from 'react';
import Image, {StaticImageData} from 'next/image';
import {Checkbox} from '@/app/components/ui/checkbox';
import {Star} from 'lucide-react';

import CourseImg1 from '@/assets/c1.jpg';
import CourseImg2 from '@/assets/c2.jpg';
import CourseImg3 from '@/assets/c3.jpg';

interface Course {
	id: string;
	title: string;
	image: string | StaticImageData;
	rating: number;
	reviews: number;
	price: number;
	originalPrice: number;
	checked: boolean;
}

export default function FrequentlyBoughtTogether() {
	const [courses, setCourses] = useState<Course[]>([
		{
			id: '1',
			title: 'Complete Web Development Bootcamp 2024',
			image: CourseImg1,
			rating: 5,
			reviews: 4289,
			price: 89.99,
			originalPrice: 129.99,
			checked: true,
		},
		{
			id: '2',
			title: 'Advanced JavaScript Masterclass',
			image: CourseImg2,
			rating: 4.5,
			reviews: 2156,
			price: 59.99,
			originalPrice: 89.99,
			checked: true,
		},
		{
			id: '3',
			title: 'React and Redux Professional Course',
			image: CourseImg3,
			rating: 5,
			reviews: 3742,
			price: 49.99,
			originalPrice: 79.99,
			checked: true,
		},
	]);

	const [totalPrice, setTotalPrice] = useState(0);
	const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);

	const calculateTotals = useCallback(() => {
		const selectedCourses = courses.filter((course) => course.checked);
		const price = selectedCourses.reduce(
			(sum, course) => sum + course.price,
			0
		);
		const originalPrice = selectedCourses.reduce(
			(sum, course) => sum + course.originalPrice,
			0
		);

		setTotalPrice(price);
		setTotalOriginalPrice(originalPrice);
	}, [courses]);

	useEffect(() => {
		calculateTotals();
	}, [courses, calculateTotals]);

	const toggleCourse = (id: string) => {
		setCourses((prevCourses) =>
			prevCourses.map((course) =>
				course.id === id ? {...course, checked: !course.checked} : course
			)
		);
	};

	const addAllToCart = () => {
		const selectedCourses = courses.filter((course) => course.checked);
		console.log('Adding to cart:', selectedCourses);
		// Here you would typically call an API or dispatch an action to add items to cart
		alert(
			`Added ${
				selectedCourses.length
			} courses to cart for $${totalPrice.toFixed(2)}`
		);
	};

	const renderStars = (rating: number) => {
		return (
			<div className='flex items-center gap-1 text-teal-500'>
				{[...Array(5)].map((_, i) => (
					<Star
						key={i}
						className={`size-3 ${
							i < Math.floor(rating) ? 'fill-current' : 'fill-none'
						} ${
							i === Math.floor(rating) && rating % 1 > 0
								? 'fill-current opacity-60'
								: ''
						}`}
					/>
				))}
			</div>
		);
	};

	return (
		<div className='w-full p-4 lg:p-6'>
			<div className='flex gap-2 flex-col mb-6'>
				<div className='flex flex-col gap-2'>
					<h2 className='text-xl font-semibold mr-2 text-gray-800'>
						Frequently Bought Together
					</h2>

				<div className='space-x-2'>
        <span className='text-2xl font-semibold'>
						${totalPrice.toFixed(2)}
					</span>
          
					<span className='text-lg text-gray-500 line-through'>
						${totalOriginalPrice.toFixed(2)}
					</span>
        </div>
				</div>

				<div className=''>
					<button
						className='bg-blue-600 w-full hover:bg-blue-700 text-white px-6 py-2 rounded-md text-nowrap'
						onClick={addAllToCart}
					>
						Add All
					</button>
				</div>
			</div>

			<div className='space-y-4'>
				{courses.map((course) => (
					<div
						key={course.id}
						className='bg-white shadow-sm border rounded-lg p-4 flex items-start gap-4'
					>
						<div className='pt-1'>
							<Checkbox
								id={`course-${course.id}`}
								checked={course.checked}
								onCheckedChange={() => toggleCourse(course.id)}
								className='h-5 w-5 border-blue-500 text-blue-500 data-[state=checked]:border-blue-500 rounded-xs data-[state=checked]:bg-blue-500'
							/>
						</div>

						<div className='size-28 relative overflow-hidden rounded-md flex-shrink-0'>
							<Image
								src={course.image || '/placeholder.svg'}
								alt={course.title}
								width={140}
								height={80}
								className='object-cover w-full h-full rounded'
							/>
						</div>

						<div className='flex-1'>
							<h3 className=' font-semibold text-gray-800 mb-1'>
								{course.title}
							</h3>
							<div className='flex items-center gap-2 mb-1'>
								{renderStars(course.rating)}
								<span className='text-gray-500 text-sm'>
									({course.reviews.toLocaleString()})
								</span>
							</div>
							<div className='flex items-center gap-2'>
								<span className='text-xl font-semibold'>
									${course.price.toFixed(2)}
								</span>
								<span className='text-gray-500 line-through'>
									${course.originalPrice.toFixed(2)}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

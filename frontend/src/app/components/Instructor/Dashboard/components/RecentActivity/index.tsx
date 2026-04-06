/** @format */

'use client';
import React from 'react';
import {ArrowBottomtSvg} from '@/app/components/svg';
import ProductCard from './ProductCard';
import product1 from '@/assets/c1.jpg'
import product2 from '@/assets/c2.jpg'
import product3 from '@/assets/c3.jpg'
import product4 from '@/assets/c4.jpg'
import Link from 'next/link';
// Sample data based on the image
const productData = [
  // First Column - Courses
  {
    id: "c1",
    type: "course",
    title: "Advanced Web Development",
    image: product1,
    progress: 75,
    status: "Published",
    students: 5678,
    revenue: 8970,
    rating: 4.8
  },
  {
    id: "c2",
    type: "course",
    title: "UX/UX Design Masterclass",
    image: product2,
    progress: 100,
    status: "Published",
    students: 5670,
    revenue: 13575,
    rating: 4.8
  },
  {
    id: "c3",
    type: "course",
    title: "Intro to UX/UX Design",
    image: product3,
    progress: 50,
    status: "Draft",
    students: 5670,
    revenue: 13575,
    rating: 4.8
  },
  
  // Second Column - Events
  {
    id: "e1",
    type: "event",
    title: "Advanced Web Development",
    image: product4,
    progress: 75,
    status: "Published",
    students: 5678,
    revenue: 8979,
    rating: 4.8
  },
  {
    id: "e2",
    type: "event",
    title: "UX/UX Design Masterclass",
    image: product1,
    progress: 100,
    status: "Published",
    students: 5670,
    revenue: 13575,
    rating: 4.8
  },
  {
    id: "e3",
    type: "event",
    title: "Intro to UX/UX Design",
    image: product2,
    progress: 50,
    status: "Draft",
    students: 5670,
    revenue: 13575,
    rating: 4.8
  },
  
  // Third Column - Community
  {
    id: "cm1",
    type: "community",
    title: "Advanced Web Development",
    image: product3,
    progress: 75,
    status: "Published",
    students: 5670,
    revenue: 13575,
    rating: 4.8
  },
  {
    id: "cm2",
    type: "community",
    title: "UX/UX Design Masterclass",
    image: product4,
    progress: 100,
    status: "Published",
    students: 5670,
    revenue: 13575,
    rating: 4.8
  },
  {
    id: "cm3",
    type: "community",
    title: "Intro to UX/UX Design",
    image: product1,
    progress: 50,
    status: "Draft",
    students: 5670,
    revenue: 13575,
    rating: 4.8
  },
];
const RecentActivity = () => {
	const courseProducts = productData.filter(product => product.type === "course");
  const eventProducts = productData.filter(product => product.type === "event");
  const communityProducts = productData.filter(product => product.type === "community");
	const [openCourse, setOpenCourse] = React.useState(true);
	const [openEvent, setOpenEvent] = React.useState(false);
	const [openCommunity, setOpenCommunity] = React.useState(false);

	return (
		<div className='bg-white rounded-[8px] overflow-hidden border border-[#e5e7eb] py-4 max-xs:p-2 xs:px-6'>
			<h2 className='text-[20px] font-semibold text-[#111827] max-xs:mb-[10px] mb-[24px]'>
				Recent Activity
			</h2>
			<div className='grid xl:grid-cols-3 xl:gap-[24px] lg:grid-cols-2 lg:gap-[16px] sm:grid-cols-2 sm:gap-[12px] max-xs:gap-3'>
				{/* Courses */}
				<div className='bg-white max-xs:rounded-2xl rounded-[8px] overflow-hidden border border-[#e5e7eb] mb-2'>
					<div className='p-4 flex items-center justify-between max-xs:border-b xs:bg-[#dbe9fe] xs:text-[#1c4ed8] '>
						<div className='flex items-center gap-3'>
							<div className='max-xs:p-2 max-xs:rounded-md flex items-center justify-center max-xs:bg-[#dbe9fe] max-xs:text-[#1c4ed8]'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									width={22}
									height={22}
								>
									<path
										fill='currentColor'
										d='M7 4.75C6.66848 4.75 6.35054 4.8817 6.11612 5.11612C5.8817 5.35054 5.75 5.66848 5.75 6V15.5505C6.13355 15.3548 6.56137 15.25 7 15.25H18.25V4.75H7ZM19.75 4C19.75 3.58579 19.4142 3.25 19 3.25H7C6.27065 3.25 5.57118 3.53973 5.05546 4.05546C4.53973 4.57118 4.25 5.27065 4.25 6V18C4.25 18.7293 4.53973 19.4288 5.05546 19.9445C5.57118 20.4603 6.27065 20.75 7 20.75H19C19.4142 20.75 19.75 20.4142 19.75 20V4ZM18.25 16.75H7C6.66848 16.75 6.35054 16.8817 6.11612 17.1161C5.8817 17.3505 5.75 17.6685 5.75 18C5.75 18.3315 5.8817 18.6495 6.11612 18.8839C6.35054 19.1183 6.66848 19.25 7 19.25H18.25V16.75ZM8.25 8C8.25 7.58579 8.58579 7.25 9 7.25H15C15.4142 7.25 15.75 7.58579 15.75 8C15.75 8.41421 15.4142 8.75 15 8.75H9C8.58579 8.75 8.25 8.41421 8.25 8Z'
										clipRule='evenodd'
										fillRule='evenodd'
									></path>
								</svg>
							</div>
							<span className='font-bold text-[16px]'>Courses</span>
						</div>
						<div
							className='w-[24px] min-xs:hidden'
							onClick={() => {
								setOpenCourse(!openCourse);
							}}
						>
							<ArrowBottomtSvg
								className={`stroke-[#000] fill-none transition-transform duration-200 ease-in-out ${
									openCourse ? '' : '-rotate-90'
								}`}
							/>
						</div>
					</div>
					<div
						className={`p-4 max-xs:overflow-x-auto max-xs:w-full ${
							openCourse ? 'max-xs:block' : 'max-xs:hidden'
						}`}
					>
						<div className='max-xs:flex max-xs:overflow-x-auto max-xs:gap-3 snap-x snap-mandatory no-scrollbar'>
						{courseProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            type={product.type as "course" | "event" | "community"}
            image={product.image}
            title={product.title}
            progress={product.progress}
            status={product.status as "Draft" | "Published"}
            students={product.students}
            revenue={product.revenue}
            rating={product.rating}
            isLast={index === courseProducts.length - 1}
          />
        ))}
						</div>
					</div>
					<Link href={'/instructor/my-products?type=course'} className='min-xs:hidden text-[#2563eb] text-sm flex items-center justify-center p-3 font-semibold cursor-pointer active:text-blue border-[#DDD] border-0 border-t-[1px] hover:bg-[#EEE] transition-colors ease-in-out duration-200'>
						View All Courses
					</Link>
				</div>
				{/* Events */}
				<div className='bg-white max-xs:rounded-2xl rounded-[8px] overflow-hidden border border-[#e5e7eb] mb-2'>
					<div className='p-4 flex items-center justify-between max-xs:border-b xs:bg-[#fee2e1] xs:text-[#991b1b]'>
						<div className='flex items-center gap-3'>
							<div className='xs:w-6 xs:h-6 max-xs:p-2 flex max-xs:rounded-md max-xs:bg-[#fee2e1] max-xs:text-[#991b1b] items-center justify-center'>
								<svg fill='none' viewBox='0 0 24 24' width={22} height={22}>
									<path
										fill='currentColor'
										d='M5 6.75C4.66848 6.75 4.35054 6.8817 4.11612 7.11612C3.8817 7.35054 3.75 7.66848 3.75 8V16C3.75 16.3315 3.8817 16.6495 4.11612 16.8839C4.35054 17.1183 4.66848 17.25 5 17.25H13C13.3315 17.25 13.6495 17.1183 13.8839 16.8839C14.1183 16.6495 14.25 16.3315 14.25 16V8C14.25 7.66848 14.1183 7.35054 13.8839 7.11612C13.6495 6.8817 13.3315 6.75 13 6.75H5ZM15.75 8.78622V8C15.75 7.27065 15.4603 6.57118 14.9445 6.05546C14.4288 5.53973 13.7293 5.25 13 5.25H5C4.27065 5.25 3.57118 5.53973 3.05546 6.05546C2.53973 6.57118 2.25 7.27065 2.25 8V16C2.25 16.7293 2.53973 17.4288 3.05546 17.9445C3.57118 18.4603 4.27065 18.75 5 18.75H13C13.7293 18.75 14.4288 18.4603 14.9445 17.9445C15.4603 17.4288 15.75 16.7293 15.75 16V15.213L19.2176 16.9465C19.4844 17.0798 19.7809 17.1427 20.0787 17.1293C20.3766 17.1159 20.6661 17.0266 20.9198 16.8699C21.1735 16.7131 21.3829 16.4942 21.5282 16.2338C21.6735 15.9734 21.7498 15.6802 21.75 15.382V8.61763C21.7498 8.31945 21.6735 8.02585 21.5282 7.76546C21.3829 7.50506 21.1735 7.28612 20.9198 7.12939C20.6661 6.97266 20.3766 6.88335 20.0787 6.86994C19.7809 6.85652 19.4845 6.91944 19.2177 7.05273L15.75 8.78622ZM15.75 10.4632V13.5361L19.8883 15.6047C19.8882 15.6047 19.8883 15.6047 19.8883 15.6047C19.9263 15.6237 19.9687 15.6328 20.0112 15.6308C20.0538 15.6289 20.0952 15.6162 20.1314 15.5938C20.1676 15.5714 20.1976 15.5401 20.2183 15.5029C20.2391 15.4657 20.25 15.4238 20.25 15.3812V8.61803C20.25 8.57543 20.2391 8.53354 20.2183 8.49635C20.1976 8.45915 20.1676 8.42787 20.1314 8.40548C20.0952 8.38309 20.0538 8.37033 20.0112 8.36842C19.9687 8.3665 19.9264 8.37547 19.8884 8.39448C19.8883 8.3945 19.8884 8.39446 19.8884 8.39448L15.75 10.4632Z'
										clipRule='evenodd'
										fillRule='evenodd'
									></path>
								</svg>
							</div>
							<span className='font-bold text-[16px]'>Events</span>
						</div>
						<div
							className='w-[24px] min-xs:hidden'
							onClick={() => {
								setOpenEvent(!openEvent);
							}}
						>
							<ArrowBottomtSvg
								className={`stroke-[#000] fill-none transition-transform duration-200 ease-in-out ${
									openEvent ? '' : '-rotate-90'
								}`}
							/>
						</div>
					</div>
					<div
						className={`p-4 max-xs:overflow-x-auto max-xs:w-full ${
							openEvent ? 'max-xs:block' : 'max-xs:hidden'
						}`}
					>
						<div className='max-xs:flex max-xs:overflow-x-auto max-xs:gap-3 snap-x snap-mandatory no-scrollbar'>
						{eventProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            type={product.type as "course" | "event" | "community"}
            image={product.image}
            title={product.title}
            progress={product.progress}
            status={product.status as "Draft" | "Published"}
            students={product.students}
            revenue={product.revenue}
            rating={product.rating}
            isLast={index === eventProducts.length - 1}
          />
        ))}
						</div>
					</div>
					<Link href={'/instructor/my-products?type=event'} className='min-xs:hidden text-[#2563eb] text-sm flex items-center justify-center p-3 font-semibold cursor-pointer active:text-blue border-[#DDD] border-0 border-t-[1px] hover:bg-[#EEE] transition-colors ease-in-out duration-200'>
						View All Events
					</Link>
				</div>
				{/* Communities */}
				<div className='bg-white max-xs:rounded-2xl rounded-[8px] overflow-hidden border border-[#e5e7eb] mb-2'>
					<div className='p-4 flex items-center justify-between max-xs:border-b xs:bg-[#fff3c6] xs:text-[#db7303]'>
						<div className='flex items-center gap-3'>
							<div className='xs:w-6 xs:h-6 max-xs:p-2 flex max-xs:rounded-md max-xs:bg-[#fff3c6] max-xs:text-[#db7303] items-center justify-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 20 20'
                  width={22}
                  height={22}
								>
									<path
										fill='currentColor'
										d='M9.16659 3.25C9.14448 3.25 9.12329 3.25878 9.10766 3.27441C9.09203 3.29004 9.08325 3.31123 9.08325 3.33333V8.33333C9.08325 8.35543 9.09203 8.37663 9.10766 8.39226C9.12329 8.40789 9.14448 8.41667 9.16659 8.41667H14.9999C15.1988 8.41667 15.3896 8.49569 15.5302 8.63634L16.7499 9.85601V3.33333C16.7499 3.31123 16.7411 3.29003 16.7255 3.27441C16.7099 3.25878 16.6887 3.25 16.6666 3.25H9.16659ZM8.047 2.21375C8.34393 1.91682 8.74666 1.75 9.16659 1.75H16.6666C17.0865 1.75 17.4892 1.91681 17.7862 2.21375C18.0831 2.51068 18.2499 2.91341 18.2499 3.33333V11.6667C18.2499 11.97 18.0672 12.2435 17.7869 12.3596C17.5067 12.4757 17.1841 12.4115 16.9696 12.197L14.6893 9.91667H9.16659C8.74666 9.91667 8.34393 9.74985 8.047 9.45292C7.75007 9.15599 7.58325 8.75326 7.58325 8.33333V3.33333C7.58325 2.91341 7.75007 2.51068 8.047 2.21375Z'
										clipRule='evenodd'
										fillRule='evenodd'
									></path>
									<path
										fill='currentColor'
										d='M3.33333 9.08333C3.31123 9.08333 3.29004 9.09211 3.27441 9.10774C3.25878 9.12336 3.25 9.14456 3.25 9.16666V15.6893L4.46967 14.4697C4.61032 14.329 4.80109 14.25 5 14.25H10.8333C10.8554 14.25 10.8766 14.2412 10.8923 14.2256C10.9079 14.21 10.9167 14.1888 10.9167 14.1667V12.5C10.9167 12.0858 11.2525 11.75 11.6667 11.75C12.0809 11.75 12.4167 12.0858 12.4167 12.5V14.1667C12.4167 14.5866 12.2499 14.9893 11.9529 15.2862C11.656 15.5832 11.2533 15.75 10.8333 15.75H5.31066L3.03033 18.0303C2.81583 18.2448 2.49324 18.309 2.21299 18.1929C1.93273 18.0768 1.75 17.8033 1.75 17.5V9.16666C1.75 8.74674 1.91682 8.34401 2.21375 8.04708C2.51068 7.75014 2.91341 7.58333 3.33333 7.58333H5C5.41421 7.58333 5.75 7.91911 5.75 8.33333C5.75 8.74754 5.41421 9.08333 5 9.08333H3.33333Z'
										clipRule='evenodd'
										fillRule='evenodd'
									></path>
								</svg>
							</div>
							<span className='font-bold text-[16px]'>Communities</span>
						</div>
						<div
							className='w-[24px] min-xs:hidden'
							onClick={() => {
								setOpenCommunity(!openCommunity);
							}}
						>
							<ArrowBottomtSvg
								className={`stroke-[#000] fill-none transition-transform duration-200 ease-in-out ${
									openCommunity ? '' : '-rotate-90'
								}`}
							/>
						</div>
					</div>
					<div
						className={`p-4 max-xs:overflow-x-auto max-xs:w-full ${
							openCommunity ? 'max-xs:block' : 'max-xs:hidden'
						}`}
					>
						<div className='max-xs:flex max-xs:overflow-x-auto max-xs:gap-3 snap-x snap-mandatory no-scrollbar'>
						{communityProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            type={product.type as "course" | "event" | "community"}
            image={product.image}
            title={product.title}
            progress={product.progress}
            status={product.status as "Draft" | "Published"}
            students={product.students}
            revenue={product.revenue}
            rating={product.rating}
            isLast={index === communityProducts.length - 1}
          />
        ))}
						</div>
					</div>
					<Link href={'/instructor/my-products?type=community'} className='min-xs:hidden text-[#2563eb] text-sm flex items-center justify-center p-3 font-semibold cursor-pointer active:text-blue border-[#DDD] border-0 border-t-[1px] hover:bg-[#EEE] transition-colors ease-in-out duration-200'>
						View All Communities
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RecentActivity;

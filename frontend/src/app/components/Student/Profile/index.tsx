/** @format */
'use client'
import Image, {StaticImageData} from 'next/image';
import Link from 'next/link';
import {
	Star,
	Bookmark,
	Users,
	Globe,
	Linkedin,
	ChevronDown,
	ThumbsUp,
	MoreHorizontal,
	ThumbsDown,
	Book,
	Video,
	BarChart2,
	BookOpen,
} from 'lucide-react';

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/app/components/ui/tabs';
import {Button} from '@/app/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/app/components/ui/tooltip';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/app/components/ui/hover-card';

import img1 from '@/assets/c3.jpg';
import img2 from '@/assets/c4.jpg';
import img3 from '@/assets/c2.jpg';
import img4 from '@/assets/c1.jpg';
import avatar from '@/assets/avatar/AVATAR-1.png';
import {BundleSvg, CalenderSvg1, CommunitySvg, CommunitySvg1, CourseSvg, FacebookSvg, SessionSvg1, StarSvg, StudentIcon, TopInstructorSvg, TwitterSvg, UserSVG, VideoSvg} from '../../svg';
import { SessionsCard } from './components/SessionCard';
import { CommunityCard } from './components/CommunityCard';
import { BundleCard } from './components/BundleCard';
import { useState } from 'react';
import { FollowersPopup } from './components/FollowCard';
import AuthorCard from './components/AuthorCard';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileCourseCard from './components/MobileViewCard';

export default function StudentProfile() {
		const [openFollowingPopup,setOpenFollowingPopup] = useState(false);
	
	const handleFollowingPopup = () => {
		setOpenFollowingPopup(true)
		document.body.style.overflow = 'hidden';
	}
	return (
		<div className='min-h-screen pb-20'>
			<div className='container mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{/* Main Content */}
					<div className='md:col-span-2 space-y-6'>
						<div className='bg-white rounded-lg border pb-6 shadow-sm overflow-hidden'>
							{/* Profile Header */}
							<div className='p-6 flex flex-col max-xs:items-center md:flex-row gap-6'>
								<div className='flex-shrink-0'>
									<Image
										src='https://i.ibb.co/N5kLzSd/AVATAR-couponcodefinder.jpg'
										alt='James Ritchie'
										width={160}
										height={160}
										className='rounded-xl object-cover'
									/>
								</div>
								<div className='space-y-4 flex-1'>
									<div>
										<h1 className='text-2xl max-xs:text-center font-bold text-gray-900'>
											James Ritchie
										</h1>
										<div className='hidden xs:flex flex-wrap items-center gap-2 text-sm text-gray-600 mt-1'>
											<span>Inorganic Chemistry Expert</span>
											<span className='text-gray-300'>◇</span>
											<span>Learner</span>
											<span className='text-gray-300'>◇</span>
											<span>Always learning new things</span>
										</div>
										<div className='flex xs:hidden  flex-col items-center gap-2 text-sm text-gray-600 mt-1'>
											<div>
												<span className='text-gray-300 mr-1'>◇</span>
												<span>Inorganic Chemistry Expert</span>
											</div>

											<div>
												<span className='text-gray-300 mr-1'>◇</span>
												<span>Always learning new things</span>
											</div>
											<div>
												<span className='text-gray-300 mr-1'>◇</span>
												<span>Lorem ipsum dolor sit amet.</span>
											</div>
										</div>
									</div>

									<div className='flex max-xs:bg-accent max-xs:p-4 max-xs:rounded-md items-center gap-8 mt-6'>
										<div>
											<p className='text-xs  text-nowrap text-gray-500 uppercase font-semibold'>
												Watch mins
											</p>
											<p className='text-xl font-semibold max-xs:text-center'>
												196M
											</p>
										</div>
										<div>
											<p className='text-xs text-nowrap text-gray-500 uppercase font-semibold'>
												Badges
											</p>
											<p className='text-xl font-semibold max-xs:text-center'>
												19
											</p>
										</div>
										<div>
											<p className='text-xs text-nowrap text-gray-500 uppercase font-semibold'>
												Certificates
											</p>
											<p className='text-xl font-semibold max-xs:text-center'>
												12
											</p>
										</div>
										<div className='hidden xs:block'>
											<p className=' text-xs text-nowrap text-gray-500 uppercase font-semibold'>
												Contributions
											</p>
											<p className='text-xl font-semibold max-xs:text-center'>
												322
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Tabs */}
							<Tabs defaultValue='courses' className='overflow-hidden xs:px-6'>
								<div className='border-b '>
									<TabsList className='overflow-x-auto no-scrollbar h-auto p-0 bg-transparent border-b w-full justify-between'>
										<TabsTrigger
											value='courses'
											className=' data-[state=active]:border-b-2 fill-gray-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:fill-teal-500 data-[state=active]:border-teal-500 data-[state=active]:text-teal-500 rounded-none px-4 py-3 text-sm font-semibold'
										>
											<CourseSvg className='size-5 mr-2' />
											Courses
										</TabsTrigger>
										<TabsTrigger
											value='sessions'
											className='data-[state=active]:border-b-2 fill-gray-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-teal-500 data-[state=active]:text-teal-500 data-[state=active]:fill-teal-500 rounded-none px-4 py-3 text-sm font-semibold'
										>
											<VideoSvg className='size-5 mr-2 ' />
											Sessions
										</TabsTrigger>
										<TabsTrigger
											value='communities'
											className='data-[state=active]:border-b-2 fill-gray-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:fill-teal-500 data-[state=active]:border-teal-500 data-[state=active]:text-teal-500 rounded-none px-4 py-3 text-sm font-semibold'
										>
											<CommunitySvg1 className='size-5 mr-2 ' />
											Communities
										</TabsTrigger>
										<TabsTrigger
											value='bundles'
											className='data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none fill-gray-500 data-[state=active]:fill-teal-500 data-[state=active]:border-teal-500 data-[state=active]:text-teal-500 rounded-none px-4 py-3 text-sm font-semibold'
										>
											<BundleSvg className='w-4 h-4 mr-2' />
											Bundles
										</TabsTrigger>
										<TabsTrigger
											value='bookmarks'
											className='data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:fill-teal-500 data-[state=active]:border-teal-500 data-[state=active]:text-teal-500 rounded-none px-4 py-3 text-sm font-semibold'
										>
											<Bookmark className='w-4 h-4 mr-2' />
											Bookmarks
										</TabsTrigger>
										<TabsTrigger
											value='reviews'
											className='data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:fill-teal-500 data-[state=active]:border-teal-500 data-[state=active]:text-teal-500 rounded-none px-4 py-3 text-sm font-semibold'
										>
											<Star className='w-4 h-4 mr-2' />
											Reviews
										</TabsTrigger>
									</TabsList>
								</div>

								<TabsContent value='courses' className='mt-6 max-xs:px-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
										{courses.map((course, index) => (
											<CourseCard key={index} course={course} />
										))}
									</div>

									<Button variant='outline' className='w-full mt-6 max-xs:px-4'>
										Show More
										<ChevronDown className='ml-2 h-4 w-4' />
									</Button>
								</TabsContent>

								<TabsContent value='bookmarks' className='mt-6 max-xs:px-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
										{bookmarks.map((bookmark, index) => (
											<BookmarkCard key={index} bookmark={bookmark} />
										))}
									</div>
								</TabsContent>

								<TabsContent value='reviews' className='mt-6 max-xs:px-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
										{reviews.map((review, index) => (
											<ReviewCard key={index} review={review} />
										))}
									</div>
								</TabsContent>

								<TabsContent value='sessions' className='mt-6 max-xs:px-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
										{sessions.map((course, index) => (
											<SessionsCard key={index} course={course} />
										))}
									</div>

									<Button variant='outline' className='w-full mt-6 max-xs:px-4'>
										Show More
										<ChevronDown className='ml-2 h-4 w-4' />
									</Button>
								</TabsContent>

								<TabsContent value='communities' className='mt-6 max-xs:px-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
										{community.map((course, index) => (
											<CommunityCard key={index} course={course} />
										))}
									</div>

									<Button variant='outline' className='w-full mt-6 max-xs:px-4'>
										Show More
										<ChevronDown className='ml-2 h-4 w-4' />
									</Button>
								</TabsContent>

								<TabsContent value='bundles' className='mt-6 max-xs:px-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
										{community.map((course, index) => (
											<BundleCard key={index} course={course} />
										))}
									</div>

									<Button variant='outline' className='w-full mt-6 max-xs:px-4'>
										Show More
										<ChevronDown className='ml-2 h-4 w-4' />
									</Button>
								</TabsContent>
							</Tabs>
						</div>
					</div>

					{/* Sidebar */}
					<div className='xs:border h-fit xs:rounded-lg xs:shadow-sm max-xs:space-y-6'>
						{/* Enrolled Content */}
						<div className='bg-white max-xs:rounded-md max-xs:border xs:rounded-t-lg  xs:border-b overflow-hidden'>
							<div className='p-6'>
								<h2 className='text-lg font-semibold mb-4'>Enrolled Content</h2>
								<div className='space-y-4'>
									<div className='flex items-center gap-3'>
										<CourseSvg className='w-5 h-5 fill-gray-500' />
										<span className='text-sm'>25 Courses</span>
									</div>
									<div className='flex items-center gap-3'>
										<VideoSvg className='w-5 h-5 fill-gray-500' />
										<span className='text-sm'>9 Sessions</span>
									</div>
									<div className='flex items-center gap-3'>
										<CommunitySvg className='w-5 h-5 fill-gray-500' />
										<span className='text-sm'>5 Communities</span>
									</div>
								</div>
							</div>
						</div>

						{/* Badges */}
						<div className='bg-white max-xs:rounded-md max-xs:border  xs:border-b overflow-hidden'>
							<div className='p-6'>
								<h2 className='text-lg font-semibold mb-4'>Badges</h2>
								<div className='flex gap-2'>
									<div className='h-10 w-10  flex items-center justify-center'>
										<TopInstructorSvg />
									</div>
								</div>
							</div>
						</div>

						{/* Social & Links */}
						<div className='bg-white max-xs:rounded-md max-xs:border  xs:border-b overflow-hidden'>
							<div className='p-6'>
								<h2 className='text-lg font-semibold mb-4'>Social & Links</h2>
								<div className='flex gap-4'>
									<Link
										href='#'
										className='p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors'
									>
										<Globe className='w-5 h-5 text-gray-600' />
									</Link>
									<Link
										href='#'
										className='p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors'
									>
										<TwitterSvg className='w-5 h-5 text-gray-600' />
									</Link>
									<Link
										href='#'
										className='p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors'
									>
										<FacebookSvg className='w-5 h-5 text-gray-600' />
									</Link>
									<Link
										href='#'
										className='p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors'
									>
										<Linkedin className='w-5 h-5 text-gray-600' />
									</Link>
								</div>
							</div>
						</div>

							{/* Following */}
							<div className='bg-white max-xs:rounded-md max-xs:border  xs:border-b overflow-hidden'>
							<div className='p-6'>
								<div className='flex items-center mb-4'>
									<h2 className='text-lg font-semibold'>Following</h2>
									<span className='ml-2 px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full'>
										98
									</span>
								</div>
								<div className='flex flex-wrap gap-2 mb-3'>
									{Array.from({length: 7}).map((_, i) => (
										<HoverCard key={i}>
											<HoverCardTrigger>
												<div className='w-8 h-8 rounded-full bg-gray-200 overflow-hidden'>
													<Image
														src={avatar}
														alt='Follower'
														width={32}
														height={32}
														className='object-cover'
													/>
												</div>
											</HoverCardTrigger>
											<HoverCardContent className='min-w-sm'>
												<AuthorCard {...authorCard} />
											</HoverCardContent>
										</HoverCard>
									))}
								</div>
								<button
									onClick={handleFollowingPopup}
									className='text-xs text-blue-600 underline'
								>
									+93 following
								</button>

								{openFollowingPopup && (
									<FollowersPopup
										isOpen={openFollowingPopup}
										setIsOpen={setOpenFollowingPopup}
										followers={followers}
										heading='All Following'
										cardType='Following'
									/>
								)}
							</div>
						</div>


						{/* About */}
						<div className='bg-white max-xs:rounded-md max-xs:border xs:rounded-b-lg xs:border-b overflow-hidden'>
							<div className='p-6'>
								<h2 className='text-lg font-semibold mb-4'>About</h2>
								<p className='text-sm text-gray-600 mb-4'>
									Chemistry student with over 15 years of experience.
									Specializing in inorganic chemistry and molecular structures.
									Passionate about making complex concepts accessible to
									students of all levels.
								</p>
								<button className='w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-sm font-semibold rounded-md transition-colors'>
									SHOW MORE
									<ChevronDown className='h-4 w-4' />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Course Card Component
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

function CourseCard({course}: {course: Course}) {
	const isMobile = useIsMobile();

	if(isMobile){
		return <MobileCourseCard course={course} />
	}else{
		return (
			<div className='bg-white border rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-4px] group'>
				<div className='relative'>
					<Image
						src={course.image || '/placeholder.svg'}
						alt={course.title}
						width={300}
						height={160}
						className='w-full h-40 object-cover'
					/>
					<button className='absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm hover:shadow'>
						<Bookmark className='w-4 h-4 text-teal-500 stroke-3' />
					</button>
				</div>
				<div className='p-4'>
					<h3 className='font-semibold text-gray-700 mb-2 line-clamp-2 h-12'>
						{course.title}
					</h3>
	
					<TooltipProvider>
						<div className='flex items-center gap-3 mb-2'>
							<Tooltip>
								<TooltipTrigger className='flex items-center gap-1'>
									<StudentIcon className='w-4 h-4 text-gray-900' />
									<span className='text-sm font-semibold text-gray-700'>
										{course.students}
									</span>
								</TooltipTrigger>
								<TooltipContent
									align='start'
									alignOffset={-15}
									showArrow={false}
									className='bg-black rounded-sm'
								>
									<p className='font-semibold'>{`${course.students} students`}</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger className='flex items-center gap-1'>
									<div className='flex'>
										<Star className='w-4 h-4 fill-teal-500 text-teal-500' />
									</div>
									<span className='text-sm font-semibold text-gray-700'>
										{course.rating} ({course.reviews})
									</span>
								</TooltipTrigger>
								<TooltipContent showArrow={false} className='bg-black rounded-sm'>
									<p className='font-semibold'>{`${course.rating} rating, ${course.reviews} reviews`}</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</TooltipProvider>
	
					<div className='flex items-center text-xs text-gray-500 mb-3'>
						<span>{course.duration}</span>
						<span className='mx-1.5 w-1 h-1 bg-gray-300 rounded-full'></span>
						<span>{course.lectures} lectures</span>
						<span className='mx-1.5 w-1 h-1 bg-gray-300 rounded-full'></span>
						<span>All Levels</span>
					</div>
	
					<div className='flex items-center gap-2 mb-3'>
						<span className='text-lg font-semibold'>${course.price}</span>
						<span className='text-sm text-gray-500 line-through'>
							${course.originalPrice}
						</span>
					</div>
	
					<Button className='w-full bg-teal-500 hover:bg-teal-600'>
						View Course
					</Button>
				</div>
			</div>
		)
	}
	
}

// function BookmarkCard({bookmark}: {bookmark: Bookmark}) {
// 	return (
// 		<div className='bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
// 			<div className='p-3 flex items-center justify-between bg-gray-50'>
// 				<div className='flex items-center'>
// 					{bookmark.type === 'Course' ? (
// 						<Badge color='success'>
// 							<FileIcon className='h-3.5 w-3.5' />
// 							Course
// 						</Badge>
// 					) : (
// 						<Badge color='error'>
// 							<Calendar className='h-3.5 w-3.5' />
// 							Event
// 						</Badge>
// 					)}
// 				</div>
// 				<button className='text-gray-500 hover:text-gray-700'>
// 					<MoreHorizontal className='h-5 w-5' />
// 				</button>
// 			</div>
// 			<div className='relative'>
// 				<Image
// 					src={bookmark.image || '/placeholder.svg'}
// 					alt={bookmark.title}
// 					width={400}
// 					height={225}
// 					className='w-full h-44 object-cover'
// 				/>
// 				{bookmark.badge && (
// 					<div className='absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded'>
// 						{bookmark.badge}
// 					</div>
// 				)}
// 			</div>
// 			<div className='p-4'>
// 				<h3 className='font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[3rem]'>
// 					{bookmark.title}
// 				</h3>
// 				<div className='text-sm text-gray-600 mb-2'>{bookmark.instructor}</div>
// 				<div className='text-xs text-gray-500 mb-4 line-clamp-2'>
// 					{bookmark.description}
// 				</div>

// 				<TooltipProvider>
// 					<div className='flex items-center gap-4 mb-3 border-b pb-3'>
// 						<Tooltip>
// 							<TooltipTrigger asChild>
// 								<div className='flex items-center gap-1.5'>
// 									<Users className='w-4 h-4 text-gray-500' />
// 									<span className='text-sm font-semibold'>
// 										{bookmark.students}
// 									</span>
// 								</div>
// 							</TooltipTrigger>
// 							<TooltipContent>
// 								<p className='text-xs'>{bookmark.students} students</p>
// 							</TooltipContent>
// 						</Tooltip>

// 						<Tooltip>
// 							<TooltipTrigger asChild>
// 								<div className='flex items-center gap-1.5'>
// 									<Clock className='w-4 h-4 text-gray-500' />
// 									<span className='text-sm font-semibold'>
// 										{bookmark.duration}
// 									</span>
// 								</div>
// 							</TooltipTrigger>
// 							<TooltipContent>
// 								<p className='text-xs'>{bookmark.duration} total hours</p>
// 							</TooltipContent>
// 						</Tooltip>

// 						<Tooltip>
// 							<TooltipTrigger asChild>
// 								<div className='flex items-center gap-1.5'>
// 									<FileText className='w-4 h-4 text-gray-500' />
// 									<span className='text-sm font-semibold'>
// 										{bookmark.lessons}
// 									</span>
// 								</div>
// 							</TooltipTrigger>
// 							<TooltipContent>
// 								<p className='text-xs'>{bookmark.lessons} lessons</p>
// 							</TooltipContent>
// 						</Tooltip>
// 					</div>
// 				</TooltipProvider>

// 				<div className='flex items-center justify-between mb-3'>
// 					<div className='flex items-center gap-2'>
// 						<span className='text-lg font-semibold text-teal-600'>
// 							${bookmark.price}
// 						</span>
// 						<span className='text-sm text-gray-500 line-through'>
// 							${bookmark.originalPrice}
// 						</span>
// 					</div>
// 				</div>

// 				<div className='flex items-center justify-between'>
// 					<div className='flex items-center gap-2'>
// 						<div className='flex'>
// 							{Array.from({length: 5}).map((_, i) => (
// 								<Star
// 									key={i}
// 									className={`w-4 h-4 ${
// 										i < Math.floor(bookmark.rating)
// 											? 'fill-teal-500 text-teal-500'
// 											: 'text-gray-300'
// 									}`}
// 								/>
// 							))}
// 						</div>
// 						<span className='text-sm text-gray-600'>
// 							{bookmark.rating} ({bookmark.reviewCount})
// 						</span>
// 					</div>
// 					<div className='flex items-center gap-1 text-sm text-gray-600'>
// 						<User className='w-3.5 h-3.5' />
// 						<span>Beginner</span>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
function BookmarkCard({bookmark}: {bookmark: Bookmark}) {
	// const [isOpen, setIsOpen] = useState(false);
	// const [rating, setRating] = useState(0);
	// const [hover, setHover] = useState(0);
	// const [reason, setReason] = useState('');
	// const [comments, setComments] = useState('');
	// const [showOptions, setShowOptions] = useState(false);
	// const [isOpenBundleTooltip, setIsOpenBundleTooltip] = useState(false);
	// const isMobile = useIsMobile();

	return (
		<div className='bg-white rounded-xl shadow-md border border-gray-200 flex flex-col transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg relative'>
			<div className='p-3 flex justify-between rounded-t-xl items-center bg-gray-50 border-b border-gray-200'>
				<div
					className={`flex  items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${
						bookmark.type === 'course'
							? 'bg-blue-100 text-blue-700'
							: 'bg-red-100 text-red-700'
					}`}
				>
					{bookmark.type === 'course' ? (
						<Book className='size-3.5 xs:size-4' />
					) : (
						<Video className='size-3.5 xs:size-4' />
					)}
					<span className='capitalize'>{bookmark.type}</span>
				</div>
				<Button
					variant={'outline'}
					size={'sm'}
					className='text-gray-600 border-none bg-accent  cursor-pointer'
					// onClick={() => setShowOptions(!showOptions)}
				>
					<MoreHorizontal className='w-5 h-5' />
				</Button>
			</div>

			<div className='flex max-xs:p-4 max-sm:gap-4 xs:block '>
				<div className='relative w-[120] h-[80px] xs:w-full xs:h-[180px]'>
					<Image
						src={bookmark.image || '/placeholder.svg'}
						alt={bookmark.title}
						fill
						className='xs:object-cover max-xs:w-[120px] max-xs:h-[80px] max-xs:rounded-md'
					/>
				</div>

				<div className='xs:p-4 max-xs:w-3/5 xs:flex-grow flex flex-col max-xs:gap-2'>
					<h3 className='text-base font-semibold text-gray-900 xs:mb-2 line-clamp-2 xs:h-11'>
						{bookmark.title}
					</h3>
					<div className='text-sm text-gray-500 italic xs:mb-3 h-5'>
						{bookmark.author}
					</div>
					<p className='hidden xs:block text-sm text-gray-600 xs:mb-4 line-clamp-2 h-[42px]'>
						{bookmark.description}
					</p>

					<div className='flex flex-col xs:flex-col-reverse '>
						<div className='flex items-baseline gap-2 xs:-mt-5'>
							<span className='xs:text-xl font-semibold text-teal-500'>
								{bookmark.currentPrice}
							</span>
							<span className='text-sm text-gray-500 line-through font-semibold'>
								{bookmark.originalPrice}
							</span>
						</div>

						<div
							className={`flex  items-center max-xs:flex-wrap gap-3 xs:gap-6 ${
								bookmark.type === 'course' ? 'xs:mb-8' : 'xs:mb-4'
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
								{bookmark.students}
								<span className='absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10'>
									{bookmark.students} students enrolled
									<div className='absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45' />
								</span>
							</div>

							{/* second */}
							<div className='flex items-center gap-1.5 text-xs text-gray-600 font-semibold relative group'>
								{bookmark.type === 'event' ? (
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

								{bookmark.duration}
								<span className='absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10'>
									{bookmark.type === 'event'
										? `${bookmark.duration} Resources`
										: `${bookmark.duration} total duration`}
									<div className='absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45' />
								</span>
							</div>

							{/* third */}
							<div className='flex items-center gap-1 text-xs text-gray-600 font-semibold relative group'>
								{/* Icon based on course type */}
								<div className='flex items-center'>
									{bookmark.type === 'event' ? (
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

									{bookmark.units}
								</div>

								{/* Tooltip */}
								<span className='absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10'>
									{bookmark.type === 'event'
										? '1..1 session'
										: `${bookmark.units} learning units`}
									<div className='absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45' />
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='relative w-full h-0.5 xs:h-1 bg-gray-200 group rounded'>
				{/* Progress Bar */}
				<div
					className='absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded'
					style={{width: `${bookmark.progress}%`}}
				/>

				{/* Tooltip */}
				<div
					className='absolute -top-10 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10'
					style={{left: `${bookmark.progress}%`}}
				>
					{bookmark.progress}% Complete
					{/* Tooltip Arrow */}
					<div className='absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45' />
				</div>
			</div>

			<div className='p-3 xs:p-4 bg-gray-50 rounded-b-2xl flex items-center justify-between'>
				<div className='flex items-center justify-between'>
					{/* First Icon */}
					<div className='size-6 rounded-full bg-white flex items-center justify-center border-2 border-teal-500 z-0  transition-transform duration-200 hover:scale-110'>
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
						// onClick={() => setIsOpenBundleTooltip(true)}
						className='size-6 rounded-full bg-white flex items-center justify-center border-2 border-teal-500 -ml-1 z-0  transition-transform duration-200 hover:scale-110'
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

					{/* {isMobile && (
						<BundleTooltipDrawer
							isOpen={isOpenBundleTooltip}
							setIsOpen={setIsOpenBundleTooltip}
						/>
					)} */}
				</div>

				<div className='flex items-center '>
					<BarChart2 className='w-4 h-4 text-gray-600' />
					<span className='text-xs font-semibold text-gray-700'>
						{bookmark.level}
					</span>
				</div>

				<div className='flex items-center gap-1'>
					<Star
						className='size-3 fill-current text-blue-400'
						// onClick={() => setIsOpen(true)}
					/>
					<span className='text-xs font-semibold text-gray-900'>
						{bookmark.rating}
					</span>
					<span className='text-xs text-gray-500'>({bookmark.reviews})</span>
				</div>
			</div>
		</div>
	);
}

// Review Card Component
interface Review {
	name: string;
	avatar: string | StaticImageData;
	rating: number;
	date: string;
	title: string;
	content: string;
	courseTitle: string;
	courseImage: string | StaticImageData;
	courseRating: number;
	courseRatingCount: string;
	helpfulCount: string;
}

function ReviewCard({review}: {review: Review}) {
	return (
		<div className='border rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]'>
			<div className='flex items-center gap-3 pb-4 border-b'>
				<Image
					src={review.avatar || '/placeholder.svg?height=48&width=48'}
					alt={review.name}
					width={48}
					height={48}
					className='rounded-full'
				/>
				<div>
					<h3 className='font-semibold text-sm mb-1'>{review.name}</h3>
					<div className='flex items-center gap-2'>
						<div className='flex items-center gap-2'>
							<Star className={`size-3 fill-teal-500 text-teal-500`} />
							<span className='text-xs font-semibold'>{review.courseRating}</span>
						</div>
						<span className='text-xs text-gray-500'>{review.date}</span>
					</div>
				</div>
			</div>

			<h4 className='font-semibold text-sm my-4'>{review.title}</h4>
			<p className='text-xs text-gray-600 mb-6 line-clamp-5'>
				{review.content}
			</p>

			<div className='flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-md'>
				<Image
					src={
						review.courseImage ||
						'/placeholder.svg?height=60&width=60&text=Chemistry'
					}
					alt={review.courseTitle}
					width={60}
					height={60}
					className='rounded-md object-cover'
				/>
				<div className='overflow-hidden'>
					<h5 className='text-xs font-semibold truncate '>
						{review.courseTitle}
					</h5>
					<div className='flex items-center gap-1 mt-1'>
						<div className='flex'>
							{Array.from({length: 5}).map((_, i) => (
								<Star
									key={i}
									className={`size-2 ${
										i < Math.floor(review.courseRating)
											? 'fill-teal-500 text-teal-500'
											: 'text-gray-300 fill-gray-300'
									}`}
								/>
							))}
						</div>
						<span className='text-xs text-gray-500'>
							({review.courseRatingCount})
						</span>
					</div>
				</div>
			</div>

			<div className='flex justify-between items-center'>
				<button className='flex items-center gap-1 text-xs font-semibold  text-gray-600 hover:text-teal-500'>
					<ThumbsUp className='w-4 h-4 ' />
					Helpful ({review.helpfulCount})
				</button>
				<button className='flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-teal-500'>
					<ThumbsDown className='w-4 h-4' />
					Report
				</button>
			</div>
		</div>
	);
}

// Sample Data
const courses = [
	{
		title: 'Advanced Inorganic Chemistry Graduate',
		image: img1,
		students: '42.5K',
		rating: 4.9,
		reviews: '1.2K',
		duration: '27.5 hr',
		lectures: 399,
		price: '79.99',
		originalPrice: '199.99',
	},
	{
		title: 'Chemical Bonding & Molecular Structure',
		image: img3,
		students: '35.8K',
		rating: 4.8,
		reviews: '985',
		duration: '32.5 hr',
		lectures: 425,
		price: '69.99',
		originalPrice: '169.99',
	},
	{
		title: 'Periodic Table & Chemical Properties',
		image: img2,
		students: '28.3K',
		rating: 4.9,
		reviews: '1.5K',
		duration: '29.5 hr',
		lectures: 380,
		price: '89.99',
		originalPrice: '189.99',
	},
];

type Bookmark = {
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
const bookmarks: Bookmark[] = [
	{
		id: 1,
		title: 'Advanced UI/UX Design Masterclass: From Concept to Implementation',
		author: 'Sarah Johnson',
		description:
			'Master the complete UI/UX design workflow from research to final implementation with real-world projects.',
		image: img4,
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
		duration: '24',
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
];
const reviews = [
	{
		name: 'Alex Thompson',
		avatar: avatar,
		rating: 5,
		date: 'June 22, 2023',
		title: 'Excellent Course Material & Delivery',
		content:
			"The course exceeded my expectations. The instructor's approach to explaining complex concepts was clear and effective. Really helped Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, voluptates. Dolor possimus aliquid deleniti at consectetur in qui! Voluptas quaerat molestias dignissimos vitae quisquam eaque corrupti doloremque ab, debitis eum. me...",
		courseTitle: 'Advanced Inorganic Chemistry',
		courseImage: img1,
		courseRating: 4.7,
		courseRatingCount: '4.7',
		helpfulCount: '24',
	},
	{
		name: 'Alex Thompson',
		avatar: avatar,
		rating: 4,
		date: 'June 15, 2023',
		title: 'Comprehensive Coverage of Topics',
		content:
			'The depth of content is impressive. Every concept is explained thoroughly with practical examples. The assignments really helped reinforce the learning.',
		courseTitle: 'Chemical Bonding & Molecular',
		courseImage: img3,
		courseRating: 4.5,
		courseRatingCount: '4.5',
		helpfulCount: '18',
	},
	{
		name: 'Alex Thompson',
		avatar: avatar,
		rating: 5,
		date: 'June 8, 2023',
		title: 'Perfect for Super Advanced Learning',
		content:
			'The course structure is well thought out. Progressive difficulty helps build strong foundations before moving to complex topics. Great resource for serious learners.',
		courseTitle: 'Periodic Table & Chemical',
		courseImage: img2,
		courseRating: 4.2,
		courseRatingCount: '4.2',
		helpfulCount: '31',
	},
];


const sessions = [
	{
		title: 'Advanced Machine Learning Workshop',
		img: img1,
		instructorimg: img1,
		instructor: 'Dr. Sarah Connor',
		content:
			'Deep dive into advanced ML algorithms, neural networks, and practical applications. Learn to...',
		rating: '4.8',
		reviews: '2.3k',
		students: '28k',
		duration: '1on1',
		icon: {
			studentSvg: <UserSVG />,
			starSvg: <StarSvg className='w-4 h-4 text-yellow-500' />,
			sessionSvg: <SessionSvg1 className='w-4 h-4 text-red-500' />,
		},
	},
	{
		title: 'Web Development Masterclass',
		img: img2,
		instructorimg: img2,
		instructor: 'David Chen',
		content:
			'Master modern web development with React, Node.js, and cloud technologies. Build scalable app...',
		rating: '4.7',
		reviews: '1.9k',
		students: '35k',
		duration: 'Group',
		icon: {
			studentSvg: <UserSVG />,
			starSvg: <StarSvg className='w-4 h-4 text-yellow-500' />,
			sessionSvg: <SessionSvg1 className='w-4 h-4 text-red-500' />,
		},
	},
	{
		title: 'Advanced Machine Learning Workshop',
		img: img3,
		instructorimg: img3,
		instructor: 'Jane Doe',
		content:
			'Comprehensive bootcamp covering data analysis, visualization, and machine learning techniques...',
		rating: '4.9',
		reviews: '3.1k',
		students: '28k',
		duration: '1on1',
		icon: {
			studentSvg: <UserSVG />,
			starSvg: <StarSvg className='w-4 h-4 text-yellow-500' />,
			sessionSvg: <SessionSvg1 className='w-4 h-4 text-red-500' />,
		},
	},
	{
		title: 'Web Development Masterclass',
		img: img1,
		instructorimg: img1,
		instructor: 'John Smith',
		content:
			'An introductory course on AI concepts, tools, and applications. Designed for beginners to gra...',
		rating: '4.6',
		reviews: '1.2k',
		students: '35k',
		duration: 'Group',
		icon: {
			studentSvg: <UserSVG/>,
			starSvg: <StarSvg className='w-4 h-4 text-yellow-500' />,
			sessionSvg: <SessionSvg1 className='w-4 h-4 text-red-500' />,
		},
	},
];


const community = [
  {
    title: 'Advancrd Mastering with React',
    img: img1,
    instructorimg: img1,
    instructor: 'Jane Doe',
    instructorLabel: 'Senior Developer',
    content: 'Learn React from basics to advanced concepts with real-world examples.',
    StatIcon: {
      studentSvg: <Users className="w-4 h-4" />,
      starSvg: <Star className="w-4 h-4" />,
      sessionSvg: <BookOpen className="w-4 h-4" />,
    },
    postCount: '25',
    memberCount: '1.2k',
    price: 49,
  },
  {
    title: 'Advanced Fullstack with Node.js',
    img: img2,
    instructorimg: img2,
    instructor: 'John Smith',
    instructorLabel: 'Fullstack Engineer',
    content: 'Build scalable backend apps using Express, MongoDB, and more.',
    StatIcon: {
      studentSvg: <Users className="w-4 h-4" />,
      starSvg: <Star className="w-4 h-4" />,
      sessionSvg: <BookOpen className="w-4 h-4" />,
    },
    postCount: '40',
    memberCount: '2k',
    price: 69,
  },
  {
    title: 'UI/UX Design Fundamentals',
    img: img3,
    instructorimg: img3,
    instructor: 'Sara Lee',
    instructorLabel: 'Design Lead',
    content: 'A deep dive into UI/UX design principles, tools, and best practices.',
    StatIcon: {
      studentSvg: <Users className="w-4 h-4" />,
      starSvg: <Star className="w-4 h-4" />,
      sessionSvg: <BookOpen className="w-4 h-4" />,
    },
    postCount: '18',
    memberCount: '950',
    price: 39,
  },
];

const followers: Follower[] = [
	{
		title: 'Jake Conrad',
		image:
			'https://i.ibb.co/gLQM1bhc/AVATAR-midtone-ux-instrgram.jpg',
		followers: '322 Followers',
		courses: '0',
		events: '24',
		reviews: '5',
	},
	{
		title: 'Matt Riddle',
		image: 'https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg',
		followers: '24 Followers',
		courses: '16',
		events: '86',
		reviews: '8',
	},
	{
		title: 'Fredric Nolan',
		image: 'https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png',
		followers: '3.2k Followers',
		courses: '72',
		events: '95K',
		reviews: '6',
	},
	{
		title: 'Oliver Patel',
		image: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
		followers: '1.6k Followers',
		courses: '85',
		events: '27',
		reviews: '4',
	},
	{
		title: 'Jude Pierce',
		image: 'https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png',
		followers: '895 Followers',
		courses: '33',
		events: '755',
		reviews: '3',
	},
];

// TypeScript interfaces
interface Follower {
	title: string;
	image: string;
	followers: string;
	courses: string;
	events: string;
	reviews: string;
}

const authorCard = {
	name: 'Jose Portilla',
	description:
		'Lead Data Science Instructor and consultant with expertise in Python, Machine Learning, and Web Development. Teaching over 1 million students worldwide.',
	avatarUrl: 'https://i.ibb.co/N5kLzSd/AVATAR-couponcodefinder.jpg',
	courses: [
		{
			id: '1',
			title: 'The Complete Web Development Bootcamp',
			thumbnailUrl: img1,
		},
		{
			id: '2',
			title: 'Advanced JavaScript Concepts',
			thumbnailUrl: img2,
		},
		{
			id: '3',
			title: 'React Native - The Practical Guide',
			thumbnailUrl: img3,
		},
	],
	totalCourses: 42,
};

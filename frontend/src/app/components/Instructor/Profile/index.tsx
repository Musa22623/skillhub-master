/** @format */
'use client';
import Image, {StaticImageData} from 'next/image';
import Link from 'next/link';
import {
	Star,
	Bookmark,
	Users,
	Globe,
	Linkedin,
	ChevronDown,
	BookOpen,
} from 'lucide-react';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/app/components/ui/hover-card';
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

import img1 from '@/assets/c3.jpg';
import img2 from '@/assets/c4.jpg';
import img3 from '@/assets/c2.jpg';
import avatar from '@/assets/avatar/AVATAR-1.png';
import {
	BundleSvg,
	CommunitySvg,
	CommunitySvg1,
	CourseSvg,
	FacebookSvg,
	SessionSvg1,
	StarSvg,
	StudentIcon,
	TopInstructorSvg,
	TwitterSvg,
	UserSVG,
	VideoSvg,
} from '../../svg';
import {SessionsCard} from './components/SessionCard';
import {CommunityCard} from './components/CommunityCard';
import {BundleCard} from './components/BundleCard';
import {useState} from 'react';
import {FollowersPopup} from './components/FollowCard';
import AuthorCard from './components/AuthorCard';
import MobileCourseCard from './components/MobileViewCard';
import {useIsMobile} from '@/hooks/use-mobile';

export default function InstructorProfile() {
	const [openFollowingPopup, setOpenFollowingPopup] = useState(false);
	const [openFollowerPopup, setOpenFollowerPopup] = useState(false);

	const handleFollowerPopop = () => {
		setOpenFollowerPopup(true);
		document.body.style.overflow = 'hidden';
	};
	const handleFollowingPopup = () => {
		setOpenFollowingPopup(true);
		document.body.style.overflow = 'hidden';
	};
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
											<span>Mentor of 100 percentilers</span>
											<span className='text-gray-300'>◇</span>
											<span>15+ years teaching experience</span>
										</div>
										<div className='flex xs:hidden  flex-col items-center gap-2 text-sm text-gray-600 mt-1'>
											<div>
												<span className='text-gray-300 mr-1'>◇</span>
												<span>Inorganic Chemistry Expert</span>
											</div>

											<div>
												<span className='text-gray-300 mr-1'>◇</span>
												<span>Mentor of 100 percentilers</span>
											</div>
											<div>
												<span className='text-gray-300 mr-1'>◇</span>
												<span>15+ years teaching experience</span>
											</div>
										</div>
									</div>

									<div className='flex flex-col xs:flex-row items-center gap-8 mt-6'>
										<div className='flex max-xs:bg-accent max-xs:p-4 max-xs:rounded-md items-center gap-8 '>
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
													Rating
												</p>
												<p className='text-xl font-semibold max-xs:text-center'>
													4.9
												</p>
											</div>
											<div>
												<p className='text-xs text-nowrap text-gray-500 uppercase font-semibold'>
													Followers
												</p>
												<p className='text-xl font-semibold max-xs:text-center'>
													90k
												</p>
											</div>
										</div>

										<Button className='bg-teal-500 max-xs:w-full'>
											Follow
										</Button>
									</div>
								</div>
							</div>

							{/* Tabs */}
							<Tabs defaultValue='courses' className='overflow-hidden xs:px-6'>
								<div className='border-b '>
									<TabsList className='overflow-x-auto no-scrollbar h-auto p-0 bg-transparent border-b w-full justify-start'>
										<TabsTrigger
											value='courses'
											className=' data-[state=active]:border-b-2 fill-gray-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:fill-teal-500 data-[state=active]:border-teal-500 data-[state=active]:text-teal-500 rounded-none px-4 py-3 text-sm font-semibold'
										>
											<CourseSvg className='size-5 mr-2' />
											Courses
										</TabsTrigger>
										<TabsTrigger
											value='sessions'
											className='data-[state=active]:border-b-2 fill-gray-500 data-[state=active]:fill-teal-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-teal-500 data-[state=active]:text-teal-500 rounded-none px-4 py-3 text-sm font-semibold'
										>
											<VideoSvg className='size-5 mr-2' />
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
						{/* Published Content */}
						<div className='bg-white max-xs:rounded-md max-xs:border xs:rounded-t-lg  xs:border-b overflow-hidden'>
							<div className='p-6'>
								<h2 className='text-lg font-semibold mb-4'>
									Published Content
								</h2>
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

						{/* Followers */}
						<div className='bg-white max-xs:rounded-md max-xs:border  xs:border-b overflow-hidden'>
							<div className='p-6'>
								<div className='flex items-center mb-4'>
									<h2 className='text-lg font-semibold'>Followers</h2>
									<span className='ml-2 px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full'>
										111
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
									onClick={handleFollowerPopop}
									className='text-xs text-blue-600 underline'
								>
									+97 following
								</button>

								{openFollowerPopup && (
									<FollowersPopup
										isOpen={openFollowerPopup}
										setIsOpen={setOpenFollowerPopup}
										followers={followers}
										heading='All Followers'
										cardType='Followers'
									/>
								)}
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
									Experienced chemistry instructor with over 15 years of
									teaching experience. Specializing in inorganic chemistry and
									molecular.
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

	if (isMobile) {
		return <MobileCourseCard course={course} />;
	} else {
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
								<TooltipContent
									showArrow={false}
									className='bg-black rounded-sm'
								>
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
		);
	}
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
			studentSvg: <UserSVG />,
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
		content:
			'Learn React from basics to advanced concepts with real-world examples.',
		StatIcon: {
			studentSvg: <Users className='w-4 h-4' />,
			starSvg: <Star className='w-4 h-4' />,
			sessionSvg: <BookOpen className='w-4 h-4' />,
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
			studentSvg: <Users className='w-4 h-4' />,
			starSvg: <Star className='w-4 h-4' />,
			sessionSvg: <BookOpen className='w-4 h-4' />,
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
		content:
			'A deep dive into UI/UX design principles, tools, and best practices.',
		StatIcon: {
			studentSvg: <Users className='w-4 h-4' />,
			starSvg: <Star className='w-4 h-4' />,
			sessionSvg: <BookOpen className='w-4 h-4' />,
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
			'https://i.ibb.co/Hqy4WwQ/AVATAR-smallbusiness-withgoogle-com-free-google-training.jpg',
		followers: '322 Followers',
		courses: '0',
		events: '24',
		reviews: '5',
	},
	{
		title: 'Matt Riddle',
		image: 'https://i.ibb.co/chkjCFZ/AVATAR-x-com-eladgil.jpg',
		followers: '24 Followers',
		courses: '16',
		events: '86',
		reviews: '8',
	},
	{
		title: 'Fredric Nolan',
		image: 'https://i.ibb.co/y0jHWWH/AVATAR-github-com-biowaffeln.png',
		followers: '3.2k Followers',
		courses: '72',
		events: '95K',
		reviews: '6',
	},
	{
		title: 'Oliver Patel',
		image: 'https://i.ibb.co/hMhYzYT/AVATAR-Ryan-Zhang.png',
		followers: '1.6k Followers',
		courses: '85',
		events: '27',
		reviews: '4',
	},
	{
		title: 'Jude Pierce',
		image: 'https://i.ibb.co/y0jHWWH/AVATAR-github-com-biowaffeln.png',
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
	avatarUrl: 'https://i.ibb.co/chkjCFZ/AVATAR-x-com-eladgil.jpg',
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

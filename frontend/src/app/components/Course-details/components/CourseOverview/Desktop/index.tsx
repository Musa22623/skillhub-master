/** @format */

'use client';

import {useState} from 'react';
import {ChevronDown, ChevronUp, Star} from 'lucide-react';
import Image from 'next/image';
import {BarChart3, CertificateSvg, CommunitySvg, LinkSvg, VideoSvg} from '@/app/components/svg';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/app/components/ui/hover-card';

import CourseImg from '@/assets/img5.jpg'

export default function CourseDetails() {
	const [showFullDescription, setShowFullDescription] = useState(false);
	const [showAllPoints, setShowAllPoints] = useState(false);
	const [activeFaqType, setActiveFaqType] = useState<
		'instructor' | 'marketplace'
	>('instructor');
	const [activeFaqItem, setActiveFaqItem] = useState<number | null>(null);

	const toggleFaqItem = (index: number) => {
		setActiveFaqItem(activeFaqItem === index ? null : index);
	};

	return (
		<div className='flex  w-full '>
			<div className='w-full bg-white rounded-xl shadow-sm'>
				<div className='p-4 lg:p-8'>
					{/* Stats Grid */}
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 lg:mb-10'>
						{/* Lessons */}
						<div className='flex flex-col gap-2'>
							<div className='flex items-center gap-2'>
								<svg
									className='w-4 h-4 text-gray-600'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 32 32'
								>
									<path
										fill='currentColor'
										d='M8.00008 6.33331C7.91168 6.33331 7.82689 6.36843 7.76438 6.43094C7.70187 6.49346 7.66675 6.57824 7.66675 6.66665V25.3333C7.66675 25.4217 7.70187 25.5065 7.76438 25.569C7.82689 25.6315 7.91167 25.6666 8.00008 25.6666H11.0001V6.33331H8.00008ZM8.00008 4.33331C7.38124 4.33331 6.78775 4.57915 6.35017 5.01673C5.91258 5.45432 5.66675 6.04781 5.66675 6.66665V25.3333C5.66675 25.9522 5.91258 26.5456 6.35017 26.9832C6.78775 27.4208 7.38124 27.6666 8.00008 27.6666H11.0001V29.3333C11.0001 29.8856 11.4478 30.3333 12.0001 30.3333C12.5524 30.3333 13.0001 29.8856 13.0001 29.3333V27.6666H22.6667C23.6392 27.6666 24.5718 27.2803 25.2595 26.5927C25.9471 25.9051 26.3334 24.9724 26.3334 24V7.99998C26.3334 7.02752 25.9471 6.09489 25.2595 5.40725C24.5718 4.71962 23.6392 4.33331 22.6667 4.33331H8.00008ZM13.0001 6.33331V25.6666H22.6667C23.1088 25.6666 23.5327 25.4911 23.8453 25.1785C24.1578 24.8659 24.3334 24.442 24.3334 24V7.99998C24.3334 7.55795 24.1578 7.13403 23.8453 6.82147C23.5327 6.50891 23.1088 6.33331 22.6667 6.33331H13.0001Z'
										clipRule='evenodd'
										fillRule='evenodd'
									></path>
								</svg>
								<span className='text-sm text-gray-600'>Lessons</span>
							</div>
							<div className='text-sm font-semibold pl-6'>17</div>
						</div>

						{/* Duration */}
						<div className='flex flex-col gap-2'>
							<div className='flex items-center gap-2'>
								<VideoSvg className='size-5 fill-gray-600' />
								<span className='text-sm text-gray-600'>Duration</span>
							</div>
							<div className='text-sm font-semibold pl-6'>18h 22m</div>
						</div>

						{/* Rating */}
						<div className='flex flex-col gap-2'>
							<div className='flex items-center gap-2'>
								{/* <svg className="w-4 h-4 " aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 4.875a.75.75 0 01.648.372l1.994 3.414 3.893.85a.75.75 0 01.395 1.238l-2.646 2.905.414 3.892a.75.75 0 01-1.042.768L12 16.744l-3.656 1.57a.75.75 0 01-1.042-.768l.414-3.892L5.07 10.75a.75.75 0 01.395-1.238l3.893-.85 1.994-3.414A.75.75 0 0112 4.875z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg> */}

								<Star className='size-4 text-gray-600' />
								<span className='text-sm text-gray-600'>Rating</span>
							</div>
							<div className='text-sm font-semibold pl-6 flex items-center gap-1'>
								<strong>4.2</strong>
								<span className='text-gray-500'>(133)</span>
							</div>
						</div>

						{/* Skill Level */}
						<div className='flex flex-col gap-2'>
							<div className='flex items-center gap-2'>
								<BarChart3 className='size-4 text-gray-600' />
								<span className='text-sm text-gray-600'>Skill Level</span>
							</div>
							<div className='text-sm font-semibold pl-6'>Beg. & Int.</div>
						</div>

						{/* Certificate */}
						<div className='flex flex-col gap-2'>
							<div className='flex items-center gap-2'>
								<CertificateSvg className='size-4 fill-gray-600' />
								<span className='text-sm text-gray-600'>Certificate</span>
							</div>
							<div className='text-sm font-semibold pl-6 flex items-center gap-1'>
								<svg
									className='w-4 h-4 text-teal-500'
									fill='none'
									viewBox='0 0 32 32'
								>
									<path
										strokeWidth='2.13599'
										stroke='currentColor'
										d='M9.90625 16.5733L13.5982 20.4108L22.4576 12.1875'
									></path>
								</svg>
								<span>Included</span>
							</div>
						</div>

						{/* Community */}
						{/* <div className="flex flex-col gap-2">
           
            </div> */}

						<HoverCard openDelay={50} closeDelay={50}>
							<HoverCardTrigger className='space-y-2'>
								<div className='flex items-center gap-2'>
									<CommunitySvg className='size-4 fill-gray-600' />
									<span className='text-sm text-gray-600'>Community</span>
								</div>
								<div className='text-sm font-semibold pl-6 flex items-center gap-1'>
									<svg
										className='w-4 h-4 text-teal-500'
										fill='none'
										viewBox='0 0 32 32'
									>
										<path
											strokeWidth='2.13599'
											stroke='currentColor'
											d='M9.90625 16.5733L13.5982 20.4108L22.4576 12.1875'
										></path>
									</svg>
									<span>Included</span>
								</div>
							</HoverCardTrigger>
							<HoverCardContent
								className='min-w-xs p-0 border-none'
								side='bottom'
								avoidCollisions={false}
								align='start'
								alignOffset={-85}
							>
								<CommunityCard />
							</HoverCardContent>
						</HoverCard>
					</div>

					{/* Overview Section */}
					<h1 className='text-2xl font-bold mb-6 text-gray-900'>OVERVIEW</h1>

					{/* Description Box */}
					<div className='bg-sky-50 rounded-lg p-6 mb-8'>
						<div className='text-sky-600 font-semibold mb-3 text-sm'>
							Description
						</div>
						<div className='text-gray-800 text-sm'>
							<p>
								Learn advanced programming concepts and practical application
								development with industry-standard tools and frameworks. This
								comprehensive course covers modern JavaScript, React, Node.js,
								and cloud deployment strategies.
							</p>
							{showFullDescription && (
								<p className='mt-3'>
									You'll start with the fundamentals and progress to building
									complex, scalable applications. By the end of this course,
									you'll have the skills to develop full-stack applications and
									deploy them to production environments.
								</p>
							)}
							<button
								onClick={() => setShowFullDescription(!showFullDescription)}
								className='text-sky-600 font-semibold flex items-center gap-1 mt-3 text-sm'
							>
								{showFullDescription ? 'Show less' : 'Show more'}
								{showFullDescription ? (
									<ChevronUp size={16} />
								) : (
									<ChevronDown size={16} />
								)}
							</button>
						</div>
					</div>

					<div className='border-t border-gray-200 my-4 lg:my-8'></div>

					{/* Learning Points */}
					<div className='mb-8 lg:mb-10'>
						<h2 className='text-xl font-semibold mb-6 text-gray-800'>
							What you will learn
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
							{learningPoints
								.slice(0, showAllPoints ? learningPoints.length : 4)
								.map((point, index) => (
									<div
										key={index}
										className='border border-gray-100 rounded-lg p-4 flex items-center gap-3 hover:border-sky-400 transition-colors'
									>
										<div className='text-sky-500 flex-shrink-0'>
											<svg
												width='24'
												height='24'
												viewBox='0 0 16 16'
												className='text-sky-500 size-4 lg:size-6'
											>
												<path
													fill='currentColor'
													d='M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.5303 6.53033L12.0607 6L11 4.93934L10.4697 5.46967L6.5 9.43934L5.53033 8.46967L5 7.93934L3.93934 9L4.46967 9.53033L5.96967 11.0303C6.26256 11.3232 6.73744 11.3232 7.03033 11.0303L11.5303 6.53033Z'
													clipRule='evenodd'
													fillRule='evenodd'
												></path>
											</svg>
										</div>
										<div className='text-xs lg:text-sm font-semibold text-gray-700'>
											{point}
										</div>
									</div>
								))}
						</div>
						<button
							onClick={() => setShowAllPoints(!showAllPoints)}
							className='w-full bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg text-sky-500 py-3 text-sm font-semibold  flex items-center justify-center gap-1'
						>
							{showAllPoints ? 'Show less' : 'Show more'}
							{showAllPoints ? (
								<ChevronUp size={16} />
							) : (
								<ChevronDown size={16} />
							)}
						</button>
					</div>

					<div className='border-t border-gray-200 my-4 lg:my-8'></div>
					{/* FAQ Section */}
					<div className='flex items-center justify-between mb-8 lg:mb-10'>
						<h2 className='text-xl font-semibold text-gray-800'>FAQ</h2>
						<div className='bg-gray-100 p-1 rounded-lg inline-flex'>
							<button
								className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
									activeFaqType === 'instructor'
										? 'bg-white text-gray-800 shadow-sm'
										: 'text-gray-600'
								}`}
								onClick={() => setActiveFaqType('instructor')}
							>
								Instructor
							</button>
							<button
								className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
									activeFaqType === 'marketplace'
										? 'bg-white text-gray-800 shadow-sm'
										: 'text-gray-600'
								}`}
								onClick={() => setActiveFaqType('marketplace')}
							>
								Marketplace
							</button>
						</div>
					</div>

					{/* FAQ Items */}
					<div className='space-y-4'>
						{(activeFaqType === 'instructor'
							? instructorFaqs
							: marketplaceFaqs
						).map((faq, index) => (
							<div key={index} className='rounded-lg overflow-hidden'>
								<div
									className='bg-gray-50 p-5 font-semibold text-gray-800 flex justify-between items-center cursor-pointer'
									onClick={() => toggleFaqItem(index)}
								>
									<span className='text-sm'>{faq.question}</span>
									<ChevronDown
										size={16}
										className={`transition-transform ${
											activeFaqItem === index ? 'rotate-180' : ''
										}`}
									/>
								</div>
								{activeFaqItem === index && (
									<div className='bg-gray-50 px-5 pb-5 text-sm text-gray-600'>
										{faq.answer}
									</div>
								)}
							</div>
						))}
					</div>

					<div className='border-t border-gray-200 my-10'></div>
					{/* Testimonial  */}
					<TestimonialSection />
				</div>
			</div>
		</div>
	);
}

// Data
const learningPoints = [
	'Master modern JavaScript fundamentals and ES6+ features',
	'Build real-world applications with React and TypeScript',
	'Learn advanced backend development with Node.js',
	'Deploy and scale applications using Docker and Kubernetes',
	'Implement authentication and authorization in web applications',
	'Create responsive and accessible user interfaces',
	'Work with databases including SQL and NoSQL solutions',
	'Apply best practices for testing and debugging',
];

const instructorFaqs = [
	{
		question: 'What programming languages are covered in this course?',
		answer:
			'The course starts with Python for foundational programming concepts, moves on to JavaScript for building interactive web applications, and covers SQL for managing and querying databases.',
	},
	{
		question: 'Do I need prior coding experience to join?',
		answer:
			'No, the course starts with the basics, making it beginner-friendly.',
	},
	{
		question: 'How long will it take to complete the course?',
		answer: 'The course is self-paced and typically takes 6–8 weeks.',
	},
];

const marketplaceFaqs = [
	{
		question: 'What payment methods are accepted?',
		answer: 'We accept all major credit cards, PayPal, and Apple Pay.',
	},
	{
		question: 'What is your refund policy?',
		answer: 'We offer a 30-day money-back guarantee on all courses.',
	},
	{
		question: 'How long do I have access to the course?',
		answer: 'Once purchased, you have lifetime access to all course materials.',
	},
];

const TestimonialSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const testimonials = [
		{
			id: 1,
			text: 'I love the tracking part, that you can see how recipients engaged with certificates. Certifier saves me tons of work',
			author: 'Steve Roberts',
			title: 'Head of Impact Academy',
			avatar: 'https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png',
			previewImage: 'https://i.ibb.co/vcJmbRn/japan.webp',
		},
		{
			id: 2,
			text: 'The program provided me with valuable insights into complex political frameworks that I now use daily in my work',
			author: 'Jane Foster',
			title: 'Policy Analyst',
			avatar: 'https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png',
			previewImage: '/api/placeholder/400/300',
		},
		{
			id: 3,
			text: 'This course transformed my understanding of global political dynamics and helped advance my career',
			author: 'Michael Chen',
			title: 'International Relations Specialist',
			avatar: 'https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png',
			previewImage: '/api/placeholder/400/300',
		},
		{
			id: 4,
			text: "The instructors' expertise and real-world experience made all the difference in my political education",
			author: 'Sarah Johnson',
			title: 'Political Consultant',
			avatar: 'https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png',
			previewImage: '/api/placeholder/400/300',
		},
		{
			id: 5,
			text: "I recommend this program to anyone looking to understand political realities beyond what's in the news",
			author: 'David Wilson',
			title: 'Journalism Director',
			avatar: 'https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png',
			previewImage: '/api/placeholder/400/300',
		},
	];

	const handlePrevSlide = () => {
		setCurrentSlide((prev) =>
			prev === 0 ? testimonials.length - 1 : prev - 1
		);
	};

	const handleNextSlide = () => {
		setCurrentSlide((prev) =>
			prev === testimonials.length - 1 ? 0 : prev + 1
		);
	};

	const currentTestimonial = testimonials[currentSlide];

	return (
		<div className='  flex flex-col items-center font-sans'>
			<div className='max-w-3xl w-full mx-auto'>
				<div className='text-center mb-10'>
					<h1 className=' text-2xl lg:text-3xl font-bold uppercase tracking-wider mb-3 text-gray-900'>
						Decipher Political Realities
					</h1>
					<p className=' text-sm lg:text-lg font-semibold text-gray-600'>
						Don't take our word for it. See what some of our students have to
						say.
					</p>
				</div>

				<div className='bg-white rounded-2xl lg:p-10 flex flex-col md:flex-row gap-4 lg:gap-10 lg:shadow-md'>
					<div className='basis-[57%] flex flex-col relative'>
						<svg
							className='mb-6 text-sky-500'
							xmlns='http://www.w3.org/2000/svg'
							fill='#13AFF0'
							viewBox='0 0 33 28'
							height='28'
							width='33'
						>
							<path d='M17.883 17.3311C17.883 11.9311 19.1453 7.79346 21.67 4.91816C24.2648 1.97272 27.7362 0.5 32.0842 0.5V5.75971C29.9803 5.75971 28.2972 6.35581 27.0349 7.54801C25.8427 8.67008 25.2466 10.1779 25.2466 12.0714V13.1233C25.2466 13.2636 25.2817 13.3688 25.3518 13.4389C25.5622 13.4389 25.7726 13.4038 25.983 13.3337C26.544 13.1934 26.9998 13.1233 27.3505 13.1233C28.7531 13.1233 29.9803 13.7545 31.0323 15.0168C32.0842 16.2791 32.6102 17.9272 32.6102 19.9609C32.6102 22.0648 31.9089 23.818 30.5063 25.2206C29.1739 26.6232 27.4908 27.3245 25.457 27.3245C23.1427 27.3245 21.2843 26.483 19.8817 24.7999C18.5492 23.1168 17.883 20.6272 17.883 17.3311ZM0 17.3311C0 11.9311 1.26233 7.79346 3.78699 4.91816C6.38178 1.97272 9.85319 0.5 14.2012 0.5V5.75971C12.0973 5.75971 10.4142 6.35581 9.1519 7.54801C7.95969 8.67008 7.36359 10.1779 7.36359 12.0714V13.1233C7.36359 13.2636 7.39866 13.3688 7.46879 13.4389C7.67918 13.4389 7.88956 13.4038 8.09995 13.3337C8.66099 13.1934 9.11683 13.1233 9.46748 13.1233C10.8701 13.1233 12.0973 13.7545 13.1493 15.0168C14.2012 16.2791 14.7272 17.9272 14.7272 19.9609C14.7272 22.0648 14.0259 23.818 12.6233 25.2206C11.2908 26.6232 9.60774 27.3245 7.57398 27.3245C5.25971 27.3245 3.40128 26.483 1.99869 24.7999C0.66623 23.1168 0 20.6272 0 17.3311Z'></path>
						</svg>

						<div className='text-2xl font-semibold leading-relaxed text-gray-900 mb-6 line-clamp-3'>
							{currentTestimonial.text}"
						</div>

						<div className='flex items-center gap-4 mb-5'>
							<Image
								src={currentTestimonial.avatar}
								alt={currentTestimonial.author}
								width={48}
								height={48}
								className='h-12 w-auto rounded-full flex-shrink-0'
							/>
							<div className='flex-grow'>
								<div className='text-lg font-semibold text-gray-900 mb-1'>
									{currentTestimonial.author}
								</div>
								<div className='text-sm font-semibold text-gray-600'>
									{currentTestimonial.title}
								</div>
							</div>
						</div>

						<div className='flex items-center justify-between mt-auto'>
							<div className='flex gap-2'>
								{testimonials.map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentSlide(index)}
										className={`w-2 h-2 rounded-full border-2 border-sky-500 transition-all ${
											index === currentSlide
												? 'bg-sky-500 scale-125'
												: 'bg-transparent'
										}`}
										aria-label={`Go to slide ${index + 1}`}
									/>
								))}
							</div>

							<div className='flex gap-3'>
								<button
									onClick={handlePrevSlide}
									className='w-8 h-8 border border-sky-500 rounded-full flex items-center justify-center transition-colors hover:bg-sky-500 group'
									aria-label='Previous testimonial'
								>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M15 18L9 12L15 6'
											stroke='#13AFF0'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
											className='group-hover:stroke-white transition-colors'
										/>
									</svg>
								</button>
								<button
									onClick={handleNextSlide}
									className='w-8 h-8 border border-sky-500 rounded-full flex items-center justify-center transition-colors hover:bg-sky-500 group'
									aria-label='Next testimonial'
								>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M9 18L15 12L9 6'
											stroke='#13AFF0'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
											className='group-hover:stroke-white transition-colors'
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>

					<div className='w-full basis-[43%] relative aspect-video md:aspect-auto'>
						<Image
							src={currentTestimonial.previewImage}
							alt={`${currentTestimonial.author}'s Video`}
							width={100}
							height={100}
							className='w-full h-full object-cover rounded-xl'
						/>
						<div className='absolute bottom-4 left-2 bg-white px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer shadow-md transition-transform hover:-translate-y-0.5'>
							<span className='text-sky-500 font-semibold text-sm whitespace-nowrap'>
								Watch {currentTestimonial.author.split(' ')[0]}'s story
							</span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 33 33'
								height='33'
								width='33'
							>
								<circle fill='#13AFF0' r='16' cy='16.499' cx='16.8027'></circle>
								<path
									fill='white'
									d='M23.433 15.4168L13.9332 9.93204C13.0998 9.45088 12.058 10.0523 12.058 11.0146V21.9841C12.058 22.9464 13.0998 23.5479 13.9332 23.0667L23.433 17.582C24.2664 17.1008 24.2664 15.8979 23.433 15.4168Z'
								></path>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};



const CommunityCard = () => {
  return (
    <div className="w-full">
      {/* Header Image */}
    
        <div className="h-36 w-full rounded-t-md">
          <Image
            src={CourseImg}
            alt="Blue bird DJ"
            width={144}
            height={80}
            className="object-cover object-center w-full h-full rounded-t-md"
          />
        </div>
     

      {/* Content */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800">The 4D Copywriting Community</h2>
        <p className="mt-2 text-xs text-gray-600">
          The best place to be to become a full-time freelance copywriter. Join our community of passionate writers and
          learn from experienced professionals.
        </p>

        {/* Features */}
        <div className="mt-4 space-y-2 text-gray-600">
          <div className="flex items-center gap-2">
            <LinkSvg className='size-4'/>
            <span className="text-sm font-semibold flex items-center gap-1">
             <span>💎</span> 1-on-1 4DCI Mentorship
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LinkSvg className='size-4'/>
            <span className="text-sm font-semibold flex items-center gap-1">
              <span className="text-amber-500">✍️</span> 4D Copywriting Academy 2.0
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LinkSvg className='size-4'/>
            <span className="text-sm font-semibold flex items-center gap-1">
              <span>🗺️</span> 4D Copywriters Map
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className=" border-gray-100 pt-4">
          <div className="flex justify-evenly items-center">
            <div className="text-center">
              <p className="text-xs text-gray-500">Learners</p>
              <p className="font-semibold">44.8k</p>
            </div>

            <div className='h-8 w-px bg-gray-400'></div>
          
            <div className="text-center">
              <p className="text-xs text-gray-500">Posts</p>
              <p className="font-semibold">2.4k</p>
            </div>

            <div className='h-8 w-px bg-gray-400'></div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Mods</p>
              <p className="font-semibold">4</p>
            </div>
          </div>

          {/* User Avatars */}
          <div className="mt-5">
            <div className="flex w-full justify-evenly items-center">
              {[1, 2, 3, 4, 5,6,7].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border border-white ">
                  <Image
                    src={`https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png`}
                    alt={`User ${i}`}
                    width={32}
                    height={32}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Button */}
        <button className="mt-4 w-full text-sm rounded-md bg-teal-500 py-2 text-center font-semibold text-white hover:bg-teal-600 transition-colors">
          VIEW DISCUSSIONS
        </button>
      </div>
    </div>
  )
}

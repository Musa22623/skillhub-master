/** @format */

import Image from 'next/image';
import {
	Clock,
	ChevronDown,
	X,
	Video,
	FileText,
	Smartphone,
	Award,
	Users,
	CheckCircle,
	Zap,
} from 'lucide-react';
import {useEffect, useMemo, useRef, useState} from 'react';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/app/components/ui/hover-card';

import CourseImg1 from '@/assets/c1.jpg';
import CourseImg2 from '@/assets/c2.jpg';
import CourseImg3 from '@/assets/c3.jpg';
import CourseImg4 from '@/assets/c4.jpg';
import CourseImg5 from '@/assets/cc1.jpg';
import {useIsMobile} from '@/hooks/use-mobile';
import {Input} from '../../ui/input';
import {Button} from '../../ui/button';

export default function CourseHeader() {
	const [isFixedVisible, setIsFixedVisible] = useState(false);
	const sliderContainerRef = useRef<HTMLDivElement | null>(null);
	const [currentPosition, setCurrentPosition] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [activeTab, setActiveTab] = useState('personal');
	const [timeLeft, setTimeLeft] = useState({minutes: 19, seconds: 45});
	const [couponActive, setCouponActive] = useState(true);
	const [couponCode, setCouponCode] = useState('');
	const [couponError, setCouponError] = useState('');
	const positions = useMemo(() => [0, 16.67, 33.33, 50, 66.67, 83.33, 100], []);
	const teamSizes = [3, 5, 10, 25, 50, 100, 200];
	const pricesPerUser = [19, 18, 16, 14, 12, 10, 8];

	const isMobile = useIsMobile();
	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	const updateSlider = (position: number) => {
		setCurrentPosition(position);
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	// Price animation effect
	useEffect(() => {
		const priceAnimationInterval = setInterval(() => {
			const priceElement = document.querySelector('.current-price');
			if (priceElement) {
				priceElement.classList.add('scale-105');
				setTimeout(() => {
					priceElement.classList.remove('scale-105');
				}, 200);
			}
		}, 5000);

		return () => clearInterval(priceAnimationInterval);
	}, []);

	const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === sliderContainerRef.current) {
			if (!sliderContainerRef.current) return;
			const rect = sliderContainerRef.current.getBoundingClientRect();
			const percent = ((e.clientX - rect.left) / rect.width) * 100;

			let closestPosition = 0;
			let minDifference = 100;

			positions.forEach((pos, index) => {
				const difference = Math.abs(percent - pos);
				if (difference < minDifference) {
					minDifference = difference;
					closestPosition = index;
				}
			});

			updateSlider(closestPosition);
		}
	};

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging || !sliderContainerRef.current) return;

			const rect = sliderContainerRef.current.getBoundingClientRect();
			const percent = Math.max(
				0,
				Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
			);

			let closestPosition = 0;
			let minDifference = 100;

			positions.forEach((pos, index) => {
				const difference = Math.abs(percent - pos);
				if (difference < minDifference) {
					minDifference = difference;
					closestPosition = index;
				}
			});

			updateSlider(closestPosition);
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		if (isDragging) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging, positions]);

	const teamSize = teamSizes[currentPosition];
	const pricePerUser = pricesPerUser[currentPosition];
	const totalPrice = teamSize * pricePerUser * 12;

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 270) {
				setIsFixedVisible(true);
			} else {
				setIsFixedVisible(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Timer functionality
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev.seconds > 0) {
					return {...prev, seconds: prev.seconds - 1};
				} else if (prev.minutes > 0) {
					return {minutes: prev.minutes - 1, seconds: 59};
				} else {
					clearInterval(timer);
					return {minutes: 0, seconds: 0};
				}
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const handleRemoveCoupon = () => {
		setCouponActive(false);
	};

	const handleApplyCoupon = () => {
		if (couponCode.trim() === '') {
			setCouponError('Please enter a coupon code');
			setTimeout(() => setCouponError(''), 2000);
			return;
		}

		setCouponError('Invalid coupon code');
		setTimeout(() => {
			setCouponError('');
			setCouponCode('');
		}, 2000);
	};

	const [showMoreLanguages, setShowMoreLanguages] = useState(false);
	const languages = [
		'English [Auto]',
		'Korean [Auto]',
		'Japanese [Auto]',
		'Spanish [Auto]',
	];

	if (isMobile) {
		return (
			<div className='relative -mt-5'>
				<header className='bg-[#1B1E2F] text-white py-5  z-0 relative'>
					<div className='container xl:max-w-7xl mx-auto sm:px-4 xl:px-8'>
						<div className='flex flex-col lg:flex-row justify-between gap-6 xl:gap-10'>
							<div className='max-w-3xl sm:w-[60%] xl:w-full lg:pr-4 xl:pr-16 relative z-10'>
								<div className='flex px-4 items-center gap-2 text-xs sm:text-sm mb-4 sm:mb-6 flex-wrap'>
									<span>Development</span>
									<span className='text-gray-400'>›</span>
									<span>Programming Language</span>
									<span className='text-gray-400'>›</span>
									<span className='font-semibold'>Data Analysis</span>
								</div>

								<div className='relative rounded-t-lg  w-full h-[253px] bg-black mb-4'>
									<Image
										src='https://i.ibb.co/tK5s859/preview1.jpg'
										alt='Course Preview'
										width={450}
										height={253}
										className='w-full h-full object-cover opacity-80'
									/>
									<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 cursor-pointer'>
										<svg className='w-full h-full' viewBox='0 0 118 118'>
											<g transform='translate(-1260 -363)'>
												<circle
													opacity='0.6'
													fill='#1a1e2e'
													transform='translate(1260 363)'
													r='59'
													cy='59'
													cx='59'
												></circle>
												<path
													fill='#13c4cc'
													transform='translate(1351 394) rotate(90)'
													d='M23.287,9.145a6,6,0,0,1,10.425,0L51.886,41.029A6,6,0,0,1,46.674,50H10.326a6,6,0,0,1-5.213-8.971Z'
												></path>
											</g>
										</svg>
									</div>
								</div>

								<h1 className='text-[#25BCC5] text-3xl lg:text-[2.5rem] px-4 font-bold mb-4 sm:mb-6 leading-tight'>
									Learning Python for Data Analysis and Visualization
								</h1>

								<p className='text-white text-base lg:text-lg mb-4 sm:mb-6 px-4 leading-relaxed'>
									Learn Python Programming and how to use Python for Data
									Analysis. Includes data analytics, visualization, and more.
								</p>

								<div className='flex flex-wrap items-center gap-3 mb-4 px-4 sm:mb-6"'>
									<span className='bg-[#25BCC5] text-white px-3 py-1 rounded text-xs lg:text-sm font-semibold'>
										BEST SELLER
									</span>
									<div className='flex items-center gap-3'>
										<span className='text-[#25BCC5] lg:text-xl font-semibold'>
											4.4
										</span>
										<span className='text-[#25BCC5] lg:text-xl tracking-wider'>
											★★★★☆
										</span>
										<span className='text-[#25BCC5] text-base'>
											(17,706 ratings)
										</span>
									</div>
									<span className='text-[#3b6e91] text-base'>
										189,591 students
									</span>
								</div>

								<div className=' px-4 py-2 sm:py-4 bg-[#1B1E2F]'>
									<div className='text-gray-400 mb-4 text-sm lg:text-base'>
										Created by{' '}
										<HoverCard openDelay={50} closeDelay={50}>
											<HoverCardTrigger className='text-[#25BCC5] font-semibold'>
												Jose Portilla
											</HoverCardTrigger>
											<HoverCardContent
												className='min-w-sm bg-white'
												side='bottom'
												avoidCollisions={false}
												align='start'
												alignOffset={-90}
											>
												<InstructorProfileCard />
											</HoverCardContent>
										</HoverCard>
									</div>

									<div className='flex flex-col sm:flex-row gap-6 text-gray-400 text-xs lg:text-base'>
										<div className='flex items-center gap-px lg:gap-2'>
											<span className='inline-block size-4 lg:w-5 lg:h-5'>
												<svg
													viewBox='0 0 24 24'
													fill='none'
													className='size-4 lg:size-5'
												>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75ZM2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12Z'
														fill='currentColor'
													/>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M12 6.75C12.4142 6.75 12.75 7.08579 12.75 7.5V12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12V7.5C11.25 7.08579 11.5858 6.75 12 6.75Z'
														fill='currentColor'
													/>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M11.25 12C11.25 11.5858 11.5858 11.25 12 11.25H16.5C16.9142 11.25 17.25 11.5858 17.25 12C17.25 12.4142 16.9142 12.75 16.5 12.75H12C11.5858 12.75 11.25 12.4142 11.25 12Z'
														fill='currentColor'
													/>
												</svg>
											</span>
											<span>Last updated: March 25, 2022</span>
										</div>

										<div className='flex items-center gap-2'>
											<span className='inline-block size-4 lg:size-5'>
												<svg
													width='20'
													height='20'
													color='currentColor'
													viewBox='0 0 24 24'
													fill='none'
												>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M7.5 13.5C7.5 12.2574 8.50736 11.25 9.75 11.25H20.25C21.4926 11.25 22.5 12.2574 22.5 13.5V20.25C22.5 21.4926 21.4926 22.5 20.25 22.5H9.75C8.50736 22.5 7.5 21.4926 7.5 20.25V13.5ZM9.75 12.75C9.33579 12.75 9 13.0858 9 13.5V20.25C9 20.6642 9.33579 21 9.75 21H20.25C20.6642 21 21 20.6642 21 20.25V13.5C21 13.0858 20.6642 12.75 20.25 12.75H9.75Z'
														fill='currentColor'
													></path>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M1.5 3.75C1.5 2.50736 2.50736 1.5 3.75 1.5H14.25C15.4926 1.5 16.5 2.50736 16.5 3.75V8.98125C16.5 9.39546 16.1642 9.73125 15.75 9.73125C15.3358 9.73125 15 9.39546 15 8.98125V3.75C15 3.33579 14.6642 3 14.25 3H3.75C3.33579 3 3 3.33579 3 3.75V10.5C3 10.9142 3.33579 11.25 3.75 11.25H5.25C5.66421 11.25 6 11.5858 6 12C6 12.4142 5.66421 12.75 5.25 12.75H3.75C2.50736 12.75 1.5 11.7426 1.5 10.5V3.75Z'
														fill='currentColor'
													></path>
													<path
														d='M11.9524 9.23985C12.0473 9.48556 11.866 9.75 11.6026 9.75H10.9772C10.8203 9.75 10.6799 9.65224 10.6255 9.505L10.2471 8.48109H7.70762L7.33713 9.50283C7.28334 9.6512 7.14241 9.75 6.98459 9.75H6.39488C6.13188 9.75 5.95058 9.48631 6.04474 9.24075L8.05773 3.99075C8.11333 3.84573 8.25257 3.75 8.40787 3.75H9.57409C9.72904 3.75 9.86804 3.84531 9.92389 3.98985L11.9524 9.23985ZM8.48627 6.31303L8.07925 7.43067H9.85776L9.44189 6.31303C9.28262 5.87605 9.12335 5.42227 8.98178 4.93487H8.94639C8.79596 5.39706 8.63669 5.87605 8.48627 6.31303Z'
														fill='currentColor'
													></path>
													<path
														d='M14.25 15L12.375 15C12.1679 15 12 15.1679 12 15.375L12 16.125C12 16.3321 12.1679 16.5 12.375 16.5H14.2408C14.1972 17.196 14.0001 17.7265 13.6992 18.0848C13.4245 18.4117 13.0088 18.6607 12.3743 18.7304C12.1684 18.753 12 18.9179 12 19.125V19.875C12 20.0821 12.1683 20.2517 12.3748 20.2362C13.4141 20.1584 14.2581 19.7516 14.8477 19.0496C14.9011 18.986 14.9518 18.9207 15 18.8538C15.0482 18.9207 15.0989 18.986 15.1523 19.0496C15.7419 19.7516 16.5859 20.1584 17.6252 20.2362C17.8317 20.2517 18 20.0821 18 19.875V19.125C18 18.9179 17.8316 18.753 17.6257 18.7304C16.9912 18.6607 16.5755 18.4117 16.3008 18.0848C15.9999 17.7265 15.8028 17.196 15.7592 16.5H17.625C17.8321 16.5 18 16.3321 18 16.125L18 15.375C18 15.1679 17.8321 15 17.625 15L15.75 15V13.875C15.75 13.6679 15.5821 13.5 15.375 13.5H14.625C14.4179 13.5 14.25 13.6679 14.25 13.875V15Z'
														fill='currentColor'
													></path>
												</svg>
											</span>
											<span>English</span>
											<svg
												fill='none'
												viewBox='0 0 24 24'
												className='size-4 lg:size-5'
											>
												<path
													fill='currentColor'
													d='M23 24H2V0h21v24zM3.337 22.632h18.326V1.368H3.337v21.264z'
												></path>
												<path
													fill='currentColor'
													d='M18.313 8.647h-4.105v1.14h4.105v-1.14zM18.313 13.093H6.684v1.14h11.63v-1.14zM18.313 17.537H6.684v1.14h11.63v-1.14zM11.34 9.975h1.252L9.89 4.59H9.49l-2.7 5.386h1.252l.343-.684h2.612l.343.684zM8.958 8.151l.733-1.462.733 1.462H8.958z'
												></path>
											</svg>
											<span>
												{languages[0]}, {languages[1]}
												{showMoreLanguages &&
													` , ${languages[2]}, ${languages[3]}`}
												<span
													className='text-[#25BCC5] underline cursor-pointer'
													onClick={() =>
														setShowMoreLanguages(!showMoreLanguages)
													}
												>
													{showMoreLanguages ? '  Hide' : ',  2 more'}
												</span>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
				<div className={`bg-white w-full border-b`}>
					<div className='flex  border-b border-gray-200'>
						<button
							onClick={() => handleTabClick('personal')}
							className={`flex-1 py-4 text-center font-bold transition-all duration-300 ease-in ${
								activeTab === 'personal'
									? 'text-gray-800 bg-white border-b-2 border-[#00BCD4]'
									: 'text-gray-600 bg-gray-50'
							}`}
						>
							Personal
						</button>
						<button
							onClick={() => handleTabClick('teams')}
							className={`flex-1 py-4 text-center font-bold transition-all duration-300 ease-in ${
								activeTab === 'teams'
									? 'text-gray-800 bg-white border-b-2 border-[#00BCD4]'
									: 'text-gray-600 bg-gray-50'
							}`}
						>
							Teams
						</button>
					</div>

					{activeTab === 'teams' ? (
						<div className='p-6'>
							<div>
								<button className='w-full py-2 px-5 bg-[#00BCD4] text-white border-none rounded-md text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-[#0097a7] hover:transform hover:-translate-y-px'>
									TRY SKILL HUB TEAMS
								</button>

								<div className='my-8 bg-[rgba(2,197,175,0.05)] p-6 rounded-xl'>
									<div className='flex justify-between items-center mb-6 text-base font-semibold text-[#00BCD4]'>
										<span>Team Size</span>
										<span className='text-xl font-bold'>
											{teamSize} members
										</span>
									</div>

									<div
										ref={sliderContainerRef}
										className='relative h-1.5 bg-[rgba(59,110,145,0.1)] mb-8 rounded cursor-pointer'
										onClick={handleContainerClick}
									>
										<div
											className='absolute h-full rounded bg-gradient-to-r from-[#02C5AF] to-[#13C4CC] transition-all duration-300'
											style={{width: `${positions[currentPosition]}%`}}
										></div>
										<div
											className='absolute top-1/2 w-6 h-6 bg-white border-2 border-[#00BCD4] rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300'
											style={{left: `${positions[currentPosition]}%`}}
											onMouseDown={handleMouseDown}
										></div>
									</div>

									<div className='flex justify-between mt-4 text-sm font-semibold text-[#3B6E91]'>
										{teamSizes.map((size) => (
											<span key={size}>{size}</span>
										))}
									</div>

									<div className='text-center mt-6 pt-5 border-t border-[rgba(59,110,145,0.1)]'>
										<span className='text-3xl font-bold text-[#142E53]'>
											${pricePerUser}
										</span>
										<span className='text-base text-[#3B6E91] ml-1'>
											/user/month
										</span>
									</div>
								</div>

								<div className='text-center my-8 p-5 bg-[rgba(2,197,175,0.05)] rounded-xl border border-[rgba(2,197,175,0.1)]'>
									<div className='text-sm text-[#00BCD4] mb-2'>
										Total Annual Investment
									</div>
									<div className='text-2xl font-bold text-[#00BCD4]'>
										${totalPrice.toFixed(2)}/year
									</div>
								</div>

								<div className='grid gap-4 my-8'>
									{[
										'12,000+ professional courses',
										'120,000 hrs of audio per member',
										'Unlimited standard certificates',
										'5 premium certificates per user',
									].map((feature, index) => (
										<div
											key={index}
											className='flex items-center gap-3 p-3 bg-[rgba(59,110,145,0.03)] rounded-lg transition-all duration-300 hover:bg-[rgba(59,110,145,0.05)]'
										>
											<CheckCircle className='text-[#00BCD4] w-5 h-5' />
											<span className='text-[#142E53] text-sm font-semibold'>
												{feature}
											</span>
										</div>
									))}
								</div>

								<button className='w-full py-4 px-6 bg-gradient-to-r from-[#00BCD4] to-[#13C4CC] text-white border-none rounded-lg text-base font-semibold cursor-pointer uppercase tracking-wider transition-all duration-300 hover:transform hover:-translate-y-px hover:shadow-lg'>
									Try Skill Hub Teams
								</button>

								<p className='text-center text-[#3B6E91] text-sm mt-4'>
									No credit card required
								</p>
							</div>
						</div>
					) : (
						<div className='p-6'>
							<div className='flex items-center gap-3 mb-5'>
								<span className='current-price text-3xl font-bold text-gray-900'>
									$14.99
								</span>
								<span className='text-lg text-gray-500 line-through'>
									$94.99
								</span>
								<span className='text-base font-semibold text-gray-900'>
									85% off
								</span>
							</div>

							<div className='flex items-center gap-2 text-red-700 text-sm mb-4'>
								<Clock className='w-4 h-4' />
								<span>
									<strong>
										{String(timeLeft.minutes).padStart(2, '0')}:
										{String(timeLeft.seconds).padStart(2, '0')}
									</strong>{' '}
									left at this price!
								</span>
							</div>

							<button className='w-full py-4 px-6 mb-3 bg-[#00BCD4] text-white font-semibold rounded hover:bg-[#00acc1] transition-colors'>
								Add to cart
							</button>
							<button className='w-full py-4 px-6 mb-3 bg-[#1C1D1F] text-white font-semibold rounded hover:bg-gray-800 transition-colors'>
								Buy now
							</button>

							<div className='bg-gray-50 border border-gray-200 rounded p-4 my-4'>
								{couponActive ? (
									<div className='flex justify-between items-center'>
										<div className='flex items-center gap-3'>
											<Zap className='text-[#13C4CC] w-5 h-5' />
											<div>
												<span className='font-bold'>40% OFF</span>{' '}
												<span className='bg-blue-50 px-2 py-1 rounded text-sm'>
													BFCPSALE24
												</span>
											</div>
										</div>
										<button
											onClick={handleRemoveCoupon}
											className='text-gray-600 text-xl'
										>
											<X className='w-5 h-5' />
										</button>
									</div>
								) : (
									<div className='space-y-2'>
										<div className='flex gap-2'>
											<Input
												placeholder='Enter coupon code'
												value={couponCode}
												onChange={(e) => setCouponCode(e.target.value)}
												className='flex-1'
											/>
											<Button onClick={handleApplyCoupon} variant='outline'>
												Apply
											</Button>
										</div>
										{couponError && (
											<p className='text-sm text-gray-600'>{couponError}</p>
										)}
									</div>
								)}
							</div>

							<div className='py-6 border-t border-gray-200'>
								<h4 className='font-bold text-lg text-gray-900 mb-4'>
									This Course Includes:
								</h4>
								<div className='space-y-4 features-list'>
									<div className='flex items-center gap-3'>
										<div className='text-[#13C4CC]'>
											<Video className='w-5 h-5' />
										</div>
										<span className='text-gray-900'>
											18 hours of on-demand video
										</span>
									</div>
									<div className='flex items-center gap-3'>
										<div className='text-[#13C4CC]'>
											<FileText className='w-5 h-5' />
										</div>
										<span className='text-gray-900'>10 articles</span>
									</div>
									<div className='flex items-center gap-3'>
										<div className='text-[#13C4CC]'>
											<Smartphone className='w-5 h-5' />
										</div>
										<span className='text-gray-900'>
											Available on iOS and Android
										</span>
									</div>
									<div className=' flex items-center gap-3'>
										<div className='text-[#13C4CC]'>
											<Award className='w-5 h-5' />
										</div>
										<span className='text-gray-900'>
											Certificate of Completion
										</span>
									</div>
									<div className=' flex items-center gap-3'>
										<div className='text-[#13C4CC]'>
											<Users className='w-5 h-5' />
										</div>
										<span className='text-gray-900'>Community Access</span>
									</div>
								</div>
								<button
									className='flex items-center gap-2 text-gray-900 font-semibold mt-4 hover:text-[#00BCD4] transition-colors'
									id='view-more-btn'
								>
									<span>View More</span>
									<ChevronDown className='w-5 h-5' />
								</button>
							</div>

							<div className='relative text-center my-6'>
								<div className='absolute inset-0 flex items-center'>
									<div className='w-full border-t border-gray-200'></div>
								</div>
								<div className='relative'>
									<span className='px-2 bg-white text-gray-500 text-sm font-semibold'>
										Or
									</span>
								</div>
							</div>

							<div className='text-left'>
								<h3 className='text-lg font-bold text-gray-900 mb-3'>
									Subscribe to Skill Hub's top courses
								</h3>
								<p className='text-gray-600 text-sm mb-5'>
									Get this course, plus 12,000+ of our top-rated courses, with
									Personal Plan.
									<a href='#' className='text-[#00BCD4] ml-1'>
										Learn more
									</a>
								</p>
								<button className='w-full py-4 px-6 mb-3 bg-white border border-gray-900 text-gray-900 font-semibold rounded hover:bg-gray-50 transition-colors'>
									Start subscription
								</button>
								<p className='text-gray-600 text-sm text-center'>
									Starting at $20.00 per month • Cancel anytime
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	} else {
		return (
			<div className='relative -mt-5'>
				<header className='bg-[#1B1E2F] text-white pt-5 pb-0 z-0 relative'>
					<div className='container xl:max-w-7xl mx-auto px-4 sm:px-4 xl:px-8'>
						<div className='flex flex-col lg:flex-row justify-between gap-6 xl:gap-10'>
							<div className='max-w-3xl w-[60%] xl:w-full lg:pr-4 xl:pr-16 relative z-10'>
								<div className='flex items-center gap-2 text-xs sm:text-sm mb-4 sm:mb-6 overflow-x-auto'>
									<span>Development</span>
									<span className='text-gray-400'>›</span>
									<span>Programming Language</span>
									<span className='text-gray-400'>›</span>
									<span className='font-semibold'>Data Analysis</span>
								</div>

								<h1 className='text-[#25BCC5] text-3xl lg:text-[2.5rem] font-bold mb-4 sm:mb-6 leading-tight'>
									Learning Python for Data Analysis and Visualization
								</h1>

								<p className='text-white text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed'>
									Learn Python Programming and how to use Python for Data
									Analysis. Includes data analytics, visualization, and more.
								</p>

								<div className='flex flex-wrap items-center gap-3 mb-4 sm:mb-6"'>
									<span className='bg-[#25BCC5] text-white px-3 py-1 rounded text-xs lg:text-sm font-semibold'>
										BEST SELLER
									</span>
									<div className='flex items-center gap-3'>
										<span className='text-[#25BCC5] lg:text-xl font-semibold'>
											4.4
										</span>
										<span className='text-[#25BCC5] lg:text-xl tracking-wider'>
											★★★★☆
										</span>
										<span className='text-[#25BCC5] text-base'>
											(17,706 ratings)
										</span>
									</div>
									<span className='text-[#3b6e91] text-base'>
										189,591 students
									</span>
								</div>

								<div className='py-2 sm:py-4 bg-[#1B1E2F]'>
									<div className='text-gray-400 mb-4 text-sm lg:text-base'>
										Created by{' '}
										<HoverCard openDelay={50} closeDelay={50}>
											<HoverCardTrigger className='text-[#25BCC5] font-semibold'>
												Jose Portilla
											</HoverCardTrigger>
											<HoverCardContent
												className='min-w-sm bg-white'
												side='bottom'
												avoidCollisions={false}
												align='start'
												alignOffset={-90}
											>
												<InstructorProfileCard />
											</HoverCardContent>
										</HoverCard>
									</div>

									<div className='flex flex-col sm:flex-row gap-6 text-gray-400 text-xs lg:text-base'>
										<div className='flex items-center gap-px lg:gap-2'>
											<span className='inline-block size-4 lg:w-5 lg:h-5'>
												<svg
													viewBox='0 0 24 24'
													fill='none'
													className='size-4 lg:size-5'
												>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75ZM2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12Z'
														fill='currentColor'
													/>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M12 6.75C12.4142 6.75 12.75 7.08579 12.75 7.5V12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12V7.5C11.25 7.08579 11.5858 6.75 12 6.75Z'
														fill='currentColor'
													/>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M11.25 12C11.25 11.5858 11.5858 11.25 12 11.25H16.5C16.9142 11.25 17.25 11.5858 17.25 12C17.25 12.4142 16.9142 12.75 16.5 12.75H12C11.5858 12.75 11.25 12.4142 11.25 12Z'
														fill='currentColor'
													/>
												</svg>
											</span>
											<span>Last updated: March 25, 2022</span>
										</div>

										<div className='flex items-center gap-2'>
											<span className='inline-block size-4 lg:size-5'>
												<svg
													width='20'
													height='20'
													color='currentColor'
													viewBox='0 0 24 24'
													fill='none'
												>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M7.5 13.5C7.5 12.2574 8.50736 11.25 9.75 11.25H20.25C21.4926 11.25 22.5 12.2574 22.5 13.5V20.25C22.5 21.4926 21.4926 22.5 20.25 22.5H9.75C8.50736 22.5 7.5 21.4926 7.5 20.25V13.5ZM9.75 12.75C9.33579 12.75 9 13.0858 9 13.5V20.25C9 20.6642 9.33579 21 9.75 21H20.25C20.6642 21 21 20.6642 21 20.25V13.5C21 13.0858 20.6642 12.75 20.25 12.75H9.75Z'
														fill='currentColor'
													></path>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M1.5 3.75C1.5 2.50736 2.50736 1.5 3.75 1.5H14.25C15.4926 1.5 16.5 2.50736 16.5 3.75V8.98125C16.5 9.39546 16.1642 9.73125 15.75 9.73125C15.3358 9.73125 15 9.39546 15 8.98125V3.75C15 3.33579 14.6642 3 14.25 3H3.75C3.33579 3 3 3.33579 3 3.75V10.5C3 10.9142 3.33579 11.25 3.75 11.25H5.25C5.66421 11.25 6 11.5858 6 12C6 12.4142 5.66421 12.75 5.25 12.75H3.75C2.50736 12.75 1.5 11.7426 1.5 10.5V3.75Z'
														fill='currentColor'
													></path>
													<path
														d='M11.9524 9.23985C12.0473 9.48556 11.866 9.75 11.6026 9.75H10.9772C10.8203 9.75 10.6799 9.65224 10.6255 9.505L10.2471 8.48109H7.70762L7.33713 9.50283C7.28334 9.6512 7.14241 9.75 6.98459 9.75H6.39488C6.13188 9.75 5.95058 9.48631 6.04474 9.24075L8.05773 3.99075C8.11333 3.84573 8.25257 3.75 8.40787 3.75H9.57409C9.72904 3.75 9.86804 3.84531 9.92389 3.98985L11.9524 9.23985ZM8.48627 6.31303L8.07925 7.43067H9.85776L9.44189 6.31303C9.28262 5.87605 9.12335 5.42227 8.98178 4.93487H8.94639C8.79596 5.39706 8.63669 5.87605 8.48627 6.31303Z'
														fill='currentColor'
													></path>
													<path
														d='M14.25 15L12.375 15C12.1679 15 12 15.1679 12 15.375L12 16.125C12 16.3321 12.1679 16.5 12.375 16.5H14.2408C14.1972 17.196 14.0001 17.7265 13.6992 18.0848C13.4245 18.4117 13.0088 18.6607 12.3743 18.7304C12.1684 18.753 12 18.9179 12 19.125V19.875C12 20.0821 12.1683 20.2517 12.3748 20.2362C13.4141 20.1584 14.2581 19.7516 14.8477 19.0496C14.9011 18.986 14.9518 18.9207 15 18.8538C15.0482 18.9207 15.0989 18.986 15.1523 19.0496C15.7419 19.7516 16.5859 20.1584 17.6252 20.2362C17.8317 20.2517 18 20.0821 18 19.875V19.125C18 18.9179 17.8316 18.753 17.6257 18.7304C16.9912 18.6607 16.5755 18.4117 16.3008 18.0848C15.9999 17.7265 15.8028 17.196 15.7592 16.5H17.625C17.8321 16.5 18 16.3321 18 16.125L18 15.375C18 15.1679 17.8321 15 17.625 15L15.75 15V13.875C15.75 13.6679 15.5821 13.5 15.375 13.5H14.625C14.4179 13.5 14.25 13.6679 14.25 13.875V15Z'
														fill='currentColor'
													></path>
												</svg>
											</span>
											<span>English</span>
											<svg
												fill='none'
												viewBox='0 0 24 24'
												className='size-4 lg:size-5'
											>
												<path
													fill='currentColor'
													d='M23 24H2V0h21v24zM3.337 22.632h18.326V1.368H3.337v21.264z'
												></path>
												<path
													fill='currentColor'
													d='M18.313 8.647h-4.105v1.14h4.105v-1.14zM18.313 13.093H6.684v1.14h11.63v-1.14zM18.313 17.537H6.684v1.14h11.63v-1.14zM11.34 9.975h1.252L9.89 4.59H9.49l-2.7 5.386h1.252l.343-.684h2.612l.343.684zM8.958 8.151l.733-1.462.733 1.462H8.958z'
												></path>
											</svg>
											<span>English [Auto], Korean [Auto],</span>
											<span className='text-[#25BCC5] underline cursor-pointer'>
												2 more
											</span>
										</div>
									</div>
								</div>
							</div>

							<div className='w-[350px] xl:w-[450px]  absolute top-5 right-0 xl:right-8  z-10'>
								<div className='relative rounded-t-lg  w-full h-[253px] bg-black'>
									<Image
										src='https://i.ibb.co/tK5s859/preview1.jpg'
										alt='Course Preview'
										width={450}
										height={253}
										className='w-full h-full object-cover opacity-80'
									/>
									<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 cursor-pointer'>
										<svg className='w-full h-full' viewBox='0 0 118 118'>
											<g transform='translate(-1260 -363)'>
												<circle
													opacity='0.6'
													fill='#1a1e2e'
													transform='translate(1260 363)'
													r='59'
													cy='59'
													cx='59'
												></circle>
												<path
													fill='#13c4cc'
													transform='translate(1351 394) rotate(90)'
													d='M23.287,9.145a6,6,0,0,1,10.425,0L51.886,41.029A6,6,0,0,1,46.674,50H10.326a6,6,0,0,1-5.213-8.971Z'
												></path>
											</g>
										</svg>
									</div>
								</div>

								<div
									className={`bg-white w-[350px] xl:w-[450px] rounded-b-lg shadow-md z-10 transition-all duration-300 ${
										isFixedVisible ?"fixed top-15" : 'block'
									}`}
								>
									<div className='flex  border-b border-gray-200'>
										<button
											onClick={() => handleTabClick('personal')}
											className={`flex-1 py-4 text-center font-bold transition-all duration-300 ease-in ${
												activeTab === 'personal'
													? 'text-gray-800 bg-white border-b-2 border-[#00BCD4]'
													: 'text-gray-600 bg-gray-50'
											}`}
										>
											Personal
										</button>
										<button
											onClick={() => handleTabClick('teams')}
											className={`flex-1 py-4 text-center font-bold transition-all duration-300 ease-in ${
												activeTab === 'teams'
													? 'text-gray-800 bg-white border-b-2 border-[#00BCD4]'
													: 'text-gray-600 bg-gray-50'
											}`}
										>
											Teams
										</button>
									</div>

									{activeTab === 'teams' ? (
										<div className='p-6'>
											<div>
												<button className='w-full py-2 px-5 bg-[#00BCD4] text-white border-none rounded-md text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-[#0097a7] hover:transform hover:-translate-y-px'>
													TRY SKILL HUB TEAMS
												</button>

												<div className='my-8 bg-[rgba(2,197,175,0.05)] p-6 rounded-xl'>
													<div className='flex justify-between items-center mb-6 text-base font-semibold text-[#00BCD4]'>
														<span>Team Size</span>
														<span className='text-xl font-bold'>
															{teamSize} members
														</span>
													</div>

													<div
														ref={sliderContainerRef}
														className='relative h-1.5 bg-[rgba(59,110,145,0.1)] mb-8 rounded cursor-pointer'
														onClick={handleContainerClick}
													>
														<div
															className='absolute h-full rounded bg-gradient-to-r from-[#02C5AF] to-[#13C4CC] transition-all duration-300'
															style={{width: `${positions[currentPosition]}%`}}
														></div>
														<div
															className='absolute top-1/2 w-6 h-6 bg-white border-2 border-[#00BCD4] rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300'
															style={{left: `${positions[currentPosition]}%`}}
															onMouseDown={handleMouseDown}
														></div>
													</div>

													<div className='flex justify-between mt-4 text-sm font-semibold text-[#3B6E91]'>
														{teamSizes.map((size) => (
															<span key={size}>{size}</span>
														))}
													</div>

													<div className='text-center mt-6 pt-5 border-t border-[rgba(59,110,145,0.1)]'>
														<span className='text-3xl font-bold text-[#142E53]'>
															${pricePerUser}
														</span>
														<span className='text-base text-[#3B6E91] ml-1'>
															/user/month
														</span>
													</div>
												</div>

												<div className='text-center my-8 p-5 bg-[rgba(2,197,175,0.05)] rounded-xl border border-[rgba(2,197,175,0.1)]'>
													<div className='text-sm text-[#00BCD4] mb-2'>
														Total Annual Investment
													</div>
													<div className='text-2xl font-bold text-[#00BCD4]'>
														${totalPrice.toFixed(2)}/year
													</div>
												</div>

												<div className='grid gap-4 my-8'>
													{[
														'12,000+ professional courses',
														'120,000 hrs of audio per member',
														'Unlimited standard certificates',
														'5 premium certificates per user',
													].map((feature, index) => (
														<div
															key={index}
															className='flex items-center gap-3 p-3 bg-[rgba(59,110,145,0.03)] rounded-lg transition-all duration-300 hover:bg-[rgba(59,110,145,0.05)]'
														>
															<CheckCircle className='text-[#00BCD4] w-5 h-5' />
															<span className='text-[#142E53] text-sm font-semibold'>
																{feature}
															</span>
														</div>
													))}
												</div>

												<button className='w-full py-4 px-6 bg-gradient-to-r from-[#00BCD4] to-[#13C4CC] text-white border-none rounded-lg text-base font-semibold cursor-pointer uppercase tracking-wider transition-all duration-300 hover:transform hover:-translate-y-px hover:shadow-lg'>
													Try Skill Hub Teams
												</button>

												<p className='text-center text-[#3B6E91] text-sm mt-4'>
													No credit card required
												</p>
											</div>
										</div>
									) : (
										<div className='p-6'>
											<div className='flex items-center gap-3 mb-5'>
												<span className='current-price text-3xl font-bold text-gray-900'>
													$14.99
												</span>
												<span className='text-lg text-gray-500 line-through'>
													$94.99
												</span>
												<span className='text-base font-semibold text-gray-900'>
													85% off
												</span>
											</div>

											<div className='flex items-center gap-2 text-red-700 text-sm mb-4'>
												<Clock className='w-4 h-4' />
												<span>
													<strong>
														{String(timeLeft.minutes).padStart(2, '0')}:
														{String(timeLeft.seconds).padStart(2, '0')}
													</strong>{' '}
													left at this price!
												</span>
											</div>

											<button className='w-full py-4 px-6 mb-3 bg-[#00BCD4] text-white font-semibold rounded hover:bg-[#00acc1] transition-colors'>
												Add to cart
											</button>
											<button className='w-full py-4 px-6 mb-3 bg-[#1C1D1F] text-white font-semibold rounded hover:bg-gray-800 transition-colors'>
												Buy now
											</button>

											<div className='bg-gray-50 border border-gray-200 rounded p-4 my-4'>
												{couponActive ? (
													<div className='flex justify-between items-center'>
														<div className='flex items-center gap-3'>
															<Zap className='text-[#13C4CC] w-5 h-5' />
															<div>
																<span className='font-bold text-gray-900'>
																	40% OFF
																</span>{' '}
																<span className='bg-blue-50 px-2 py-1 rounded text-sm text-gray-900'>
																	BFCPSALE24
																</span>
															</div>
														</div>
														<button
															onClick={handleRemoveCoupon}
															className='text-gray-600 text-xl'
														>
															<X className='w-5 h-5' />
														</button>
													</div>
												) : (
													<div className='space-y-2'>
														<div className='flex gap-2'>
															<Input
																placeholder='Enter coupon code'
																value={couponCode}
																onChange={(e) => setCouponCode(e.target.value)}
																className='flex-1 text-gray-900'
															/>
															<Button
																onClick={handleApplyCoupon}
																variant='outline'
																className='text-gray-600 hover:text-gray-800'
															>
																Apply
															</Button>
														</div>
														{couponError && (
															<p className='text-sm text-gray-600'>
																{couponError}
															</p>
														)}
													</div>
												)}
											</div>

											<div className='py-6 border-t border-gray-200'>
												<h4 className='font-bold text-lg text-gray-900 mb-4'>
													This Course Includes:
												</h4>
												<div className='space-y-4 features-list'>
													<div className='flex items-center gap-3'>
														<div className='text-[#13C4CC]'>
															<Video className='w-5 h-5' />
														</div>
														<span className='text-gray-900'>
															18 hours of on-demand video
														</span>
													</div>
													<div className='flex items-center gap-3'>
														<div className='text-[#13C4CC]'>
															<FileText className='w-5 h-5' />
														</div>
														<span className='text-gray-900'>10 articles</span>
													</div>
													<div className='flex items-center gap-3'>
														<div className='text-[#13C4CC]'>
															<Smartphone className='w-5 h-5' />
														</div>
														<span className='text-gray-900'>
															Available on iOS and Android
														</span>
													</div>
													<div className=' flex items-center gap-3'>
														<div className='text-[#13C4CC]'>
															<Award className='w-5 h-5' />
														</div>
														<span className='text-gray-900'>
															Certificate of Completion
														</span>
													</div>
													<div className=' flex items-center gap-3'>
														<div className='text-[#13C4CC]'>
															<Users className='w-5 h-5' />
														</div>
														<span className='text-gray-900'>
															Community Access
														</span>
													</div>
												</div>
												<button
													className='flex items-center gap-2 text-gray-900 font-semibold mt-4 hover:text-[#00BCD4] transition-colors'
													id='view-more-btn'
												>
													<span>View More</span>
													<ChevronDown className='w-5 h-5' />
												</button>
											</div>

											<div className='relative text-center my-6'>
												<div className='absolute inset-0 flex items-center'>
													<div className='w-full border-t border-gray-200'></div>
												</div>
												<div className='relative'>
													<span className='px-2 bg-white text-gray-500 text-sm font-semibold'>
														Or
													</span>
												</div>
											</div>

											<div className='text-left'>
												<h3 className='text-lg font-bold text-gray-900 mb-3'>
													Subscribe to Skill Hub's top courses
												</h3>
												<p className='text-gray-600 text-sm mb-5'>
													Get this course, plus 12,000+ of our top-rated
													courses, with Personal Plan.
													<a href='#' className='text-[#00BCD4] ml-1'>
														Learn more
													</a>
												</p>
												<button className='w-full py-4 px-6 mb-3 bg-white border border-gray-900 text-gray-900 font-semibold rounded hover:bg-gray-50 transition-colors'>
													Start subscription
												</button>
												<p className='text-gray-600 text-sm'>
													Starting at $20.00 per month • Cancel anytime
												</p>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</header>
			</div>
		);
	}
}

const InstructorProfileCard = () => {
	return (
		<div className=''>
			{/* Header Section */}
			<div className='flex justify-between items-start mb-6'>
				<div>
					<h2 className='text-2xl font-bold text-gray-800 mb-1'>
						Jose Portilla
					</h2>
					<p className='text-gray-500 text-sm mb-3'>
						Instructor | Education | Coach
					</p>
					<p className='text-gray-700 text-sm leading-relaxed'>
						Lead Data Science Instructor and consultant with expertise in
						Python, Machine Learning, and Web Development. Teaching over 1
						million students worldwide.
					</p>
				</div>
				<div className='bg-blue-200 rounded-full w-16 h-16 flex-shrink-0'>
					<Image
						src='https://i.ibb.co/N5kLzSd/AVATAR-couponcodefinder.jpg'
						alt='Jose Portilla'
						width={64}
						height={64}
						className='rounded-full w-full h-full'
					/>
				</div>
			</div>

			{/* Action Buttons */}
			<div className='flex items-center gap-1 mb-6'>
				<button className='bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md w-full text-center'>
					View Profile
				</button>
				<button className=' hover:bg-gray-200 text-gray-600 p-2 rounded-md'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						className='w-6 h-6'
					>
						<path
							fill='#4F4F4F'
							d='M5.64124 3.64124C6.53204 2.75044 7.74022 2.25 9 2.25C10.2598 2.25 11.468 2.75044 12.3588 3.64124C13.2496 4.53204 13.75 5.74022 13.75 7C13.75 8.25978 13.2496 9.46796 12.3588 10.3588C11.468 11.2496 10.2598 11.75 9 11.75C7.74022 11.75 6.53204 11.2496 5.64124 10.3588C4.75044 9.46796 4.25 8.25978 4.25 7C4.25 5.74022 4.75044 4.53204 5.64124 3.64124ZM9 3.75C8.13805 3.75 7.3114 4.09241 6.7019 4.7019C6.09241 5.3114 5.75 6.13805 5.75 7C5.75 7.86195 6.09241 8.6886 6.7019 9.2981C7.3114 9.90759 8.13805 10.25 9 10.25C9.86195 10.25 10.6886 9.90759 11.2981 9.2981C11.9076 8.6886 12.25 7.86195 12.25 7C12.25 6.13805 11.9076 5.3114 11.2981 4.7019C10.6886 4.09241 9.86195 3.75 9 3.75ZM15.2734 2.94385C15.3762 2.54258 15.7848 2.30058 16.186 2.40332C17.2078 2.66493 18.1134 3.25915 18.7601 4.09231C19.4068 4.92547 19.7578 5.95018 19.7578 7.00488C19.7578 8.05959 19.4068 9.08429 18.7601 9.91745C18.1134 10.7506 17.2078 11.3448 16.186 11.6064C15.7848 11.7092 15.3762 11.4672 15.2734 11.0659C15.1707 10.6646 15.4127 10.2561 15.814 10.1533C16.5131 9.97433 17.1327 9.56775 17.5752 8.99769C18.0177 8.42763 18.2578 7.72652 18.2578 7.00488C18.2578 6.28324 18.0177 5.58213 17.5752 5.01207C17.1327 4.44201 16.5131 4.03544 15.814 3.85645C15.4127 3.7537 15.1707 3.34512 15.2734 2.94385ZM7 15.75C6.13805 15.75 5.3114 16.0924 4.7019 16.7019C4.09241 17.3114 3.75 18.138 3.75 19V21C3.75 21.4142 3.41421 21.75 3 21.75C2.58579 21.75 2.25 21.4142 2.25 21V19C2.25 17.7402 2.75044 16.532 3.64124 15.6412C4.53204 14.7504 5.74022 14.25 7 14.25H10C10.4142 14.25 10.75 14.5858 10.75 15C10.75 15.4142 10.4142 15.75 10 15.75H7Z'
							clipRule='evenodd'
							fillRule='evenodd'
						></path>
						<path
							fill='#4F4F4F'
							d='M16.4825 13.0684C16.7409 13.0684 16.9811 13.2014 17.1182 13.4205L18.3027 15.3131L20.4686 15.8547C20.7194 15.9174 20.9201 16.1047 21 16.3505C21.0799 16.5963 21.0276 16.8659 20.8616 17.064L19.4276 18.7753L19.5818 21.0026C19.5997 21.2604 19.4835 21.5093 19.2745 21.6612C19.0654 21.8131 18.7928 21.8466 18.5531 21.75L16.4825 20.915L14.4118 21.75C14.1721 21.8466 13.8996 21.8131 13.6905 21.6612C13.4814 21.5093 13.3653 21.2604 13.3831 21.0026L13.5374 18.7753L12.1034 17.064C11.9374 16.8659 11.8851 16.5963 11.965 16.3505C12.0448 16.1047 12.2456 15.9174 12.4963 15.8547L14.6623 15.3131L15.8467 13.4205C15.9838 13.2014 16.224 13.0684 16.4825 13.0684ZM16.4825 15.2321L15.7734 16.3652C15.6705 16.5297 15.5078 16.6479 15.3196 16.6949L14.0228 17.0192L14.8813 18.0437C15.0059 18.1924 15.0681 18.3836 15.0547 18.5772L14.9623 19.9107L16.202 19.4108C16.3819 19.3382 16.583 19.3382 16.763 19.4108L18.0026 19.9107L17.9103 18.5772C17.8969 18.3836 17.959 18.1924 18.0836 18.0437L18.9421 17.0192L17.6454 16.6949C17.4572 16.6479 17.2945 16.5297 17.1916 16.3652L16.4825 15.2321Z'
							clipRule='evenodd'
							fillRule='evenodd'
						></path>
					</svg>
				</button>
			</div>

			{/* Stats Section */}
			<div className=' grid grid-cols-2 gap-4 mb-6'>
				<div className='flex items-center gap-3 rounded-b-md  bg-accent p-2'>
					<div className='text-blue-400'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
							/>
						</svg>
					</div>
					<div>
						<div className='font-bold text-gray-800'>4.8</div>
						<div className='text-xs text-gray-500'>Instructor Rating</div>
					</div>
				</div>
				<div className='flex items-center gap-3 rounded-b-md  bg-accent p-2'>
					<div className='text-blue-400'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
							/>
						</svg>
					</div>
					<div>
						<div className='font-bold text-gray-800'>263,854</div>
						<div className='text-xs text-gray-500'>Students</div>
					</div>
				</div>
				<div className='flex items-center gap-3 rounded-md bg-accent p-2'>
					<div className='text-blue-400'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
							/>
						</svg>
					</div>
					<div>
						<div className='font-bold text-gray-800'>135,182</div>
						<div className='text-xs text-gray-500'>Reviews</div>
					</div>
				</div>
				<div className='flex items-center gap-3 rounded-md bg-accent p-2'>
					<div className='text-blue-400'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
							/>
						</svg>
					</div>
					<div>
						<div className='font-bold text-gray-800'>36</div>
						<div className='text-xs text-gray-500'>Courses</div>
					</div>
				</div>
			</div>

			{/* Divider */}
			<div className='h-px bg-gray-200 mb-4'></div>

			{/* Courses Section */}
			<div className='flex justify-between items-center mb-4'>
				<h3 className='font-semibold text-gray-600'>COURSES</h3>
				<a href='#' className='text-blue-400 font-semibold text-sm'>
					See all (42)
				</a>
			</div>

			{/* Course Thumbnails */}
			<div className='flex gap-2'>
				<div className='w-12 h-12 rounded-md grid place-items-center overflow-hidden bg-accent'>
					<Image
						src={CourseImg1}
						alt='Course'
						width={40}
						height={40}
						className='rounded-md '
					/>
				</div>
				<div className='w-12 h-12 rounded-md overflow-hidden bg-accent'>
					<Image
						src={CourseImg2}
						alt='Course'
						width={40}
						height={40}
						className='rounded-md'
					/>
				</div>
				<div className='w-12 h-12 rounded-md overflow-hidden bg-accent'>
					<Image
						src={CourseImg3}
						alt='Course'
						width={40}
						height={40}
						className='rounded-md'
					/>
				</div>
				<div className='w-12 h-12 rounded-md overflow-hidden bg-accent'>
					<Image
						src={CourseImg4}
						alt='Course'
						width={40}
						height={40}
						className='rounded-md'
					/>
				</div>
				<div className='w-12 h-12 rounded-md overflow-hidden bg-accent'>
					<Image
						src={CourseImg5}
						alt='Course'
						width={40}
						height={40}
						className='rounded-md'
					/>
				</div>
			</div>
		</div>
	);
};

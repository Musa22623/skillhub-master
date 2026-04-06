/** @format */

'use client';
import type {StaticImageData} from 'next/image';
import {useState} from 'react';
import Image from 'next/image';
import {Button} from '../../ui/button';
import {Card, CardContent, CardHeader} from '../../ui/card';
import {Input} from '../../ui/input';
import img2 from '@/assets/img2.jpg';
import img3 from '@/assets/img3.png';
import img4 from '@/assets/c4.jpg';
import img5 from '@/assets/img5.jpg';
import news from '@/assets/news.png';
import {
	StudentIcon,
	BookIcon,
	ClockIcon,
	AdvanceIcon,
	ArrowIcon,
	RemoveIcon,
	CalendarSvg,
	UserSVG,
	ChatIcon,
	PremiumIcon,
	SpaceIcon,
	CertificateSvg,
	MoneyIcon,
	PrivacyIcon,
	LockIcon,
} from '@/app/components/svg';
import {useIsMobile} from '@/hooks/use-mobile';
import {Check} from 'lucide-react';

// Define a type for SVG components
type SvgIconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

type CartItem = {
	id: string;
	title: string;
	instructor: string;
	image: StaticImageData;
	rating: number;
	icons: {
		book: SvgIconComponent;
		student: SvgIconComponent;
		clock: SvgIconComponent;
		advance: SvgIconComponent;
	};
	duration: string;
	materials: string;
	students: string;
	level: string;
	originalPrice: number;
	currentPrice: number;
	isFree: boolean;
	category: string;
};

export default function Checkout() {
	const [cartItems, setCartItems] = useState<CartItem[]>([
		{
			id: '1',
			title: 'The Gesture Course',
			instructor: 'Michael Hampton',
			image: img5,
			rating: 4.8,
			icons: {
				book: BookIcon,
				student: StudentIcon,
				clock: ClockIcon,
				advance: AdvanceIcon,
			},
			duration: '16h',
			materials: '2.5h',
			students: '695',
			level: 'Advanced',
			originalPrice: 99.0,
			currentPrice: 0,
			isFree: true,
			category: 'Course',
		},
		{
			id: '2',
			title: 'Expert Mentoring Sessions',
			instructor: ' Sarah Johnson',
			image: img2,
			rating: 4.9,
			icons: {
				book: CalendarSvg,
				student: StudentIcon,
				clock: ClockIcon,
				advance: AdvanceIcon,
			},
			duration: '',
			materials: 'Dec 5, 2024',
			students: '695',
			level: 'Advanced',
			originalPrice: 249.0,
			currentPrice: 179.0,
			isFree: true,
			category: 'Meeting',
		},
		{
			id: '3',
			title: 'Artist Community Hub',
			instructor: 'Creative Team',
			image: img3,
			rating: 4.7,
			icons: {
				book: ChatIcon,
				student: SpaceIcon,
				clock: UserSVG,
				advance: AdvanceIcon,
			},
			duration: '3.2k',
			materials: '697',
			students: '9',
			level: '',
			originalPrice: 99.0,
			currentPrice: 84.15,
			isFree: true,
			category: 'Community',
		},
		{
			id: '4',
			title: 'Professional Art Certification',
			instructor: 'Art Institute',
			image: img4,
			rating: 4.9,
			icons: {
				book: StudentIcon,
				student: StudentIcon,
				clock: PremiumIcon,
				advance: AdvanceIcon,
			},
			duration: 'Priemium',
			materials: '67',
			students: '',
			level: '',
			originalPrice: 399.0,
			currentPrice: 199.2,
			isFree: true,
			category: 'Certification',
		},
		{
			id: '5',
			title: 'Complete Art Mastery Bundle',
			instructor: 'Expert Team',
			image: img3,
			rating: 4.9,
			icons: {
				book: SpaceIcon,
				student: StudentIcon,
				clock: CertificateSvg,
				advance: CalendarSvg,
			},
			duration: '269',
			materials: '30',
			students: '',
			level: 'Nov 1, 2025',
			originalPrice: 999.0,
			currentPrice: 699.3,
			isFree: true,
			category: 'Bundle',
		},
		{
			id: '6',
			title: 'Premium Art Hub Subscription',
			instructor: 'All-Access Pass',
			image: news,
			rating: 5.0,
			icons: {
				book: SpaceIcon,
				student: StudentIcon,
				clock: CertificateSvg,
				advance: CalendarSvg,
			},
			duration: '269',
			materials: '30',
			students: '',
			level: 'Nov 1, 2025',
			originalPrice: 19.99,
			currentPrice: 0,
			isFree: true,
			category: 'Subscription',
		},

		{
			id: '7',
			title: 'Team 50',
			instructor: '50 Team Members',
			image: img5,
			rating: 4.9,
			icons: {
				book: BookIcon,
				student: StudentIcon,
				clock: ClockIcon,
				advance: AdvanceIcon,
			},
			duration: '50h',
			materials: '75',
			students: '9 members',
			level: '',
			originalPrice: 999.0,
			currentPrice: 699.3,
			isFree: true,
			category: 'Team',
		},
	]);

	const getCategoryStyles = (category: string) => {
		switch (category) {
			case 'Course':
				return 'bg-[#DBE9FF] text-blue-700';
			case 'Meeting':
				return 'bg-[#FFEBEB] text-red-700';

			case 'Community':
				return 'bg-[#FFF8E0] text-amber-700';

			case 'Certification':
				return 'bg-[#E5F8E5] text-green-700';
			case 'Bundle':
				return 'bg-[#D3D3D3] text-gray-700';
			case 'Subscription':
				return 'bg-[#D3D3D3] text-gray-700';
			default:
				return 'bg-[#D3D3D3] text-gray-700';
		}
	};

	const removeItem = (id: string) => {
		setCartItems((items) => items.filter((item) => item.id !== id));
	};

	const subtotal = cartItems.reduce((acc, item) => acc + item.originalPrice, 0);
	const bundleDiscount = 299.7;
	const specialOffers = 149.0;
	const total = subtotal - bundleDiscount - specialOffers;
	const isMobile = useIsMobile();
	if (isMobile) {
		return (
			<div className='container mx-auto min-h-screen space-y-6 mb-20 px-2'>
				
					<Card className='shadow-sm'>
						<CardContent>
							<h2 className='mb-6 text-2xl font-semibold '>Shopping Cart</h2>

							{cartItems.slice(3, 5).map((item) => (
								<div
									key={item.id}
									className='bg-white border rounded-lg mb-6 overflow-hidden'
								>
									<div className='flex gap-4  p-4'>
										<div className='w-[72px] h-[40px] rounded-md overflow-hidden relative flex-none'>
											<Image
												src={item.image}
												alt={item.title}
												width={72}
												height={40}
												className='object-cover'
											/>
										</div>
										<div className='flex flex-1'>
											<div>
												<h3 className='text-base font-semibold'>
													{item.title}
												</h3>
												<p className='text-gray-500 font-semibold text-sm mt-1'>
													{item.category === 'Course' && 'Course by '}
													{item.category === 'Meeting' && 'With'}
													{item.category === 'Community' && 'Moderated by'}
													{item.category === 'Certification' &&
														'Accredited by '}
													{item.category === 'Bundle' && 'Curated by '}
													{item.category === 'Subscription' && ''}
													{item.category === 'Team' && ''}
													{item.instructor}
												</p>
											</div>

											<div className='flex self-start items-center gap-1 text-xs ml-auto'>
												<span className='text-teal-500 text-xl'>★</span>
												<span>{item.rating}</span>
											</div>
										</div>
									</div>

									<div className='px-4 space-y-2 border-b pb-4'>
										<div className='flex items-center gap-4'>
											<div className='rounded border p-1 bg-teal-500 w-fit'>
												<Check className='size-4 text-white' />
											</div>

											<p className='font-semibold text-sm'>
												Understanding Perspective
											</p>
											<p className='text-teal-500 text-sm font-semibold ml-auto'>
												Included
											</p>
										</div>
										<div className='flex items-center gap-4'>
											<div className='rounded border p-1 bg-teal-500 w-fit'>
												<Check className='size-4 text-white' />
											</div>

											<p className='font-semibold text-sm'>
												Mastering the Skills
											</p>
											<p className='text-teal-500 text-sm font-semibold ml-auto'>
												Included
											</p>
										</div>
									</div>

									<div className='p-4 space-y-6'>
										{/* First container with gray background - 75% */}
										<div className='flex flex-col gap-4 rounded-md bg-gray-100 p-4'>
											<div className='flex items-center justify-between gap-2'>
												<span className='font-bold rounded px-2 py-3 text-sm text-white bg-teal-500'>
													FREE
												</span>

												<div className='flex flex-col items-center'>
													<span className='font-semibold text-base ml-auto'>
														${item.currentPrice.toFixed(2)}
													</span>
													{item.originalPrice > item.currentPrice && (
														<span className='text-gray-600 text-sm line-through'>
															Was ${item.originalPrice.toFixed(2)}
														</span>
													)}
												</div>
											</div>

											<hr />

											<Button className='bg-[#009ECB] hover:bg-sky-600 text-white text-sm py-3 px-3 h-9 rounded font-semibold'>
												Checkout <ArrowIcon className='size-5 text-gray-300' />
											</Button>
										</div>

										{/* Second container with white background - 25% */}

										<button
											className='text-gray-600 text-sm flex items-center gap-1'
											onClick={() => removeItem(item.id)}
										>
											<RemoveIcon className='size-5' />
											<span>Remove</span>
										</button>
									</div>
								</div>
							))}

							<p className='text-gray-600 text-center text-sm mt-4'>
								Each item in your cart needs to be checked out separately
							</p>
						</CardContent>
					</Card>

					<Card className='shadow-sm'>
						<CardContent>
							<CardHeader className='px-0 mb-4  flex items-center justify-between'>
								<h2 className='text-xl font-semibold'>ORDER SUMMARY</h2>
								<p className='text-gray-600 text-sm '>
									{cartItems.length} ITEMS
								</p>
							</CardHeader>

							<div className='space-y-2 text-sm'>
								<div className='flex justify-between'>
									<span className='text-black-500 font-semibold text-sm'>
										Subtotal:
									</span>
									<span>${subtotal.toFixed(2)}</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-black-500 font-semibold text-sm'>
										Bundle Discount:
									</span>
									<span className='text-teal-500'>
										-${bundleDiscount.toFixed(2)}
									</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-black-500 font-semibold text-sm'>
										Special Offers:
									</span>
									<span className='text-teal-500'>
										-${specialOffers.toFixed(2)}
									</span>
								</div>

								<div className='border-t-1 border-t-gray my-4 pt-3 font-semibold flex justify-between'>
									<span className='text-black-500 font-semibold text-xl'>
										Total price:
									</span>
									<span className='text-xl'>${total.toFixed(2)}</span>
								</div>
							</div>

							<input 
								placeholder='Enter your email'
								type='email'
								className='text-sm border w-full rounded-md p-3'
							/>

							<button className='w-full bg-teal-500 rounded-md font-semibold hover:bg-teal-600 text-white mt-4  p-3  text-sm'>
								ENROLL
							</button>
						</CardContent>
					</Card>

					<div className=' bg-white rounded-lg shadow-sm p-4'>
						<div className='flex flex-col  gap-6 '>
							{/* Return Policy */}
							<div className='flex items-center gap-4'>
								<MoneyIcon className=' text-gray-600 w-6 h-6 mt-1' />
								<div>
									<h3 className='text-lg font-semibold text-gray-900'>
										Return Policy
									</h3>
									<p className='text-gray-600 text-sm'>
										100% MONEY BACK GUARANTEE
									</p>
								</div>
							</div>

							{/* Confidentiality */}
							<div className='flex items-center gap-4'>
								<PrivacyIcon className='text-gray-600 w-6 h-6 mt-1' />
								<div>
									<h3 className='text-lg font-semibold text-gray-900'>
										Confidentiality
									</h3>
									<p className='text-gray-600 text-sm'>
										SKILL HUB PROTECTS YOUR PRIVACY
									</p>
								</div>
							</div>

							{/* Data Protection */}
							<div className='flex items-center gap-4'>
								<LockIcon className='text-gray-600 w-6 h-6 mt-1' />
								<div>
									<h3 className='text-lg font-semibold text-gray-900'>
										Data Protection
									</h3>
									<p className='text-gray-600 text-sm'>
										YOUR INFORMATION IS SECURE
									</p>
								</div>
							</div>
						</div>

						<hr className='border-gray-200 my-4' />

						<p className='text-center text-gray-600 text-sm'>
							Have questions? Feel free to{' '}
							<a href='#' className='text-sky-500 hover:underline'>
								contact us
							</a>
							.
						</p>
					</div>
				</div>
			
		);
	} else {
		return (
			<div className='container mx-auto p-8 min-h-screen'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					<div className='lg:col-span-2'>
						<Card className='shadow-sm'>
							<CardContent className='p-6'>
								<h2 className='mb-6 text-2xl font-semibold '>Shopping Cart</h2>

								{cartItems.map((item) => (
									<div
										key={item.id}
										className='bg-white border rounded-lg mb-6 overflow-hidden'
									>
										<div className='flex items-start p-6 gap-4'>
											<div className='flex-shrink-0'>
												{typeof item.image === 'string' ? (
													<Image
														src={item.image}
														alt={item.title}
														width={120}
														height={120}
														className='rounded-md object-cover'
													/>
												) : (
													<Image
														src={item.image}
														alt={item.title}
														width={120}
														height={68}
														className='rounded-md object-cover'
													/>
												)}
											</div>
											<div className='flex-grow'>
												<div className='flex justify-between'>
													<h3 className='text-base font-semibold'>
														{item.title}
													</h3>
													<div className='flex items-center gap-1 bg-gray-100 px-4 py-1 rounded-full text-xs'>
														<span className='text-teal-500 text-xl'>★</span>
														<span>{item.rating}</span>
													</div>
												</div>
												<p className='text-gray-500 font-semibold text-sm mt-1'>
													{item.category === 'Course' && 'Course by '}
													{item.category === 'Meeting' && 'With'}
													{item.category === 'Community' && 'Moderated by'}
													{item.category === 'Certification' &&
														'Accredited by '}
													{item.category === 'Bundle' && 'Curated by '}
													{item.category === 'Subscription' && ''}
													{item.category === 'Team' && ''}
													{item.instructor}
												</p>
												<div className='mt-2 flex flex-wrap gap-2'>
													<span
														className={`${getCategoryStyles(
															item.category
														)} text-xs font-bold px-3 py-1 rounded-full`}
													>
														{item.category}
													</span>
													<div className='flex text-xs text-gray-600 gap-3 flex-wrap'>
														{item.duration && (
															<span className='flex items-center gap-2'>
																<item.icons.clock className='w-4 h-4' />{' '}
																{/* Render clock icon */}
																{item.duration}
															</span>
														)}

														{item.materials && (
															<span className='flex items-center gap-2'>
																<item.icons.book className='w-4 h-4' />{' '}
																{/* Render book icon */}
																{item.materials}
															</span>
														)}
														{item.students && (
															<span className='flex items-center gap-2'>
																<item.icons.student className='w-4 h-4' />{' '}
																{/* Render student icon */}
																{item.students}
															</span>
														)}
														{item.level && (
															<span className='flex items-center gap-2'>
																<item.icons.advance className='w-4 h-4' />{' '}
																{/* Render advance icon */}
																{item.level}
															</span>
														)}
													</div>
												</div>
											</div>
										</div>

										<div className='flex flex-row p-4'>
											{/* First container with gray background - 75% */}
											<div className='flex justify-between items-center bg-gray-100 rounded-md p-5 w-5/4'>
												<div className='flex items-center gap-2'>
													<span className='font-bold rounded-md px-3 py-2 text-sm text-white bg-teal-500'>
														FREE
													</span>

													<div className='flex items-center gap-2'>
														<span className='font-semibold text-base'>
															${item.currentPrice.toFixed(2)}
														</span>
														{item.originalPrice > item.currentPrice && (
															<span className='text-gray-600 text-sm line-through'>
																Was ${item.originalPrice.toFixed(2)}
															</span>
														)}
													</div>
												</div>

												<Button className='bg-[#009ECB] hover:bg-sky-600 text-white text-sm py-1 px-3 h-9 rounded font-bold'>
													Checkout{' '}
													<ArrowIcon className='size-5 text-gray-300' />
												</Button>
											</div>

											{/* Second container with white background - 25% */}
											<div className='flex justify-end items-center bg-white p-3 border-l border-gray-200 w-1/4'>
												<button
													className='text-gray-600 text-sm flex items-center gap-1'
													onClick={() => removeItem(item.id)}
												>
													<RemoveIcon className='size-5' />
													Remove
												</button>
											</div>
										</div>

										{/* <div className="flex items-center gap-4 text-xs px-4 py-2 border-t bg-accent">
                <div className="flex gap-4 items-center justify-between">
                  <div>
                    <IncludeIcon />
                  </div>

                  <div className="font-semibold flex items-center gap-1">
                    <span className="font-normal mr-2">Include</span>
                    <span>Standard Certificate</span>
                    <div className="size-1 rounded-full bg-black"></div>
                    <span>Primium Certificate</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center justify-between">
                  <div>
                    <IncludeIcon />
                  </div>

                  <div className="font-semibold flex items-center gap-1">
                  <span className="font-normal mr-2">Include</span>
                    <span>Prompt Engineering Hub</span>
                    <div className="w-px h-3.5 bg-black"></div>
                    <span>5 spaces</span>
                  </div>
                </div>
              </div> */}

										<div className='bg-gray-50 px-3 py-4 border-t border-gray-200'>
											<div className='flex flex-wrap gap-6 text-xs items-center'>
												{/* ID 1: Certificates + Prompt Hub */}
												{item.id === '1' && (
													<>
														{/* First Block */}
														<div className='flex gap-3 items-center'>
															<div className='border-2 border-teal-500 rounded-full'>
																<CertificateSvg
																	className='size-5 p-0.5'
																	fill='#009688'
																/>
															</div>
															<div className='flex items-center gap-1 font-semibold'>
																<span className='font-normal text-gray-600'>
																	Includes
																</span>
																<span>Standard Certificate</span>
																<div className='size-1 rounded-full bg-black'></div>
																<span>Premium Certificate</span>
															</div>
														</div>

														{/* Second Block */}
														<div className='flex gap-3 items-center '>
															<div className='border-2 border-teal-500 p-1 rounded-full'>
																<ChatIcon className='size-3 text-teal-500' />
															</div>
															<div className='flex items-center gap-1 font-semibold'>
																<span className='font-normal text-gray-600'>
																	Includes
																</span>
																<span>Prompt Engineering Hub</span>
																<div className='w-px h-3.5 bg-black'></div>
																<span>5 spaces</span>
															</div>
														</div>
													</>
												)}

												{/* ID 2 */}
												{item.id === '2' && (
													<>
														{/* First Block */}
														<div className='flex gap-3 items-center'>
															<div className='border-2 border-teal-500 p-0.5 rounded-full'>
																<CertificateSvg
																	className='size-4'
																	fill='#009688'
																/>
															</div>
															<div className='flex items-center gap-1 font-semibold'>
																<span className='font-normal text-gray-600'>
																	Includes
																</span>
																<span>Standard Certificate</span>
																<div className='size-1 rounded-full bg-black'></div>
																<span>Premium Certificate</span>
															</div>
														</div>

														{/* Second Block (optional - example content) */}
														<div className='flex gap-3 items-center'>
															<div className='border-2 border-teal-500 p-1 rounded-full'>
																<ChatIcon className='size-3 text-teal-500' />
															</div>
															<div className='flex items-center gap-1 font-semibold'>
																<span className='font-normal text-gray-600'>
																	Includes
																</span>
																<span>Prompt Engineering Hub</span>
																<div className='w-px h-3.5 bg-black'></div>
																<span>5 spaces</span>
															</div>
														</div>
													</>
												)}

												{/* ID 3 */}
												{item.id === '3' && (
													<>
														{/* First Block */}
														<div className='flex gap-3 items-center'>
															<div className='border-2 border-teal-500 p-0.5 rounded-full'>
																<SpaceIcon className='size-3' fill='#009688' />
															</div>

															<div className='flex items-center gap-1 font-semibold'>
																<span className='font-normal text-gray-600'>
																	Includes
																</span>
																<span>Live Events</span>
																<div className='size-1 rounded-full bg-black'></div>
																<span> Weekly Challenges</span>
																<div className='size-1 rounded-full bg-black'></div>
																<span> Private Forums</span>
															</div>
														</div>
													</>
												)}
												{/* ID 4 */}
												{item.id === '4' && (
													<>
														{/* First Block */}
														<div className='flex gap-3 items-center'>
															<div className='border-2 border-teal-500 p-0.5 rounded-full'>
																<CertificateSvg
																	className='size-4'
																	fill='#009688'
																/>
															</div>
															<div className='flex items-center gap-1 font-semibold'>
																<span className='font-normal text-gray-600'>
																	Includes
																</span>
																<span>Standard Certificate</span>
																<div className='size-1 rounded-full bg-black'></div>
																<span>Premium Certificate</span>
															</div>
														</div>
													</>
												)}

												{/* ID 5 */}
												{item.id === '5' && (
													<>
														{/* First Block */}
														<div className='flex gap-3 items-center'>
															<div className='border-2 border-teal-500 p-0.5 rounded-full'>
																<CertificateSvg
																	className='size-4'
																	fill='#009688'
																/>
															</div>
															<div className='flex items-center gap-1 font-semibold'>
																<span className='font-normal text-gray-600'>
																	Includes
																</span>
																<span>Standard Certificate</span>
																<div className='size-1 rounded-full bg-black'></div>
																<span>Premium Certificate</span>
															</div>
														</div>

														{/* Second Block */}
														<div className='flex gap-3 items-center'>
															<div className='border-2 border-teal-500 p-1 rounded-full'>
																<ChatIcon className='size-3 text-teal-500' />
															</div>

															<div className='flex items-center gap-1 font-semibold'>
																<span className='font-normal text-gray-600'>
																	Includes
																</span>
																<span>Prompt Engineering Hub</span>
																<div className='w-px h-3.5 bg-black'></div>
																<span>5 spaces</span>
															</div>
														</div>
													</>
												)}

												{/* ID 6 */}
												{item.id === '6' && (
													<>
														{/* First Block */}
														<div className='flex gap-3 items-center'>
															<div className='border-2 border-teal-500 p-0.5 rounded-full'>
																<CertificateSvg
																	className='size-4'
																	fill='#009688'
																/>
															</div>
															<div className='flex items-center gap-1 font-semibold'>
																<span className='font-normal text-gray-600'>
																	Includes
																</span>
																<span>Standard Certificate</span>
																<div className='size-1 rounded-full bg-black'></div>
																<span>Premium Certificate</span>
															</div>
														</div>

														{/* Second Block */}
														<div className='flex gap-3 items-center'>
															<div className='border-2 border-teal-500 p-1 rounded-full'>
																<ChatIcon className='size-3 text-teal-500' />
															</div>

															<div className='flex items-center gap-1 font-semibold'>
																<span className='font-normal text-gray-600'>
																	Includes
																</span>
																<span>Prompt Engineering Hub</span>
																<div className='w-px h-3.5 bg-black'></div>
																<span>5 spaces</span>
															</div>
														</div>
													</>
												)}

												{/* ID 7 */}
												{item.id === '7' && (
													<>
														{/* First Block */}
														<div className='flex gap-3 items-center'>
															<div className='border-2 border-teal-500 p-0.5 rounded-full'>
																<CertificateSvg
																	className='size-4'
																	fill='#009688'
																/>
															</div>
															<div className='flex items-center gap-1 font-semibold'>
																<span className='font-normal text-gray-600'>
																	Includes
																</span>
																<span>Standard Certificate</span>
																<div className='size-1 rounded-full bg-black'></div>
																<span>Premium Certificate</span>
															</div>
														</div>

														{/* Second Block */}
														<div className='flex gap-3 items-center'>
															<div className='border-2 border-teal-500 p-1 rounded-full'>
																<ChatIcon className='size-3 text-teal-500' />
															</div>

															<div className='flex items-center gap-1 font-semibold'>
																<span className='font-normal text-gray-600'>
																	Includes
																</span>
																<span>Prompt Engineering Hub</span>
																<div className='w-px h-3.5 bg-black'></div>
																<span>5 spaces</span>
															</div>
														</div>
													</>
												)}
											</div>
										</div>
									</div>
								))}

								<p className='text-gray-600 text-center text-sm mt-4'>
									Each item in your cart needs to be checked out separately
								</p>
							</CardContent>
						</Card>

						<div className='mt-6 bg-white rounded-lg shadow-sm p-6'>
							<div className='flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 mb-6 text-center md:text-left'>
								{/* Return Policy */}
								<div className='flex items-start gap-4'>
									<MoneyIcon className='text-gray-600 w-6 h-6 mt-1' />
									<div>
										<h3 className='text-lg font-semibold text-gray-900'>
											Return Policy
										</h3>
										<p className='text-gray-600 text-sm'>
											100% MONEY BACK GUARANTEE
										</p>
									</div>
								</div>

								{/* Confidentiality */}
								<div className='flex items-start gap-4'>
									<PrivacyIcon className='text-gray-600 w-6 h-6 mt-1' />
									<div>
										<h3 className='text-lg font-semibold text-gray-900'>
											Confidentiality
										</h3>
										<p className='text-gray-600 text-sm'>
											SKILL HUB PROTECTS YOUR PRIVACY
										</p>
									</div>
								</div>

								{/* Data Protection */}
								<div className='flex items-start gap-4'>
									<LockIcon className='text-gray-600 w-6 h-6 mt-1' />
									<div>
										<h3 className='text-lg font-semibold text-gray-900'>
											Data Protection
										</h3>
										<p className='text-gray-600 text-sm'>
											YOUR INFORMATION IS SECURE
										</p>
									</div>
								</div>
							</div>

							<hr className='border-gray-200 my-4' />

							<p className='text-center text-gray-600 text-sm'>
								Have questions? Feel free to{' '}
								<a href='#' className='text-sky-500 hover:underline'>
									contact us
								</a>
								.
							</p>
						</div>
					</div>

					<div className='lg:col-span-1 lg:sticky lg:top-14 lg:self-start'>
						<Card className='shadow-sm'>
							<CardContent className='p-6'>
								<div className='flex items-start justify-between mb-4'>
									<h2 className='text-xl font-bold'>ORDER SUMMARY</h2>
									<p className='text-gray-600 text-xs mt-1'>
										{cartItems.length} ITEMS
									</p>
								</div>

								<div className='space-y-2 text-sm'>
									<div className='flex justify-between'>
										<span className='text-black-500 font-semibold text-sm'>
											Subtotal:
										</span>
										<span>${subtotal.toFixed(2)}</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-black-500 font-semibold text-sm'>
											Bundle Discount:
										</span>
										<span className='text-teal-500'>
											-${bundleDiscount.toFixed(2)}
										</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-black-500 font-semibold text-sm'>
											Special Offers:
										</span>
										<span className='text-teal-500'>
											-${specialOffers.toFixed(2)}
										</span>
									</div>

									<div className='border-t-1 border-t-gray my-4 pt-3 font-semibold flex justify-between'>
										<span className='text-black-500 font-bold text-xl'>
											Total price:
										</span>
										<span>${total.toFixed(2)}</span>
									</div>
								</div>

								<div className='mt-4'>
									<Input
										placeholder='Enter your email'
										type='email'
										className='text-sm'
									/>
								</div>

								<Button className='w-full bg-teal-500 hover:bg-teal-600 text-white mt-4 text-sm'>
									ENROLL
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		);
	}
}

/** @format */

import React, {useEffect, useState} from 'react';
import {
	Certificate2,
	CertificateSvg,
	CommunitySvg,
} from '../../../../../../../svg';
import Image from 'next/image';
import img from '@/assets/img5.jpg';
import Coupons from '../../Coupons';
import {DollarSign, Search, X} from 'lucide-react';
import img2 from '@/assets/img2.jpg';
import news from '@/assets/news.png';
import type {StaticImageData} from 'next/image';

// Define types for our subscriptions
type Subscription = {
	id: string;
	title: string;
	price: number;
	image: StaticImageData;
	selected?: boolean;
};

// Sample data for bundles
const bundlesData = [
	{
		id: 1,
		title: 'Advanced UI/UX Design Masterclass yes',
		price: 199,
		image: img,
		selected: false,
	},
	{
		id: 2,
		title: 'Responsive Web Design Fundamentals',
		price: 149,
		image: img2,
		selected: false,
	},

	{
		id: 5,
		title: 'UX Research Masterclass',
		price: 179,
		image: news,
		selected: false,
	},
];

export default function DesktopPricing() {
	const [bundles, setBundles] = useState(bundlesData);
	const [searchQuery, setSearchQuery] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [subscriptions, setSubscriptions] = useState<Subscription[]>([
		{
			id: '1',
			title: 'Advanced UI/UX Design Masterclass',
			price: 199,
			image: img2,
			selected: false,
		},
		{
			id: '2',
			title: 'Responsive Web Design Fundamentals',
			price: 149,
			image: news,
			selected: false,
		},
		{
			id: '3',
			title: 'Design Systems Workshop 2024',
			price: 299,
			image: img,
			selected: false,
		},
	]);
	const [searchQuery1, setSearchQuery1] = useState('');
	const [filteredSubscriptions, setFilteredSubscriptions] = useState<
		Subscription[]
	>([]);

	// Get selected bundles
	const selectedBundles = bundles.filter((bundle) => bundle.selected);

	// // Filter bundles based on search query
	// const filteredBundles = bundles.filter((bundle) =>
	//   bundle.title.toLowerCase().includes(searchQuery.toLowerCase())
	// );

	const filteredBundles = bundles.filter((card) => {
		if (card.selected) return false;
		const searchTerms = searchQuery.toLowerCase().split(' ');
		const cardName = card.title.toLowerCase();
		return searchTerms.every(
			(term) =>
				cardName.includes(term) ||
				cardName.split(' ').some((word) => word.includes(term))
		);
	});

	// Toggle bundle selection
	const toggleBundleSelection = (id: number) => {
		setBundles(
			bundles.map((bundle) =>
				bundle.id === id ? {...bundle, selected: !bundle.selected} : bundle
			)
		);
	};

	// Remove bundle from selection
	const removeBundle = (id: number) => {
		setBundles(
			bundles.map((bundle) =>
				bundle.id === id ? {...bundle, selected: false} : bundle
			)
		);
	};

	// Filter subscriptions based on search query
	useEffect(() => {
		if (searchQuery1.trim() === '') {
			setFilteredSubscriptions(subscriptions.filter((sub) => !sub.selected));
		} else {
			setFilteredSubscriptions(
				subscriptions.filter((sub) => {
					if (sub.selected) return false;
					const searchTerms = searchQuery1.toLowerCase().split(' ');
					const cardName = sub.title.toLowerCase();
					return searchTerms.every(
						(term) =>
							cardName.includes(term) ||
							cardName.split(' ').some((word) => word.includes(term))
					);
				})
			);
		}
	}, [searchQuery1, subscriptions]);

	// Get selected subscriptions
	const selectedSubscriptions = subscriptions.filter((sub) => sub.selected);

	// Toggle subscription selection
	const toggleSubscription = (id: string) => {
		setSubscriptions(
			subscriptions.map((sub) =>
				sub.id === id ? {...sub, selected: !sub.selected} : sub
			)
		);
	};

	return (
		<>
			<div className='max-w-6xl mx-auto w-full '>
				<div className='flex flex-col md:flex-row gap-4 p-8 '>
					<div className='md:w-1/3'>
						<h2 className='text-lg font-semibold text-gray-800'>Pricing</h2>
						<p className='text-sm text-gray-500 mt-1 mb-4'>
							Configure pricing option for your course and linked products
						</p>
					</div>

					<div className='md:w-2/3 bg-white p-6 rounded-lg border'>
						<div className='space-y-4 bg-gray-100 p-5  rounded-lg '>
							<div className=' mx-4  '>
								<div className=''>
									<h3 className='text-lg font-semibold mb-0.5 text-gray-900'>
										Course Price
									</h3>
									<p className='text-sm text-gray-500'>
										Configure pricing for your course and included products.
									</p>

									<div className='flex items-center gap-2 bg-white w-38 my-3 border-2 rounded-lg overflow-hidden pl-6'>
										<span className='text-white-100'>$</span>
										<input
											className='border-0 rounded p-2 overflow-hidden outline-0'
											placeholder='0'
										/>
									</div>

									<div className='bg-gray-200 rounded-lg'>
										<p className='text-md p-2 text-gray-500'>
											Course price must be between $0 and ∞
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className='space-y-4 bg-gray-100 p-5 mt-10 rounded-lg'>
							<div className='  p-4 roundedb   '>
								<h3 className='text-lg font-semibold mb-0.5'>
									Included With Course
								</h3>
								<p className='text-sm text-gray-500'>
									Probucts included with coures purchase.
								</p>
							</div>
							<div className='mx-0.5'>
								<div className='flex items-center justify-between border border-gray-300 p-4 rounded-md bg-white'>
									<div className='flex gap-1.5 items-center'>
										<Certificate2 className='w-5 h-5' fill='gray' />
										<span className='text-sm text-gray-600'>
											Standard Certificate
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className='space-y-4 bg-gray-100 p-5  rounded-lg mt-10 '>
							<div className=' mx-4  '>
								<div className=''>
									<h3 className='text-lg font-semibold mb-0.5'>
										Additional Paid Products
									</h3>
									<p className='text-sm text-gray-500'>
										Products available for separate purchase.
									</p>
									<div className='flex items-center gap-2 bg-white w-38 my-3 border-2 rounded-lg overflow-hidden pl-6'>
										<span className='text-white-100'>$</span>
										<input
											className='border-0 rounded p-2 overflow-hidden outline-0'
											placeholder='7.00'
										/>
									</div>
									<div className=''>
										<div className='flex items-center justify-between border border-gray-300 p-4 rounded-md bg-white '>
											<div className='flex gap-1.5 items-center'>
												<CommunitySvg className='w-5 h-5' fill='gray' />
												<span className='text-sm text-gray-600'>
													Community Access
												</span>
											</div>

											<span className='text-sm text-gray-600'>$2.00</span>
										</div>
									</div>

									<div className='mt-3'>
										<div className='flex items-center justify-between border border-gray-300 p-4 rounded-md bg-white '>
											<div className='flex gap-1.5 items-center'>
												<CertificateSvg className='w-5 h-5' fill='gray' />
												<span className='text-sm text-gray-600'>
													Premium Certificate
												</span>
											</div>

											<span className='text-sm text-gray-600'>$5.00</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='mt-7'>
							<div className='bg-gray-100 rounded-lg'>
								<p className='text-md p-3 text-gray-500 '>
									Total Price : $7.00
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Add Bundles */}
				<div className='flex flex-col md:flex-row gap-4 p-8 py-0'>
					{/* Left side - Bundles info */}
					<div className='w-full md:w-1/3'>
						<h2 className='text-lg font-semibold mb-0.5'>Bundles</h2>
						<p className='text-sm text-gray-500'>
							Add this course to a bundle.
						</p>
					</div>

					{/* Right side - Add to Bundles modal */}
					{isModalOpen && (
						<div className='w-full md:w-2/3 bg-white rounded-lg shadow-lg p-6 border border-gray-200'>
							<div className='flex justify-between items-center mb-6'>
								<h3 className='text-lg font-semibold mb-0.5 text-gray-900'>
									Add to Bundles
								</h3>
								<button
									onClick={() => setIsModalOpen(false)}
									className='text-gray-400 hover:text-gray-600'
								>
									<X size={16} />
								</button>
							</div>

							{/* Selected bundles section */}
							<div className='mb-6'>
								{selectedBundles.map((bundle) => (
									<div
										key={`selected-${bundle.id}`}
										className='flex items-center justify-between mb-4'
									>
										<div className='flex items-center gap-3'>
											<Image
												src={bundle.image || '/placeholder.svg'}
												alt={bundle.title}
												width={60}
												height={60}
												className='rounded-md'
											/>
											<div>
												<div className='flex items-center gap-2 mb-1'>
													<span className='bg-gray-200 text-gray-600 text-xs px-3 py-2 rounded-full'>
														Bundle
													</span>
													<div className='flex items-center bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full'>
														<DollarSign size={12} />
														<span>{bundle.price}</span>
													</div>
												</div>
												<p className='text-gray-700 font-medium'>
													{bundle.title}
												</p>
											</div>
										</div>
										<button
											onClick={() => removeBundle(bundle.id)}
											className='text-gray-400 hover:text-gray-600'
										>
											<X size={18} />
										</button>
									</div>
								))}
							</div>

							{/* Search bar */}
							<div className='relative mb-6'>
								<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
									<Search className='h-5 w-5 text-gray-400' />
								</div>
								<input
									type='text'
									className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-600'
									placeholder='Search for bundles...'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>

							{/* Bundle list */}
							<div className='space-y-6'>
								{filteredBundles.length > 0 ? (
									filteredBundles.map((bundle) => (
										<div
											key={bundle.id}
											className='flex items-center justify-between cursor-pointer'
											onClick={() => toggleBundleSelection(bundle.id)}
										>
											<div className='flex items-center gap-3'>
												<Image
													src={bundle.image || '/placeholder.svg'}
													alt={bundle.title}
													width={60}
													height={60}
													className='rounded-md'
												/>
												<div>
													<div className='bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full inline-block mb-1'>
														Bundle
													</div>
													<p className='text-gray-700 font-medium'>
														{bundle.title}
													</p>
												</div>
											</div>
											<div className='text-gray-700 font-medium'>
												${bundle.price}
											</div>
										</div>
									))
								) : (
									<p className='text-gray-500 text-center py-4'>
										No bundles found matching your search.
									</p>
								)}
							</div>
						</div>
					)}
				</div>

				{/* Subscription */}

				<div className='flex flex-col md:flex-row gap-4 p-8'>
					<div className='w-full md:w-1/3'>
						<h2 className='text-lg font-semibold mb-0.5'>Subscriptions</h2>
						<p className='text-sm text-gray-500'>
							Add this course to a subscription.
						</p>
					</div>

					<div className='w-full md:w-2/3 bg-white rounded-lg shadow-sm p-6 border border-gray-100'>
						<h3 className='text-lg font-semibold mb-0.5 text-gray-900'>
							Add to Subscription
						</h3>

						<div className='mt-4'>
							<div className='mt-3 space-y-3'>
								{selectedSubscriptions.map((subscription) => (
									<div
										key={subscription.id}
										className='flex items-center justify-between bg-gray-50 rounded-lg p-3'
									>
										<div className='flex items-center gap-4'>
											<div className='relative h-15 w-15 overflow-hidden rounded-md'>
												<Image
													src={subscription.image || '/placeholder.svg'}
													alt={subscription.title}
													fill
													className='object-cover'
												/>
											</div>
											<div>
												<div className='flex items-center gap-2 mb-1'>
													<span className='bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full'>
														Subscription
													</span>
													<span className='bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full flex items-center'>
														<span className='mr-1'>$</span>
														{subscription.price}
													</span>
												</div>
												<h5 className='font-medium text-gray-700'>
													{subscription.title}
												</h5>
											</div>
										</div>
										<button
											onClick={() => toggleSubscription(subscription.id)}
											className='text-gray-400 hover:text-gray-600'
											aria-label='Remove subscription'
										>
											<X size={16} />
										</button>
									</div>
								))}
							</div>
						</div>

						<div className='relative mt-6'>
							<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
								<Search className='h-5 w-5 text-gray-400' />
							</div>
							<input
								type='text'
								className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-600'
								placeholder='Search for subscriptions...'
								value={searchQuery1}
								onChange={(e) => setSearchQuery1(e.target.value)}
							/>
						</div>

						<div className='mt-6 space-y-4'>
							{filteredSubscriptions.map((subscription) => (
								<div
									key={subscription.id}
									className='flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer'
									onClick={() => toggleSubscription(subscription.id)}
								>
									<div className='flex items-center gap-4'>
										<div className='relative h-14 w-15 overflow-hidden rounded-md'>
											<Image
												src={subscription.image || '/placeholder.svg'}
												alt={subscription.title}
												fill
												className='object-cover'
											/>
										</div>
										<div>
											<div className='mb-1'>
												<span className='bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full'>
													Subscription
												</span>
											</div>
											<h5 className='font-medium text-gray-700'>
												{subscription.title}
											</h5>
										</div>
									</div>
									<span className='text-gray-700 font-medium'>
										${subscription.price}
									</span>
								</div>
							))}

							{filteredSubscriptions.length === 0 && (
								<div className='text-center py-6 text-gray-500'>
									{searchQuery
										? 'No matching subscriptions found'
										: 'No more subscriptions available'}
								</div>
							)}
						</div>
					</div>
				</div>
				{/* Coupons & Promotions */}

				<Coupons />
			</div>
		</>
	);
}

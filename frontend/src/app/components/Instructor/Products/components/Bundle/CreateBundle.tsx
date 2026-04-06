/** @format */

'use client';
import {type Dispatch, type SetStateAction, useEffect, useState} from 'react';
import Image from 'next/image';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/app/components/ui/dialog';
import {Input} from '@/app/components/ui/input';
import {Textarea} from '@/app/components/ui/textarea';
import {Button} from '@/app/components/ui/button';
import {Separator} from '@/app/components/ui/separator';
import img2 from '@/assets/img2.jpg';
import img3 from '@/assets/img3.png';
import img5 from '@/assets/img5.jpg';

import {CourseSvg, SerchIcon, VideoSvg} from '@/app/components/svg';
import {useIsMobile} from '@/hooks/use-mobile';
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';
import {CircleDollarSign, DollarSign, Search, X} from 'lucide-react';

interface BundleModalProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}
// type BundleSubscription = {
//   id: number;
//   name: string;
//   title?: string;
//   type: string;
//   price: number;
//   image: StaticImageData;
//   selected?: boolean;
//   badgeColor: string;
//   iconColor: string;
//   icon: React.ReactNode;
// };
const Bundleproducts = [
	{
		id: 1,
		name: 'Responsive Web Design Fundamentals',
		price: 149,
		type: 'Course',
		badgeColor: 'bg-blue-100 text-blue-600',
		iconColor: 'fill-blue-600',
		image: img2,
		icon: <CourseSvg className='size-4 text-gray-500 mr-1 fill-blue-600' />,

		selected: false,
	},
	{
		id: 2,
		name: 'Design System Workshop 2024',
		price: 299,
		type: 'Event',
		badgeColor: 'bg-red-100 text-red-500',
		iconColor: 'fill-red-500',
		image: img3,
		icon: <VideoSvg className='size-4 mr-1 fill-[#991B1B]' />,
		selected: false,
	},
	{
		id: 3,
		name: 'Advanced UI/UX Design Masterclass',
		price: 199,
		type: 'Course',
		badgeColor: 'bg-blue-100 text-blue-600 border border-blue-200',
		iconColor: 'fill-blue-600',
		image: img5,
		icon: <CourseSvg className='size-4 text-gray-500 mr-1 fill-blue-600' />,
		selected: false,
	},
];

export default function BundleModal({open, setOpen}: BundleModalProps) {
	const [bundleName, setBundleName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState<number>(0);
	const [bundles, setBundles] = useState(Bundleproducts);
	const isMobile = useIsMobile();
	const [searchQuery, setSearchQuery] = useState('');

	// Remove bundle from selection
	const removeBundle = (id: number) => {
		setBundles(
			bundles.map((bundle) =>
				bundle.id === id ? {...bundle, selected: false} : bundle
			)
		);
	};
	// Get selected bundles
	const selectedBundles = bundles.filter((bundle) => bundle.selected);
const [isPriceManuallyEdited, setIsPriceManuallyEdited] = useState(false);

	useEffect(() => {
  if (!isPriceManuallyEdited) {
    const totalPrice = selectedBundles.reduce((acc, bundle) => acc + bundle.price, 0);
    setPrice(totalPrice);
  }
}, [selectedBundles, isPriceManuallyEdited]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = Number(e.target.value);
  if (value >= 0) {
    setIsPriceManuallyEdited(true); // Mark as manually changed
    setPrice(value);
  }
};

	// Filter bundles based on search query
	// const filteredBundles = bundles.filter((bundle) =>
	//   bundle.name.toLowerCase().includes(searchQuery.toLowerCase())
	// );

	const filteredBundles = bundles.filter((card) => {
		if (card.selected) return false;
		const searchTerms = searchQuery.toLowerCase().split(' ');
		const cardName = card.name.toLowerCase();
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

	if (isMobile) {
		return (
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerContent>
					<DrawerHeader className='flex-row justify-between border-b py-2'>
						<DrawerTitle>Create Bundle</DrawerTitle>
						<button onClick={() => setOpen(false)}>
							<X className='size-4' />
						</button>
					</DrawerHeader>
					<section className='overflow-y-auto'>
						{' '}
						<div className='p-6 space-y-6'>
							{/* Bundle Name */}
							<div className='space-y-2'>
								<label
									htmlFor='bundleName'
									className='block text-sm font-semibold text-gray-700 mb-2'
								>
									Bundle Name
								</label>
								<Input
									id='bundleName'
									placeholder='Bundle Name'
									value={bundleName}
									onChange={(e) => setBundleName(e.target.value)}
									className='w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-500'
								/>
							</div>

							{/* Description */}
							<div className='space-y-2'>
								<label
									htmlFor='description'
									className='block text-sm font-semibold text-gray-700 mb-2'
								>
									Description
								</label>
								<Textarea
									id='description'
									placeholder='Description'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className='w-full min-h-[100px]'
								/>
							</div>

							{/* Bundle Price */}
							<div className='space-y-2'>
								<label
									htmlFor='price'
									className='block text-sm font-semibold text-gray-700'
								>
									Bundle Price
								</label>
								<div className='relative'>
									<Input
										id='bundlePrice'
										placeholder='$0.00'
										value={price}
										type='number'
										onChange={handlePriceChange}
										className='w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-500'
									/>
								</div>
							</div>
							<Separator className='my-2 mb-6' />

							{/* Selected Products */}
							<div>
								<h3 className='text-sm font-bold text-gray-700 mb-3'>
									Selected Products ({selectedBundles.length})
								</h3>

								<div className=''>
									{selectedBundles.map((bundle) => (
										<div
											key={`selected-${bundle.id}`}
											className='flex items-center justify-between mb-4'
										>
											<div className='flex items-center gap-3'>
												<Image
													src={bundle.image || '/placeholder.svg'}
													alt=''
													width={80}
													height={80}
													className='rounded-md object-cover'
												/>
												<div>
													<div className='flex items-center gap-2 mb-1'>
														{/* <span className="bg-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                              Bundle
                            </span> */}
														<div className='w-21'>
															<div
																key={bundle.id}
																className={`flex items-center px-2   py-1 rounded-lg 
      ${bundle.type === 'Course' ? 'bg-blue-50' : 'bg-red-50'}
    `}
															>
																<div>{bundle.icon}</div>
																<div
																	className={` font-semibold ${
																		bundle.type === 'Course'
																			? 'text-blue-500'
																			: 'text-[#991B1B]'
																	}`}
																>
																	{bundle.type}
																</div>
															</div>
														</div>
														<div className='flex items-center bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full'>
															<DollarSign size={12} />
															<span className='font-bold'>{bundle.price}</span>
														</div>
													</div>

													<p className='text-gray-700 font-medium'>
														{bundle.name}
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

								{/* Search */}
								<div className='relative mb-6 mt-8'>
									<SerchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
									<Input
										placeholder='Search for courses & events...'
										className='pl-10 py-5'
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
								</div>

								<div className='space-y-4 p-3'>
									{filteredBundles.length > 0 ? (
										filteredBundles.map((bundle) => (
											<div
												key={bundle.id}
												className='flex items-center justify-between'
												onClick={() => toggleBundleSelection(bundle.id)}
											>
												<div className='flex items-center gap-3'>
													<Image
														src={bundle.image || '/placeholder.svg'}
														alt=''
														width={80}
														height={80}
														className='rounded-md object-cover'
													/>
													<div>
														<div className='flex items-center gap-2 mb-1'>
															{/* <span className="bg-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                                Bundle
                              </span> */}
															<div className='w-23'>
																<div
																	key={bundle.id}
																	className={`flex items-center px-3  rounded-lg 
      ${bundle.type === 'Course' ? 'bg-blue-100' : 'bg-red-100'}
    `}
																>
																	<div>{bundle.icon}</div>
																	<div
																		className={` font-semibold ${
																			bundle.type === 'Course'
																				? 'text-blue-500'
																				: 'text-[#991B1B]'
																		}`}
																	>
																		{bundle.type}
																	</div>
																</div>
															</div>
														</div>
														<p className='text-gray-700 font-medium'>
															{bundle.name}
														</p>
													</div>
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
						</div>
					</section>
					<DrawerFooter className='py-2 border-t '>
						<Button className='bg-teal-500'>Save</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	} else {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='bg-background mx-auto p-0 gap-0 h-[95vh] max-h-[95vh] flex flex-col'>
					<DialogHeader className='flex p-4 border-b border-b-gray-300'>
						<DialogTitle className='text-xl font-semibold text-gray-800'>
							Create Bundle
						</DialogTitle>
					</DialogHeader>
					<div className='flex flex-col flex-1 overflow-hidden'>
						{/* Header */}

						{/* Form Content */}
						<div className='p-6 space-y-6 overflow-y-auto no-scrollbar'>
							{/* Bundle Name */}
							<div className='space-y-2'>
								<label
									htmlFor='bundleName'
									className='block text-sm font-semibold text-gray-700 mb-2'
								>
									Bundle Name
								</label>
								<Input
									id='bundleName'
									placeholder='Bundle Name'
									value={bundleName}
									onChange={(e) => setBundleName(e.target.value)}
									className='w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-500'
								/>
							</div>

							{/* Description */}
							<div className='space-y-2'>
								<label
									htmlFor='description'
									className='block text-sm font-semibold text-gray-700 mb-2'
								>
									Description
								</label>
								<Textarea
									id='description'
									placeholder='A bundle of all design..'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className='w-full min-h-[100px]'
								/>
							</div>

							{/* Bundle Price */}
							<div className='space-y-2'>
								<label
									htmlFor='price'
									className='block text-sm font-semibold text-gray-700'
								>
									Bundle Price
								</label>
								<div className='relative'>
									<span className='absolute top-1.5 left-2'>$</span>
									<Input
										id='bundlePrice'
										placeholder='$0.00'
										value={price}
										min={0}
										type='number'
										onChange={handlePriceChange}
										className='w-full px-5 py-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-500'
									/>
								</div>
							</div>

							<Separator className='my-2 mb-6' />

							{/* Selected Products */}
							<div>
								<h3 className='text-sm font-bold text-gray-700 mb-3'>
									Selected Products ({selectedBundles.length})
								</h3>

								{/* Selected Product */}
								<div className='flex items-center justify-between  bg-white p-3 rounded-md'></div>
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
													alt=''
													width={60}
													height={60}
													className='rounded-md'
												/>
												<div>
													<div className='flex items-center gap-2 mb-1'>
														{/* <span className="bg-gray-200 text-gray-600 text-xs px-3 py-2 rounded-full">
                              Bundle
                            </span> */}

														<div className='w-23'>
															<div
																key={bundle.id}
																className={`flex items-center px-2  rounded-lg 
      ${bundle.type === 'Course' ? 'bg-blue-100' : 'bg-red-100'}
    `}
															>
																<div>{bundle.icon}</div>
																<div
																	className={` font-semibold ${
																		bundle.type === 'Course'
																			? 'text-blue-500'
																			: 'text-[#991B1B]'
																	}`}
																>
																	{bundle.type}
																</div>
															</div>
														</div>
														<div className='flex items-center bg-gray-200 text-gray-600 text-xs px-3 py-1 gap-1.5 rounded-full'>
                              <CircleDollarSign className='stroke-1 text-black size-5'/>
														<div className='flex items-center '>
                              	<DollarSign className='size-3 mt-px' />
															<span className='font-bold'>{bundle.price}</span>
                            </div>
														</div>
													</div>

													<p className='text-gray-700 text-sm font-semibold'>
														{bundle.name}
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
														alt=''
														width={60}
														height={60}
														className='rounded-md'
													/>
													<div>
														{/* <div className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full inline-block mb-1">
                              {bundle.type}
                            </div> */}
														<div className='w-23'>
															<div
																key={bundle.id}
																className={`flex items-center px-3 rounded-lg 
      ${bundle.type === 'Course' ? 'bg-blue-100' : 'bg-red-100'}
    `}
															>
																<div className=' flex items-center'>
																	{bundle.icon}
																</div>
																<div
																	className={` font-semibold ${
																		bundle.type === 'Course'
																			? 'text-blue-500'
																			: 'text-[#991B1B]'
																	}`}
																>
																	{bundle.type}
																</div>
															</div>
														</div>

														<p className='text-gray-700 text-sm font-semibold'>
															{bundle.name}
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
								{/* Selected bundles section */}
							</div>
						</div>

						{/* Footer */}
						<DialogFooter className='flex justify-end p-4 border-t'>
							<Button className='bg-teal-500 hover:bg-teal-600 text-white'>
								Create Bundle
							</Button>
						</DialogFooter>
					</div>
				</DialogContent>
			</Dialog>
		);
	}
}

/** @format */

'use client';

import React, {useState, useEffect} from 'react';
import CreateMenu from '../../components/CreateMenu';

import FilterMenu from '../../components/FilterMenu';

import {
	AlignJustify,
	ClearAllIcon,
	DownSvg,
	EllipsisBlackVerticalSvg,
	PlusSvg,
	ResponsiveSearchSVG,
} from '@/app/components/svg';

import AllProductsMenu from '../../components/AllProductsMenu';
import {useSearchParams} from 'next/navigation';
import {useProduct} from '@/context/product/useProduct';

import {PRODUCT_DATA} from '@/constants';
import {useIsMobile} from '@/hooks/use-mobile';
import Image from 'next/image';
import {X} from 'lucide-react';
import {useSidebar} from '@/app/components/ui/sidebar';

const ProductHeader = () => {
	const [openCreateMenu, setOpenCreateMenu] = React.useState(false);
	const [openProductsMenu, setOpenProductsMenu] = React.useState(false);
	const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const { setCurrentPage, setFilteredProducts} = useProduct();
	// Paginati
	const [searchTerm, setSearchTerm] = useState('');
	const searchParams = useSearchParams();
	const [selectedFiterMenu, setSelectedFiterMenu] = useState<string[]>([]);
	const [sortOption, setSortOption] = useState<string>('newest');
	const [showInput, setShowInput] = useState(false);

	const {setOpenMobile} = useSidebar();

	const isMobile = useIsMobile();
	// Initialize filtered products with all products
	useEffect(() => {
		const typeFilters = searchParams.getAll('type'); // This will get all type parameters
		let filtered = [...PRODUCT_DATA];

		// Filter by type (from URL)
		if (typeFilters.length > 0) {
			filtered = filtered.filter((product) => {
				const productType = product.type?.toLowerCase(); // Ensure case-insensitive comparison
				return (
					productType &&
					typeFilters.some((filter) => filter.toLowerCase() === productType)
				);
			});
		}

		// Filter by search term
		if (searchTerm.trim() !== '') {
			const searchWords = searchTerm.toLowerCase().split(/\s+/);
			filtered = filtered.filter((product) => {
				const title = product.title.toLowerCase();
				return searchWords.every((word) => title.includes(word));
			});
		}

		// Filter by status using selectedFiterMenu
		if (selectedFiterMenu.length > 0) {
			filtered = filtered.filter(
				(product) =>
					product.status && selectedFiterMenu.includes(product.status)
			);
		}

		// Sorting
		switch (sortOption) {
			case 'az':
				filtered.sort((a, b) => a.title.localeCompare(b.title));
				break;
			case 'za':
				filtered.sort((a, b) => b.title.localeCompare(a.title));
				break;
			case 'popularity':
				filtered.sort((a, b) => Number(b.students) - Number(a.students));
				break;
			case 'newest':
				filtered.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
				break;
			case 'modified':
				filtered.sort(
					(a, b) =>
						new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
				);
				break;
		}

		setFilteredProducts(filtered);
		setCurrentPage(1); // Reset to first page on filter change
	}, [searchTerm, searchParams, selectedFiterMenu, sortOption]);

	if (isMobile) {
		return (
			<div>
				<div className='flex justify-between items-center bg-white p-4 overflow-x-hidden'>
					<div className='flex relative items-center rounded-[22px] px-[5px] py-[2px] hover:bg-[#f5f5f7]'>
						<button
							className=' flex gap-1 items-center justify-center  cursor-pointer relative'
							onClick={() => {
								setOpenProductsMenu((prev) => !prev);
							}}
						>
							<div>
								<svg
									className='size-4 flex items-center '
									viewBox='0 0 24 24'
									fill='none'
									stroke='#4F4F4F'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path d='M4 4h6v6h-6z'></path>
									<path d='M14 4h6v6h-6z'></path>
									<path d='M4 14h6v6h-6z'></path>
									<path d='M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'></path>
								</svg>
							</div>
							<h1 className='text-sm font-semibold leading-8 tracking-wide truncate w-10 text-[#333] capitalize'>
								{selectedProducts.length > 0 ? selectedProducts[0] : 'All'}
							</h1>
							<div className='size-4 rounded-[50%] flex items-center justify-center ml-0.5 cursor-pointer relative'>
								<DownSvg className='size-4 fill-white' />
							</div>
							{/* {JSON.stringify(selectedProducts)} */}
							{selectedProducts.length > 0 && (
								<div className='inline-flex items-center justify-center bg-blue-500 text-white w-[22px] h-[22px] rounded-full text-xs font-semibold ml-1'>
									{selectedProducts.length}
								</div>
							)}
						</button>
						{openProductsMenu && (
							<AllProductsMenu
								open={openProductsMenu}
								setOpen={setOpenProductsMenu}
								selectedProducts={selectedProducts}
								setSelectedProducts={setSelectedProducts}
							/>
						)}
						{/* {openProductsMenu && <AllProductsMenu open={openProductsMenu} setOpen={setOpenProductsMenu} />} */}
					</div>

					<div className='flex gap-2'>
						<button
							className='w-fit text-white border-none rounded-3xl px-1 py-1 text-sm font-semibold flex items-center cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f7] '
							onClick={() => setShowInput(!showInput)}
						>
							{showInput ? 'hide' : 'show '}
							<ResponsiveSearchSVG className='size-4 ' />
						</button>

						<div className=''>
							<button
								className='bg-gray-200 text-white border-none rounded-3xl px-1 py-1 text-sm font-semibold flex items-center cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f7]'
								onClick={() => setOpenCreateMenu(!openCreateMenu)}
							>
								<PlusSvg className='size-5 stroke-black ' fill='black' />
							</button>

							<CreateMenu open={openCreateMenu} setOpen={setOpenCreateMenu} />
						</div>

						<div className='h-5 w-px bg-gray-300 self-center' />

						{/* //Filter menu functionallity */}
						<div className='px-1 py-0.5 relative'>
							<FilterMenu
								selectedStatus={selectedFiterMenu}
								setSelectedStatus={setSelectedFiterMenu}
								selectedSort={sortOption}
								onChangeSort={setSortOption}
							/>
							{selectedFiterMenu.length > 0 && (
								<span className='absolute -top-1 -right-1 bg-blue-500 text-white w-[18px] h-[18px] rounded-full text-[11px] font-medium flex items-center justify-center border border-white border-[1.5px] shadow-sm z-10'>
									{selectedFiterMenu.length}
								</span>
							)}
						</div>
						<div className=''>
							<button
								className='text-white border-none rounded-3xl px-1 py-1 text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f7]'
								onClick={() => setOpenMobile(true)}
							>
								<AlignJustify className='size-4 ' fill='black' />
							</button>
						</div>
						<div className=''>
							<button className=' text-white border-none rounded-3xl px-1 py-1 text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f7]'>
								<EllipsisBlackVerticalSvg className='size-4 ' fill='black' />
							</button>
						</div>
					</div>
				</div>
				{showInput && (
					<>
						<div className='flex flex-wrap items-center justify-between px-2.5 py-1 text-xs text-gray-900 gap-y-2'>
							<div className='flex flex-wrap items-center gap-2 flex-1 min-w-0'>
								{selectedFiterMenu.length > 0 &&
									selectedFiterMenu.map((filteredProducts) => (
										<div
											key={filteredProducts}
											className='flex items-center bg-slate-100 rounded-full px-3 py-1 mr-1 mb-1'
										>
											<span className='text-sm text-gray-700'>
												{filteredProducts}
											</span>
											<div className='w-px h-4 bg-gray-400 mx-2' />
											<button
												onClick={() =>
													setSelectedFiterMenu(
														selectedFiterMenu.filter(
															(item) => item !== filteredProducts
														)
													)
												}
												className='text-gray-400 hover:text-gray-600'
											>
												<X className='w-3.5 h-3.5' />
											</button>
										</div>
									))}

								{selectedProducts.length > 0 &&
									selectedProducts.map((filteredProducts) => (
										<div
											key={filteredProducts}
											className='flex items-center bg-slate-100 rounded-full px-3 py-1 mr-1 mb-1'
										>
											<span className='text-sm text-gray-700'>
												{filteredProducts}
											</span>
											<div className='w-px h-4 bg-gray-400 mx-2' />
											<button
												onClick={() =>
													setSelectedProducts(
														selectedProducts.filter(
															(item) => item !== filteredProducts
														)
													)
												}
												className='text-gray-400 hover:text-gray-600'
											>
												<X className='w-3.5 h-3.5' />
											</button>
										</div>
									))}
							</div>

							{(selectedFiterMenu.length > 0 ||
								selectedProducts.length > 0) && (
								<button
									onClick={() => {
										setSelectedFiterMenu([]);
										setSelectedProducts([]);
										setSortOption('newest');
										setSearchTerm('');
									}}
									className='flex items-center text-blue-500 hover:text-blue-600 text-sm whitespace-nowrap ml-2'
								>
									Clear All
									<ClearAllIcon className='w-4 h-4 ml-1 text-blue-500 fill-transparent' />
								</button>
							)}
						</div>

						<div className='flex items-center justify-end w-full gap-2 mb-2'></div>

						<div className='mb-6 pr-4 pl-3 flex items-center gap-2 rounded-lg text-sm border border-[#e0e0e0] transition-all duration-200 focus-within:border-[#333] mx-2'>
							<span className='text-[#474545] text-sm font-bold whitespace-nowrap'>
								Find
							</span>

							<input
								type='text'
								className='w-full py-2 pr-10 text-sm focus:outline-none'
								placeholder='Search for products (Courses, sessions, ...)'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>

							{searchTerm.length > 1 ? (
								<button onClick={() => setSearchTerm('')}>
									<X className='size-5 rounded-full bg-gray-400 text-white p-1 shadow' />
								</button>
							) : (
								<div className='bg-blue-500 rounded-full p-1 px-1.5'>
									<Image
										src='/img/search-icon.svg'
										alt='search'
										width={16}
										height={16}
										className='w-4 h-4 brightness-0 invert'
									/>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		);
	}

	// Desktop fallback: render nothing or a placeholder if needed
	return null;
};

export default ProductHeader;

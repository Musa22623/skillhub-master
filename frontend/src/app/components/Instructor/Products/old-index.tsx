/** @format */

'use client';

import React, {useState, useEffect} from 'react';
import CreateMenu from './components/CreateMenu';
import PaginationMenu from './components/PaginationMenu';
import ProductsGrid from './components/ProductsGrid';
import FilterMenu from './components/FilterMenu';
import SortMenu from './components/SortMenu';
import {ArrowBottomtSvg, PlusSvg} from '../../svg';
import AllProductsMenu from './components/AllProductsMenu';
import {useSearchParams} from 'next/navigation';

import {PRODUCT_DATA} from '@/constants';
import {X} from 'lucide-react';
import {useIsMobile} from '@/hooks/use-mobile';

const ProductsInstructor = () => {
	const [openCreateMenu, setOpenCreateMenu] = React.useState(false);
	const [openProductsMenu, setOpenProductsMenu] = React.useState(false);

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredProducts, setFilteredProducts] = useState<typeof PRODUCT_DATA>(
		[]
	);
	const [searchTerm, setSearchTerm] = useState('');
	const [productsPerPage, setProductsPerPage] = useState(10);
	const searchParams = useSearchParams();
	const [selectedFiterMenu, setSelectedFiterMenu] = useState<string[]>([]);
	const [sortOption, setSortOption] = useState<string>('newest');
	const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

	const isMobile = useIsMobile();
	// Initialize filtered products with all products
	useEffect(() => {
		const typeFilter = searchParams.get('type'); // e.g., ?type=course
		let filtered = [...PRODUCT_DATA];

		// Filter by type (from URL)
		if (typeFilter) {
			filtered = filtered.filter((product) => product.type === typeFilter);
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

	const typeFilter = searchParams.get('type');
	// Calculate pagination values
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);
	const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

	// Change page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};
	const goToPrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	// Generate page numbers
	const pageNumbers: number[] = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	// Display logic for pagination buttons (show max 5 pages)
	const getPageButtons = () => {
		if (totalPages <= 5) {
			// Show all pages if 5 or fewer
			return pageNumbers.map((number) => (
				<button
					key={number}
					className={`w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 ${
						currentPage === number
							? 'bg-[#333] text-white border-[#333]'
							: 'bg-white text-[#333] border-[#e0e0e0] hover:bg-[#f5f5f5]'
					}`}
					onClick={() => paginate(number)}
				>
					{number}
				</button>
			));
		} else {
			// Show pagination with ellipsis for many pages
			const visiblePages = [];

			// Always show first page
			visiblePages.push(1);

			// Show ellipsis if needed
			if (currentPage > 3) {
				visiblePages.push('...');
			}

			// Show current page and neighbors
			for (
				let i = Math.max(2, currentPage - 1);
				i <= Math.min(currentPage + 1, totalPages - 1);
				i++
			) {
				visiblePages.push(i);
			}

			// Show ellipsis if needed
			if (currentPage < totalPages - 2) {
				visiblePages.push('...');
			}

			// Always show last page
			if (totalPages > 1) {
				visiblePages.push(totalPages);
			}

			return visiblePages.map((item, index) => {
				if (item === '...') {
					return (
						<span key={`ellipsis-${index}`} className='px-2'>
							...
						</span>
					);
				}

				return (
					<button
						key={item}
						className={`w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 ${
							currentPage === item
								? 'bg-[#333] text-white border-[#333]'
								: 'bg-white text-[#333] border-[#e0e0e0] hover:bg-[#f5f5f5]'
						}`}
						onClick={() => typeof item === 'number' && paginate(item)}
					>
						{item}
					</button>
				);
			});
		}
	};
	const typeMap = {
		school: 'Schools',
		course: 'Courses',
		session: 'Sessions',
		community: 'Communities', // Explicit mapping
		bundle: 'Bundles',
		subscription: 'Subscriptions',
	};

	if (isMobile) {
		return (
			<div>
				<div className='flex justify-between items-center mb-5'>
					<div className='flex relative items-center gap-2'>
						<h1 className='text-3xl font-semibold leading-8 tracking-wide text-[#333] max-xs:text-2xl'>
							{typeFilter && typeFilter in typeMap
								? typeMap[typeFilter as keyof typeof typeMap]
								: 'All Products'}
						</h1>
						<button
							className='w-5 h-5 bg-[#333] rounded-[50%] flex items-center justify-center ml-0.5 cursor-pointer relative'
							onClick={() => {
								setOpenProductsMenu((prev) => !prev);
							}}
						>
							<ArrowBottomtSvg className='w-3.5 h-3.5 stroke-white fill-none' />
						</button>
						{openProductsMenu && (
							<AllProductsMenu
								open={openProductsMenu}
								setOpen={setOpenProductsMenu}
								selectedProducts = {selectedProducts}
								setSelectedProducts = {setSelectedProducts}
							/>
						)}
					</div>
					<div className='relative inline-block'>
						<button
							className='bg-[#333] text-white border-none rounded-3xl px-4 py-2 text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:bg-[#444]'
							onClick={() => setOpenCreateMenu(!openCreateMenu)}
						>
							<PlusSvg className='w-3.5 h-3.5 stroke-white' />
							Create
							<ArrowBottomtSvg className='w-3.5 h-3.5 stroke-white fill-none' />
						</button>

						<CreateMenu open={openCreateMenu} setOpen={setOpenCreateMenu} />
					</div>
				</div>

				<div className='xs:bg-white rounded-xl max-xs:p-2 p-6 shadow-sm'>
					<div className='mb-6 pr-4 flex focus-within:border-black  rounded-lg text-sm border border-[#e0e0e0] bg-[url(/img/search-icon.svg)] bg-no-repeat bg-[12px_center] transition-all duration-200 focus:outline-none focus:border-[#333]'>
						<input
							type='text'
							className='w-full py-3 pr-4 pl-10 rounded-lg text-sm  transition-all duration-200 focus:outline-none focus:border-[#333]'
							placeholder='Search Products'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>

						{searchTerm.length > 1 && (
							<button onClick={() => setSearchTerm('')}>
								<X className='size-5 rounded-full bg-gray-400 text-white p-1 shadow' />
							</button>
						)}
					</div>

					<div className='flex justify-between items-center mb-6'>
						<div className='text-[#666] text-sm max-sm:hidden'>
							Showing{' '}
							<strong className='text-[#333] font-semibold'>
								{indexOfFirstProduct + 1}-
								{Math.min(indexOfLastProduct, filteredProducts.length)}
							</strong>{' '}
							of{' '}
							<strong className='text-[#333] font-semibold'>
								{filteredProducts.length}
							</strong>{' '}
							products
						</div>
						<div className='flex items-center gap-3 justify-between max-sm:w-full'>
							<FilterMenu
								selectedStatus={selectedFiterMenu}
								setSelectedStatus={setSelectedFiterMenu}
							/>
							<SortMenu
								selectedSort={sortOption}
								onChangeSort={setSortOption}
							/>
						</div>
					</div>

					<ProductsGrid products={currentProducts.map(product => ({ ...product, id: product.id.toString() }))} />

					<div className='flex justify-between items-center mt-6 pt-6 border-t-[1px] border-[#e0e0e0] max-sm:hidden'>
						<div className='flex items-center gap-6'>
							<div className='text-[#666] text-sm'>
								Showing{' '}
								<strong className='text-[#333] font-semibold'>
									{indexOfFirstProduct + 1}-
									{Math.min(indexOfLastProduct, filteredProducts.length)}
								</strong>{' '}
								of{' '}
								<strong className='text-[#333] font-semibold'>
									{filteredProducts.length}
								</strong>{' '}
								products
							</div>
							<PaginationMenu
								itemsPerPage={productsPerPage}
								setItemsPerPage={setProductsPerPage}
							/>
						</div>

						<div className='flex items-center gap-2'>
							<button
								className='w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]'
								onClick={goToPrevPage}
								disabled={currentPage === 1}
							>
								<svg
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									className='w-4 h-4'
								>
									<path
										d='M15 18l-6-6 6-6'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>

							{getPageButtons()}

							<button
								className='w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]'
								onClick={goToNextPage}
								disabled={currentPage === totalPages}
							>
								<svg
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									className='w-4 h-4'
								>
									<path
										d='M9 18l6-6-6-6'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>
						</div>
					</div>

					{/* Mobile pagination - only shown on small screens */}
					<div className='hidden max-sm:flex justify-center mt-6 pt-6 border-t-[1px] border-[#e0e0e0]'>
						<div className='flex items-center gap-2'>
							<button
								className='w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]'
								onClick={goToPrevPage}
								disabled={currentPage === 1}
							>
								<svg
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									className='w-4 h-4'
								>
									<path
										d='M15 18l-6-6 6-6'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>

							<div className='text-[#666] text-sm px-2'>
								Page{' '}
								<strong className='text-[#333] font-semibold'>
									{currentPage}
								</strong>{' '}
								of{' '}
								<strong className='text-[#333] font-semibold'>
									{totalPages}
								</strong>
							</div>

							<button
								className='w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]'
								onClick={goToNextPage}
								disabled={currentPage === totalPages}
							>
								<svg
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									className='w-4 h-4'
								>
									<path
										d='M9 18l6-6-6-6'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<div className='flex justify-between items-center mb-5'>
					<div className='flex relative items-center gap-2'>
						<h1 className='text-3xl font-semibold leading-8 tracking-wide text-[#333] max-xs:text-2xl'>
							{typeFilter && typeFilter in typeMap
								? typeMap[typeFilter as keyof typeof typeMap]
								: 'All Products'}
						</h1>
						<button
							className='w-5 h-5 bg-[#333] rounded-[50%] flex items-center justify-center ml-0.5 cursor-pointer relative'
							onClick={() => {
								setOpenProductsMenu((prev) => !prev);
							}}
						>
							<ArrowBottomtSvg className='w-3.5 h-3.5 stroke-white fill-none' />
						</button>
						{openProductsMenu && (
							<AllProductsMenu
								open={openProductsMenu}
								setOpen={setOpenProductsMenu}
								selectedProducts = {selectedProducts}
								setSelectedProducts = {setSelectedProducts}
							/>
						)}
					</div>
					<div className='relative inline-block'>
						<button
							className='bg-[#333] text-white border-none rounded-3xl px-4 py-2 text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:bg-[#444]'
							onClick={() => setOpenCreateMenu(!openCreateMenu)}
						>
							<PlusSvg className='w-3.5 h-3.5 stroke-white' />
							Create
							<ArrowBottomtSvg className='w-3.5 h-3.5 stroke-white fill-none' />
						</button>

						<CreateMenu open={openCreateMenu} setOpen={setOpenCreateMenu} />
					</div>
				</div>

				<div className='xs:bg-white rounded-xl max-xs:p-2 p-6 shadow-sm'>
					<div className='mb-6 pr-4 flex focus-within:border-black  rounded-lg text-sm border border-[#e0e0e0] bg-[url(/img/search-icon.svg)] bg-no-repeat bg-[12px_center] transition-all duration-200 focus:outline-none focus:border-[#333]'>
						<input
							type='text'
							className='w-full py-3 pr-4 pl-10 rounded-lg text-sm  transition-all duration-200 focus:outline-none focus:border-[#333]'
							placeholder='Search Products'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>

						{searchTerm.length > 1 && (
							<button onClick={() => setSearchTerm('')}>
								<X className='size-5 rounded-full bg-gray-400 text-white p-1 shadow' />
							</button>
						)}
					</div>

					<div className='flex justify-between items-center mb-6'>
						<div className='text-[#666] text-sm max-sm:hidden'>
							Showing{' '}
							<strong className='text-[#333] font-semibold'>
								{indexOfFirstProduct + 1}-
								{Math.min(indexOfLastProduct, filteredProducts.length)}
							</strong>{' '}
							of{' '}
							<strong className='text-[#333] font-semibold'>
								{filteredProducts.length}
							</strong>{' '}
							products
						</div>
						<div className='flex items-center gap-3 justify-between max-sm:w-full'>
							<FilterMenu
								selectedStatus={selectedFiterMenu}
								setSelectedStatus={setSelectedFiterMenu}
							/>
							<SortMenu
								selectedSort={sortOption}
								onChangeSort={setSortOption}
							/>
						</div>
					</div>

					<ProductsGrid products={currentProducts.map(product => ({ ...product, id: product.id.toString() }))} />

					<div className='flex justify-between items-center mt-6 pt-6 border-t-[1px] border-[#e0e0e0] max-sm:hidden'>
						<div className='flex items-center gap-6'>
							<div className='text-[#666] text-sm'>
								Showing{' '}
								<strong className='text-[#333] font-semibold'>
									{indexOfFirstProduct + 1}-
									{Math.min(indexOfLastProduct, filteredProducts.length)}
								</strong>{' '}
								of{' '}
								<strong className='text-[#333] font-semibold'>
									{filteredProducts.length}
								</strong>{' '}
								products
							</div>
							<PaginationMenu
								itemsPerPage={productsPerPage}
								setItemsPerPage={setProductsPerPage}
							/>
						</div>

						<div className='flex items-center gap-2'>
							<button
								className='w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]'
								onClick={goToPrevPage}
								disabled={currentPage === 1}
							>
								<svg
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									className='w-4 h-4'
								>
									<path
										d='M15 18l-6-6 6-6'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>

							{getPageButtons()}

							<button
								className='w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]'
								onClick={goToNextPage}
								disabled={currentPage === totalPages}
							>
								<svg
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									className='w-4 h-4'
								>
									<path
										d='M9 18l6-6-6-6'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>
						</div>
					</div>

					{/* Mobile pagination - only shown on small screens */}
					<div className='hidden max-sm:flex justify-center mt-6 pt-6 border-t-[1px] border-[#e0e0e0]'>
						<div className='flex items-center gap-2'>
							<button
								className='w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]'
								onClick={goToPrevPage}
								disabled={currentPage === 1}
							>
								<svg
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									className='w-4 h-4'
								>
									<path
										d='M15 18l-6-6 6-6'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>

							<div className='text-[#666] text-sm px-2'>
								Page{' '}
								<strong className='text-[#333] font-semibold'>
									{currentPage}
								</strong>{' '}
								of{' '}
								<strong className='text-[#333] font-semibold'>
									{totalPages}
								</strong>
							</div>

							<button
								className='w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]'
								onClick={goToNextPage}
								disabled={currentPage === totalPages}
							>
								<svg
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									className='w-4 h-4'
								>
									<path
										d='M9 18l6-6-6-6'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default ProductsInstructor;

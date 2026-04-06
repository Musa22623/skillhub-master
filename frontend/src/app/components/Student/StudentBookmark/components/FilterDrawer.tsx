/** @format */

'use client';

import type React from 'react';

import {useState} from 'react';
import {ChevronDown, X} from 'lucide-react';
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';
interface FilterDrawerProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

interface ExpandedSections {
  contentType: boolean;
  category: boolean;
  rating: boolean;
  progress: boolean;
  tags: boolean;
}

interface SelectedFilters {
  contentType: string[];
  category: string[];
  rating: string[];
  progress: string[];
  tags: string[];
}

export default function FilterDrawer({isOpen, setIsOpen}: FilterDrawerProps) {
	const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
		contentType: true,
		category: false,
		rating: false,
		progress: false,
		tags: false,
	});
	const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
		contentType: ['all-content'],
		category: ['technology', 'programming', 'business'],
		rating: [],
		progress: [],
		tags: [],
	});

	const toggleSection = (section: string) => {
		setExpandedSections({
			...expandedSections,
			[section]: !expandedSections[section as keyof typeof expandedSections],
		});
	};

	const handleContentTypeChange = (id: string) => {
		setSelectedFilters({
			...selectedFilters,
			contentType: [id],
		});
	};

	const handleCheckboxChange = (
		section: string,
		value: string,
		checked: boolean
	) => {
		if (checked) {
			setSelectedFilters({
				...selectedFilters,
				[section]: [
					...selectedFilters[section as keyof typeof selectedFilters],
					value,
				],
			});
		} else {
			setSelectedFilters({
				...selectedFilters,
				[section]: selectedFilters[
					section as keyof typeof selectedFilters
				].filter((item) => item !== value),
			});
		}
	};

	const getFilterCount = (section: string) => {
		return selectedFilters[section as keyof typeof selectedFilters].length;
	};

	return (
		<>
			{/* Filter Drawer */}

			<Drawer open={isOpen} onOpenChange={setIsOpen}>
				<DrawerContent className=''>
					<DrawerHeader className='flex-row justify-between w-full border-b pt-0'>
						<DrawerTitle>
							<span className='font-semibold text-lg text-gray-800'>
								Filters
							</span>
						</DrawerTitle>
						<button
							className='bg-none border-none text-gray-500 text-2xl cursor-pointer p-1'
							onClick={() => setIsOpen(false)}
						>
							<X />
						</button>
					</DrawerHeader>
					{/* Content Type Section */}
					<div className='overflow-y-auto'>
						<div
							className={`border-b border-gray-100 ${
								expandedSections.contentType ? 'expanded' : ''
							}`}
						>
							<div
								className='p-4 flex justify-between items-center cursor-pointer'
								onClick={() => toggleSection('contentType')}
							>
								<h3 className='font-semibold text-base text-gray-800 flex items-center gap-2'>
									Content Type
									{getFilterCount('contentType') > 0 && (
										<span className='bg-blue-500 text-white px-2 py-0.5 rounded-xl text-xs'>
											{getFilterCount('contentType')}
										</span>
									)}
								</h3>
								<ChevronDown
									className={`transition-transform duration-200 ${
										expandedSections.contentType ? 'rotate-180' : ''
									}`}
									size={16}
								/>
							</div>

							{expandedSections.contentType && (
								<div className='px-4 pb-4'>
									<div className='grid grid-cols-2 gap-3'>
										{[
											{id: 'all-content', label: 'All Content'},
											{id: 'articles', label: 'Articles'},
											{id: 'videos', label: 'Videos'},
											{id: 'courses', label: 'Courses'},
										].map((option) => (
											<div
												key={option.id}
												className={`relative border rounded-lg p-3 cursor-pointer transition-all ${
													selectedFilters.contentType.includes(option.id)
														? 'border-blue-500 bg-blue-50'
														: 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
												}`}
											>
												<input
													type='checkbox'
													id={option.id}
													className='absolute opacity-0 cursor-pointer'
													checked={selectedFilters.contentType.includes(
														option.id
													)}
													onChange={() => handleContentTypeChange(option.id)}
												/>
												<label
													htmlFor={option.id}
													className={`flex flex-col items-center gap-2 cursor-pointer ${
														selectedFilters.contentType.includes(option.id)
															? 'text-blue-700'
															: 'text-gray-600'
													}`}
												>
													<span>{option.label}</span>
												</label>
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Category Section */}
						<div
							className={`border-b border-gray-100 ${
								expandedSections.category ? 'expanded' : ''
							}`}
						>
							<div
								className='p-4 flex justify-between items-center cursor-pointer'
								onClick={() => toggleSection('category')}
							>
								<h3 className='font-semibold text-base text-gray-800 flex items-center gap-2'>
									Category
									{getFilterCount('category') > 0 && (
										<span className='bg-blue-500 text-white px-2 py-0.5 rounded-xl text-xs'>
											{getFilterCount('category')}
										</span>
									)}
								</h3>
								<ChevronDown
									className={`transition-transform duration-200 ${
										expandedSections.category ? 'rotate-180' : ''
									}`}
									size={16}
								/>
							</div>

							{expandedSections.category && (
								<div className='px-4 pb-4'>
									<div className='flex flex-col gap-3'>
										<label className='flex items-center gap-3 cursor-pointer'>
											<input
												type='checkbox'
												className='w-5 h-5 border-2 border-gray-300 rounded  relative bg-white checked:bg-blue-500 checked:border-blue-500 cursor-pointer'
												checked={selectedFilters.category.includes(
													'technology'
												)}
												onChange={(e) =>
													handleCheckboxChange(
														'category',
														'technology',
														e.target.checked
													)
												}
											/>
											<span className='text-sm text-gray-600'>Technology</span>
										</label>

										<div className='ml-8 pt-2'>
											<label className='flex items-center gap-3 cursor-pointer'>
												<input
													type='checkbox'
													className='w-5 h-5 border-2 border-gray-300 rounded  relative bg-white checked:bg-blue-500 checked:border-blue-500 cursor-pointer'
													checked={selectedFilters.category.includes(
														'programming'
													)}
													onChange={(e) =>
														handleCheckboxChange(
															'category',
															'programming',
															e.target.checked
														)
													}
												/>
												<span className='text-sm text-gray-600'>
													Programming
												</span>
											</label>

											<label className='flex items-center gap-3 cursor-pointer mt-3'>
												<input
													type='checkbox'
													className='w-5 h-5 border-2 border-gray-300 rounded  relative bg-white checked:bg-blue-500 checked:border-blue-500 cursor-pointer'
													checked={selectedFilters.category.includes('ai-ml')}
													onChange={(e) =>
														handleCheckboxChange(
															'category',
															'ai-ml',
															e.target.checked
														)
													}
												/>
												<span className='text-sm text-gray-600'>AI & ML</span>
											</label>
										</div>

										<label className='flex items-center gap-3 cursor-pointer'>
											<input
												type='checkbox'
												className='w-5 h-5 border-2 border-gray-300 rounded  relative bg-white checked:bg-blue-500 checked:border-blue-500 cursor-pointer'
												checked={selectedFilters.category.includes('business')}
												onChange={(e) =>
													handleCheckboxChange(
														'category',
														'business',
														e.target.checked
													)
												}
											/>
											<span className='text-sm text-gray-600'>Business</span>
										</label>

										<div className='ml-8 pt-2'>
											<label className='flex items-center gap-3 cursor-pointer'>
												<input
													type='checkbox'
													className='w-5 h-5 border-2 border-gray-300 rounded  relative bg-white checked:bg-blue-500 checked:border-blue-500 cursor-pointer'
													checked={selectedFilters.category.includes(
														'marketing'
													)}
													onChange={(e) =>
														handleCheckboxChange(
															'category',
															'marketing',
															e.target.checked
														)
													}
												/>
												<span className='text-sm text-gray-600'>Marketing</span>
											</label>

											<label className='flex items-center gap-3 cursor-pointer mt-3'>
												<input
													type='checkbox'
													className='w-5 h-5 border-2 border-gray-300 rounded  relative bg-white checked:bg-blue-500 checked:border-blue-500 cursor-pointer'
													checked={selectedFilters.category.includes('finance')}
													onChange={(e) =>
														handleCheckboxChange(
															'category',
															'finance',
															e.target.checked
														)
													}
												/>
												<span className='text-sm text-gray-600'>Finance</span>
											</label>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Rating Section */}
						<div
							className={`border-b border-gray-100 ${
								expandedSections.rating ? 'expanded' : ''
							}`}
						>
							<div
								className='p-4 flex justify-between items-center cursor-pointer'
								onClick={() => toggleSection('rating')}
							>
								<h3 className='font-semibold text-base text-gray-800 flex items-center gap-2'>
									Rating
									{getFilterCount('rating') > 0 && (
										<span className='bg-blue-500 text-white px-2 py-0.5 rounded-xl text-xs'>
											{getFilterCount('rating')}
										</span>
									)}
								</h3>
								<ChevronDown
									className={`transition-transform duration-200 ${
										expandedSections.rating ? 'rotate-180' : ''
									}`}
									size={16}
								/>
							</div>

							{expandedSections.rating && (
								<div className='px-4 pb-4'>
									<div className='flex flex-col gap-3'>
										{[
											'5+ Stars',
											'4+ Stars',
											'3+ Stars',
											'2+ Stars',
											'1+ Star',
											'No Rating',
										].map((rating, index) => (
											<label
												key={index}
												className='flex items-center gap-3 cursor-pointer'
											>
												<input
													type='checkbox'
													className='w-5 h-5 border-2 border-gray-300 rounded  relative bg-white checked:bg-blue-500 checked:border-blue-500 cursor-pointer'
													checked={selectedFilters.rating.includes(
														rating.toLowerCase().replace(/\s+/g, '-')
													)}
													onChange={(e) =>
														handleCheckboxChange(
															'rating',
															rating.toLowerCase().replace(/\s+/g, '-'),
															e.target.checked
														)
													}
												/>
												<span className='text-sm text-gray-600'>{rating}</span>
											</label>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Progress Section */}
						<div
							className={`border-b border-gray-100 ${
								expandedSections.progress ? 'expanded' : ''
							}`}
						>
							<div
								className='p-4 flex justify-between items-center cursor-pointer'
								onClick={() => toggleSection('progress')}
							>
								<h3 className='font-semibold text-base text-gray-800 flex items-center gap-2'>
									Progress
									{getFilterCount('progress') > 0 && (
										<span className='bg-blue-500 text-white px-2 py-0.5 rounded-xl text-xs'>
											{getFilterCount('progress')}
										</span>
									)}
								</h3>
								<ChevronDown
									className={`transition-transform duration-200 ${
										expandedSections.progress ? 'rotate-180' : ''
									}`}
									size={16}
								/>
							</div>

							{expandedSections.progress && (
								<div className='px-4 pb-4'>
									<div className='flex flex-col gap-3'>
										{['Not Started', 'In Progress', 'Completed'].map(
											(status, index) => (
												<label
													key={index}
													className='flex items-center gap-3 cursor-pointer'
												>
													<input
														type='checkbox'
														className='w-5 h-5 border-2 border-gray-300 rounded  relative bg-white checked:bg-blue-500 checked:border-blue-500 cursor-pointer'
														checked={selectedFilters.progress.includes(
															status.toLowerCase().replace(/\s+/g, '-')
														)}
														onChange={(e) =>
															handleCheckboxChange(
																'progress',
																status.toLowerCase().replace(/\s+/g, '-'),
																e.target.checked
															)
														}
													/>
													<span className='text-sm text-gray-600'>
														{status}
													</span>
												</label>
											)
										)}
									</div>
								</div>
							)}
						</div>

						{/* Tags Section */}
						<div
							className={`border-b border-gray-100 ${
								expandedSections.tags ? 'expanded' : ''
							}`}
						>
							<div
								className='p-4 flex justify-between items-center cursor-pointer'
								onClick={() => toggleSection('tags')}
							>
								<h3 className='font-semibold text-base text-gray-800 flex items-center gap-2'>
									Tags
									{getFilterCount('tags') > 0 && (
										<span className='bg-blue-500 text-white px-2 py-0.5 rounded-xl text-xs'>
											{getFilterCount('tags')}
										</span>
									)}
								</h3>
								<ChevronDown
									className={`transition-transform duration-200 ${
										expandedSections.tags ? 'rotate-180' : ''
									}`}
									size={16}
								/>
							</div>

							{expandedSections.tags && (
								<div className='px-4 pb-4'>
									<div className='flex flex-col gap-3'>
										{[
											'Learning',
											'Career',
											'Personal',
											'Research',
											'Development',
											'Tutorial',
										].map((tag, index) => (
											<label
												key={index}
												className='flex items-center gap-3 cursor-pointer'
											>
												<input
													type='checkbox'
													className='w-5 h-5 border-2 border-gray-300 rounded  relative bg-white checked:bg-blue-500 checked:border-blue-500 cursor-pointer'
													checked={selectedFilters.tags.includes(
														tag.toLowerCase()
													)}
													onChange={(e) =>
														handleCheckboxChange(
															'tags',
															tag.toLowerCase(),
															e.target.checked
														)
													}
												/>
												<span className='text-sm text-gray-600'>{tag}</span>
											</label>
										))}
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Show Results Button */}
					<DrawerFooter className='border-t'>
						<button className='w-full py-3.5 px-4 bg-gray-900 text-white border-none rounded-lg font-semibold text-sm cursor-pointer transition-colors hover:bg-gray-800'>
							Show 345 results
						</button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}

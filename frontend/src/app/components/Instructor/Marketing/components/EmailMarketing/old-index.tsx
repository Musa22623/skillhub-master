/** @format */

'use client';
import {
	Plus,
	SearchSVG,
	SelectAero,
	TreeVerticalDots,
	MarketingTool,
	Announcement,
	LeftPagination,
	RightPagination,
	StudentInroll,
	EmailCircle,
	EditerUndo,
	EditerItalic,
	EditerSelect,
	EditerRedo,
	DeleviredEmail,
} from '@/app/components/svg';
import Image from 'next/image';
import PaginationMenu from '../PaginationMenu';
import {useState} from 'react';
import CalendarPopup from '../../../../Calender/CalendarPopup';
import {useIsMobile} from '@/hooks/use-mobile';
import {Bold, ChevronDown, Italic, Redo, Search, Undo, X} from 'lucide-react';
import CourseImg from '@/assets/img5.jpg';
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';
const EmailMarketing = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenCalender, setIsOpenCalender] = useState(false);
	const [activeTab, setActiveTab] = useState('All');
	const [isNewEmailDrawerOpen, setIsNewEmailDrawerOpen] = useState(false);
	useState(false);

	const openNewEmailDrawer = () => {
		setIsNewEmailDrawerOpen(true);
	};

	const closeNewEmailDrawer = () => {
		setIsNewEmailDrawerOpen(false);
	};

	const isMobile = useIsMobile();
	if (isMobile) {
		return (
			<>
				<div className='mb-20'>
					{/* Header */}
					<div className='mb-4 flex items-center justify-between'>
					<h1 className="text-[1.5rem] font-semibold text-[#142E53] tracking-[-0.025em]"> Marketing</h1>
						<button
							className='flex items-center gap-1.5 rounded-md bg-[#13C4CC] px-3 py-2 text-sm font-semibold text-white'
							onClick={openNewEmailDrawer}
						>
							<Plus className='h-4 w-4' />
							New Email
						</button>
					</div>

					{/* Search Section */}
					<div className='relative mb-3'>
						<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3B6E91]' />
						<input
							type='text'
							className='w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm'
							placeholder='Search emails...'
						/>
					</div>

					{/* Controls */}
					<div className='mb-4 grid grid-cols-2 gap-2'>
						<button className='flex items-center justify-center gap-1 rounded-md border border-gray-200 bg-white py-2 text-xs text-[#3B6E91]'>
							Filter by Status
							<ChevronDown className='h-3 w-3' />
						</button>
						<button className='flex items-center justify-center gap-1 rounded-md border border-gray-200 bg-white py-2 text-xs text-[#3B6E91]'>
							Sort: Newest
							<ChevronDown className='h-3 w-3' />
						</button>
					</div>

					{/* Tabs */}
					<div className='mb-4 flex gap-4 overflow-x-auto border-b border-gray-200 pb-0.5'>
						{['All', 'Sent', 'Scheduled', 'Draft'].map((tab) => (
							<button
								key={tab}
								className={`whitespace-nowrap px-1 py-2 text-sm font-semibold ${
									activeTab === tab
										? 'relative text-[#13C4CC] after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-0.5 after:bg-[#13C4CC]'
										: 'text-[#343332]'
								}`}
								onClick={() => setActiveTab(tab)}
							>
								{tab}
							</button>
						))}
					</div>

					{/* Email Cards */}
					<div className='mb-3 cursor-pointer rounded-xl bg-white p-4 shadow-sm'>
						<div className='mb-3 flex gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#D3F8DF]'>
								<svg className='h-5 w-5 fill-[#085C37]' viewBox='0 0 16 16'>
									<path
										fillRule='evenodd'
										d='M5.333 0a.667.667 0 0 0 0 1.333h5.334a.667.667 0 1 0 0-1.333H5.333ZM2.667 3.333c0-.368.298-.666.666-.666h9.334a.667.667 0 1 1 0 1.333H3.333a.667.667 0 0 1-.666-.667ZM1.333 6c0-.368.299-.667.667-.667h12c.368 0 .667.299.667.667v9.333A.667.667 0 0 1 14 16H2a.667.667 0 0 1-.667-.667V6Zm1.334.667v8h10.666v-8H2.667Z'
									/>
								</svg>
							</div>
							<div>
								<div className='mb-1 text-sm font-semibold text-[#343332]'>
									Welcome to Our Platform
								</div>

								<div className='flex items-center gap-2 relative'>
									<span className='rounded-full bg-[rgba(2,197,175,0.1)] px-2 py-1 text-xs font-semibold text-[#02C5AF]'>
										SENT
									</span>

									<div className=' flex items-center'>
										<div className='flex  -space-x-2'>
											<div className='h-6 w-6 overflow-hidden rounded-full  border-2 border-white shadow-sm'>
												<Image
													src='https://i.ibb.co/jJ4GHXP/img1.jpg'
													alt='Product 1'
													width={24}
													height={24}
													className='h-full w-full object-cover'
												/>
											</div>
											<div className='h-6 w-6 overflow-hidden rounded-full border-2 border-white shadow-sm'>
												<Image
													src='https://i.ibb.co/jJ4GHXP/img1.jpg'
													alt='Product 2'
													width={24}
													height={24}
													className='h-full w-full object-cover'
												/>
											</div>
											<div className='h-6 w-6 overflow-hidden rounded-full border-2 border-white shadow-sm'>
												<Image
													src='https://i.ibb.co/jJ4GHXP/img1.jpg'
													alt='Product 3'
													width={24}
													height={24}
													className='h-full w-full object-cover'
												/>
											</div>
											<div className='flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#F1F3F6] text-xs font-semibold text-[#3B6E91] shadow-sm'>
												+3
											</div>
										</div>
									</div>


								</div>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-2'>
							<div className='rounded-md bg-[#F9FAFB] p-2 text-center'>
								<div className='text-xs text-[#64748B]'>Sent</div>
								<div className='text-sm font-semibold text-[#343332]'>104</div>
							</div>
							<div className='rounded-md bg-[#F9FAFB] p-2 text-center'>
								<div className='text-xs text-[#64748B]'>Opened</div>
								<div className='text-sm font-semibold text-[#343332]'>33</div>
							</div>
							<div className='rounded-md bg-[#F9FAFB] p-2 text-center'>
								<div className='text-xs text-[#64748B]'>Clicked</div>
								<div className='text-sm font-semibold text-[#343332]'>15</div>
							</div>
							<div className='rounded-md bg-[#F9FAFB] p-2 text-center'>
								<div className='text-xs text-[#64748B]'>Unsubscribed</div>
								<div className='text-sm font-semibold text-[#343332]'>2</div>
							</div>
						</div>
					</div>

					<div className='cursor-pointer rounded-xl bg-white p-4 shadow-sm'>
						<div className='mb-3 flex gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#D3F8DF]'>
								<DeleviredEmail />
							</div>
							<div>
								<div className='mb-1 text-sm font-semibold text-[#343332]'>
									New Course Announcement
								</div>
							<div className='flex gap-2 items-center'>
							<span className='rounded-full bg-[rgba(19,196,204,0.1)] px-2 py-1 text-xs font-semibold text-[#13C4CC]'>
									SCHEDULED
								</span>
								<div className='inline-flex items-center'>
							<div className='inline-flex -space-x-2'>
								<div className='h-6 w-6 overflow-hidden rounded-full border-2 border-white shadow-sm'>
									<Image
										src='https://i.ibb.co/jJ4GHXP/img1.jpg'
										alt='Product 1'
										width={24}
										height={24}
										className='h-full w-full object-cover'
									/>
								</div>
								<div className='h-6 w-6 overflow-hidden rounded-full border-2 border-white shadow-sm'>
									<Image
										src='https://i.ibb.co/jJ4GHXP/img1.jpg'
										alt='Product 2'
										width={24}
										height={24}
										className='h-full w-full object-cover'
									/>
								</div>
								<div className='flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#F1F3F6] text-xs font-semibold text-[#3B6E91] shadow-sm'>
									+2
								</div>
							</div>
						</div>
							</div>
							</div>
						</div>

					

						<div className='grid grid-cols-2 gap-2'>
							<div className='rounded-md bg-[#F9FAFB] p-2 text-center'>
								<div className='text-xs text-[#64748B]'>Sent</div>
								<div className='text-sm font-semibold text-[#343332]'>-</div>
							</div>
							<div className='rounded-md bg-[#F9FAFB] p-2 text-center'>
								<div className='text-xs text-[#64748B]'>Opened</div>
								<div className='text-sm font-semibold text-[#343332]'>-</div>
							</div>
							<div className='rounded-md bg-[#F9FAFB] p-2 text-center'>
								<div className='text-xs text-[#64748B]'>Clicked</div>
								<div className='text-sm font-semibold text-[#343332]'>-</div>
							</div>
							<div className='rounded-md bg-[#F9FAFB] p-2 text-center'>
								<div className='text-xs text-[#64748B]'>Unsubscribed</div>
								<div className='text-sm font-semibold text-[#343332]'>-</div>
							</div>
						</div>
					</div>
				</div>

				{/* New Email Drawer */}
				{isNewEmailDrawerOpen && (
					<>
						<Drawer
							open={isNewEmailDrawerOpen}
							onClose={() => setIsNewEmailDrawerOpen}
						>
							<DrawerContent>
								<DrawerHeader className='border-b py-0 mb-4'>
									<div className='mb-5 flex items-center justify-between'>
										<DrawerTitle className='text-lg font-semibold text-[#142E53]'>
											Create New Email
										</DrawerTitle>
										<button
											className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-[#3B6E91]'
											onClick={closeNewEmailDrawer}
										>
											<X className='h-4 w-4' />
										</button>
									</div>
								</DrawerHeader>
								<section className='overflow-y-auto px-4'>
									<div className='mb-4'>
										<label className='mb-1.5 block text-sm font-semibold text-[#142E53]'>
											Name
										</label>
										<input
											type='text'
											className='w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#13C4CC] focus:outline-none focus:ring-2 focus:ring-[#13C4CC] focus:ring-opacity-10'
											placeholder='Enter email name'
										/>
									</div>

									<div className='mb-4'>
										<label className='mb-1.5 block text-sm font-semibold text-[#142E53]'>
											Subject
										</label>
										<input
											type='text'
											className='w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#13C4CC] focus:outline-none focus:ring-2 focus:ring-[#13C4CC] focus:ring-opacity-10'
											placeholder='Enter email subject'
										/>
									</div>

									<div className='mb-4'>
										<label className='mb-1.5 block text-sm font-semibold text-[#142E53]'>
											Products
										</label>
										<div className='mb-2 flex flex-wrap gap-2'>
											{/* Selected products would go here */}
										</div>
										<input
											type='text'
											className='w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#13C4CC] focus:outline-none focus:ring-2 focus:ring-[#13C4CC] focus:ring-opacity-10'
											placeholder='Search products...'
										/>
										<div className='mt-2 max-h-60 overflow-y-auto rounded-lg border border-gray-200'>
											<div className='flex gap-3 border-b border-gray-200 p-3'>
												<Image
													src={CourseImg}
													alt='Product'
													width={48}
													height={48}
													className='h-12 w-12 rounded-md object-cover'
												/>
												<div>
													<div className='text-sm font-semibold text-gray-900'>
														How to Write Better Prompts
													</div>
													<span className='rounded bg-[#DBE9FE] px-2 py-0.5 text-xs font-semibold text-[#1C4ED8]'>
														Course
													</span>
												</div>
											</div>
											<div className='p-3'>
												<div>
													<div className='text-sm font-semibold text-gray-900'>
														All Followers
													</div>
													<div className='text-xs text-gray-500'>
														4,761 total followers
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className='mb-4'>
										<label className='mb-1.5 block text-sm font-semibold text-[#142E53]'>
											Email Type
										</label>
										<select className='w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#13C4CC] focus:outline-none focus:ring-2 focus:ring-[#13C4CC] focus:ring-opacity-10'>
											<option value='announcement'>Announcement</option>
											<option value='marketing'>Marketing</option>
										</select>
									</div>

									<div className='mb-4'>
										<label className='mb-1.5 block text-sm font-semibold text-[#142E53]'>
											Content
										</label>
										<div className='flex gap-2 overflow-x-auto rounded-t-lg bg-[#F9FAFB] p-2 border border-gray-200'>
											<button className='p-1.5 text-[#3B6E91] hover:bg-gray-200 rounded'>
												<Bold className='h-4 w-4' />
											</button>
											<button className='p-1.5 text-[#3B6E91] hover:bg-gray-200 rounded'>
												<Italic className='h-4 w-4' />
											</button>
											<button className='p-1.5 text-[#3B6E91] hover:bg-gray-200 rounded'>
												<Undo className='h-4 w-4' />
											</button>
											<button className='p-1.5 text-[#3B6E91] hover:bg-gray-200 rounded'>
												<Redo className='h-4 w-4' />
											</button>
										</div>
										<div
											className='min-h-[200px] rounded-b-lg border border-t-0 border-gray-200 p-3 text-sm focus:border-[#13C4CC] focus:outline-none'
											contentEditable
										></div>
									</div>
								</section>
								<DrawerFooter>
									<div className='flex gap-2 border-t border-gray-200 pt-4'>
										<button className='flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-[#3B6E91]'>
											Preview
										</button>
										<button className='flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-[#3B6E91]'>
											Schedule
										</button>
										<button className='flex-1 rounded-lg bg-[#13C4CC] py-2 text-sm font-semibold text-white'>
											Send
										</button>
									</div>
								</DrawerFooter>
							</DrawerContent>
						</Drawer>
					</>
				)}
			</>
		);
	} else {
		return (
			<div className='bg-white rounded-[8px] overflow-hidden border border-[#e5e7eb] p-6 min-md:mr-1'>
				<div className='mb-6'>
					<div className='box-border flex justify-between items-center mb-6'>
						<h1 className='text-[1.5rem] font-semibold text-[#142E53] tracking-[-0.025em]'>
							Marketing
						</h1>
						<button
							className='flex items-center gap-2 bg-[#13C4CC] text-white border-none px-5 py-2.5 rounded-[6px] font-medium cursor-pointer transition-colors duration-200'
							onClick={() => setIsOpen(true)}
						>
							<Plus />
							New Email
						</button>
					</div>
					<div className='box-border mb-6'>
						<div className='relative'>
							<SearchSVG />
							<input
								type='text'
								placeholder='Search emails...'
								className='focus:outline-none focus:border-teal-500 focus:shadow-[0_0_0_3px_rgba(19,196,204,.1)] w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg text-sm mb-4'
							/>
						</div>

						<div className='box-border flex justify-between items-center text-sm text-[#3B6E91]'>
							<div>
								Showing{' '}
								<span className='font-semibold text-[#142E53]'>1-8</span> of{' '}
								<span className='font-semibold text-[#142E53]'>120</span> emails
							</div>
							<div className='controls md:mb-0 flex flex-col sm:flex-row w-full sm:w-fit gap-4'>
								{/* Bulk Actions Dropdown (Hidden on small screens) */}
								<div className='relative hidden sm:block'>
									<select
										className='hover:border-teal-500 hover:text-teal-500 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-[#3b6e91] cursor-pointer duration-200 appearance-none pr-10 
                         focus:outline-none focus:ring-0 focus:ring-teal-500 focus:border-teal-500 focus:border-1'
									>
										<option value=''>Bulk Actions</option>
										<option value='delete'>Delete</option>
									</select>
									<div className='absolute inset-y-0 right-2 flex items-center pointer-events-none'>
										<SelectAero />
									</div>
								</div>

								<div className='flex gap-3 w-full justify-between sm:justify-normal'>
									<div className='relative w-full sm:w-auto'>
										<select
											className='hover:border-teal-500 hover:text-teal-500 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-[#3b6e91] cursor-pointer duration-200 appearance-none pr-10 
                         focus:outline-none focus:ring-0 focus:ring-teal-500 focus:border-teal-500 focus:border-1'
										>
											<option value=''>Filter by Status</option>
											<option value='SENT'>Sent</option>
											<option value='SCHEDULED'>Scheduled</option>
											<option value='DRAFT'>Draft</option>
										</select>
										<div className='absolute inset-y-0 right-2 flex items-center pointer-events-none'>
											<SelectAero />
										</div>
									</div>

									{/* Sort Dropdown */}
									<div className='relative w-full sm:w-auto'>
										<select
											className='hover:border-teal-500 hover:text-teal-500 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-[#3b6e91] cursor-pointer duration-200 appearance-none pr-10 
                         focus:outline-none focus:ring-0 focus:ring-teal-500 focus:border-teal-500 focus:border-1'
										>
											<option value='Newest'>Sort: Newest</option>
											<option value='Oldest'>Sort: Oldest</option>
										</select>
										<div className='absolute inset-y-0 right-2 flex items-center pointer-events-none'>
											<SelectAero />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='flex gap-8  mb-6 border-b border-gray-300'>
						<div className='font-semibold text-sm cursor-pointer text-[#13C4CC] py-4 border-b border-gray-[#13c4cc]'>
							All
						</div>
						<div className='font-semibold text-sm text-[#343332] cursor-pointer py-4'>
							Sent
						</div>
						<div className='font-semibold text-sm text-[#343332] cursor-pointer py-4'>
							Scheduled
						</div>
						<div className='font-semibold text-sm text-[#343332] cursor-pointer py-4'>
							Draft
						</div>
					</div>
					<table className='box-border w-full border-spacing-0 mb-4 border-separate'>
						<thead>
							<tr>
								<th className='bg-gray-100 text-[#3B6E91] font-semibold text-xs uppercase tracking-wider w-[40px] text-center px-4 py-3 mb-6 border-b border-gray-300'>
									<div className='inline-flex items-center justify-center'>
										<div
											className='relative w-[18px] h-[18px]  cursor-pointer transition-all duration-200 rounded border-2 border-gray-300 bg-white'
											id='selectAll'
											role='checkbox'
											aria-checked='false'
											tabIndex={0}
										></div>
									</div>
								</th>
								<th className='bg-gray-100 text-left text-[#3B6E91] font-semibold text-xs uppercase tracking-wider px-4 py-3 mb-6 border-b border-gray-300'>
									TYPE
								</th>
								<th className='bg-gray-100 text-left text-[#3B6E91] font-semibold text-xs uppercase tracking-wider px-4 py-3 mb-6 border-b border-gray-300'>
									TITLE
								</th>
								<th className='bg-gray-100 text-left text-[#3B6E91] font-semibold text-xs uppercase tracking-wider px-4 py-3 mb-6 border-b border-gray-300'>
									STATUS
								</th>
								<th className='bg-gray-100 text-left text-[#3B6E91] font-semibold text-xs uppercase tracking-wider px-4 py-3 mb-6 border-b border-gray-300'>
									PRODUCTS
								</th>
								<th className='bg-gray-100 text-left text-[#3B6E91] font-semibold text-xs uppercase tracking-wider px-4 py-3 mb-6 border-b border-gray-300'>
									STATS
								</th>
								<th className='bg-gray-100 text-left text-[#3B6E91] font-semibold text-xs uppercase tracking-wider px-4 py-3 mb-6 border-b border-gray-300'></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='align-middle text-center p-4 mb-6 border-b border-gray-300 bg-white'>
									<div className='inline-flex items-center justify-center'>
										<div
											className='relative w-[18px] h-[18px]  cursor-pointer transition-all duration-200 rounded border-2 border-gray-300 bg-white'
											role='checkbox'
											aria-checked='false'
											tabIndex={0}
										></div>
									</div>
								</td>
								<td className='align-middle p-4 mb-6 border-b border-gray-300 bg-white'>
									<div className='w-[40px] h-[40px] items-center justify-center relative inline-flex rounded-lg bg-[#D3F8DF] group'>
										<MarketingTool />
										<span
											className='font-semibold absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 
                   whitespace-nowrap bg-[#142e53] text-white px-3 py-2 rounded-md text-[0.75rem]
                   opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10'
										>
											Marketing
										</span>
									</div>
								</td>
								<td className='font-semibold text-sm text-[#343332] align-middle p-4 mb-6 border-b border-gray-300 bg-white'>
									Welcome to Our Platform
								</td>
								<td className='align-middle p-4 mb-6 border-b border-gray-300 bg-white'>
									<span
										className='relative inline-block px-3 py-1.5 rounded-2xl bg-[rgba(2,197,175,0.1)] text-xs font-semibold text-[#02C5AF] 
                              group'
									>
										SENT
										<span
											className='absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 
                                whitespace-nowrap bg-[#142e53] text-white px-3 py-2 rounded-md text-[0.75rem]
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10'
										>
											Sent on Fri, Dec 25, 2024 4:22 PM
										</span>
									</span>
								</td>
								<td className='align-middle p-4 mb-6 border-b border-gray-300 bg-white'>
									<div className='flex items-center'>
										{/* Avatar 1 */}
										<div className='relative w-[32px] h-[32px] shadow-md z-[1] rounded-full border-2 border-white group'>
											<Image
												src='https://i.ibb.co/jJ4GHXP/img1.jpg'
												alt='Product 1'
												className='w-full h-full object-cover rounded-full'
												width={32}
												height={32}
											/>
											{/* Tooltip */}
											<div className='absolute -translate-x-2/4 text-white text-xs font-semibold whitespace-nowrap opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible z-[3] px-3 py-2 rounded left-2/4 bottom-[calc(100%+8px)] bg-[#142E53]'>
												AI for Beginners
											</div>
										</div>

										{/* Avatar 2 */}
										<div className='relative w-[32px] h-[32px] shadow-md z-[1] -ml-2 rounded-full border-2 border-white group'>
											<Image
												src='https://i.ibb.co/jJ4GHXP/img1.jpg'
												alt='Product 2'
												className='w-full h-full object-cover rounded-full'
												width={32}
												height={32}
											/>
											{/* Tooltip */}
											<div className='absolute -translate-x-2/4 text-white text-xs font-semibold whitespace-nowrap opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible z-[3] px-3 py-2 rounded left-2/4 bottom-[calc(100%+8px)] bg-[#142E53]'>
												Machine Learning Basics
											</div>
										</div>

										{/* Avatar 3 */}
										<div className='relative w-[32px] h-[32px] shadow-md z-[1] -ml-2 rounded-full border-2 border-white group'>
											<Image
												src='https://i.ibb.co/jJ4GHXP/img1.jpg'
												alt='Product 3'
												className='w-full h-full object-cover rounded-full'
												width={32}
												height={32}
											/>
											{/* Tooltip */}
											<div className='absolute -translate-x-2/4 text-white text-xs font-semibold whitespace-nowrap opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible z-[3] px-3 py-2 rounded left-2/4 bottom-[calc(100%+8px)] bg-[#142E53]'>
												Deep Learning Masterclass
											</div>
										</div>

										{/* Additional Count */}
										<div className='w-[32px] h-[32px] text-[#3B6E91] text-xs font-semibold flex items-center justify-center shadow-md -ml-2 rounded-full border-2 border-white bg-[#F1F3F6]'>
											+3
										</div>
									</div>
								</td>
								<td className=' align-middle p-4 mb-6 border-b border-gray-300 bg-white'>
									<div className='bg-gray-100 whitespace-nowrap grid grid-cols-[repeat(4,1fr)] gap-0 p-3 rounded-lg'>
										<div className="flex flex-col gap-1  text-center px-4 py-0 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[70%] after:w-[1px] after:bg-[#E5E7EB] last:after:hidden">
											<span className='text-xs text-gray-500 mb-1'>Sent</span>
											<span className='text-sm font-semibold text-gray-900'>
												104
											</span>
										</div>
										<div className="flex flex-col gap-1  text-center px-4 py-0 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[70%] after:w-[1px] after:bg-[#E5E7EB] last:after:hidden">
											<span className='text-xs text-gray-500 mb-1'>Opened</span>
											<span className='text-sm font-semibold text-gray-900'>
												33
											</span>
										</div>
										<div className="flex flex-col gap-1  text-center px-4 py-0 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[70%] after:w-[1px] after:bg-[#E5E7EB] last:after:hidden">
											<span className='text-xs text-gray-500 mb-1'>
												Clicked
											</span>
											<span className='text-sm font-semibold text-gray-900'>
												15
											</span>
										</div>
										<div className="flex flex-col gap-1 text-center px-4 py-0 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[70%] after:w-[1px] after:bg-[#E5E7EB] last:after:hidden">
											<span className='text-xs text-gray-500 mb-1'>
												Unsubscribed
											</span>
											<span className='text-sm font-semibold text-gray-900'>
												2
											</span>
										</div>
									</div>
								</td>
								<td className='align-middle p-4 mb-6 border-b border-gray-300 bg-white'>
									<button className='w-[32px] h-[32px] border-2 border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-200 ml-[12px] rounded-md bg-white'>
										<TreeVerticalDots />
									</button>
								</td>
							</tr>
							<tr className='hidden'>
								<td
									colSpan={7}
									className='align-middle text-center p-0 mb-6 border-b border-gray-300 bg-transparent'
								></td>
							</tr>
							<tr>
								<td className='align-middle text-center p-4 mb-6 border-b border-gray-300 bg-white'>
									<div className='inline-flex items-center justify-center'>
										<div
											className='relative w-[18px] h-[18px]  cursor-pointer transition-all duration-200 rounded border-2 border-gray-300 bg-white'
											role='checkbox'
											aria-checked='false'
											tabIndex={0}
										></div>
									</div>
								</td>
								<td className='align-middle p-4 mb-6 border-b border-gray-300 bg-white'>
									<div className='w-[40px] h-[40px] items-center justify-center relative inline-flex rounded-lg bg-[#D3F8DF] group'>
										<Announcement />
										<span className='font-semibold absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2  whitespace-nowrap bg-[#142e53] text-white px-3 py-2 rounded-md text-[0.75rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10'>
											Announcement
										</span>
									</div>
								</td>
								<td className='font-semibold text-sm text-[#343332] align-middle p-4 mb-6 border-b border-gray-300 bg-white'>
									New Course Announcement
								</td>
								<td className='align-middle p-4 mb-6 border-b border-gray-300 bg-white'>
									<span
										className='relative inline-block px-3 py-1.5 rounded-2xl bg-[rgba(2,197,175,0.1)] text-xs font-semibold text-[#02C5AF] 
                              group'
									>
										SCHEDULED
										<span
											className='absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 
                                whitespace-nowrap bg-[#142e53] text-white px-3 py-2 rounded-md text-[0.75rem]
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10'
										>
											Sent on Fri, Dec 25, 2024 4:22 PM
										</span>
									</span>
								</td>
								<td className='align-middle p-4 mb-6 border-b border-gray-300 bg-white'>
									<div className='flex items-center'>
										{/* Avatar 1 */}
										<div className='relative w-[32px] h-[32px] shadow-md z-[1] rounded-full border-2 border-white group'>
											<Image
												src='https://i.ibb.co/jJ4GHXP/img1.jpg'
												alt='Product 1'
												className='w-full h-full object-cover rounded-full'
												width={32}
												height={32}
											/>
											{/* Tooltip */}
											<div className='absolute -translate-x-2/4 text-white text-xs font-semibold whitespace-nowrap opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible z-[3] px-3 py-2 rounded left-2/4 bottom-[calc(100%+8px)] bg-[#142E53]'>
												Python Programming
											</div>
										</div>

										{/* Avatar 2 */}
										<div className='relative w-[32px] h-[32px] shadow-md z-[1] -ml-2 rounded-full border-2 border-white group'>
											<Image
												src='https://i.ibb.co/jJ4GHXP/img1.jpg'
												alt='Product 2'
												className='w-full h-full object-cover rounded-full'
												width={32}
												height={32}
											/>
											{/* Tooltip */}
											<div className='absolute -translate-x-2/4 text-white text-xs font-semibold whitespace-nowrap opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible z-[3] px-3 py-2 rounded left-2/4 bottom-[calc(100%+8px)] bg-[#142E53]'>
												Web Development
											</div>
										</div>

										{/* Additional Count */}
										<div className='w-[32px] h-[32px] text-[#3B6E91] text-xs font-semibold flex items-center justify-center shadow-md -ml-2 rounded-full border-2 border-white bg-[#F1F3F6]'>
											+2
										</div>
									</div>
								</td>
								<td className='align-middle p-4 mb-6 border-b border-gray-300 bg-white'>
									<div className='bg-gray-100 whitespace-nowrap grid grid-cols-[repeat(4,1fr)] gap-0 p-3 rounded-lg'>
										<div className="flex flex-col gap-1  text-center px-4 py-0 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[70%] after:w-[1px] after:bg-[#E5E7EB] last:after:hidden">
											<span className='text-xs text-gray-500 mb-1'>Sent</span>
											<span className='text-sm font-semibold text-gray-900'>
												-
											</span>
										</div>
										<div className="flex flex-col gap-1  text-center px-4 py-0 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[70%] after:w-[1px] after:bg-[#E5E7EB] last:after:hidden">
											<span className='text-xs text-gray-500 mb-1'>Opened</span>
											<span className='text-sm font-semibold text-gray-900'>
												-
											</span>
										</div>
										<div className="flex flex-col gap-1  text-center px-4 py-0 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[70%] after:w-[1px] after:bg-[#E5E7EB] last:after:hidden">
											<span className='text-xs text-gray-500 mb-1'>
												Clicked
											</span>
											<span className='text-sm font-semibold text-gray-900'>
												-
											</span>
										</div>
										<div className="flex flex-col gap-1  text-center px-4 py-0 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[70%] after:w-[1px] after:bg-[#E5E7EB] last:after:hidden">
											<span className='text-xs text-gray-500 mb-1'>
												Unsubscribed
											</span>
											<span className='text-sm font-semibold text-gray-900'>
												-
											</span>
										</div>
									</div>
								</td>
								<td className='align-middle p-4 mb-6 border-b border-gray-300 bg-white'>
									<button className='w-[32px] h-[32px] border-2 border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-200 ml-[12px] rounded-md bg-white'>
										<TreeVerticalDots />
									</button>
								</td>
							</tr>
							<tr className='hidden'>
								<td className='align-middle text-center p-0 mb-6 border-b border-gray-300 bg-transparent'></td>
							</tr>
						</tbody>
					</table>
				</div>
				{/* model start */}
				{isOpen && (
					<div className='fixed inset-0 bg-[rgba(20,46,83,0.5)] flex items-center justify-center z-[1000]'>
						<div className='bg-[white] justify-content-center rounded-[12px] w-[90%] max-w-[800px] max-h-[85vh] overflow-y-auto p-8'>
							<div className='flex justify-between items-center  pb-4 mb-6 border-b border-gray-300'>
								<h2 className='text-xl font-semibold text-[#142E53]'>
									Create New Email
								</h2>
								<button
									className='text-[#3B6E91] cursor-pointer text-2xl leading-none transition-colors duration-200 p-2 border-none'
									onClick={() => {
										setIsOpen(false);
										setIsOpenCalender(false);
									}}
								>
									×
								</button>
							</div>
							<div className='mb-6'>
								<label className='block text-[0.875rem] font-semibold text-[#142E53] mb-2'>
									Name
								</label>
								<input
									type='text'
									className='w-full px-3.5 py-2.5 border-[1px]  border-[#E5E7EB] rounded-[6px] text-[0.875rem] [transition:all_0.2s] focus:outline-none focus:border-[#13C4CC] focus:ring-4 focus:ring-[#13C4CC]/10'
									placeholder='Enter email name'
								/>
							</div>
							<div className='mb-6'>
								<label className='block text-[0.875rem] font-semibold text-[#142E53] mb-2'>
									Subject
								</label>
								<input
									type='text'
									className='w-full px-3.5 py-2.5 border-[1px]  border-[#E5E7EB] rounded-[6px] text-[0.875rem] [transition:all_0.2s] focus:outline-none focus:border-[#13C4CC] focus:ring-4 focus:ring-[#13C4CC]/10'
									placeholder='Enter email subject'
								/>
							</div>
							<div className='mb-6'>
								<label className='block text-[0.875rem] font-semibold text-[#142E53] mb-2'>
									Products
								</label>
								<div className='relative'>
									<div
										className='flex flex-wrap gap-2 mb-2'
										id='selectedProducts'
									></div>
									<input
										type='text'
										className='w-full px-3.5 py-2.5 border-[1px]  border-[#E5E7EB] rounded-[6px] text-[0.875rem] [transition:all_0.2s] focus:outline-none focus:border-[#13C4CC] focus:ring-4 focus:ring-[#13C4CC]/10'
										placeholder='Search products...'
									/>
									<div className='border border-gray-300 rounded-md mt-2 max-h-[300px] overflow-y-auto'>
										<div className='border-b border-gray-200 flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50'>
											{/* Thumbnail Image */}
											<Image
												src='https://i.ibb.co/jJ4GHXP/img1.jpg'
												className='w-12 h-12 rounded-md object-cover'
												width={12}
												height={12}
												alt='Product'
											/>

											{/* Course Info */}
											<div className=' flex-col'>
												<div className='text-sm font-semibold text-gray-900 mb-1.5 tracking-tight'>
													How to Write Better Prompts
												</div>
												<span className='text-[#1C4ED8] bg-[#DBE9FE] inline-flex px-2.5 py-1 rounded-[4px] text-[0.75rem] font-semibold leading-none'>
													Course
												</span>
											</div>

											<div className=' flex gap-3 items-center ml-auto'>
												{/* Students Enrolled */}
												<div className='flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-xs text-gray-700 relative group'>
													<span className='w-[16px] h-[16px] text-[#6B7280]'>
														<StudentInroll />
													</span>
													<span>2,543 enrolled</span>
													<span className='absolute right-[calc(100% + 8px)] right-3 whitespace-nowrap bg-[#142e53] text-white px-3 py-2 rounded-md text-[0.75rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10'>
														2,543 students enrolled
													</span>
												</div>

												{/* Email Count */}
												<div className='flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-xs text-gray-700 relative group'>
													<span className='w-[16px] h-[16px] text-[#6B7280]'>
														<EmailCircle />
													</span>
													<span>45/100 emails</span>
													<span className='absolute right-[calc(100% + 8px)] right-35 whitespace-nowrap bg-[#142e53] text-white px-3 py-2 rounded-md text-[0.75rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10'>
														45 out of 100 emails remaining
													</span>
												</div>
											</div>
										</div>
										<div className='border-t border-gray-200 my-2 '></div>
										<div className='flex items-start gap-4 p-4 cursor-pointer hover:bg-gray-50'>
											<div className='  pt-1 pb-1'>
												<div className='text-sm font-semibold text-gray-900 mb-1.5 -tracking-normal'>
													All Followers
												</div>
												<div className='product-meta'>
													4,761 total followers
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='mb-6'>
								<label className='block text-[0.875rem] font-semibold text-[#142E53] mb-2'>
									Email Type
								</label>
								<select className='w-full px-3.5 py-2.5 border-[1px]  border-[#E5E7EB] rounded-[6px] text-[0.875rem] [transition:all_0.2s] focus:outline-none focus:border-[#13C4CC] focus:ring-4 focus:ring-[#13C4CC]/10'>
									<option value='announcement'>Announcement</option>
									<option value='marketing'>Marketing</option>
								</select>
							</div>
							<div className='mb-6'>
								<label className='block text-[0.875rem] font-semibold text-[#142E53] mb-2'>
									Content
								</label>
								<div className='flex gap-2 p-3 border border-[#E5E7EB] '>
									<button
										className='p-1.5 text-slate-500 cursor-pointer rounded'
										title='Bold'
									>
										<EditerSelect />
									</button>
									<button
										className='p-1.5 text-slate-500 cursor-pointer rounded'
										title='Italic'
									>
										<EditerItalic />
									</button>
									<button
										className='p-1.5 text-slate-500 cursor-pointer rounded'
										title='Undo'
									>
										<EditerUndo />
									</button>
									<button
										className='p-1.5 text-slate-500 cursor-pointer rounded'
										title='Redo'
									>
										<EditerRedo />
									</button>
								</div>
								<div
									className='min-h-[200px] p-4 border border-[#E5E7EB] rounded-b-[6px] text-sm leading-6 transition-all duration-200 focus:outline-none focus:border-[#13C4CC] focus:ring-4 focus:ring-[#13C4CC]/10'
									contentEditable='true'
								></div>
							</div>
							<div>
								<button
									className='hover:border-[#13C4CC] hover:text-[#13C4CC] bg-white  border-[#E5E7EB] text-[#3B6E91] px-5 py-2 rounded-[6px] text-sm font-semibold cursor-pointer transition-all duration-200 border inline-flex items-center justify-center gap-2 mr-[6px]'
									id='previewBtn'
								>
									Preview
								</button>
								<button
									className='hover:border-[#13C4CC] hover:text-[#13C4CC] bg-white  border-[#E5E7EB] text-[#3B6E91] px-5 py-2 rounded-[6px] text-sm font-semibold cursor-pointer transition-all duration-200 border inline-flex items-center justify-center gap-2 mr-[6px]'
									onClick={() => setIsOpenCalender(true)}
								>
									Schedule
								</button>
								<button
									className='hover:border-[#13C4CC] hover:text-[#13C4CC] bg-white  border-[#E5E7EB] text-[#3B6E91] px-5 py-2 rounded-[6px] text-sm font-semibold cursor-pointer transition-all duration-200 border  inline-flex items-center justify-center gap-2 mr-[6px]'
									id='saveBtn'
								>
									Save Draft
								</button>
								<button
									className='hover:bg-[#11b3ba] text-sm font-semibold cursor-pointer transition-all duration-200 border inline-flex items-center justify-center gap-2 text-white px-4 py-2 rounded-md bg-[#13C4CC] mr-[6px]'
									id='sendBtn'
								>
									Send
								</button>
							</div>
						</div>
					</div>
				)}
				{/* model end */}
				{/* calender start */}
				{isOpenCalender && (
					<div className='fixed bottom-0 border shadow-md z-[99999] min-w-[300px] p-4 rounded-md bg-white'>
						{/* Buttons */}
						<CalendarPopup />
						<div className='flex justify-end gap-2 mt-4'>
							<button
								className='bg-white border text-[#3B6E91] px-5 py-2.5 rounded-[6px] text-sm font-semibold cursor-pointer'
								onClick={() => setIsOpenCalender(false)}
							>
								Cancel
							</button>
							<button
								className='text-white px-5 py-2.5 rounded-md bg-[#13C4CC] text-sm font-semibold cursor-pointer'
								onClick={() => setIsOpenCalender(false)}
							>
								Confirm
							</button>
						</div>
					</div>
				)}
				{/* calender end */}
				<div className='flex justify-between items-center mt-6 pt-6 max-sm:hidden'>
					<div className='flex items-center gap-6'>
						<div className='text-[#666] text-sm'>
							Showing <strong className='text-[#333] font-semibold'>1-6</strong>{' '}
							of <strong className='text-[#333] font-semibold'>8</strong> emails
						</div>
						<PaginationMenu />
					</div>

					<div className='flex items-center gap-2'>
						<button className='w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333]transition-all duration-200 hover:bg-[#f5f5f5]'>
							<LeftPagination />
						</button>
						<button className='w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 bg-[#333] text-white border-[#333]'>
							1
						</button>
						<button className='w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer transition-all duration-200  border-[#333]'>
							2
						</button>

						<button className='w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]'>
							<RightPagination />
						</button>
					</div>
				</div>
			</div>
		);
	}
};

export default EmailMarketing;

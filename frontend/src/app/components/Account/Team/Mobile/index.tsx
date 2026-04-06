/** @format */

'use client';

import type React from 'react';

import {useState, useEffect, useRef} from 'react';
import {Plus, MoreVertical, ChevronLeft, ChevronRight} from 'lucide-react';
import Image, {StaticImageData} from 'next/image';
import Avatar1 from '@/assets/avatar/AVATAR-1.png';
import Avatar2 from '@/assets/avatar/AVATAR-2.jpg';
import Avatar3 from '@/assets/avatar/AVATAR-3.jpg';
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';
import {Button} from '@/app/components/ui/button';
import {useIsMobile} from '@/hooks/use-mobile';

// Define types
type MemberStatus = 'accepted' | 'pending' | 'rejected';
type MemberRole = 'admin' | 'member';
type SortField = 'name' | 'email' | 'status' | 'lastActive';

interface Member {
	id: number;
	name: string;
	email: string;
	avatar: string | StaticImageData;
	status: MemberStatus;
	role?: MemberRole;
	lastActive: string;
	usage: {
		current: number;
		total: number;
	};
}

export default function TeamPage() {
	const [activeTab, setActiveTab] = useState('team');
	const [isOpenAddTeamDrawer, setIsOpenAddTeamDrawer] = useState(false);
	const [isOpenAddInstructorDrawer, setIsOpenAddInstructorDrawer] =
		useState(false);
	const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

	// Search and filter states
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [sortBy, setSortBy] = useState<SortField>('name');

	// Pagination states
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(3);

	const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

	// Sample data
	const allMembers: Member[] = [
		{
			id: 1,
			name: 'William Kulp',
			email: 'william@example.com',
			avatar: Avatar1,
			status: 'accepted',
			role: 'admin',
			lastActive: 'October 30, 2024',
			usage: {current: 375, total: 500},
		},
		{
			id: 2,
			name: 'Sarah Chen',
			email: 'sarah@example.com',
			avatar: Avatar2,
			status: 'pending',
			lastActive: 'October 29, 2024',
			usage: {current: 25, total: 500},
		},
		{
			id: 3,
			name: 'Michael Park',
			email: 'michael@example.com',
			avatar: Avatar3,
			status: 'rejected',
			lastActive: 'October 28, 2024',
			usage: {current: 125, total: 500},
		},
		{
			id: 4,
			name: 'Emma Johnson',
			email: 'emma@example.com',
			avatar: Avatar2,
			status: 'accepted',
			lastActive: 'October 27, 2024',
			usage: {current: 200, total: 500},
		},
		{
			id: 5,
			name: 'David Lee',
			email: 'david@example.com',
			avatar: Avatar1,
			status: 'pending',
			lastActive: 'October 26, 2024',
			usage: {current: 50, total: 500},
		},
		{
			id: 6,
			name: 'Olivia Smith',
			email: 'olivia@example.com',
			avatar: Avatar3,
			status: 'accepted',
			role: 'admin',
			lastActive: 'October 25, 2024',
			usage: {current: 300, total: 500},
		},
	];

	// Filter and sort members
	const filteredMembers = allMembers.filter((member) => {
		// Apply search filter
		const matchesSearch =
			searchQuery === '' ||
			member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			member.email.toLowerCase().includes(searchQuery.toLowerCase());

		// Apply status filter
		const matchesStatus =
			statusFilter === 'all' || member.status === statusFilter;

		return matchesSearch && matchesStatus;
	});

	// Sort members
	const sortedMembers = [...filteredMembers].sort((a, b) => {
		let comparison = 0;

		switch (sortBy) {
			case 'name':
				comparison = a.name.localeCompare(b.name);
				break;
			case 'email':
				comparison = a.email.localeCompare(b.email);
				break;
			case 'status':
				comparison = a.status.localeCompare(b.status);
				break;
			case 'lastActive':
				// Simple string comparison for dates in this format
				comparison = a.lastActive.localeCompare(b.lastActive);
				break;
			default:
				comparison = 0;
		}

		return comparison;
	});

	// Pagination logic
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentMembers = sortedMembers.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(sortedMembers.length / itemsPerPage);

	// Handle page navigation
	const paginate = (pageNumber: number) => {
		if (pageNumber > 0 && pageNumber <= totalPages) {
			setCurrentPage(pageNumber);
		}
	};

	const toggleDropdown = (id: number) => {
		setActiveDropdown(activeDropdown === id ? null : id);
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (activeDropdown !== null) {
				const dropdownElement = dropdownRefs.current[activeDropdown];
				const target = event.target as Node;

				// Check if the click is outside the dropdown and not on the toggle button
				if (
					dropdownElement &&
					!dropdownElement.contains(target) &&
					!(target as HTMLElement).closest(
						`[data-dropdown-toggle="${activeDropdown}"]`
					)
				) {
					setActiveDropdown(null);
				}
			}
		}

		// Add event listener
		document.addEventListener('mousedown', handleClickOutside);

		// Clean up
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [activeDropdown]);

	// Reset to first page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, statusFilter, sortBy]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission here
		setIsOpenAddInstructorDrawer(false);
		setIsOpenAddTeamDrawer(false);
	};

	const getStatusBadgeClass = (status: string) => {
		switch (status) {
			case 'accepted':
				return 'bg-green-100 text-green-800';
			case 'pending':
				return 'bg-amber-100 text-amber-800';
			case 'rejected':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const isMobile = useIsMobile();

	return (
		<div className='h-screen  bg-gray-100 flex justify-center items-center'>
			{/* Mobile Device Frame */}
			<div className=' w-full bg-white relative rounded-5xl  overflow-hidden shadow-2xl h-full flex flex-col'>
				<div className='flex-1 overflow-y-auto no-scrollbar'>
					{/* Header */}
					<div className='px-4 py-5 flex justify-between items-center sticky top-0 bg-white z-1'>
						<h1 className='text-xl font-semibold text-gray-900'>
							{activeTab === 'team' ? 'Team Members' : 'Instructor'}
						</h1>
						{activeTab === 'team' ? (
							<button
								className='w-8 h-8 rounded-lg bg-[#1F232C] flex items-center justify-center'
								onClick={() => setIsOpenAddTeamDrawer(true)}
							>
								<Plus className='w-4 h-4 text-white' />
							</button>
						) : (
							<button
								className='w-8 h-8 rounded-lg bg-[#1F232C] flex items-center justify-center'
								onClick={() => setIsOpenAddInstructorDrawer(true)}
							>
								<Plus className='w-4 h-4 text-white' />
							</button>
						)}
					</div>

					{/* Tabs */}
					<div className='flex px-4 bg-white border-b border-gray-200'>
						<div
							className={`py-4 mr-6 text-sm font-semibold relative cursor-pointer ${
								activeTab === 'team' ? 'text-gray-900' : 'text-gray-500'
							}`}
							onClick={() => setActiveTab('team')}
						>
							Team
							{activeTab === 'team' && (
								<div className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#13C4CC] rounded-full'></div>
							)}
						</div>
						<div
							className={`py-4 text-sm font-semibold relative cursor-pointer ${
								activeTab === 'co-instructors'
									? 'text-gray-900'
									: 'text-gray-500'
							}`}
							onClick={() => setActiveTab('co-instructors')}
						>
							Co-Instructors
							{activeTab === 'co-instructors' && (
								<div className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#13C4CC] rounded-full'></div>
							)}
						</div>
					</div>

					{/* Search and Filters */}
					<div className='p-4 bg-white border-b border-gray-200'>
						<input
							type='text'
							className='w-full h-10 border border-gray-200 rounded-lg px-3 mb-3 text-sm'
							placeholder='Search members...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<div className='flex gap-2 scroll-auto overflow-x-scroll no-scrollbar'>
							<select
								className='flex-1 h-9 border border-gray-200 rounded-lg px-2 text-xs text-gray-600 bg-white'
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
							>
								<option value='all'>All Status</option>
								<option value='accepted'>Accepted</option>
								<option value='pending'>Pending</option>
								<option value='rejected'>Rejected</option>
							</select>
							<select
								className='flex-1 h-9 border border-gray-200 rounded-lg px-2 text-xs text-gray-600 bg-white'
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value as SortField)}
							>
								<option value='name'>Sort by: Name</option>
								<option value='email'>Sort by: Email</option>
								<option value='status'>Sort by: Status</option>
							</select>
							<select className='flex-1 h-9 border border-gray-200 rounded-lg px-2 text-xs text-gray-600 bg-white'>
								<option value='name'>Bulk Actions</option>
								<option value='delete'>Delete</option>
								<option value='export'>Resend</option>
								<option value='export'>Export</option>
							</select>
						</div>
					</div>

					{/* Member List */}
					<div className='p-4 mb-10'>
						{currentMembers.length > 0 ? (
							currentMembers.map((member) => (
								<div
									key={member.id}
									className='bg-white border border-gray-200 rounded-xl p-4 mb-3 relative'
								>
									<button
										className='absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center'
										onClick={() => toggleDropdown(member.id)}
										data-dropdown-toggle={member.id}
									>
										<MoreVertical className='w-4 h-4 text-gray-500' />
									</button>

									{activeDropdown === member.id && (
										<div
											className='absolute top-14 right-4 bg-white border border-gray-200 rounded-lg shadow-md z-20'
											ref={(el) => {
												// Store the ref in the array at the index of the member's id
												dropdownRefs.current[member.id] = el;
											}}
										>
											<a
												href='#'
												className='block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100'
											>
												Edit
											</a>
											<a
												href='#'
												className='block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100'
											>
												Delete
											</a>
											<a
												href='#'
												className='block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100'
											>
												Resend Invitation
											</a>
										</div>
									)}

									<div className='flex items-center gap-3 mb-3'>
										<div className='w-12 h-12 rounded-full overflow-hidden'>
											<Image
												src={member.avatar || '/placeholder.svg'}
												alt={member.name}
												width={48}
												height={48}
												className='w-full h-full object-cover'
											/>
										</div>
										<div>
											<div className='font-semibold text-gray-900'>
												{member.name}
											</div>
											<div className='text-sm text-gray-500'>
												{member.email}
											</div>
										</div>
									</div>

									<div className='flex justify-between items-center mb-2'>
										<span
											className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
												member.status
											)}`}
										>
											{member.status.charAt(0).toUpperCase() +
												member.status.slice(1)}
										</span>
										{member.role === 'admin' && (
											<span className='px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800'>
												Admin
											</span>
										)}
									</div>

									<div className='text-xs text-gray-500 mb-2'>
										Last active: {member.lastActive}
									</div>

									<div>
										<div className='flex justify-end text-xs text-gray-600 mb-1'>
											{member.usage.current}/{member.usage.total}
										</div>
										<div className='h-1 bg-gray-100 rounded overflow-hidden'>
											<div
												className='h-full bg-gray-700 transition-all duration-300'
												style={{
													width: `${
														(member.usage.current / member.usage.total) * 100
													}%`,
												}}
											></div>
										</div>
									</div>
								</div>
							))
						) : (
							<div className='text-center py-8 text-gray-500'>
								No members found matching your criteria
							</div>
						)}
					</div>

					{/* Bottom Navigation */}
					<div className='sticky bottom-14 bg-white border-t border-gray-200 p-4'>
						<div className='text-center text-sm text-gray-500 mb-3'>
							Showing{' '}
							<strong>
								{indexOfFirstItem + 1}-
								{Math.min(indexOfLastItem, sortedMembers.length)}
							</strong>{' '}
							of <strong>{sortedMembers.length}</strong> members
						</div>
						<div className='flex justify-center gap-2'>
							<button
								className='w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600'
								onClick={() => paginate(currentPage - 1)}
								disabled={currentPage === 1}
							>
								<ChevronLeft className='w-4 h-4' />
							</button>
							{Array.from({length: Math.min(totalPages, 3)}, (_, i) => {
								// Show pages around current page
								let pageToShow = currentPage;
								if (currentPage === 1) {
									pageToShow = i + 1;
								} else if (currentPage === totalPages && totalPages >= 3) {
									pageToShow = totalPages - 2 + i;
								} else {
									pageToShow = currentPage - 1 + i;
								}

								// Ensure we don't show pages beyond total pages
								if (pageToShow <= totalPages) {
									return (
										<button
											key={pageToShow}
											className={`w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center ${
												currentPage === pageToShow
													? 'text-white bg-[#1F232C]'
													: 'text-gray-600'
											}`}
											onClick={() => paginate(pageToShow)}
										>
											{pageToShow}
										</button>
									);
								}
								return null;
							})}
							<button
								className='w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600'
								onClick={() => paginate(currentPage + 1)}
								disabled={currentPage === totalPages}
							>
								<ChevronRight className='w-4 h-4' />
							</button>
						</div>
					</div>
				</div>
			</div>

			{isMobile && (
				<>
					<Drawer
						open={isOpenAddTeamDrawer}
						onOpenChange={setIsOpenAddTeamDrawer}
					>
						<DrawerContent className='px-4'>
							<DrawerHeader className='text-center'>
								<DrawerTitle className='text-lg font-semibold text-gray-900'>
									Add Team Member
								</DrawerTitle>
							</DrawerHeader>
							<form onSubmit={handleSubmit}>
								<div className='mb-4'>
									<label className='block mb-2 text-sm'>First Name</label>
									<input
										type='text'
										className='w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/10'
										required
									/>
								</div>

								<div className='mb-4'>
									<label className='block mb-2 text-sm'>Last Name</label>
									<input
										type='text'
										className='w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/10'
										required
									/>
								</div>

								<div className='mb-4'>
									<label className='block mb-2 text-sm'>Email</label>
									<input
										type='email'
										className='w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/10'
										required
									/>
								</div>

								<div className='mb-4'>
									<label className='flex items-center gap-2 text-sm text-gray-700'>
										<input type='checkbox' className='rounded' />
										<span>Admin access</span>
									</label>
								</div>

								<DrawerFooter className='px-0'>
									<Button
										type='submit'
										className='w-full h-11 bg-blue-600 text-white font-semibold text-sm rounded-lg'
									>
										Send Invitation
									</Button>
								</DrawerFooter>
							</form>
						</DrawerContent>
					</Drawer>

					<Drawer
						open={isOpenAddInstructorDrawer}
						onOpenChange={setIsOpenAddInstructorDrawer}
					>
						<DrawerContent className='px-4'>
							<DrawerHeader className='text-center'>
								<DrawerTitle className='text-lg font-semibold text-gray-900'>
									Add Instructor
								</DrawerTitle>
							</DrawerHeader>

							<form className='overflow-y-auto no-scrollbar mb-16'>
								<div className='grid grid-cols-2 gap-4 mb-4'>
									<div>
										<label className='text-sm text-gray-600'>First Name</label>
										<input
											type='text'
											className='w-full p-2 border rounded-md'
											placeholder='Enter first name'
										/>
									</div>
									<div>
										<label className='text-sm text-gray-600'>Last Name</label>
										<input
											type='text'
											className='w-full p-2 border rounded-md'
											placeholder='Enter last name'
										/>
									</div>
								</div>

								<div className='mb-4'>
									<label className='text-sm text-gray-600'>Email</label>
									<input
										type='email'
										className='w-full p-2 border rounded-md mt-1'
										placeholder='Enter email'
									/>
								</div>

								{/* Permissions */}
								<div className='mb-4'>
									<label className='text-sm font-semibold text-gray-800'>
										Permissions
									</label>
									<div className='flex items-center mt-2'>
										<label className='flex items-center cursor-pointer'>
											<div className='relative w-10 h-5'>
												<input
													type='checkbox'
													id='primary'
													className='sr-only peer'
												/>
												<div className='w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors'></div>
												<div className='absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform peer-checked:translate-x-5'></div>
											</div>
											<span className='ml-3 text-sm text-gray-600'>
												Set as Primary
											</span>
										</label>
									</div>
								</div>
								{/* Revenue Allocation */}
								<div className='mb-4'>
									<label className='text-sm font-semibold text-gray-800'>
										Revenue Allocation
									</label>
									<div className='flex items-center mt-2'>
										<input
											type='number'
											className='w-20 p-2 border rounded-md'
											placeholder='0.0'
										/>
										<span className='ml-2'>%</span>
									</div>
								</div>

								{/* Additional Permissions */}
								<div className='mb-4'>
									<label className='text-sm font-semibold text-gray-800'>
										Additional Permissions
									</label>
									<div className='mt-2 space-y-2'>
										<div>
											<input type='checkbox' id='create-course' />{' '}
											<label htmlFor='create-course'>Create Course</label>
										</div>
										<div>
											<input type='checkbox' id='view-sales' />{' '}
											<label htmlFor='view-sales'>View Sales History</label>
										</div>
										<div>
											<input type='checkbox' id='view-progress' />{' '}
											<label htmlFor='view-progress'>
												View Student Progress
											</label>
										</div>
										<div>
											<input type='checkbox' id='moderate' />{' '}
											<label htmlFor='moderate'>
												Moderate Community (of assigned courses)
											</label>
										</div>
										<div>
											<input type='checkbox' id='manage-promotions' />{' '}
											<label htmlFor='manage-promotions'>
												Manage Promotions
											</label>
										</div>
									</div>
								</div>

								<DrawerFooter className=' fixed bottom-0 left-0 w-full bg-white px-4'>
									<button className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-bold'>
										Send Invitation
									</button>
								</DrawerFooter>
							</form>
						</DrawerContent>
					</Drawer>
				</>
			)}
		</div>
	);
}

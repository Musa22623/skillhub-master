/** @format */

'use client';

import {Dispatch, SetStateAction, useState} from 'react';
import Image, {StaticImageData} from 'next/image';
import {ChevronLeft, ChevronRight, X, Share, Trash2} from 'lucide-react';

import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';

interface Course {
	title: string;
	author: string;
	image: string | StaticImageData;
	duration: string;
}
interface OptionDrawerProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	course: Course;
}
export default function MenuTooltipDrawer({
	isOpen,
	setIsOpen,
	course,
}: OptionDrawerProps) {
	const [showMoveToSection, setShowMoveToSection] = useState(false);

	const toggleDrawer = () => {
		setIsOpen(!isOpen);
		if (!isOpen) {
			// Reset to main menu when opening
			setShowMoveToSection(false);
		}
	};

	const handleShowMoveToSection = () => {
		setShowMoveToSection(true);
	};

	const resetToMainMenu = () => {
		setShowMoveToSection(false);
	};

	return (
		<>
			<Drawer open={isOpen} onOpenChange={setIsOpen}>
				<DrawerContent className='min-h-fit max-h-screen'>
					<DrawerHeader className='flex-row justify-between w-full border-b'>
						<button
							className={`flex items-center gap-2 text-[#4F4F4F] font-semibold cursor-pointer ${
								showMoveToSection ? 'flex' : 'hidden'
							}`}
							onClick={resetToMainMenu}
						>
							<ChevronLeft size={20} />
							Back
						</button>
						<DrawerTitle className='font-semibold text-lg text-[#1a202c]'>
							{showMoveToSection ? 'Move to Collection' : 'Options'}
						</DrawerTitle>
						<button
							className='bg-none border-none text-[#64748b] text-2xl cursor-pointer p-1'
							onClick={toggleDrawer}
						>
							<X size={24} />
						</button>
					</DrawerHeader>

					<div className='overflow-y-auto mb-5'>
						<div className='p-4 flex gap-3 items-center border-b border-[#e2e8f0]'>
							<Image
								src={course.image}
								alt='Course'
								width={48}
								height={48}
								className='rounded-lg object-cover flex-shrink-0'
							/>
							<div className='flex-1 min-w-0'>
								<div className='text-sm font-semibold text-[#1A1D1F] mb-1 overflow-hidden text-ellipsis whitespace-nowrap'>
									{course.title}
								</div>
								<div className='text-xs text-[#6F767E]'>
									{course.author} • {course.duration}
								</div>
							</div>
						</div>

						{/* Drawer Content */}
						<div className='p-0'>
							{/* Menu Options */}
							<div className={`py-2 ${showMoveToSection ? 'hidden' : 'block'}`}>
								<div className='px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors hover:bg-[#F5F5F7] text-[#4F4F4F]'>
									<Share size={20} />
									Share
								</div>

								<div
									className='px-4 py-3 flex items-center justify-between cursor-pointer transition-colors hover:bg-[#F5F5F7] text-[#4F4F4F]'
									onClick={handleShowMoveToSection}
								>
									<div className='flex items-center gap-3'>
										<svg viewBox='0 0 20 20' className='w-5 h-5'>
											<g fillRule='nonzero' fill='currentColor'>
												<path d='M5.36 2.504a.5.5 0 0 1 .766.637l-.058.07-2.143 2.143a.5.5 0 0 1-.765-.638l.058-.07z'></path>
												<path d='M5.36 2.504A.5.5 0 0 1 6 2.446l.069.058L8.21 4.646a.5.5 0 0 1-.638.765l-.07-.057L5.362 3.21a.5.5 0 0 1 0-.707'></path>
												<path d='M5.714 2.357a.5.5 0 0 1 .492.41l.008.09v5.714a.5.5 0 0 1-.992.09l-.008-.09V2.857a.5.5 0 0 1 .5-.5M14.286 10.929a.5.5 0 0 1 .492.41l.008.09v5.714a.5.5 0 0 1-.992.09l-.008-.09v-5.714a.5.5 0 0 1 .5-.5'></path>
												<path d='M16.075 14.646a.5.5 0 0 1 .765.638l-.058.07-2.143 2.142a.5.5 0 0 1-.765-.637l.058-.07z'></path>
												<path d='M11.79 14.646a.5.5 0 0 1 .637-.057l.07.057 2.142 2.143a.5.5 0 0 1-.638.765l-.069-.058-2.143-2.142a.5.5 0 0 1 0-.708M17.143 2.357h-5.714a.5.5 0 0 0-.5.5v5.714a.5.5 0 0 0 .5.5h5.714a.5.5 0 0 0 .5-.5V2.857a.5.5 0 0 0-.5-.5m-.5 1v4.714h-4.715V3.357zM8.571 10.929H2.857a.5.5 0 0 0-.5.5v5.714a.5.5 0 0 0 .5.5h5.714a.5.5 0 0 0 .5-.5v-5.714a.5.5 0 0 0-.5-.5m-.5 1v4.713H3.357v-4.714z'></path>
											</g>
										</svg>
										Move to
									</div>
									<ChevronRight size={20} />
								</div>

								<div className='px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors hover:bg-[#F5F5F7] text-[#4F4F4F]'>
									<svg viewBox='0 0 24 24' fill='none' className='w-5 h-5'>
										<path
											d='M19.5009 19.5H13.5009V21H19.5009V19.5Z'
											fill='#13C4CC'
										/>
										<path
											d='M22.5009 16.5H13.5009V18H22.5009V16.5Z'
											fill='#13C4CC'
										/>
										<path
											d='M22.5009 13.5H13.5009V15H22.5009V13.5Z'
											fill='#13C4CC'
										/>
										<path
											d='M15.4127 8.41275L12.0009 1.5L8.58919 8.41275L0.960938 9.52125L6.48094 14.9025L5.17744 22.5L10.5009 19.7017V18.0068L7.17019 19.758L8.09269 14.3783L4.18444 10.5682L9.58519 9.78375L12.0009 4.88925L14.4167 9.78375L20.7872 10.7108L21.0009 9.225L15.4127 8.41275Z'
											fill='#13C4CC'
										/>
									</svg>
									Leave Rating
								</div>

								<div className='px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors hover:bg-[#F5F5F7] text-[#f6164b]'>
									<Trash2 size={20} className='text-[#f6164b]' />
									Remove
								</div>
							</div>

							{/* Move to Section */}
							<div className={`pt-2 ${showMoveToSection ? 'block' : 'hidden'}`}>
								<div className='text-sm font-semibold text-[#1A1D1F] mx-4 my-2'>
									Select Collection
								</div>

								{/* Collection Items */}
								<div className='relative flex items-center p-3 gap-3 rounded-lg cursor-pointer transition-colors hover:bg-[#F5F5F7]'>
									<div className='w-9 h-9 bg-[#F5F5F7] rounded-md flex items-center justify-center flex-shrink-0'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 384 512'
											className='w-5 h-5 text-[#4F4F4F]'
										>
											<path
												fill='currentColor'
												d='M0 48C0 21.5 21.5 0 48 0l0 48 0 393.4 130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4 336 48 48 48 48 0 336 0c26.5 0 48 21.5 48 48l0 440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488L0 48z'
											/>
										</svg>
									</div>
									<div className='flex-grow'>
										<div className='text-sm font-semibold text-[#1A1D1F] mb-1'>
											Design Resources
										</div>
										<div className='text-xs text-[#6F767E]'>12 items</div>
									</div>
									<div className='absolute right-3 top-1/2 -translate-y-1/2 text-[#13C4CC]'>
										<svg viewBox='0 0 24 24' fill='none' className='w-4 h-4'>
											<path
												d='M20.7457 6.75469L9.24572 18.2547L3.74572 12.7547'
												stroke='currentColor'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</div>
								</div>

								<div className='relative flex items-center p-3 gap-3 rounded-lg cursor-pointer transition-colors hover:bg-[#F5F5F7]'>
									<div className='w-9 h-9 bg-[#F5F5F7] rounded-md flex items-center justify-center flex-shrink-0'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 384 512'
											className='w-5 h-5 text-[#4F4F4F]'
										>
											<path
												fill='currentColor'
												d='M0 48C0 21.5 21.5 0 48 0l0 48 0 393.4 130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4 336 48 48 48 48 0 336 0c26.5 0 48 21.5 48 48l0 440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488L0 48z'
											/>
										</svg>
									</div>
									<div className='flex-grow'>
										<div className='text-sm font-semibold text-[#1A1D1F] mb-1'>
											UI Inspiration
										</div>
										<div className='text-xs text-[#6F767E]'>8 items</div>
									</div>
								</div>

								<div className='relative flex items-center p-3 gap-3 rounded-lg cursor-pointer transition-colors hover:bg-[#F5F5F7]'>
									<div className='w-9 h-9 bg-[#F5F5F7] rounded-md flex items-center justify-center flex-shrink-0'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 384 512'
											className='w-5 h-5 text-[#4F4F4F]'
										>
											<path
												fill='currentColor'
												d='M0 48C0 21.5 21.5 0 48 0l0 48 0 393.4 130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4 336 48 48 48 48 0 336 0c26.5 0 48 21.5 48 48l0 440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488L0 48z'
											/>
										</svg>
									</div>
									<div className='flex-grow'>
										<div className='text-sm font-semibold text-[#1A1D1F] mb-1'>
											Learning Path
										</div>
										<div className='text-xs text-[#6F767E]'>5 items</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</DrawerContent>
			</Drawer>

			{/* Drawer Header */}
		</>
	);
}

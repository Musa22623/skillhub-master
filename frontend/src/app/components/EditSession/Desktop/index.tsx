/** @format */

'use client';

import {useState} from 'react';
import Image from 'next/image';
import {Bold, Italic, List, ListOrdered, AlignLeft} from 'lucide-react';
import {Input} from '@/app/components/ui/input';
import {Textarea} from '@/app/components/ui/textarea';
import {Button} from '@/app/components/ui/button';
import myImage from '@/assets/img5.jpg';
import {Tabs, TabsList, TabsTrigger} from '@/app/components/ui/tabs';
import {
	CheckIcon,
	CloseIcon,
	SerchIcon,
	ThreeDotIcon,
	CircleHelpIcon,
	EyeIcon,
	ChevronDown,
	PlusIcon,
} from '@/app/components/svg';
import img5 from '@/assets/img5.jpg';
import img1 from '@/assets/img-3.webp';
import Avatar1 from '@/assets/avatar/AVATAR-1.png';

export default function CreateSession() {
	const [activeTab, setActiveTab] = useState('landing');
	const [agendaItems, setAgendaItems] = useState(['Item 1', 'Item 2']);

	const addAgendaItem = () => {
		setAgendaItems([...agendaItems, `Item ${agendaItems.length + 1}`]);
	};

	const removeAgendaItem = (index: number) => {
		setAgendaItems(agendaItems.filter((_, i) => i !== index));
	};
	return (
		<div className='container mx-auto p-4 sm:p-8 bg-white rounded-5xl xs:rounded-md'>
			{/* Fixed Header */}
			<div className='max-w-6xl mx-auto w-full'>
				<div className='flex flex-col py-4'>
					{/* Header */}
					<div className='flex items-center justify-between w-full mx-auto pt-8'>
						<div className='flex gap-3'>
							<div className='h-18 w-30 overflow-hidden rounded-md'>
								<Image
									src={myImage}
									alt='UX Design Hub'
									width={120}
									height={72}
									className='object-center'
								/>
							</div>

							<div className='flex gap-2 h-fit items-center'>
								<h2 className='text-xl font-semibold'>UX Design Hub</h2>
								<CircleHelpIcon className='h-5 w-5' />
							</div>
						</div>
						<div className='flex items-center gap-2'>
							<div className='flex items-center gap-2 rounded-md border px-3 py-1'>
								<EyeIcon className='h-5 w-5 text-gray-500 ' />
								<span className='text-sm'>Preview</span>
								<ChevronDown className='h-4 w-4 text-muted-foreground' />
							</div>
							<Button size='sm' className='px-6'>
								Save
							</Button>
						</div>
					</div>
				</div>

				{/* Below section for Tabs */}
				<div className='  w-full mx-auto px-33 border-b '>
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className='w-full -mt-12'
					>
						<TabsList className='bg-transparent gap-6 '>
							<TabsTrigger
								value='outline'
								className='rounded-none px-0 py-2 bg-transparent data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary '
							>
								Outline
							</TabsTrigger>
							<TabsTrigger
								value='landing'
								className='rounded-none px-0 py-2 bg-transparent data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary'
							>
								Landing Page
							</TabsTrigger>
							<TabsTrigger
								value='pricing'
								className='rounded-none px-0 py-2 bg-transparent data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary'
							>
								Pricing
							</TabsTrigger>
							<TabsTrigger
								value='checklist'
								className='rounded-none px-0 py-2 bg-transparent data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary'
							>
								Checklist
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			</div>

			{/* Scrollable Content */}
			<div className='overflow-y-auto flex-1'>
				<div className='max-w-6xl mx-auto bg-white'>
					{/* Main Content */}
					<div className='py-8'>
						<div className='space-y-8'>
							{/* Event Details */}
							<div className='flex flex-col md:flex-row gap-6'>
								<div className='md:w-1/3'>
									<h2 className='text-lg font-semibold text-gray-800 mb-1'>
										Event Details
									</h2>
									<p className='text-sm text-gray-600 mt-1'>
										Enter the basic event details such as the title and
										description. We'll use your title to generate the URL.
									</p>
								</div>

								<div className='md:w-2/3 bg-white  rounded-lg '>
									<h3 className='text-base font-semibold mb-4'>Event Details</h3>

									<div className='space-y-4'>
										<div>
											<div className='flex justify-between mb-1'>
												<label className='text-sm font-semibold mb-1'>
													Event Title
												</label>
												<span className='text-xs text-gray-400'>0/60</span>
											</div>
											<Input
												defaultValue='e.g UX Design Masterclass'
												className='w-full px-2 py-5'
											/>
										</div>

										<div>
											<label className='text-sm font-semibold block mb-1'>
												Event URL
											</label>
											<Input className='w-full px-2 py-5' />
										</div>

										<div>
											<label className='text-sm font-semibold block mb-1'>
												Description
											</label>
											<div className='border rounded-md'>
												<div className='flex items-center border-b p-2 gap-1'>
													<Button
														variant='ghost'
														size='sm'
														className='h-8 w-8 p-0'
													>
														<Bold className='h-4 w-4' />
													</Button>
													<Button
														variant='ghost'
														size='sm'
														className='h-8 w-8 p-0'
													>
														<Italic className='h-4 w-4' />
													</Button>
													<Button
														variant='ghost'
														size='sm'
														className='h-8 w-8 p-0'
													>
														<List className='h-4 w-4' />
													</Button>
													<Button
														variant='ghost'
														size='sm'
														className='h-8 w-8 p-0'
													>
														<ListOrdered className='h-4 w-4' />
													</Button>
													<Button
														variant='ghost'
														size='sm'
														className='h-8 w-8 p-0'
													>
														<AlignLeft className='h-4 w-4' />
													</Button>
												</div>
												<Textarea className='border-0 rounded-t-none min-h-[180px]' />
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Access Settings */}
							<div className='flex flex-col md:flex-row gap-6'>
								<div className='md:w-1/3'>
									<h2 className='text-lg font-semibold text-gray-800'>
										Access Settings
									</h2>
									<p className='text-sm text-gray-500 mt-1'>
										Configure event access options.
									</p>
								</div>

								<div className='md:w-2/3 bg-white rounded-lg '>
									<h3 className='text-base font-semibold mb-4'>
										Include This Event Free
									</h3>
									<p className='text-sm text-gray-500 mb-4'>
										Select the courses that will include this event for free.
									</p>

									<div className='space-y-4'>
										<div className='flex items-center justify-between bg-white p-5 rounded-lg border border-gray-300'>
											<div className='flex items-center gap-6'>
												<div className='w-full md:w-25 h-15 bg-gray-200 rounded-lg flex items-center justify-center'>
													<div className='w-8 h-8 text-gray-900'>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															viewBox='0 0 24 24'
															fill='none'
															stroke='currentColor'
															strokeWidth='1.5'
															strokeLinecap='round'
															strokeLinejoin='round'
															className='w-full h-full'
														>
															<rect
																x='3'
																y='3'
																width='18'
																height='18'
																rx='2'
																ry='2'
															></rect>
															<circle cx='8.5' cy='8.5' r='1.5'></circle>
															<polyline points='21 15 16 10 5 21'></polyline>
														</svg>
													</div>
												</div>
												<span className='text-sm'>Course XYZ</span>
											</div>
											<Button variant='ghost' size='sm' className='h-6 w-6 p-0'>
												<CloseIcon className='h-4 w-4' />
											</Button>
										</div>

										<div className='relative mb-6 mt-8'>
											<SerchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
											<Input
												placeholder='Search Courses...'
												className='pl-10 py-5'
											/>
										</div>

										<div className='space-y-2'>
											<div className='flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50'>
												<div className='flex items-center gap-4'>
													<div>
														<ThreeDotIcon className='w-5 h-5 text-gray-500' />
													</div>
													<div className='w-20 h-15 bg-gray-200 rounded-lg overflow-hidden'>
														<Image
															src={img5}
															alt='Course thumbnail'
															width={100}
															height={100}
															className='object-cover'
														/>
													</div>
													<span className='text-sm'>How to Get Funded</span>
												</div>
												<div className='flex items-center mr-4'>
													<CheckIcon className='h-5 w-5 text-gray-500 ml-auto' />
												</div>
											</div>

											<div className='flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50'>
												<div className='flex items-center gap-4'>
													<div>
														<ThreeDotIcon className='w-5 h-5 text-gray-500' />
													</div>
													<div className='w-20 h-15 bg-gray-200 rounded-lg overflow-hidden'>
														<Image
															src={img1}
															alt='Course thumbnail'
															width={100}
															height={100}
															className='object-cover'
														/>
													</div>
													<span className='text-sm'>
														Best Coaching Practices
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Agenda */}
							<div className='flex flex-col md:flex-row gap-6'>
								<div className='md:w-1/3'>
									<h2 className='text-lg font-semibold text-gray-800'>Agenda</h2>
									<p className='text-sm text-gray-500 mt-1'>
										List all the items you plan to cover in this session.
									</p>
								</div>
								<div className='md:w-2/3 bg-white  rounded-lg '>
									<h3 className='text-base font-semibold mb-4'>
										List all the items you plan to cover
									</h3>

									<div className='space-y-3'>
										{agendaItems.map((item, index) => (
											<div key={index} className='flex items-center gap-2'>
												<Input defaultValue={item} className='flex-1' />
												<Button
													variant='ghost'
													size='sm'
													className='h-8 w-8 p-0 text-gray-400 hover:text-gray-600'
													onClick={() => removeAgendaItem(index)}
												>
													<CloseIcon className='h-4 w-4 ' />
												</Button>
											</div>
										))}

										<Button
											variant='outline'
											className='flex items-center justify-center gap-2 mt-2 px-4 py-4 bg-black'
											onClick={addAgendaItem}
										>
											<PlusIcon className='h-4 w-4' fill='#FFFFFF' />
											<span className='text-white text-md'>Add Item</span>
										</Button>
									</div>
								</div>
							</div>

							{/* General Information */}
							<div className='flex flex-col md:flex-row gap-6'>
								<div className='md:w-1/3'>
									<h2 className='text-lg font-semibold text-gray-800'>
										General Information
									</h2>
									<p className='text-sm text-gray-500 mt-1'>
										Configure the basic settings for your course including
										language, level, and categories.
									</p>
								</div>

								<div className='md:w-2/3 bg-white rounded-lg'>
									<h3 className='text-base font-semibold mb-4'>
										General Information
									</h3>

									<div className='space-y-4'>
										{[
											{
												label: 'Select Language',
												options: [
													'English',
													'Spanish',
													'French',
													'German',
													'Chinese',
													'Japanese',
												],
											},
											{
												label: 'Select Level',
												options: [
													'Beginner',
													'Intermediate',
													'Advanced',
													'Expert',
												],
											},
											{
												label: 'Select Category',
												options: [
													'Programming',
													'Design',
													'Marketing',
													'Business',
													'Science',
												],
											},
											{
												label: 'Select Topic',
												options: [
													'Web Development',
													'Mobile Apps',
													'AI',
													'Data Science',
													'UX/UI',
												],
											},
										].map((item, index) => (
											<div key={index}>
												<label className='text-sm font-semibold block mb-1'>
													{item.label}
												</label>
												<div className='relative'>
													<select className='w-full h-10 pl-3 pr-10 border rounded-md appearance-none bg-white'>
														<option value=''>{item.label}</option>
														{item.options.map((option, optIndex) => (
															<option
																key={optIndex}
																value={option.toLowerCase().replace(/\s/g, '-')}
															>
																{option}
															</option>
														))}
													</select>
													<ChevronDown className='absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none' />
												</div>
											</div>
										))}
									</div>
								</div>
							</div>

							{/* Constructors */}
							<div className='flex flex-col md:flex-row gap-6'>
								<div className='md:w-1/3'>
									<h2 className='text-lg font-semibold text-gray-800'>
										Constructors
									</h2>
									<p className='text-sm text-gray-500 mt-1'>
										Add instructors and hosts.
									</p>
								</div>

								<div className=' bg-white rounded-lg md:w-2/3'>
									<h3 className='text-base font-semibold mb-4'>Constructors</h3>

									<div className=''>
										<div className='flex items-center justify-between border-gray-400 rounded-xl bg-white w-full'>
											<div className='flex items-center gap-5'>
												<div className='w-[60px] h-[60px] border border-gray-400 rounded-lg overflow-hidden flex items-center justify-center'>
													<Image
														src={Avatar1}
														alt='Steve Karbra'
														width={35}
														height={35}
														className='object-cover'
													/>
												</div>
												<div className='flex flex-col ml-2'>
													<span className='font-semibold text-gray-800'>
														Steve Karbra
													</span>
													<div className='flex items-center gap-2 mt-1'>
														<input
															type='checkbox'
															id='host1'
															className='w-4 h-4 accent-blue-500'
															defaultChecked
														/>
														<label
															htmlFor='host1'
															className='text-gray-900 text-sm'
														>
															Assign as Host.
														</label>
													</div>
												</div>
											</div>

											<button className='text-gray-400 hover:text-gray-600'>
												<CloseIcon className='h-4 w-4' />
											</button>
										</div>

										<div className='relative mb-6 mt-5'>
											<SerchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
											<Input
												placeholder='Search Courses...'
												className='pl-10 py-5'
											/>
										</div>

										<div className='space-y-2'>
											{[1, 2].map((item) => (
												<div
													key={item}
													className='flex items-center justify-between p-2 border border-gray-400 rounded-xl bg-white w-full mt-5'
												>
													<div className='flex items-center gap-5'>
														<div className='w-[60px] h-[60px] border border-gray-400 rounded-lg overflow-hidden flex items-center justify-center'>
															<Image
																src={Avatar1}
																alt='Steve Karbra'
																width={35}
																height={35}
																className='object-cover'
															/>
														</div>
														<div className='flex flex-col ml-2'>
															<span className='font-semibold text-gray-800'>
																Steve Karbra
															</span>
															<div className='flex items-center gap-2 mt-1'>
																<input
																	type='checkbox'
																	id='host1'
																	className='w-4 h-4 accent-blue-500'
																	defaultChecked
																/>
																<label
																	htmlFor='host1'
																	className='text-gray-900 text-sm'
																>
																	Assign as Host.
																</label>
															</div>
														</div>
													</div>

													<button className='text-gray-400 hover:text-gray-600'>
														{item === 1 && <CheckIcon className='h-5 w-5' />}
													</button>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

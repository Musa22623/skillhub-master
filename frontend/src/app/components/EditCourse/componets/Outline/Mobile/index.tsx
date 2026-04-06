/** @format */

'use client';

import {useState} from 'react';
import {ChevronDown, ChevronUp, Play, Upload} from 'lucide-react';
import {Button} from '@/app/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import Image, {StaticImageData} from 'next/image';
import Dog from '@/assets/Dog.jpeg';
import {
	BrowserIcon,
	DeleteIcon,
	PdfIcon,
	VideoIcon,
	VideoSvg,
} from '@/app/components/svg';
interface Section {
	id: number;
	title: string;
	expanded: boolean;
	status: 'free' | 'paid' | 'soon';
	items: CourseItem[];
}

interface CourseItem {
	id: string;
	type: 'video' | 'document' | 'installation';
	title: string;
	unitId: string;
	subtitle: string;
	videoUrl?: string | StaticImageData;
	expanded: boolean;
}

export default function MobileOutline() {
	const [courseSections, setCourseSections] = useState<Section[]>([
		{
			id: 1,
			title: 'Course Introduction & Setup',
			expanded: true,
			status: 'free',
			items: [
				{
					id: 'intro-1',
					type: 'video',
					title: 'Course Introduction & Overview',
					unitId: '674376cbbb11ae864a00abed',
					subtitle:
						'Comprehensive introduction to the course curriculum and learning objectives',
					// videoUrl: Dog,
					expanded: true,
				},
				{
					id: 'resources-1',
					type: 'video',
					title: 'Course Resources & Materials',
					unitId: '674376cbbb11ae864a00abed',
					subtitle:
						'Comprehensive introduction to the course curriculum and learning objectives',
					videoUrl: Dog,
					expanded: true,
				},
				{
					id: 'setup-1',
					type: 'installation',
					title: 'Setup & Installation Guide',
					unitId: '674376cbbb11ae864a00abed',
					subtitle: 'Step-by-step guide to setting up your environment',
					expanded: false,
				},
			],
		},
		{
			id: 2,
			title: 'Fundamental Concepts',
			expanded: false,
			status: 'paid',
			items: [],
		},
		{
			id: 3,
			title: 'Advanced Topics',
			expanded: false,
			status: 'soon',
			items: [],
		},
		{
			id: 4,
			title: 'Advanced Course Topics & Guide',
			expanded: true,
			status: 'free',
			items: [
				{
					id: 'advanced-1',
					type: 'video',
					title: 'Course Advanced Topics',
					unitId: '674376cbbb11ae864a00abed',
					subtitle: 'Comprehensive introduction to advanced topics',
					videoUrl: Dog,
					expanded: false,
				},
				{
					id: 'pdf-1',
					type: 'document',
					title: 'Course PDF & Materials',
					unitId: '674376cbbb11ae864a00abed',
					subtitle: 'Downloadable resources and materials',
					expanded: false,
				},
			],
		},
	]);

	const toggleSectionExpand = (sectionId: number) => {
		setCourseSections((sections) =>
			sections.map((section) =>
				section.id === sectionId
					? {...section, expanded: !section.expanded}
					: section
			)
		);
	};

	const toggleItemExpand = (sectionId: number, itemId: string) => {
		setCourseSections((sections) =>
			sections.map((section) =>
				section.id === sectionId
					? {
							...section,
							items: section.items.map((item) =>
								item.id === itemId ? {...item, expanded: !item.expanded} : item
							),
					  }
					: section
			)
		);
	};

	const handleReplaceVideo = (sectionId: number, itemId: string) => {
		// In a real implementation, this would open a file picker
		console.log(`Replace video for section ${sectionId}, item ${itemId}`);
		alert('File picker would open to replace video');
	};

	const handleRemoveVideo = (sectionId: number, itemId: string) => {
		if (confirm('Are you sure you want to remove this video?')) {
			setCourseSections((sections) =>
				sections.map((section) =>
					section.id === sectionId
						? {
								...section,
								items: section.items.map((item) =>
									item.id === itemId ? {...item, videoUrl: undefined} : item
								),
						  }
						: section
				)
			);
		}
	};

	const handleUseCurrentFrameAsThumbnail = (
		sectionId: number,
		itemId: string
	) => {
		console.log(
			`Use current frame as thumbnail for section ${sectionId}, item ${itemId}`
		);
		alert('Current frame would be set as thumbnail');
	};

	return (
		<div className='bg-white min-h-screen rounded-md shadow-md mb-15'>
			<div className='flex justify-between items-center p-4 border-b'>
				<h2 className='text-lg text-[#111827] font-semibold'>Outline</h2>
				<text className='text-teal-600 text-sm font-semibold'>
					Expand all sections
				</text>
			</div>

			<div className=''>
				{courseSections.map((section) => (
					<div key={section.id} className='overflow-hidden'>
						<div
							className={`flex flex-col justify-between p-4 cursor-pointer ${
								!section.expanded && 'border-b'
							}`}
							onClick={() => toggleSectionExpand(section.id)}
						>
							<span className='text-[13px] mb-1 text-[#6B7280] font-semibold'>
								Section {section.id}
							</span>

							<div className='flex justify-between gap-2'>
								<h2 className='font-semibold text-[#111827] text-[15px] line-clamp-2'>
									{section.title}{' '}
								</h2>
								<div className='flex gap-1'>
									<span
										className={`text-xs h-fit px-4 py-1 rounded-full ${
											section.status === 'free'
												? 'bg-green-100 text-green-900 font-semibold '
												: section.status === 'paid'
												? 'bg-blue-100 text-blue-900 font-semibold '
												: 'bg-gray-100 text-gray-900 font-semibold '
										}`}
									>
										{section.status === 'free'
											? 'Free'
											: section.status === 'paid'
											? 'Paid'
											: 'Soon'}
									</span>
									{section.expanded ? (
										<ChevronUp className='h-5 w-5' />
									) : (
										<ChevronDown className='h-5 w-5' />
									)}
								</div>
							</div>
						</div>

						{section.expanded && (
							<div
								className={`bg-white px-4 ${section.expanded && 'border-b'}`}
							>
								{section.items.map((item) => (
									<div
										key={item.id}
										className='border border-gray-300 mb-5 rounded-md'
									>
										<div
											className='p-4 flex items-center gap-4'
											onClick={() => toggleItemExpand(section.id, item.id)}
										>
											<div className='flex items-start justify-between'>
												{item.type === 'video' ? (
													<VideoIcon className='size-5 text-teal-600' />
												) : item.type === 'document' ? (
													<PdfIcon className='h-10 w-10 text-teal-600' />
												) : item.type === 'installation' ? (
													<BrowserIcon className='size-5 text-teal-600' />
												) : null}
											</div>
											<div className='flex-1'>
												<h3 className='font-semibold text-sm text-[#111827]'>
													{item.title}
												</h3>
											</div>
											<div>
												<button
													className='ml-2'
													onClick={(e) => {
														e.stopPropagation();
														toggleItemExpand(section.id, item.id);
													}}
												>
													{item.expanded ? (
														<ChevronUp className='h-5 w-5' />
													) : (
														<ChevronDown className='h-5 w-5' />
													)}
												</button>
											</div>
										</div>

										{item.expanded && (
											<div className='p-4 space-y-4 bg-[#F9FAFB] rounded-b-md border-t'>
												<div>
													<label className='block text-xs text-[#6B7280] font-semibold mb-1'>
														Learning Unit ID
													</label>
													<input
														type='text'
														value={item.unitId}
														className='w-full p-2 border rounded-md text-[13px] text-[#374151] bg-white'
													/>
												</div>

												<div>
													<label className='block text-xs text-[#6B7280] font-semibold mb-1'>
														Learning Unit Subtitle
													</label>
													<input
														type='text'
														value={item.subtitle}
														className='w-full p-2 border rounded-md text-[13px] text-[#374151] bg-white'
													/>
												</div>

												{item.type === 'video' && item.videoUrl && (
													<div>
														<label className='block text-xs text-[#6B7280] font-semibold mb-1'>
															Course Video Preview
														</label>
														<div className='relative rounded-md overflow-hidden'>
															<div className='aspect-video rounded-md bg-black relative'>
																<Image
																	src={
																		'https://i.ibb.co/jZjZ7ZRd/butterfly.webp'
																	}
																	alt={item.title || 'Video preview'}
																	fill
																	className='object-cover rounded-md'
																	quality={80}
																	priority={false}
																/>

																<div className='absolute inset-0 flex items-center justify-center'>
																	<div className='bg-gray-800/70 rounded-full p-4 cursor-pointer'>
																		<Play
																			className='size-6 text-teal-500'
																			fill='oklch(0.704 0.14 182.503)'
																		/>
																	</div>
																</div>
																<div className='absolute bottom-0 left-0 right-0 flex items-center p-2 text-white'>
																	<button className='bg-white rounded-xs'>
																		<svg
																			height='20px'
																			width='20px'
																			xmlns='http://www.w3.org/2000/svg'
																			fill='none'
																			viewBox='0 0 33 33'
																		>
																			<circle
																				fill='#13AFF0'
																				r='16'
																				cy='16.499'
																				cx='16.8027'
																			></circle>
																			<path
																				fill='white'
																				d='M23.433 15.4168L13.9332 9.93204C13.0998 9.45088 12.058 10.0523 12.058 11.0146V21.9841C12.058 22.9464 13.0998 23.5479 13.9332 23.0667L23.433 17.582C24.2664 17.1008 24.2664 15.8979 23.433 15.4168Z'
																			></path>
																		</svg>
																	</button>
																	<div className='flex-1 mx-2 gap-2 flex items-center'>
																		<span className='text-xs'>0:00</span>

																		<div className='h-1 flex-1 bg-gray-600 rounded-full'>
																			<div className='h-full w-1/3 bg-teal-500 rounded-full'></div>
																		</div>
																	</div>
																	<span className='text-xs'>2:30</span>
																</div>
															</div>

															<div className='p-2 flex flex-col justify-between items-center'>
																<DropdownMenu>
																	<DropdownMenuTrigger asChild>
																		<Button
																			variant='outline'
																			size='sm'
																			className='text-[13px] w-full bg-[#f5f5f5] text-[#333] font-normal'
																		>
																			Video Actions{' '}
																			<ChevronDown className='h-3 w-3 ml-1 text-[#333]' />
																		</Button>
																	</DropdownMenuTrigger>
																	<DropdownMenuContent className=''>
																		<DropdownMenuItem
																			onClick={() =>
																				handleReplaceVideo(section.id, item.id)
																			}
																		>
																			<VideoSvg className='h-4 w-4 mr-2' />
																			Replace Video
																		</DropdownMenuItem>
																		<DropdownMenuItem
																			onClick={() =>
																				handleRemoveVideo(section.id, item.id)
																			}
																			className='text-red-500'
																		>
																			<DeleteIcon className='h-4 w-4 mr-2' />
																			Remove Video
																		</DropdownMenuItem>
																	</DropdownMenuContent>
																</DropdownMenu>

																<Button
																	variant='ghost'
																	size='sm'
																	className='border text-[13px] mt-2 font-normal text-[#666]'
																	onClick={() =>
																		handleUseCurrentFrameAsThumbnail(
																			section.id,
																			item.id
																		)
																	}
																>
																	<Upload className='size-3  mr-1' />
																	Use current frame as thumbnail
																</Button>
															</div>
														</div>
													</div>
												)}
											</div>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

/** @format */

'use client';

import {useState} from 'react';
import {
	ChevronDown,
	ChevronUp,
	Play,
	Settings,
	Upload,
	Maximize,
	Volume2,
} from 'lucide-react';
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

export default function DesktopOutline() {
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
		// {
		// 	id: 2,
		// 	title: 'Fundamental Concepts',
		// 	expanded: false,
		// 	status: 'paid',
		// 	items: [],
		// },
		// {
		// 	id: 3,
		// 	title: 'Advanced Topics',
		// 	expanded: false,
		// 	status: 'soon',
		// 	items: [],
		// },
		// {
		// 	id: 4,
		// 	title: 'Advanced Course Topics & Guide',
		// 	expanded: true,
		// 	status: 'free',
		// 	items: [
		// 		{
		// 			id: 'advanced-1',
		// 			type: 'video',
		// 			title: 'Course Advanced Topics',
		// 			unitId: '674376cbbb11ae864a00abed',
		// 			subtitle: 'Comprehensive introduction to advanced topics',
		// 			videoUrl: Dog,
		// 			expanded: false,
		// 		},
		// 		{
		// 			id: 'pdf-1',
		// 			type: 'document',
		// 			title: 'Course PDF & Materials',
		// 			unitId: '674376cbbb11ae864a00abed',
		// 			subtitle: 'Downloadable resources and materials',
		// 			expanded: false,
		// 		},
		// 	],
		// },
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

	const handleUploadPreview = (sectionId: number, itemId: string) => {
		// In a real implementation, this would open a file picker
		console.log(`Upload preview for section ${sectionId}, item ${itemId}`);
		alert('File picker would open to upload preview');
	};

	const handleDeletePreview = (sectionId: number, itemId: string) => {
		if (confirm('Are you sure you want to delete this preview?')) {
			console.log(`Delete preview for section ${sectionId}, item ${itemId}`);
			// Implementation would remove the preview
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
		<div className='max-w-6xl mx-auto w-full'>
			<main className='p-6 mb-6'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-semibold'>Outline</h2>
					<text className='text-teal-600 text-sm font-bold'>
						Expand all sections
					</text>
				</div>

				<div className='space-y-4'>
					{courseSections.map((section) => (
						<div key={section.id} className='border rounded-lg overflow-hidden'>
							<div
								className='flex justify-between items-center p-4 cursor-pointer'
								onClick={() => toggleSectionExpand(section.id)}
							>
								<div className='flex items-center gap-2'>
									<span className='text-sm font-semibold'>
										Section {section.id}
									</span>
									<span className='font-semibold'>{section.title}</span>
								</div>
								<div className='flex items-center gap-2'>
									<span
										className={`text-xs px-4 py-1 rounded-full ${
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

							{section.expanded && (
								<div className={`transition-all duration-300 ${section.expanded ? 'px-4' : 'bg-white p-6'}`}>
									{section.items.map((item) => (
										<div
											key={item.id}
											className='border border-gray-300 mb-5 rounded-md'
										>
											<div
												className='p-4 flex items-start gap-3'
												onClick={() => toggleItemExpand(section.id, item.id)}
											>
												<div className='flex items-start justify-between'>
													{item.type === 'video' ? (
														<VideoIcon className='h-6 w-6 text-teal-600' />
													) : item.type === 'document' ? (
														<PdfIcon className='h-10 w-10 text-teal-600' />
													) : item.type === 'installation' ? (
														<BrowserIcon className='h-6 w-6 text-teal-600' />
													) : null}
												</div>
												<div className='flex-1'>
													<h3 className='font-semibold'>{item.title}</h3>
												</div>
												<div>
													{item.type === 'video' ? (
														item.videoUrl ? (
															<Button
																variant='outline'
																size='sm'
																className='text-red-600'
																onClick={(e) => {
																	e.stopPropagation();
																	handleDeletePreview(section.id, item.id);
																}}
															>
																Delete Preview
															</Button>
														) : (
															<Button
																variant='outline'
																size='sm'
																onClick={(e) => {
																	e.stopPropagation();
																	handleUploadPreview(section.id, item.id);
																}}
															>
																Upload Preview
															</Button>
														)
													) : (
														<Button
															variant='outline'
															size='sm'
															onClick={(e) => {
																e.stopPropagation();
																handleUploadPreview(section.id, item.id);
															}}
														>
															Upload Preview
														</Button>
													)}
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
												<div className='px-12 pb-6 pt-2 space-y-4 bg-gray-50 border-t'>
													<div>
														<label className='block text-sm text-[#333] mb-1'>
															Learning Unit ID
														</label>
														<input
															type='text'
															value={item.unitId}
															className='w-full p-2 border rounded-md text-sm'
														/>
													</div>

													<div>
														<label className='block text-sm text-[#333] mb-1'>
															Learning Unit Subtitle
														</label>
														<input
															type='text'
															value={item.subtitle}
															className='w-full p-2 border rounded-md text-sm'
														/>
													</div>

													{item.type === 'video' && item.videoUrl && (
														<div>
															<label className='block text-sm text-[#333] mb-1'>
																Course Video Preview
															</label>
															<div className='relative rounded-md overflow-hidden border'>
																<div className='aspect-video bg-black relative'>
																	<Image
																		src={item.videoUrl}
																		alt={item.title || 'Video preview'}
																		fill
																		className='object-cover'
																		quality={80}
																		priority={false}
																	/>

																	<div className='absolute inset-0 flex items-center justify-center'>
																		<div className='bg-teal-500 rounded-full p-4 cursor-pointer'>
																			<Play
																				className='h-6 w-6 text-white'
																				fill='white'
																			/>
																		</div>
																	</div>
																	<div className='absolute bottom-0 left-0 right-0 flex items-center p-2 bg-black/50 text-white'>
																		<button className='p-1'>
																			<Play className='h-4 w-4' />
																		</button>
																		<div className='flex-1 mx-2'>
																			<div className='h-1 bg-gray-600 rounded-full'>
																				<div className='h-full w-1/3 bg-teal-500 rounded-full'></div>
																			</div>
																		</div>
																		<span className='text-xs mr-2'>2:30</span>
																		<button className='p-1'>
																			<Volume2 className='h-4 w-4' />
																		</button>
																		<button className='p-1'>
																			<Settings className='h-4 w-4' />
																		</button>
																		<button className='p-1'>
																			<Maximize className='h-4 w-4' />
																		</button>
																	</div>
																</div>
																<div className='p-2 bg-white flex justify-between items-center'>
																	<DropdownMenu>
																		<DropdownMenuTrigger asChild>
																			<Button
																				variant='outline'
																				size='sm'
																				className='text-sm'
																			>
																				Video Actions{' '}
																				<ChevronDown className='h-3 w-3 ml-1' />
																			</Button>
																		</DropdownMenuTrigger>
																		<DropdownMenuContent>
																			<DropdownMenuItem
																				onClick={() =>
																					handleReplaceVideo(
																						section.id,
																						item.id
																					)
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
																		onClick={() =>
																			handleUseCurrentFrameAsThumbnail(
																				section.id,
																				item.id
																			)
																		}
																	>
																		<Upload className='h-4 w-4 mr-1' />
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
			</main>
		</div>
	);
}

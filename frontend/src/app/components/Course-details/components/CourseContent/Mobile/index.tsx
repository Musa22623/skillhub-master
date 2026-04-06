/** @format */

import React, {useState} from 'react';
import {ChevronDown, X} from 'lucide-react';
import Image from 'next/image';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';

const CourseContent = () => {
	const [expandedSections, setExpandedSections] = useState([0, 1]);
	const [allExpanded, setAllExpanded] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [expandedDescriptions, setExpandedDescriptions] = useState<number[]>(
		[]
	);

	const toggleSection = (index: number) => {
		if (expandedSections.includes(index)) {
			setExpandedSections(expandedSections.filter((i) => i !== index));
		} else {
			setExpandedSections([...expandedSections, index]);
		}
	};

	const toggleAllSections = () => {
		const newState = !allExpanded;
		setAllExpanded(newState);

		if (newState) {
			setExpandedSections([0, 1, 2]); // Expand all sections
		} else {
			setExpandedSections([]); // Collapse all sections
		}
	};

	const toggleDescription = (index: number) => {
		if (expandedDescriptions.includes(index)) {
			setExpandedDescriptions(expandedDescriptions.filter((i) => i !== index));
		} else {
			setExpandedDescriptions([...expandedDescriptions, index]);
		}
	};

	const sections = [
		{
			title: 'Course Introduction & How to Take this Course',
			number: 'Section 1',
			stats: '4 lectures • 34min',
			lectures: [
				{
					title:
						'How to Take the Course and Access the Excel Exercises (Part 1 of 2)',
					description:
						"Learn how to get the most out of this course and access all supplementary materials. We'll cover the course structure, downloading exercise files, and setting up your learning environment. This comprehensive guide ensures you're fully prepared to begin your learning journey effectively and efficiently.",
					icon: 'video',
					preview: true,
				},
				{
					title: 'Course Resources and Materials PDF',
					description:
						'Access the complete collection of course materials, including exercise files, reference guides, and supplementary readings.',
					icon: 'document',
				},
				{
					title: 'Course Overview and Navigation Guide',
					description:
						'Get familiar with the course platform and learn how to navigate through different sections effectively.',
					icon: 'list',
					preview: true,
				},
			],
		},
		{
			title: 'Option and Stock Volatility, the VIX and More',
			number: 'Section 2',
			stats: '3 lectures • 31min',
			lectures: [],
		},
		{
			title: 'The Basics of How Options Work',
			number: 'Section 3',
			stats: '26 lectures • 2hr 59min',
			lectures: [],
		},
	];

	const renderIcon = (type: string) => {
		switch (type) {
			case 'video':
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 38 38'
						className='w-10 h-10'
					>
						<path
							strokeLinejoin='round'
							strokeLinecap='round'
							strokeWidth='1.6'
							stroke='#00BCD4'
							d='M17.315 16.7018V21.2982C17.3148 21.4019 17.3427 21.5037 17.3958 21.5928C17.4489 21.6818 17.5252 21.7548 17.6165 21.8039C17.7078 21.853 17.8107 21.8765 17.9143 21.8717C18.0179 21.8669 18.1182 21.8341 18.2046 21.7767L21.6553 19.4785C21.7332 19.4253 21.7969 19.3539 21.8409 19.2705C21.8849 19.1871 21.9079 19.0943 21.9079 19C21.9079 18.9057 21.8849 18.8128 21.8409 18.7294C21.7969 18.6461 21.7332 18.5747 21.6553 18.5215L18.2046 16.2232C18.1182 16.1659 18.0179 16.1331 17.9143 16.1283C17.8107 16.1235 17.7078 16.1469 17.6165 16.196C17.5252 16.2452 17.4489 16.3181 17.3958 16.4072C17.3427 16.4963 17.3148 16.5981 17.315 16.7018Z'
						></path>
						<path
							strokeLinejoin='round'
							strokeLinecap='round'
							strokeWidth='1.6'
							stroke='#00BCD4'
							d='M19 27C23.4183 27 27 23.4183 27 19C27 14.5817 23.4183 11 19 11C14.5817 11 11 14.5817 11 19C11 23.4183 14.5817 27 19 27Z'
						></path>
					</svg>
				);
			case 'document':
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 38 38'
						className='w-10 h-10'
					>
						<path
							strokeLinejoin='round'
							strokeLinecap='round'
							strokeWidth='1.2'
							stroke='#00BCD4'
							d='M12 28V10H23.0747L26.7662 13.6916V28H12Z'
						></path>
						<path
							strokeLinejoin='round'
							strokeLinecap='round'
							strokeWidth='1.2'
							stroke='#00BCD4'
							d='M19.1395 12.2149C17.1091 11.735 17.6628 16.3421 19.9737 19.0886C22.8827 22.5217 25.3782 22.0935 25.3782 21.2297C25.3782 19.5537 21.5906 20.1148 18.6743 21.3995C16.6144 22.315 12.1107 24.1829 13.7276 25.5267C15.9943 27.402 20.9114 12.6358 19.1395 12.2149Z'
						></path>
					</svg>
				);
			case 'list':
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 38 38'
						className='w-10 h-10'
					>
						<path
							strokeLinejoin='round'
							strokeLinecap='round'
							strokeWidth='1.6'
							stroke='#00BCD4'
							d='M22.2122 18.0833H25.8788M22.2122 20.8333H25.8788M22.2122 23.5833H25.8788M9.8335 13.9547H28.1668M11.0435 10.75H26.9568C27.6251 10.75 28.1668 11.2917 28.1668 11.96V26.04C28.1668 26.7083 27.6251 27.25 26.9568 27.25H11.0435C10.3752 27.25 9.8335 26.7083 9.8335 26.04V11.96C9.8335 11.2917 10.3752 10.75 11.0435 10.75Z'
						></path>
					</svg>
				);
			default:
				return null;
		}
	};

	return (
		<div className='flex items-center font-sans'>
			<div className='w-full'>
				<div className='bg-white'>
					{/* Course Header */}
					<div className='p-4 lg:px-8 lg:py-6 border-b border-gray-200'>
						<h1 className='text-2xl font-semibold text-gray-900 lg:mb-2'>
							Course Content
						</h1>
						<div className='flex justify-between items-start md:items-center text-sm text-gray-500'>
							<div className=' flex flex-col'>
								<span className=''>21 sections • 344 lectures</span>
								<span className=''>29h 40m total length</span>
							</div>

							<button
								onClick={toggleAllSections}
								className='text-cyan-500 font-semibold hover:text-cyan-600'
							>
								{allExpanded ? 'Collapse all' : 'Expand all'}
							</button>
						</div>
					</div>

					{/* Sections */}
					{sections.map((section, index) => (
						<div key={index} className='border-b border-gray-200'>
							<div
								className='p-4 lg:px-8 lg:py-4 bg-gray-50 hover:bg-gray-100 cursor-pointer flex flex-col '
								onClick={() => toggleSection(index)}
							>
								<div className='flex justify-between  gap-2 lg:gap-6'>
									<span className='text-sm font-semibold text-gray-500 text-nowrap'>
										{section.number}
									</span>
									<div className='text-sm text-gray-500  whitespace-nowrap'>
										{section.stats}
									</div>
								</div>

								<div className='flex justify-between gap-2 lg:gap-6'>
									<h2 className='text-base font-semibold text-gray-900 '>
										{section.title}
									</h2>
									<ChevronDown
										className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
											expandedSections.includes(index)
												? 'transform rotate-180'
												: ''
										}`}
									/>
								</div>
							</div>

							{expandedSections.includes(index) && (
								<div className='p-4 lg:px-8 lg:py-4'>
									{section.lectures.length > 0 ? (
										section.lectures.map((lecture, lectureIndex) => (
											<div
												key={lectureIndex}
												className='py-3 flex flex-col gap-2 items-start border-b last:border-none'
											>
												<div>
													<div className=' flex justify-center gap-2 items-center pt-1'>
														<span>{renderIcon(lecture.icon)}</span>
														<h3 className='text-base font-semibold text-gray-900 leading-snug'>
															{lecture.title}
														</h3>
													</div>
												</div>
												<div className=''>
													<p
														className={`text-sm text-gray-500 leading-relaxed ${
															expandedDescriptions.includes(lectureIndex)
																? ''
																: 'line-clamp-2'
														}`}
													>
														{lecture.description}
													</p>
												</div>
												<div className='flex justify-between items-center w-full'>
													{lecture.description.length > 120 && (
														<button
															onClick={(e) => {
																e.stopPropagation();
																toggleDescription(lectureIndex);
															}}
															className='text-cyan-500 text-sm font-semibold flex items-center hover:text-cyan-600'
														>
															<span>
																{expandedDescriptions.includes(lectureIndex)
																	? 'Read Less'
																	: 'Read More'}
															</span>
															<ChevronDown
																className={`size-4 ml-1 ${
																	expandedDescriptions.includes(lectureIndex)
																		? 'transform rotate-180'
																		: ''
																}`}
															/>
														</button>
													)}
													{lecture.preview && (
														<button
															onClick={(e) => {
																e.stopPropagation();
																setShowModal(true);
															}}
															className='col-span-2  px-4 py-1.5 bg-white border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap h-fit'
														>
															Preview
														</button>
													)}
												</div>
											</div>
										))
									) : (
										<div className='py-2text-sm text-gray-500 text-center'></div>
									)}
								</div>
							)}
						</div>
					))}

					{/* More Sections Button */}
					<div className='flex justify-center py-4'>
						<button className='px-6 py-2 bg-white border border-gray-200 rounded-md text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all hover:-translate-y-0.5 hover:shadow'>
							11 more sections
						</button>
					</div>
				</div>
			</div>

			{/* Preview Modal */}
		

			<Drawer open={showModal} onOpenChange={setShowModal}>
				<DrawerContent>
					<DrawerHeader className='border-b-2 items-start flex-row-reverse justify-between'>
						<button
							onClick={() => setShowModal(false)}
						>
							<X className='w-5 h-5' />
						</button>
							<div className=' border-gray-200'>
								<DrawerTitle className='text-lg font-semibold text-gray-900'>
									Course Preview
								</DrawerTitle>
								<div className='text-base font-semibold text-gray-700'>
									Apache Kafka Series - Kafka Connect Hands-on Learning
								</div>
							</div>
			
					</DrawerHeader>

					<section className='overflow-y-auto no-scrollbar p-4'>
						
							<div className='relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-6'>
								<Image
									src='https://i.ibb.co/82nmTCp/paul1.jpg'
									alt='Course Preview'
									fill
									className='w-full h-full object-cover'
								/>
								<div className='absolute inset-0 flex items-center justify-center cursor-pointer'>
									<div className='w-28 h-28 transition-transform hover:scale-110'>
										<svg viewBox='0 0 118 118'>
											<g transform='translate(-1260 -363)'>
												<circle
													opacity='0.6'
													fill='#1a1e2e'
													transform='translate(1260 363)'
													r='59'
													cy='59'
													cx='59'
												></circle>
												<path
													fill='#13c4cc'
													transform='translate(1351 394) rotate(90)'
													d='M23.287,9.145a6,6,0,0,1,10.425,0L51.886,41.029A6,6,0,0,1,46.674,50H10.326a6,6,0,0,1-5.213-8.971Z'
												></path>
											</g>
										</svg>
									</div>
								</div>
							</div>

							<div className=''>
								{/* Preview items */}
								{[
									'Course Introduction',
									'Understanding Basic Concepts',
									'Advanced Topics Overview',
								].map((name, i) => (
									<div
										key={i}
										className='flex gap-4 p-3 rounded-md cursor-pointer hover:bg-gray-50 transition-colors'
									>
										<div className='w-28 h-16 rounded overflow-hidden flex-shrink-0'>
											<Image
												src='https://i.ibb.co/Zh0M06j/preview1.jpg'
												alt={`Preview ${i + 1}`}
												width={120}
												height={68}
												className='w-full h-full object-cover'
											/>
										</div>
										<div className='pt-1'>
											<div className='text-sm font-semibold text-gray-900 mb-1'>
												{name}
											</div>
											<div className='text-xs text-gray-500'>{`0${i + 1}:${
												i === 0 ? '45' : i === 1 ? '20' : '45'
											}`}</div>
										</div>
									</div>
								))}
							</div>
					
					</section>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default CourseContent;

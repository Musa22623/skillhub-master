/** @format */

'use client';

import React, {useRef, useState} from 'react';
import Image from 'next/image';
import {
	ChevronDown,
	X,
	Plus,
	Underline,
	Italic,
	Bold,
	Trash2Icon,
	Search,
	Upload,
} from 'lucide-react';

import {Input} from '@/app/components/ui/input';
import {Switch} from '@/app/components/ui/switch';
import {Button} from '@/app/components/ui/button';
import {Card} from '@/app/components/ui/card';
import {cn} from '@/lib/utils';
import {
	OrderedListSvg,
	ThreeDotIcon,
	UnorderedListSvg,
} from '@/app/components/svg';
import {Avatar, AvatarFallback, AvatarImage} from '@/app/components/ui/avatar';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/app/components/ui/select';
import Avatar2 from '@/assets/avatar/AVATAR-2.jpg';
import img5 from '@/assets/img5.jpg';
import img1 from '@/assets/img-3.webp';
import VideoPlayer from '../../VideoPlayer';
import {Separator} from '@/app/components/ui/separator';

const MobileLanding = () => {
	const [bulletPoints, setBulletPoints] = useState<string[]>(['', '', '', '']);
	const [requirements, setRequirements] = useState<string[]>([
		'Example: No photography experience needed. You will learn everything from A-Z',
		'',
	]);
	const [intendedLearners, setIntendedLearners] = useState<string[]>([
		'Example: Amateur photographers curious about lighting',
	]);
	const [forwardShipping, setForwardShipping] = useState(true);
	const [shippingItems, setShippingItems] = useState([
		'Hands-on learning experience',
		'Course kit be included',
	]);

	// Q&A State
	const [questions, setQuestions] = useState([
		{id: 1, title: 'What is UX Design?', answer: '', isOpen: false},
	]);
	const editorRef = useRef<HTMLDivElement>(null);
	const thumbnailInputRef = useRef<HTMLInputElement>(null);

	// Testimonials State
	const [testimonials, setTestimonials] = useState([
		{
			id: 1,
			firstName: 'John',
			lastName: 'Doe',
			occupation: 'Head of Impact Academy',
			testimonial: '',
			avatarUrl: Avatar2,
			thumbnailUrl: '',
			isOpen: false,
		},
	]);
	const [avatar, setAvatar] = useState('/img/person.jpeg');
	const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
	//CPE State
	const [cpeCredits, setCpeCredits] = useState('');
	const [subject, setSubject] = useState('');
	const [qualification, setQualification] = useState('');

	// Learning Paths State
	const [learningPaths, setLearningPaths] = useState([
		{
			id: 1,
			title: 'How to Get Funded',
			image: img5, // local image reference
			selected: false,
		},
		{
			id: 2,
			title: 'Best Coaching Practices',
			image: img1, // local image reference
			selected: false,
		},
	]);

	const [searchQuery, setSearchQuery] = useState('');
	const [selectedPaths, setSelectedPaths] = useState<typeof learningPaths>([]);

	// Filter learning paths based on search query
	const filteredLearningPaths = learningPaths.filter(
		(path) =>
			path.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
			!path.selected
	);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const removeLearningPath = (id: number) => {
		setLearningPaths(learningPaths.filter((path) => path.id !== id));
		setSelectedPaths(selectedPaths.filter((path) => path.id !== id));
	};

	const togglePathSelection = (path: (typeof learningPaths)[0]) => {
		if (path.selected) {
			// Deselect
			setLearningPaths(
				learningPaths.map((p) =>
					p.id === path.id ? {...p, selected: false} : p
				)
			);
			setSelectedPaths(selectedPaths.filter((p) => p.id !== path.id));
		} else {
			// Select
			setLearningPaths(
				learningPaths.map((p) =>
					p.id === path.id ? {...p, selected: true} : p
				)
			);
			setSelectedPaths([...selectedPaths, {...path, selected: true}]);
			setSearchQuery(''); // Clear search after selection
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setAvatar(imageUrl);
		}
	};

	const addBulletPoint = () => {
		setBulletPoints([...bulletPoints, '']);
	};

	const removeBulletPoint = (index: number) => {
		const newBulletPoints = [...bulletPoints];
		newBulletPoints.splice(index, 1);
		setBulletPoints(newBulletPoints);
	};

	const updateBulletPoint = (index: number, value: string) => {
		const newBulletPoints = [...bulletPoints];
		newBulletPoints[index] = value;
		setBulletPoints(newBulletPoints);
	};

	const addRequirement = () => {
		setRequirements([...requirements, '']);
	};

	const removeRequirement = (index: number) => {
		const newRequirements = [...requirements];
		newRequirements.splice(index, 1);
		setRequirements(newRequirements);
	};

	const updateRequirement = (index: number, value: string) => {
		const newRequirements = [...requirements];
		newRequirements[index] = value;
		setRequirements(newRequirements);
	};

	const addIntendedLearner = () => {
		setIntendedLearners([...intendedLearners, '']);
	};

	const removeIntendedLearner = (index: number) => {
		const newIntendedLearners = [...intendedLearners];
		newIntendedLearners.splice(index, 1);
		setIntendedLearners(newIntendedLearners);
	};

	const updateIntendedLearner = (index: number, value: string) => {
		const newIntendedLearners = [...intendedLearners];
		newIntendedLearners[index] = value;
		setIntendedLearners(newIntendedLearners);
	};

	// Forward Shipping Functions
	const addShippingItem = () => {
		setShippingItems([...shippingItems, '']);
	};

	const removeShippingItem = (index: number) => {
		const newItems = [...shippingItems];
		newItems.splice(index, 1);
		setShippingItems(newItems);
	};

	const updateShippingItem = (index: number, value: string) => {
		const newItems = [...shippingItems];
		newItems[index] = value;
		setShippingItems(newItems);
	};

	//  Q&A Functions
	const addQuestion = () => {
		const newId =
			questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
		setQuestions([
			...questions,
			{id: newId, title: `Question ${newId}`, answer: '', isOpen: false},
		]);
	};

	const toggleQuestion = (id: number) => {
		setQuestions(
			questions.map((q) => (q.id === id ? {...q, isOpen: !q.isOpen} : q))
		);
	};

	const updateQuestionTitle = (id: number, title: string) => {
		setQuestions(questions.map((q) => (q.id === id ? {...q, title} : q)));
	};

	// const updateQuestionAnswer = (id: number, answer: string) => {
	//   setQuestions(questions.map((q) => (q.id === id ? { ...q, answer } : q)));
	// };

	const deleteQuestion = (id: number) => {
		setQuestions(questions.filter((q) => q.id !== id));
	};

	const execCommand = (command: string) => {
		// Make sure the editor has focus first
		if (editorRef.current) {
			editorRef.current.focus();

			// Small delay to ensure focus is properly set
			setTimeout(() => {
				document.execCommand(command, false);
			}, 10);
		}
	};

	// Testimonials Functions
	const addTestimonial = () => {
		const newId =
			testimonials.length > 0
				? Math.max(...testimonials.map((t) => t.id)) + 1
				: 1;
		setTestimonials([
			...testimonials,
			{
				id: newId,
				firstName: '',
				lastName: '',
				occupation: '',
				testimonial: '',
				avatarUrl: Avatar2,
				thumbnailUrl: '',
				isOpen: false,
			},
		]);
	};

	const toggleTestimonial = (id: number) => {
		setTestimonials(
			testimonials.map((t) => (t.id === id ? {...t, isOpen: !t.isOpen} : t))
		);
	};

	const updateTestimonial = (id: number, field: string, value: string) => {
		setTestimonials(
			testimonials.map((t) => (t.id === id ? {...t, [field]: value} : t))
		);
	};

	const deleteTestimonial = (id: number) => {
		setTestimonials(testimonials.filter((t) => t.id !== id));
	};
	const handleThumbnailUpload = () => {
		thumbnailInputRef.current?.click();
	};
	const handleFileChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setPreview: (url: string) => void
	) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					setPreview(e.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	};
	return (
		<>
			<div className='flex flex-col gap-4 pb-15'>
				{/* Promotional Video Section */}
				<div className='overflow-y-auto flex-1'>
					<div className='flex flex-col gap-4 '>
						<div className='md:w-1/3 space-y-2 px-4 pt-6'>
							<h2 className='text-lg font-semibold text-[#1a1a1a]'>
								Promotional Video
							</h2>
							<p className='text-[#666] text-sm'>
								Your promo video is a quick and compelling way for students to
								preview what they&apos;ll learn in your course. Students
								considering your course are more likely to enroll if your promo
								video is well-made.
							</p>
						</div>
						<Card className='flex flex-col border-none shadow-none'>
							<div className=''>
								<div className=' gap-4'>
									<div className=' px-4 flex relative w-full h-40 overflow-hidden rounded'>
										<VideoPlayer />
									</div>
									<div className='px-4 my-2'>
										<Button
											variant='outline'
											size='sm'
											className='text-[13px] w-full bg-[#f5f5f5] text-[#333] font-normal'
										>
											Video Actions{' '}
											<ChevronDown className='h-3 w-3 ml-1 text-[#333]' />
										</Button>
										<Button
											variant='ghost'
											size='sm'
											className='border text-[13px] mt-2 w-full font-normal text-[#666]'
										>
											<Upload className='size-3  mr-1' />
											Use current frame as thumbnail
										</Button>
									</div>
								</div>
							</div>
						</Card>
					</div>
				</div>

				<Separator />

				{/* Bullet Points Section */}
				<div className='flex flex-col md:flex-row gap-4 py-0'>
					<div className='md:w-1/3 space-y-2 px-4 '>
						<h2 className='text-lg font-semibold text-[#1a1a1a]'>
							Bullet Points
						</h2>
						<p className='text-[#666] text-sm'>
							You must write at least 4 learning objectives or outcomes that
							learners can expect to achieve after completing your course.
						</p>
					</div>
					<Card className='md:w-2/3 p-4 pt-0 shadow-none border-none bg-white text-neutral-950'>
						<div className='space-y-4'>
							<div className='space-y-3'>
								{bulletPoints.map((point, index) => (
									<div key={index} className='relative'>
										<Input
											value={point}
											onChange={(e) => updateBulletPoint(index, e.target.value)}
											placeholder={`Enter learning objective`}
											className='pr-10 text-sm focus-visible:ring-transparent focus-visible:border-[#00bfa5]'
										/>
										<button
											onClick={() => removeBulletPoint(index)}
											className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#666]'
										>
											<X size={16} className='stroke-3 text-[#FF4444] ' />
										</button>
									</div>
								))}
								<Button
									variant='outline'
									onClick={addBulletPoint}
									className='bg-gray-900 w-full text-white hover:bg-gray-800 py-5 px-4 text-xs'
								>
									<Plus size={16} className='' /> Add More
								</Button>
							</div>
						</div>
					</Card>
				</div>

				<Separator />

				{/* Course Requirements Section */}
				<div className='flex flex-col md:flex-row gap-4 px-4 py-0'>
					<div className='md:w-1/3 '>
						<h2 className='text-lg font-semibold text-[#1a1a1a] mb-2'>
							Course Requirements
						</h2>
						<p className='text-[#666] text-sm'>
							List the required skills, experience, tools or equipment learners
							should have prior to taking your course. If there are no
							requirements, use this space as an opportunity to lower the
							barrier for beginners.
						</p>
					</div>
					<Card className='md:w-2/3 shadow-none border-none bg-white text-neutral-950'>
						<div className='space-y-4'>
							<div className='space-y-3'>
								{requirements.map((requirement, index) => (
									<div key={index} className='relative'>
										<Input
											value={requirement}
											onChange={(e) => updateRequirement(index, e.target.value)}
											placeholder='Add another requirement'
											className='pr-10 focus-visible:ring-transparent focus-visible:border-[#00bfa5] text-sm'
										/>
										<button
											onClick={() => removeRequirement(index)}
											className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#666]'
										>
											<X size={16} className='stroke-3 text-[#FF4444]' />
										</button>
									</div>
								))}
								<Button
									variant='outline'
									onClick={addRequirement}
									className='bg-gray-900 w-full text-white hover:bg-gray-800 py-5 px-4 text-xs'
								>
									<Plus size={16} className='' /> Add More
								</Button>
							</div>
						</div>
					</Card>
				</div>

				<Separator />

				{/* Intended Learners Section */}
				<div className='flex flex-col md:flex-row py-0'>
					<div className='md:w-1/3 space-y-2 px-4'>
						<h2 className='text-lg font-semibold text-[#1a1a1a]'>
							Intended Learners
						</h2>
						<p className='text-[#666] text-sm'>
							Write a short description of the intended learners for your course
							who will find your course content valuable.
						</p>
					</div>
					<Card className='md:w-2/3 shadow-none border-none px-4'>
						<div className='space-y-4'>
							<div className='space-y-3'>
								{intendedLearners.map((learner, index) => (
									<div key={index} className='relative'>
										<Input
											value={learner}
											onChange={(e) =>
												updateIntendedLearner(index, e.target.value)
											}
											placeholder='Example: Amateur photographers curious about lighting'
											className='pr-10 focus-visible:ring-transparent focus-visible:border-[#00bfa5] text-sm'
										/>
										<button
											onClick={() => removeIntendedLearner(index)}
											className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#666]'
										>
											<X size={16} className='stroke-3 text-[#FF4444]' />
										</button>
									</div>
								))}
								<Button
									variant='outline'
									onClick={addIntendedLearner}
									className='bg-gray-900 w-full text-white hover:bg-gray-800 py-5 px-4 text-xs'
								>
									<Plus size={16} className='' /> Add More
								</Button>
							</div>
						</div>
					</Card>
				</div>

				<Separator />

				{/* General Information */}
				<div className='flex flex-col md:flex-row  py-0'>
					<div className='md:w-1/3 space-y-2 px-4'>
						<h2 className='text-lg font-semibold text-[#1a1a1a]'>
							General Information
						</h2>
						<p className='text-sm text-gray-500 mt-1'>
							Configure the basic settings for your course including language,
							level, and categories.
						</p>
					</div>

					<Card className='md:w-2/3 px-4 shadow-none border-none'>
						<div className='md: bg-white rounded-lg'>
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
										options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
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
										label: 'Select Subcategory',
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
										<div className='relative'>
											<select className='w-full h-10 pl-3 pr-10 border rounded-md appearance-none bg-white focus-visible:outline-black/80'>
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
					</Card>
				</div>

				<Separator />

				{/*  Forward Shipping Section */}
				<div className='flex flex-col md:flex-row  py-0'>
					<div className='md:w-1/3 space-y-2 px-4'>
						<div className='flex  gap-3 items-center '>
							<Switch
								checked={forwardShipping}
								onCheckedChange={setForwardShipping}
								className={cn(
									'data-[state=checked]:bg-[#00bfa5]',
									'data-[state=unchecked]:bg-gray-300',
									'peer inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors duration-200 ease-in-out'
								)}
							/>
							<h2 className='text-lg font-semibold text-[#1a1a1a]'>
								Forward Shipping
							</h2>
						</div>
						<p className='text-[#666] text-sm'>
							Enhance your student's experience with hand-picked supplies needed
							to bring your project to life.
						</p>
					</div>
					<Card className='md:w-2/3 px-4 shadow-none border-none'>
						<div className='space-y-3 '>
							{shippingItems.map((item, index) => (
								<div key={index} className='relative'>
									<Input
										value={item}
										onChange={(e) => updateShippingItem(index, e.target.value)}
										placeholder='Add item needed for your course'
										className='pr-10 py-2 focus-visible:ring-transparent focus-visible:border-[#00bfa5] text-sm'
									/>
									<button
										onClick={() => removeShippingItem(index)}
										className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#666]'
									>
										<X size={16} className='stroke-3 text-[#FF4444]' />
									</button>
								</div>
							))}
							<Button
								variant='default'
								onClick={addShippingItem}
								className='bg-gray-900 text-white text-xs hover:bg-gray-800 py-5 px-4 w-full md:w-auto'
							>
								<Plus size={16} className='' /> Add More
							</Button>
						</div>
					</Card>
				</div>

				<Separator />

				{/* Add Question */}
				<div className='flex flex-col md:flex-row py-0'>
					{/* Left Section */}
					<div className='md:w-1/3 space-y-2 px-4'>
						<h2 className='text-lg font-semibold text-[#1a1a1a]'>Q&A</h2>
						<p className='text-sm text-[#666]'>
							Add frequently asked questions and their answers to help students
							better understand your course.
						</p>
					</div>

					{/* Right Section */}
					<Card className='md:w-2/3  px-4 shadow-none border-none'>
						<div className='space-y-4'>
							{questions.map((question) => (
								<div
									key={question.id}
									className={`rounded-md  transition-all ${
										question.isOpen ? '' : ' '
									}`}
								>
									{/* Question Header */}
									<div
										className={`flex items-center justify-between p-2.5 bg-gray-100 rounded-md cursor-pointer ${
											question.isOpen ? 'border-b rounded-b-none' : ' '
										}`}
										onClick={() => toggleQuestion(question.id)}
									>
										<input
											type='text'
											value={question.title}
											onChange={(e) =>
												updateQuestionTitle(question.id, e.target.value)
											}
											onClick={(e) => e.stopPropagation()}
											placeholder='Enter question title'
											className='flex-1 bg-transparent outline-none  font-semibold text-gray-800 placeholder:text-gray-500 mr-2 text-sm'
										/>
										<ChevronDown
											size={20}
											className={`transition-transform text-[#666] ${
												question.isOpen ? 'rotate-180' : ''
											}`}
										/>
									</div>

									{/* Answer Section */}
									{question.isOpen && (
										<div className='space-y-4 px-4 mt-4'>
											{/* Toolbar + Editor */}
											<div className='space-y-2'>
												<div className='border border-gray-200 rounded-md overflow-hidden'>
													<div className='flex gap-1 overflow-x-auto bg-gray-50 p-2 scrollbar-hide'>
														<Button
															type='button'
															variant='ghost'
															size='sm'
															className='h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted'
															onClick={() => execCommand('bold')}
														>
															<Bold className='h-5 w-5' />
														</Button>
														<Button
															type='button'
															variant='ghost'
															size='sm'
															className='h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted'
															onClick={() => execCommand('italic')}
														>
															<Italic className='h-5 w-5' />
														</Button>
														<Button
															type='button'
															variant='ghost'
															size='sm'
															className='h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted'
															onClick={() => execCommand('underline')}
														>
															<Underline className='h-5 w-5' />
														</Button>
													</div>
													<div
														ref={editorRef}
														contentEditable
														className='min-h-[120px] max-h-[240px] custom-list overflow-y-auto p-3 text-[15px] leading-relaxed outline-none'
													/>
												</div>
											</div>

											<Separator />
											{/* Action Buttons */}
											<div className='flex justify-between items-center'>
												<Button
													variant='outline'
													type='button'
													className=' text-[#FF4444] font-normal text-xs border-none shadow-none'
													onClick={() => deleteQuestion(question.id)}
												>
													<Trash2Icon className='size-3' />
													Delete Question
												</Button>
												<Button
													type='button'
													size={'sm'}
													className='bg-gray-800 font-normal text-white rounded-sm px-6 hover:bg-gray-800'
													onClick={() => toggleQuestion(question.id)}
												>
													Save
												</Button>
											</div>
										</div>
									)}
								</div>
							))}

							<Button
								variant='default'
								onClick={addQuestion}
								className='bg-gray-900 w-full text-white hover:bg-gray-800 py-5 px-4 text-xs'
							>
								<Plus size={16} className='' /> Add Question
							</Button>
						</div>
					</Card>
				</div>

				<Separator />

				{/*  Testimonials Section */}
				<div className='flex flex-col md:flex-row py-0'>
					<div className='md:w-1/3 space-y-2 px-4'>
						<h2 className='text-lg font-semibold text-[#1a1a1a]'>
							Testimonials
						</h2>
						<p className='text-[#666] text-sm'>
							Share reviews and feedback from your previous students to build
							trust with potential learners.
						</p>
					</div>
					<Card className='md:w-2/3 shadow-none border-none'>
						<div className='space-y-3 px-4'>
							{testimonials.map((testimonial) => (
								<div key={testimonial.id} className=''>
									<div
										className={`flex items-center justify-between p-2 bg-gray-100 rounded-md cursor-pointer ${
											testimonial.isOpen
												? 'border-b rounded-b-none border-gray-300'
												: ''
										}`}
										onClick={() => toggleTestimonial(testimonial.id)}
									>
										<div className='flex items-center gap-3'>
											<Avatar>
												<AvatarImage
													src={
														typeof testimonial.avatarUrl === 'string'
															? testimonial.avatarUrl
															: testimonial.avatarUrl?.src || '/placeholder.svg'
													}
													alt={`${testimonial.firstName} ${testimonial.lastName}`}
												/>
												<AvatarFallback>
													{testimonial.firstName.charAt(0)}
													{testimonial.lastName.charAt(0)}
												</AvatarFallback>
											</Avatar>
											<span className='font-semibold text-sm'>
												{testimonial.firstName} {testimonial.lastName}
											</span>
										</div>
										<ChevronDown
											size={20}
											className={`transition-transform ${
												testimonial.isOpen ? 'rotate-180' : ''
											}`}
										/>
									</div>
									{testimonial.isOpen && (
										<div className='p-4 pt-4'>
											<div className='space-y-2'>
												<div>
													<Input
														id={`firstName-${testimonial.id}`}
														value={testimonial.firstName}
														onChange={(e) =>
															updateTestimonial(
																testimonial.id,
																'firstName',
																e.target.value
															)
														}
														placeholder='First Name'
														className='py-3 border-gray-300 text-xs'
													/>
												</div>

												<div>
													<Input
														id={`lastName-${testimonial.id}`}
														value={testimonial.lastName}
														onChange={(e) =>
															updateTestimonial(
																testimonial.id,
																'lastName',
																e.target.value
															)
														}
														placeholder='Last Name'
														className='py-5 border-gray-300 text-xs'
													/>
												</div>

												<div>
													<Input
														id={`occupation-${testimonial.id}`}
														value={testimonial.occupation}
														onChange={(e) =>
															updateTestimonial(
																testimonial.id,
																'occupation',
																e.target.value
															)
														}
														placeholder='Occupation'
														className='py-5 border-gray-300 text-xs'
													/>
												</div>

												<div className='sm:border border-gray-300 text-xs rounded-sm p-4 flex items-center gap-4 w-full bg-accent max-sm:flex-col'>
													{/* Left Section - Label & Avatar */}
													<div className='flex flex-col items-center max-sm:w-full'>
														<label className='text-[#1a1a1a] max-sm:self-start font-semibold mb-2'>
															Avatar
														</label>
														<p className='text-[#666] text-xs'>
															Recommended dimensions of 100×100
														</p>
														<div className='w-24 h-24 overflow-hidden rounded-full mt-4'>
															<Image
																src={avatar}
																alt='User Avatar'
																width={100}
																height={100}
																className='object-cover'
															/>
														</div>
													</div>

													{/* Right Section - Upload Button */}
													<div className='flex flex-col-reverse sm:flex-col gap-2 w-full'>
														<label className='flex max-sm:justify-center w-full text-[#1a1a1a] text-md'>
															<button className='border bg-white rounded-md w-full py-2 text-md '>
																Change Avatar
															</button>
															<input
																type='file'
																className='hidden w-full'
																accept='image/*'
																onChange={handleImageChange}
															/>
														</label>
													</div>
												</div>

												<div className='mb-4 bg-accent p-4  rounded-sm'>
													<label
														className='block font-semibold text-gray-700 mb-2 text-xs'
														htmlFor='thumbnail'
													>
														Thumbnail Image or Video
													</label>
													<div className='text-xs  text-gray-900 mb-5'>
														Recommended dimensions of 1280×720
													</div>
													<div className=' border-gray-300 text-xs rounded-md overflow-hidden'>
														<div className='flex w-full items-center'>
															<div className='w-[150px] hidden h-[90px] bg-gray-50-lg rounded flex items-center justify-center overflow-hidden'>
																{thumbnailPreview ? (
																	<Image
																		src={thumbnailPreview}
																		alt='Thumbnail preview'
																		width={600}
																		height={200}
																		className='w-full h-full object-cover'
																	/>
																) : (
																	<div className='w-full h-full rounded-md flex items-center justify-center bg-gray-100'>
																		<svg
																			xmlns='http://www.w3.org/2000/svg'
																			width='48'
																			height='48'
																			viewBox='0 0 24 24'
																			fill='none'
																			stroke='currentColor'
																			strokeWidth='2'
																			strokeLinecap='round'
																			strokeLinejoin='round'
																			className='lucide lucide-image-icon lucide-image text-gray-300'
																		>
																			<rect
																				width='18'
																				height='18'
																				x='3'
																				y='3'
																				rx='2'
																				ry='2'
																			/>
																			<circle cx='9' cy='9' r='2' />
																			<path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' />
																		</svg>
																	</div>
																)}
															</div>
															<div className='flex-1 w-full '>
																<button
																	type='button'
																	className='inline-flex text-center justify-center items-center bg-white px-3 py-2 w-full text-xs border border-gray-300 rounded-md text-[#1a1a1a] hover:bg-gray-50'
																	onClick={handleThumbnailUpload}
																>
																	Choose Testimonials image or video
																
																</button>
															</div>
														</div>
														<input
															type='file'
															id='thumbnailInput'
															name='thumbnail'
															ref={thumbnailInputRef}
															accept='image/*'
															className='hidden'
															onChange={(e) =>
																handleFileChange(e, setThumbnailPreview)
															}
														/>
													</div>
												</div>

												<div>

													<div className='space-y-6'>
														{/* Toolbar + Editor */}
														<div className='space-y-2'>
															<div className='border border-gray-200 rounded-md overflow-hidden'>
																<div className='flex gap-1 overflow-x-auto bg-gray-50 p-2 scrollbar-hide'>
																
																	<Button
																		type='button'
																		variant='ghost'
																		size='sm'
																		className='h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted'
																		onClick={() => execCommand('bold')}
																	>
																		<Bold className='h-5 w-5' />
																	</Button>
																	<Button
																		type='button'
																		variant='ghost'
																		size='sm'
																		className='h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted'
																		onClick={() => execCommand('italic')}
																	>
																		<Italic className='h-5 w-5' />
																	</Button>
																	<Button
																		type='button'
																		variant='ghost'
																		size='sm'
																		className='h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted'
																		onClick={() => execCommand('underline')}
																	>
																		<Underline className='h-5 w-5' />
																	</Button>
																	<Button
																		type='button'
																		variant='ghost'
																		size='sm'
																		className='h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted'
																		onClick={() =>
																			execCommand('insertOrderedList')
																		}
																	>
																		<OrderedListSvg />
																	</Button>
																	<Button
																		type='button'
																		variant='ghost'
																		size='sm'
																		className='h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted'
																		onClick={() =>
																			execCommand('insertUnorderedList')
																		}
																	>
																		<UnorderedListSvg />
																	</Button>
																</div>
																<div
																	ref={editorRef}
																	contentEditable
																	className='min-h-[120px] max-h-[240px] custom-list overflow-y-auto p-3 text-[15px] leading-relaxed outline-none'
																/>
															</div>
														</div>
													</div>
												</div>

												<div className='flex justify-between items-center'>
													<Button
														variant='outline'
														type='button'
														className=' text-[#FF4444] border-red-200 border-none shadow-none text-xs '
														onClick={() => deleteTestimonial(testimonial.id)}
													>
													
														Delete Testimonial
													</Button>
													<Button
														type='button'
														className='bg-gray-900 size-fit py-1 px-5 rounded-sm text-white hover:bg-gray-800 font-normal'
														onClick={() => toggleTestimonial(testimonial.id)}
													>
														Save
													</Button>
												</div>
											</div>
										</div>
									)}
								</div>
							))}
							<Button
								variant='default'
								onClick={addTestimonial}
								className='bg-gray-900 w-full text-white hover:bg-gray-800 py-5 px-4 text-xs'
							>
								<Plus size={16} className='' /> Add Testimonial
							</Button>
						</div>
					</Card>
				</div>

				<Separator />

				{/*CPE Section */}
				<div className='flex flex-col md:flex-row py-0'>
					<div className='md:w-1/3 space-y-2 px-4'>
						<h2 className='text-lg font-semibold text-[#1a1a1a]'>CPE</h2>
						<p className='text-[#666] text-sm'>
							Configure Continuing Professional Education credits and
							requirements for your course.
						</p>
					</div>
					<Card className='md:w-2/3 px-4 shadow-none border-none'>
						<div className='space-y-4'>
							<div>
								<Input
									id='cpe-credits'
									value={cpeCredits}
									onChange={(e) => setCpeCredits(e.target.value)}
									placeholder='CPE credits'
									className='focus-visible:ring-transparent focus-visible:border-[#00bfa5] text-sm'
								/>
							</div>
							<div>
								<Select value={subject} onValueChange={setSubject}>
									<SelectTrigger className='w-full py-3'>
										{' '}
										{/* Adjust py-3 as needed */}
										<SelectValue placeholder='Select Subject' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='accounting'>Accounting</SelectItem>
										<SelectItem value='finance'>Finance</SelectItem>
										<SelectItem value='management'>Management</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div>
								<Select value={qualification} onValueChange={setQualification}>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select Qualification' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='cpa'>CPA</SelectItem>
										<SelectItem value='cfa'>CFA</SelectItem>
										<SelectItem value='cma'>CMA</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</Card>
				</div>

				<Separator />

				{/*  Learning Paths Section*/}

				<div className='flex flex-col md:flex-row py-0'>
					<div className='md:w-1/3 space-y-2 px-4'>
						<h2 className='text-lg font-semibold text-[#1a1a1a]'>
							Learning Paths
						</h2>
						<p className='text-[#666] text-sm'>
							Create a structured learning journey by combining multiple courses
							into a comprehensive path.
						</p>
					</div>

					<Card className='md:w-2/3 px-4 border-none shadow-none'>
						<div className='space-y-4'>
							{/* Selected paths section */}
							{selectedPaths.length > 0 && (
								<div className='space-y-2'>
									{selectedPaths.map((path) => (
										<div
											key={`selected-${path.id}`}
											className='flex items-center justify-between p-3 border rounded-md bg-gray-50'
										>
											<div className='flex items-center gap-3'>
												<div>
													<ThreeDotIcon className='w-5 h-5 text-gray-500' />
												</div>
												<Image
													src={path.image}
													alt={path.title}
													width={60}
													height={60}
													className='rounded-md'
												/>
												<span className='font-semibold'>{path.title}</span>
											</div>
											<div className='flex gap-2'>
												<button
													onClick={() => togglePathSelection(path)}
													className='text-gray-400 hover:text-[#666]'
													title='Remove from selection'
												>
													<X size={16} />
												</button>
											</div>
										</div>
									))}
								</div>
							)}

							{/* Search input */}
							<div className='relative'>
								<Search
									className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
									size={16}
								/>
								<Input
									placeholder='Search Courses'
									className='pl-10 focus-visible:ring-transparent focus-visible:border-[#333]'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								
								/>
							</div>

							{/* Search results */}
							{searchQuery && (
								<div className='space-y-2'>
									<h4 className='text-sm font-semibold text-gray-500'>
										Search Results
									</h4>
									{filteredLearningPaths.length > 0 ? (
										filteredLearningPaths.map((path) => (
											<div
												key={`result-${path.id}`}
												className='flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 cursor-pointer'
												onClick={() => togglePathSelection(path)}
											>
												<div className='flex items-center gap-3'>
													<div>
														<ThreeDotIcon className='w-5 h-5 text-gray-500' />
													</div>
													<Image
														src={path.image}
														alt={path.title}
														width={60}
														height={50}
														className='rounded-md'
													/>
													<span className='font-semibold'>{path.title}</span>
												</div>
											</div>
										))
									) : (
										<p className='text-gray-500 text-center py-4'>
											No learning paths found matching your search.
										</p>
									)}
								</div>
							)}

							{/* All paths (when not searching) */}
							{!searchQuery && (
								<div className='space-y-2'>
									{learningPaths.filter((p) => !p.selected).length > 0 ? (
										learningPaths
											.filter((p) => !p.selected)
											.map((path) => (
												<div
													key={`all-${path.id}`}
													className='flex bg-[#f8f8f8] items-center justify-between border rounded-md cursor-move gap-3 p-3'
												>
													<div className='h-10 w-15 flex-none '>
														<Image
															src={path.image}
															alt={path.title}
															width={60}
															height={40}
															className='rounded-md object-fill size-full'
														/>
													</div>
													<span className='font-semibold text-xs text-[#333] w-full'>
														{path.title}
													</span>
												</div>
											))
									) : (
										<p className='text-gray-500 text-center py-4'>
											No learning paths available.
										</p>
									)}
								</div>
							)}
						</div>
					</Card>
				</div>
			</div>
		</>
	);
};

export default MobileLanding;

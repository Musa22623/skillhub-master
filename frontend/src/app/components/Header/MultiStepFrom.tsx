/** @format */

'use client';

import {useCallback, useEffect, useMemo, useState} from 'react';
import {Button} from '@/app/components/ui/button';
import {Input} from '@/app/components/ui/input';
import {Check, ChevronLeft, ChevronRight} from 'lucide-react';
import z, {ZodError} from 'zod';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/app/components/ui/select';
import {Textarea} from '@/app/components/ui/textarea';
interface MultiStepFormProps {
	onClose: (state: boolean) => void;
	onStepChange: (step: number, totalSteps?: number) => void;
}
export default function MultiStepForm({
	onClose,
	onStepChange,
}: MultiStepFormProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		phone: '',
		language: '',
		teachingExperience: [] as string[],
		courseProgress: '',
		audience: '',
		interestCategory: '',
		courseTopicDescription: '',
		videoSample: '',
		socialMedia: '',
		motivation: [] as string[],
	});
	const stepSchemas = useMemo(
		() => [
			z.object({fullName: z.string().min(1, 'Full name is required')}),
			z.object({email: z.string().email('Invalid email address')}),
			z.object({phone: z.string().min(1, 'Phone number is required')}),
			z.object({language: z.string().min(1, 'Language is required')}),
			z.object({
				teachingExperience: z
					.array(z.string())
					.min(1, 'Select at least one option'),
			}),
			z.object({audience: z.string().min(1, 'Audience is required')}),
			z.object({
				courseProgress: z.string().min(1, 'Progress status is required'),
			}),
			z.object({interestCategory: z.string().min(1, 'Category is required')}),
			z.object({
				courseTopicDescription: z
					.string()
					.min(1, 'Topic description is required'),
			}),
			z.object({
				videoSample: z.string().optional(),
			}),
			z.object({
				socialMedia: z.string().optional(),
			}),
		],
		[]
	);
	const validateCurrentStep = useCallback(() => {
		try {
			stepSchemas[currentStep].parse(formData);
			return true;
		} catch (error) {
			if (error instanceof ZodError) {
				console.error('Validation errors:', error.flatten().fieldErrors);
			}
			return false;
		}
	}, [currentStep, formData, stepSchemas]);

	const updateFormData = (
		field: keyof typeof formData,
		value: string | string[]
	) => {
		setFormData((prev) => ({...prev, [field]: value}));
	};

	const toggleCheckbox = (field: string, value: string) => {
		setFormData((prev) => {
			const currentValues = Array.isArray(prev[field as keyof typeof prev])
				? [...(prev[field as keyof typeof prev] as string[])]
				: [];

			if (currentValues.includes(value)) {
				return {...prev, [field]: currentValues.filter((v) => v !== value)};
			} else {
				return {...prev, [field]: [...currentValues, value]};
			}
		});
	};

	const steps = [
		// Step 1: Full Name
		<div key='fullName' className='space-y-6'>
			<h2 className='text-base font-semibold'>
				What is your full name?{' '}
				<span className='text-red-500 font-light'>(Required)</span>
			</h2>
			<Input
				type='text'
				placeholder='Type your answer here...'
				value={formData.fullName}
				onChange={(e) => updateFormData('fullName', e.target.value)}
				className='bg-[#002233] placeholder:text-white/50 text-white rounded-none'
				required
			/>
		</div>,

		// Step 2: Email
		<div key='email' className='space-y-6'>
			<h2 className='text-base font-semibold'>
				What is your email address?{' '}
				<span className='text-red-500 font-light'>(Required)</span>
			</h2>
			<Input
				type='email'
				placeholder='Type your answer here...'
				value={formData.email}
				onChange={(e) => updateFormData('email', e.target.value)}
				className='bg-[#002233] placeholder:text-white/50 text-white rounded-none'
				required
			/>
		</div>,

		// Step 3: Phone
		<div key='phone' className='space-y-6'>
			<h2 className='text-base font-semibold'>
				What is your phone number?{' '}
				<span className='text-red-500 font-light'>(Required)</span>
			</h2>
			<Input
				type='tel'
				placeholder='Type your answer here...'
				value={formData.phone}
				onChange={(e) => updateFormData('phone', e.target.value)}
				className='bg-[#002233] placeholder:text-white/50 text-white rounded-none'
				required
			/>
		</div>,

		// Step 4: Language
		<div key='language' className='space-y-6'>
			<h2 className='text-base font-semibold'>
				What language do you intend to teach in?{' '}
				<span className='text-red-500 font-light'>(Required)</span>
			</h2>
			<div className='space-y-2'>
				{['English', 'Spanish', 'French'].map((lang) => (
					<div
						key={lang}
						className={`flex items-center justify-between p-2 cursor-pointer ${
							formData.language === lang ? 'bg-teal-500' : 'bg-teal-500/20'
						}`}
						onClick={() => setFormData((prev) => ({...prev, language: lang}))}
					>
						<span className='font-light'>{lang}</span>
						<div className='h-5 w-5 border border-gray-600 flex items-center justify-center'>
							{formData.language === lang && <Check className='h-4 w-4' />}
						</div>
					</div>
				))}
			</div>
		</div>,

		// Step 5: Teaching Experience
		<div key='teachingExperience' className='space-y-6'>
			<h2 className='text-base font-semibold'>
				What kind of teaching experience do you have?{' '}
				<span className='text-red-500 font-light'>(Required)</span>
			</h2>
			<div className='space-y-2'>
				{[
					'In person, informally',
					'In person, professionally',
					'Online courses',
					'Zoom',
					"I'm just starting teaching",
				].map((exp) => (
					<div
						key={exp}
						className={`flex items-center justify-between p-2 cursor-pointer ${
							formData.teachingExperience.includes(exp)
								? 'bg-teal-500'
								: 'bg-teal-500/20'
						}`}
						onClick={() => toggleCheckbox('teachingExperience', exp)}
					>
						<span className='font-light'>{exp}</span>
						<div className='h-5 w-5 border border-gray-600 flex items-center justify-center'>
							{formData.teachingExperience.includes(exp) && (
								<Check className='h-4 w-4' />
							)}
						</div>
					</div>
				))}
			</div>
		</div>,

		// Step 6: Audience
		<div key='audience' className='space-y-6'>
			<h2 className='text-base font-semibold'>
				Do you have an audience to share your course with?{' '}
				<span className='text-red-500 font-light'>(Required)</span>
			</h2>
			<div className='space-y-2'>
				{[
					'Not at the moment',
					'I have a small following',
					'I have a sizeable following',
				].map((audience) => (
					<div
						key={audience}
						className={`flex items-center justify-between p-2 cursor-pointer ${
							formData.audience === audience ? 'bg-teal-500' : 'bg-teal-500/20'
						}`}
						onClick={() => updateFormData('audience', audience)}
					>
						<span className='font-light'>{audience}</span>
						<div className='h-5 w-5 border border-gray-600 flex items-center justify-center'>
							{formData.audience === audience && <Check className='h-4 w-4' />}
						</div>
					</div>
				))}
			</div>
		</div>,

		// Step 7: Course Progress
		<div key='courseProgress' className='space-y-6'>
			<h2 className='text-base font-semibold'>
				Where are your holding in creating your course?
				<span className='text-red-500 font-light'>(Required)</span>
			</h2>
			<div className='space-y-2'>
				{[
					'I have an idea, need to work on developing it',
					'I recorded the video but need to make it more professional',
					"I have finished my course and I'm ready to launch",
				].map((progress) => (
					<div
						key={progress}
						className={`flex items-center justify-between p-2 cursor-pointer ${
							formData.courseProgress === progress
								? 'bg-teal-500'
								: 'bg-teal-500/20'
						}`}
						onClick={() => updateFormData('courseProgress', progress)}
					>
						<span className='font-light'>{progress}</span>
						<div className='h-5 w-5 border border-gray-600 flex items-center justify-center'>
							{formData.courseProgress === progress && (
								<Check className='h-4 w-4' />
							)}
						</div>
					</div>
				))}
			</div>
		</div>,

		// Step 8: Social Media
		<div key='interestCategory' className='space-y-6'>
			<h2 className='text-base font-semibold'>
				What category are you interested in teaching?
				<span className='text-red-500 font-light'>(Required)</span>
			</h2>
			<p className='text-gray-400'>
				Select the category that best applies to the first course you would like
				to teach, You are welcome to teach course in other catogies in the
				future.
			</p>

			<Select
				onValueChange={(value) => updateFormData('interestCategory', value)}
			>
				<SelectTrigger className='w-full rounded-none'>
					<SelectValue
						placeholder='Type or select an option'
						className='placeholder:text-white/70'
						defaultValue={formData.interestCategory}
					/>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value='entertainment'>Entertainment</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>,

		// Step 9: Course Topic
		<div key='courseTopicDescription' className='space-y-6'>
			<h2 className='text-base font-semibold'>
				In 3-5 sentences, tell us about your course topic.
				<span className='text-red-500 font-light'>(Required)</span>
			</h2>
			<p className='text-gray-400'>
				What will your course cover? What will students take away from your
				course? why is it valuable?
			</p>

			<Textarea
				placeholder='Type your message here.'
				value={formData.courseTopicDescription}
				className='rounded-none max-h-50'
				onChange={(e) =>
					updateFormData('courseTopicDescription', e.target.value)
				}
			/>
		</div>,

		// step 10: Video sample
		<div key='videoSample' className='space-y-6'>
			<h2 className='text-base font-semibold'>Please share a video sample.</h2>
			<p className='opacity-70'>
				Please share a link to 1-2 minute sample teaching video. In this video,
				we recommand you touch on: (1) who you are, (2) the topic you're
				planning to teach.
			</p>
			<Input
				type='text'
				placeholder='https://'
				value={formData.videoSample}
				onChange={(e) => updateFormData('videoSample', e.target.value)}
				className='bg-[#002233] placeholder:text-white/50 text-white rounded-none'
			/>
		</div>,

		// step 11: Social Media
		<div key='socialMedia' className='space-y-6'>
			<h2 className='text-base font-semibold'>
				Please share a link to your most active social media account.
			</h2>
			<p className='opacity-70'>
				e.g. Instagram, Twitter, Facebook, LinkedIn etc
			</p>
			<Input
				type='text'
				placeholder='https://'
				value={formData.socialMedia}
				onChange={(e) => updateFormData('socialMedia', e.target.value)}
				className='bg-[#002233] placeholder:text-white/50 text-white rounded-none'
			/>
		</div>,

		// Step 9: Motivation
		<div key='motivation' className='space-y-6'>
			<h2 className='text-base font-semibold'>
				What excites you most about teaching on SkillHub?
			</h2>
			<p className='text-sm text-gray-400 mb-4'>
				By submitting this for, you acknowledge that you have read, understand,
				and agree to our
				<a href='#' className='text-teal-500 ml-1'>
					Terms of Service
				</a>{' '}
				and
				<a href='#' className='text-teal-500 ml-1'>
					Privacy Policy
				</a>
			</p>
			<div className='space-y-2'>
				{[
					'Earn recurring income',
					'Grow my network',
					"Make an impact on student's lives",
				].map((motivation) => (
					<div
						key={motivation}
						className={`flex items-center justify-between p-2 cursor-pointer ${
							formData.motivation.includes(motivation)
								? 'bg-teal-500'
								: 'bg-teal-500/20'
						}`}
						onClick={() => toggleCheckbox('motivation', motivation)}
					>
						<span className='font-light'>{motivation}</span>
						<div className='h-5 w-5 border border-gray-600 flex items-center justify-center'>
							{formData.motivation.includes(motivation) && (
								<Check className='h-4 w-4' />
							)}
						</div>
					</div>
				))}
			</div>
		</div>,
	];

	const totalSteps = steps.length;

	useEffect(() => {
		onStepChange(currentStep, totalSteps);
	}, [currentStep, totalSteps, onStepChange]);

	const nextStep = useCallback(() => {
		if (currentStep < steps.length - 1) {
			if (validateCurrentStep()) {
				setCurrentStep(currentStep + 1);
			} else {
				alert('Please complete the required field(s) before continuing.');
			}
		}
	}, [currentStep, steps.length, validateCurrentStep]);

	const handleSubmit = useCallback(() => {
		console.log('Form submitted:', formData);
		// Here you would typically send the data to your backend
		alert('Application submitted successfully!');
		onClose(false);
	}, [formData, onClose]);
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Only trigger on Enter
			if (event.key === 'Enter') {
				event.preventDefault(); // Prevent default Enter behavior (e.g. form submission)
				if (currentStep >= steps.length - 1) {
					handleSubmit();
				} else {
					if (validateCurrentStep()) {
						const nextStep = currentStep + 1;
						if (nextStep < steps.length) {
							setCurrentStep(nextStep);
							onStepChange(nextStep, steps.length);
						}
					}
				}
				// Validate and move to next step if valid
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [
		currentStep,
		validateCurrentStep,
		steps.length,
		onStepChange,
		handleSubmit,
	]);

	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	return (
		<div className='w-full h-full relative'>
			<div className=''>{steps[currentStep]}</div>
			<div className='mt-8 flex justify-end gap-2'>
				{currentStep > 0 && (
					<Button
						onClick={prevStep}
						variant='default'
						className='bg-[var(--cyan-color)] hover:bg-[var(--cyan-color)]/50 text-white flex gap-0 rounded-none !px-6'
					>
						<ChevronLeft className='stroke-4' />
						<span>Back</span>
					</Button>
				)}

				{currentStep < steps.length - 1 ? (
					<Button
						variant={'default'}
						onClick={nextStep}
						className='bg-[var(--cyan-color)] hover:bg-[var(--cyan-color)]/50 text-white flex gap-0 rounded-none !px-6'
					>
						<span>Next</span>
						<ChevronRight className='stroke-4' />
					</Button>
				) : (
					<Button
						onClick={handleSubmit}
						className='bg-[var(--cyan-color)] hover:bg-[var(--cyan-color)]/50 text-white flex gap-0 rounded-none !px-6'
					>
						<span>Submit</span>
						<ChevronRight className='stroke-4' />
					</Button>
				)}
			</div>
		</div>
	);
}

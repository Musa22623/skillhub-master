/** @format */

'use client';

import {useEffect, useState} from 'react';
import {Button} from '@/app/components/ui/button';
import MultiStepForm from './MultiStepFrom';
import {X} from 'lucide-react';
import Image, {StaticImageData} from 'next/image';
import Logo from '@/assets/logo.svg';
import Group1 from '@/assets/applyToTechImgs/group1.png';
import Group2 from '@/assets/applyToTechImgs/group2.png';
import Group3 from '@/assets/applyToTechImgs/group3.png';
import Group4 from '@/assets/applyToTechImgs/group4.png';
import Group5 from '@/assets/applyToTechImgs/group5.png';
import Group6 from '@/assets/applyToTechImgs/group6.png';
import {Progress} from '../ui/progress';

interface ApplyToTechPopupProp {
	isOpen: boolean;
	onClose: (state: boolean) => void;
}
export default function ApplyToTechPopup({isOpen ,onClose}: ApplyToTechPopupProp) {
	const [showWelcome, setShowWelcome] = useState(true);
	const [currentStep, setCurrentStep] = useState(1);
	const [totalSteps, setTotalSteps] = useState(0); // Default value that can be updated dynamically

	const progressValue = (currentStep / totalSteps) * 100;

	const handleGetStarted = () => {
		setShowWelcome(false);
	};

	const handleClose = (value: boolean) => {
		onClose(value);
	};

	const updateProgress = (step: number, steps?: number) => {
		setCurrentStep(step);
		// Update total steps if provided
		if (steps) {
			setTotalSteps(steps - 1);
		}
	};

	useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
	return (
		<div className='flex justify-center  overflow-hidden select-none'>
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
				<div className='bg-[#002233] text-white  w-full max-w-5xl h-[84vh] max-h-[700px] overflow-hidden rounded shadow-xl'>
					{showWelcome ? (
						<div className='h-full'>
							<div className='flex h-full'>
								{/* Left side - categories */}
								<div className='w-1/2 p-10 bg-[#001a29]'>
									<div className='mb-8 ml-6'>
										<Image
											src={Logo}
											alt='SkillHub Logo'
											className=''
											width={200}
											height={200}
										/>
									</div>

									<div className='grid grid-cols-3 gap-8 max-w-md '>
										<CategoryItem title='Real State' image={Group1} />
										<CategoryItem title='Entrepreneurship' image={Group2} />
										<CategoryItem title='Photography' image={Group3} />
										<CategoryItem title='Baking' image={Group4} />
										<CategoryItem title='Music' image={Group5} />
										<CategoryItem title='Art & Design' image={Group6} />
									</div>

									<div className='mt-auto pt-10'>
										<h2 className='text-3xl font-semibold max-w-sm'>
											Turn your expertise into revenue
										</h2>
									</div>
								</div>

								{/* Right side - welcome */}
								<div className='w-1/2 p-8 relative'>
									<button
										onClick={() => handleClose(false)}
										className=' text-white z-10 self-end'
									>
										<X className='absolute right-5 top-5' />
									</button>
									<div className='h-full flex flex-col justify-center max-w-lg px-4 text-white/70'>
										<h1 className='text-3xl font-bold mb-4'>
											Apply to teach on SkillHub
										</h1>

										<p className='mb-4'>
											This application will ask you to answer questions about
											yourself and tell us about the first course you're
											interested in teaching.
										</p>

										<p className='mb-4'>
											Please note that you will be required to submit a short
											video sample related to your course topic.
										</p>

										<p className='mb-4'>
											If you are approved to teach, you will be invited to join
											SkillHub Premium, a free marketing service to help you
											grow your online course (T&C apply).
										</p>

										<p className='mb-4'>
											If you have any questions along the way, please reach out
											to our Teacher Support team at{' '}
											<span className='underline'>instructor@example.com</span>.
											We look forward to receiving your application!
										</p>

										<div className='self-center mt-8'>
											<Button
												onClick={handleGetStarted}
												className='bg-[var(--cyan-color)]  hover:bg-[var(--cyan-color)]/50 text-gray-900 rounded-[2px]'
											>
												Get Started
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className='p-8 h-full relative'>
							<Progress
								value={progressValue}
								indicatorColor={'bg-yellow-500'}
								className='absolute left-0 top-0 rounded-none h-[3px] bg-accent'
							/>
							<div className='w-56 h-2.5'>
								<Image src={Logo} alt={'Logo'} width={224} height={10} />
							</div>
							<div className='absolute top-6 right-6'>
								<button
									onClick={() => onClose(false)}
									className=' text-white z-10 self-end'
								>
									<X className='absolute right-5 top-5' />
								</button>
							</div>
							<div className='max-w-3xl m-auto flex h-full items-center w-full'>
								<div className='w-full '>
									<MultiStepForm
										onClose={handleClose}
										onStepChange={updateProgress}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function CategoryItem({title, image}: {title: string; image: StaticImageData}) {
	return (
		<div className='flex flex-col items-center'>
			<div className='w-32 h-32 rounded-full bg-primary mb-2 flex items-center justify-center'>
				<Image src={image} alt={title} width={128} height={128} />
			</div>
			<span className='text-[var(--cyan-color)] text-sm font-semibold'>
				{title}
			</span>
		</div>
	);
}

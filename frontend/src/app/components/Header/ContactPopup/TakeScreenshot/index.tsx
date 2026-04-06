/** @format */

'use client';

import Image from 'next/image';
import type React from 'react';

import {useState, useRef} from 'react';

interface ScreenshotSectionProps {
	includeScreenshot: boolean;
	setIncludeScreenshot: (value: boolean) => void;
	screenshot: string | null;
	setScreenshot: (value: string | null) => void;
	togglePopup: () => void;
}

export default function ScreenshotSection({
	includeScreenshot,
	setIncludeScreenshot,
	screenshot,
	setScreenshot,
	togglePopup,
}: ScreenshotSectionProps) {
	const [captureError, setCaptureError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Function to temporarily hide the contact form without blurry effect
	const hideContactForm = () => {
		const contactForm = document.querySelector('.contact-form'); // Add appropriate selector for your contact form

		if (contactForm) {
			// Store original styles
			const originalStyles = {
				display: (contactForm as HTMLElement).style.display,
				visibility: (contactForm as HTMLElement).style.visibility,
				opacity: (contactForm as HTMLElement).style.opacity,
				position: (contactForm as HTMLElement).style.position,
			};

			// Hide without causing layout shifts (better than display:none)
			(contactForm as HTMLElement).style.visibility = 'hidden';
			(contactForm as HTMLElement).style.opacity = '0';

			// If we need to completely remove from DOM flow to avoid placeholder space
			(contactForm as HTMLElement).style.position = 'absolute';
			// (contactForm as HTMLElement).style.zIndex = '-9999';

			return () => {
				// Restore all original styles
				(contactForm as HTMLElement).style.display = originalStyles.display;
				(contactForm as HTMLElement).style.visibility =
					originalStyles.visibility;
				(contactForm as HTMLElement).style.opacity = originalStyles.opacity;
				(contactForm as HTMLElement).style.position = originalStyles.position;
				// (contactForm as HTMLElement).style.zIndex = 'auto';
			};
		}
		// Return a no-op function if no form was found
		return () => {};
	};

	const captureScreen = async () => {
		// Store current state
		const prevBodyOverflow = document.body.style.overflow;

		// Hide popup temporarily
		document.body.style.overflow = '';
		togglePopup();

		// Hide the contact form and get restore function
		const restoreContactForm = hideContactForm();

		// Give the DOM time to update before capture
		await new Promise((resolve) => setTimeout(resolve, 100));

		try {
			// Try to capture the visible portion of the screen only
			const stream = await navigator.mediaDevices.getDisplayMedia({
				// @ts-expect-error: 'preferCurrentTab' is not a valid property, but we want to use it
				preferCurrentTab: true, // Chrome 105+ feature
				video: {
					frameRate: 30, // Higher framerate for better quality
					// cursor: "never", // No cursor in screenshot
					// Use actual screen dimensions for better quality
					height: {ideal: window.screen.height},
					width: {ideal: window.screen.width},
				},
			});

			const video = document.createElement('video');
			video.srcObject = stream;

			// Wait for video data to load
			return new Promise<boolean>((resolve) => {
				video.onloadedmetadata = async () => {
					video.play();

					// Let the video play a bit to ensure full quality
					await new Promise((r) => setTimeout(r, 200));

					const canvas = document.createElement('canvas');
					// Use video dimensions for better quality
					canvas.width = video.videoWidth;
					canvas.height = video.videoHeight;

					const ctx = canvas.getContext('2d', {
						alpha: false,
						desynchronized: false,
					});
					if (ctx) {
						// Draw with better quality settings
						ctx.imageSmoothingEnabled = true;
						ctx.imageSmoothingQuality = 'high';
						ctx.drawImage(video, 0, 0);

						const screenshotData = canvas.toDataURL('image/png', 1.0);
						setScreenshot(screenshotData);
					}

					// Clean up resources
					stream.getTracks().forEach((track) => track.stop());

					// Restore contact form after slight delay to ensure screenshot is complete
					setTimeout(() => {
						restoreContactForm();

						// Restore popup
						document.body.style.overflow = prevBodyOverflow;
						togglePopup();
					}, 100);

					setCaptureError(null);
					resolve(true);
				};

				// Handle video errors
				video.onerror = () => {
					stream.getTracks().forEach((track) => track.stop());
					restoreContactForm();
					document.body.style.overflow = prevBodyOverflow;
					togglePopup();
					setCaptureError(
						'Video capture failed. Please upload a screenshot manually.'
					);
					resolve(false);
				};
			});
		} catch (err) {
			console.error('Screenshot error:', err);

			// Restore contact form visibility
			restoreContactForm();

			// Restore popup
			document.body.style.overflow = prevBodyOverflow;
			togglePopup();

			setCaptureError(
				'Screen capture failed. Please upload a screenshot manually.'
			);
			return false;
		}
	};

	const handleScreenshotChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (e.target.checked) {
			await captureScreen();
			setIncludeScreenshot(true);
		} else {
			setIncludeScreenshot(false);
			setScreenshot(null);
			setCaptureError(null);
		}
	};

	const handleDeleteScreenshot = () => {
		setIncludeScreenshot(false);
		setScreenshot(null);
		setCaptureError(null);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setScreenshot(event.target?.result as string);
				setCaptureError(null);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRetryCapture = async () => {
		await captureScreen();
	};

	return (
		<div className='mb-4 overflow-hidden rounded-sm border border-[#E0E0E0]  transition-all'>
			<div className='bg-white p-2.5 hover:bg-gray-50'>
				<label className='flex cursor-pointer  items-center gap-2 text-sm '>
					<input
						type='checkbox'
						checked={includeScreenshot}
						onChange={handleScreenshotChange}
						className='size-3 cursor-pointer'
					/>
					Include screenshot
				</label>
			</div>

			{includeScreenshot && (
				<div className='border-t border-[#E0E0E0] p-4'>
					{captureError && !screenshot && (
						<div className='mb-4'>
							<div className='mb-2 text-sm text-red-500'>{captureError}</div>
							<div className='flex flex-wrap gap-2'>
								<button
									type='button'
									onClick={handleRetryCapture}
									className='rounded bg-[#02C5AF] px-3 py-1 text-xs text-white hover:bg-[#00B3A0]'
								>
									Retry Capture
								</button>
								<label
									htmlFor='screenshotInput'
									className='cursor-pointer rounded bg-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-300'
								>
									Upload Image
									<input
										ref={fileInputRef}
										id='screenshotInput'
										type='file'
										accept='image/*'
										className='hidden'
										onChange={handleFileChange}
									/>
								</label>
							</div>
						</div>
					)}

					{!screenshot && !captureError && (
						<div className='flex items-center justify-center p-4'>
							<div className='h-8 w-8 animate-spin rounded-full border-4 border-[#02C5AF] border-t-transparent'></div>
							<span className='ml-2 text-sm text-gray-500'>
								Preparing screenshot...
							</span>
						</div>
					)}

					{screenshot && (
						<div className='mt-3'>
							<div className='relative overflow-hidden rounded-md border border-[#E5E5E5]'>
								<Image
									src={screenshot || '/placeholder.svg'}
									alt='Screenshot'
									className='block h-auto w-full'
									width={500}
									height={500}
								/>
								<button
									type='button'
									onClick={handleDeleteScreenshot}
									className='absolute right-2 top-2 rounded bg-black/50 px-3 py-1.5 text-xs text-white transition-colors hover:bg-black/70'
								>
									Delete
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

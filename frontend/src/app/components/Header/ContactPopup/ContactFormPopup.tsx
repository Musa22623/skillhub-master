/** @format */
'use client';
// ContactFormPopup.jsx
import {Dispatch, SetStateAction, useState} from 'react';
import {Headset, X} from 'lucide-react';
import {Button} from '../../ui/button';
import {useIsMobile} from '@/hooks/use-mobile';
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '../../ui/drawer';
import Link from 'next/link';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../../ui/dialog';
import FileUploadSection from './FileUpload';
import ScreenshotSection from './TakeScreenshot';
import DebugInfo from './DebugInfo';

interface ContactFormPopupProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ContactFormPopup({
	isOpen,
	setIsOpen,
}: ContactFormPopupProps) {
	const [message, setMessage] = useState('');
	const [includeDebug, setIncludeDebug] = useState(false);
	const [includeScreenshot, setIncludeScreenshot] = useState(false);
	const [includeFile, setIncludeFile] = useState(false);
	const [includeLocation, setIncludeLocation] = useState(false);
	const [screenshot, setScreenshot] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [location, setLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);
	const isMobile = useIsMobile();

	// Function to close the contact form
	const closeForm = () => {
		setIsOpen(false);
		resetForm();
	};

	// Function to reset the form
	const resetForm = () => {
		setMessage('');
		setIncludeDebug(false);
		setIncludeScreenshot(false);
		setIncludeFile(false);
		setIncludeLocation(false);
		setScreenshot(null);
		setFile(null);
		setLocation(null);
	};

	// Function to toggle location
	const toggleLocation = () => {
		const newValue = !includeLocation;
		setIncludeLocation(newValue);
		if (newValue && !location) {
			getLocation();
		}
	};

	// Function to get user's location
	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
				},
				(error) => {
					console.error('Error getting location:', error);
				}
			);
		}
	};

	// Function to submit the form
	const handleSubmit = () => {
		// Gather all form data
		const formData = {
			message,
			screenshot: includeScreenshot ? screenshot : null,
			file: includeFile ? file : null,
			location: includeLocation ? location : null,
		};

		// In a real implementation, you would send this data to your server
		console.log('Form submitted:', formData);

		// Close the form after submission
		closeForm();
	};

	// If the form is not open, return the trigger button
	if (!isOpen) {
		return null;
	}

	if (isMobile) {
		return (
			<Drawer open={isOpen} onOpenChange={setIsOpen}>
				<DrawerContent className='contact-form'>
					<DrawerHeader className='flex-row items-center justify-between border-b py-0 pb-2'>
						<DrawerTitle className='text-xl font-semibold text-gray-800'>
							Contact us
						</DrawerTitle>
						<Button
							variant={'secondary'}
							className={'rounded-full'}
							onClick={closeForm}
						>
							<X />
						</Button>
					</DrawerHeader>

					<section className='overflow-y-auto no-scrollbar px-4 py-2'>
						<div className='flex items-start bg-blue-50 p-3 rounded mb-5'>
							<div className='mr-2.5'>
								<Headset />
							</div>
							<p className='text-sm text-gray-700 leading-relaxed m-0'>
								Please write your message in English and allow us up to 3
								business days for a response.
							</p>
						</div>

						{/* Message input */}
						<div className='mb-5'>
							<label className='block mb-1.5 text-sm text-gray-800'>
								Your message:
							</label>
							<textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								className='w-full p-2.5 border border-gray-300 rounded resize-y font-inherit'
								rows={4}
							/>
						</div>

						{/* Debug information checkbox */}
						<DebugInfo
							includeDebug={includeDebug}
							setIncludeDebug={setIncludeDebug}
						/>

						{/* Screenshot checkbox */}
						<div>
							<ScreenshotSection
								includeScreenshot={includeScreenshot}
								setIncludeScreenshot={setIncludeScreenshot}
								screenshot={screenshot}
								setScreenshot={setScreenshot}
								togglePopup={() => true}
							/>
						</div>

						<div>
							<FileUploadSection
								file={file}
								includeFile={includeFile}
								setIncludeFile={setIncludeFile}
								setFile={setFile}
							/>
						</div>

						{/* Location checkbox */}
						<div className='border rounded'>
							<label
								className={`flex items-center cursor-pointer p-2.5 transition-colors duration-200 hover:bg-gray-50 text-sm ${
									includeLocation && 'border-b'
								}`}
							>
								<input
									type='checkbox'
									checked={includeLocation}
									onChange={toggleLocation}
									className='mr-2.5'
								/>
								Include my location
							</label>

							{includeLocation && location && (
								<div className='mx-4 my-2.5'>
									<div className='rounded overflow-hidden'>
										<iframe
											width='100%'
											height='150'
											frameBorder='0'
											src={`https://www.openstreetmap.org/export/embed.html?bbox=${
												location.longitude - 0.01
											},${location.latitude - 0.01},${
												location.longitude + 0.01
											},${location.latitude + 0.01}&layer=mapnik&marker=${
												location.latitude
											},${location.longitude}`}
											allowFullScreen
										></iframe>
										<p className='mt-2.5 mb-0 text-xs text-gray-500 text-center'>
											Your location: {location.latitude.toFixed(6)},{' '}
											{location.longitude.toFixed(6)}
										</p>
									</div>
								</div>
							)}
						</div>
					</section>

					<DrawerFooter className='px-0 border-t'>
						<div className='flex justify-between items-center  border-gray-200 px-4'>
							<Link href='#' className='text-teal-500 no-underline text-sm'>
								Check service status
							</Link>
							<div className='flex gap-2.5'>
								<Button
									className='bg-teal-500'
									onClick={handleSubmit}
									disabled={!message}
									variant='default'
								>
									Send
								</Button>
								<Button variant='outline' onClick={closeForm}>
									Close
								</Button>
							</div>
						</div>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	} else {
		return (
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className='p-0 max-h-[95vh] overflow-hidden contact-form'>
					<DialogHeader className=' border-b border-gray-200 p-4'>
						<DialogTitle className='text-xl font-semibold text-gray-800'>
							Contact us
						</DialogTitle>
					</DialogHeader>

					{/* Information notice */}
					<section className='px-4 overflow-y-auto max-h-[85vh]'>
						<div className='flex items-start gap-4 bg-blue-50 p-3 rounded mb-5'>
							<Headset className='size-4 mt-1' />

							<p className='text-sm text-gray-700 leading-relaxed m-0'>
								Please write your message in English and allow us up to 3
								business days for a response.
							</p>
						</div>

						{/* Message input */}
						<div className='mb-5'>
							<label className='block mb-1.5 text-sm text-gray-800'>
								Your message:
							</label>
							<textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								className='w-full p-2.5 border border-gray-300 rounded resize-y font-inherit'
								rows={4}
							/>
						</div>

						<DebugInfo
							includeDebug={includeDebug}
							setIncludeDebug={setIncludeDebug}
						/>

						<div>
							<ScreenshotSection
								includeScreenshot={includeScreenshot}
								setIncludeScreenshot={setIncludeScreenshot}
								screenshot={screenshot}
								setScreenshot={setScreenshot}
								togglePopup={() => true}
							/>
						</div>

						<div>
							<FileUploadSection
								file={file}
								includeFile={includeFile}
								setIncludeFile={setIncludeFile}
								setFile={setFile}
							/>
						</div>

						{/* Location checkbox */}
						<div className='mb-20 border rounded-sm'>
							<label
								className={`flex items-center cursor-pointer p-2.5 transition-colors duration-200 hover:bg-gray-50 text-sm ${
									includeLocation && 'border-b'
								}`}
							>
								<input
									type='checkbox'
									checked={includeLocation}
									onChange={toggleLocation}
									className='mr-2.5'
								/>
								Include my location
							</label>

							{includeLocation && location && (
								<div className='mx-4 my-2.5'>
									<div className='rounded overflow-hidden'>
										<iframe
											width='100%'
											height='150'
											frameBorder='0'
											src={`https://www.openstreetmap.org/export/embed.html?bbox=${
												location.longitude - 0.01
											},${location.latitude - 0.01},${
												location.longitude + 0.01
											},${location.latitude + 0.01}&layer=mapnik&marker=${
												location.latitude
											},${location.longitude}`}
											allowFullScreen
										></iframe>
										<p className='mt-2.5 mb-0 text-xs text-gray-500 text-start'>
											Your location: {location.latitude.toFixed(6)},{' '}
											{location.longitude.toFixed(6)}
										</p>
									</div>
								</div>
							)}
						</div>
					</section>

					{/* Form actions */}
					<DialogFooter className=' w-full block border-t fixed bottom-0 left-0'>
						<div className='flex p-4 justify-between items-center bg-accent'>
							<Link href='#' className='text-teal-500  no-underline text-sm'>
								Check service status
							</Link>
							<div className='flex gap-2.5'>
								<Button
									className='bg-teal-500'
									onClick={handleSubmit}
									disabled={!message}
									variant='default'
								>
									Send
								</Button>
								<Button variant='outline' onClick={closeForm}>
									Close
								</Button>
							</div>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}
}

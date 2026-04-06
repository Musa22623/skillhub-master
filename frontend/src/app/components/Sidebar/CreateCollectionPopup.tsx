/** @format */

'use client';

import type React from 'react';

import {useState, useRef, useEffect} from 'react';
import {X, Plus, Check, Unlock, Lock} from 'lucide-react';
import EmojiPicker, {EmojiClickData} from 'emoji-picker-react';
import {useIsMobile} from '@/hooks/use-mobile';
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '../ui/drawer';

interface CreateCollectionFormProps {
	onClose: () => void;
}
export default function CreateCollection({onClose}: CreateCollectionFormProps) {
	const [isOpen, setIsOpen] = useState(true);
	const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
	const [privacyOption, setPrivacyOption] = useState<
		'private' | 'public' | 'shareable'
	>('shareable');
	const isMobile = useIsMobile();
	const [isPrivacyDropdownOpen, setIsPrivacyDropdownOpen] = useState(false);
	const emojiPickerRef = useRef<HTMLDivElement>(null);
	const emojiButtonRef = useRef<HTMLDivElement>(null);
	const privacyDropdownRef = useRef<HTMLDivElement>(null);
	const privacyButtonRef = useRef<HTMLDivElement>(null);

	const handleEmojiClick = (emoji: EmojiClickData) => {
		setSelectedEmoji(emoji.emoji);
		setIsEmojiPickerOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				emojiPickerRef.current &&
				emojiButtonRef.current &&
				!emojiPickerRef.current.contains(event.target as Node) &&
				!emojiButtonRef.current.contains(event.target as Node)
			) {
				setIsEmojiPickerOpen(false);
			}

			if (
				privacyDropdownRef.current &&
				privacyButtonRef.current &&
				!privacyDropdownRef.current.contains(event.target as Node) &&
				!privacyButtonRef.current.contains(event.target as Node)
			) {
				setIsPrivacyDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
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
	const handleRemoveEmoji = () => {
		setSelectedEmoji(null);
	};

	const getPrivacyIcon = () => {
		switch (privacyOption) {
			case 'private':
				return <Lock className='size-4' />;
			case 'public':
				return <Unlock className='size-4' />;
			case 'shareable':
				return (
					<svg
						viewBox='0 0 24 24'
						className={`size-4 mt-2`}
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							d='M10 3h-5.1c0 0-4.9 0-4.9 5 0 3.9 3 8 3 8s-1.7-7 1.8-7h5.2v3l6-6-6-6v3z'
						/>
					</svg>
				);
		}
	};

	const getPrivacyText = () => {
		switch (privacyOption) {
			case 'private':
				return 'Private';
			case 'public':
				return 'Public';
			case 'shareable':
				return 'Shareable';
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const formValues = Object.fromEntries(formData.entries());

		console.log('Form submitted', {
			...formValues,
			emoji: selectedEmoji,
			privacy: privacyOption,
		});
		// Here you would typically send the data to your API
	};
	const handleClose = () => {
		setIsOpen(false);
		onClose();
	};

	if (!isOpen) return null;

	if (isMobile) {
		return (
			<Drawer open={isOpen} onOpenChange={onClose}>
				<DrawerContent className='min-h-screen'>
					<DrawerHeader className='flex-row justify-between border-b items-center'>
						<DrawerTitle>Create Collection</DrawerTitle>
						<button
							className=' text-gray-400 hover:text-gray-600'
							onClick={handleClose}
						>
							<X className='w-5 h-5' />
						</button>
					</DrawerHeader>
					<form onSubmit={handleSubmit} className='py-6'>
						<div className='px-5 pb-5 space-y-6'>
							<div className=''>
								<div className='flex items-start gap-4'>
									{/* Title Section */}
									<div className='flex-1'>
										<div className='mb-3'>
											<label
												className='block text-sm font-semibold mb-2 text-gray-700'
												htmlFor='title'
											>
												Title
											</label>
											<input
												id='title'
												type='text'
												className='w-full text-sm mt-1 px-3 py-2 border border-gray-300 bg-accent rounded-full focus:outline-none focus:ring-1  focus:ring-teal-500'
												placeholder='Collection Name..'
											/>
										</div>
									</div>

									{/* Emoji Picker Section */}
									<div>
										<label className='block text-sm font-semibold text-gray-700 mb-3'>
											Emoji
										</label>
										<div className='relative'>
											{selectedEmoji ? (
												<div className='w-[38px] h-[38px] bg-gray-50 rounded-full  flex items-center justify-center relative'>
													<span className='text-[38px] caret-transparent'>
														{selectedEmoji}
													</span>
													<button
														type='button'
														onClick={handleRemoveEmoji}
														className='absolute -top-1.5 -right-1.5 bg-white border border-gray-400 rounded-full p-0.5 shadow hover:bg-gray-100'
													>
														<X className='size-2.5 text-gray-900' />
													</button>
												</div>
											) : (
												<button
													type='button'
													onClick={() => setIsEmojiPickerOpen(true)}
													className='w-[38px] h-[38px] bg-gray-50 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100'
												>
													<Plus className='size-5 text-gray-500' />
												</button>
											)}

											{isEmojiPickerOpen && (
												<div className='absolute z-10 top-full right-0 mt-1'>
													<EmojiPicker
														open={isEmojiPickerOpen}
														onEmojiClick={handleEmojiClick}
														height={400}
													/>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>

							<div className=''>
								<label
									className='block text-sm font-semibold text-gray-700 mb-3'
									htmlFor='description'
								>
									Description{' '}
									<span className='text-gray-500 font-normal'>(optional)</span>
								</label>
								<textarea
									id='description'
									name='description'
									placeholder='A space for discussing latest tech insights...'
									className='w-full px-4 py-2 border border-gray-300 rounded-sm text-gray-700 bg-accent focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none'
									rows={2}
								/>
							</div>

							<div className=''>
								<label className='block text-sm font-semibold text-gray-700 mb-3'>
									Privacy
								</label>
								<div className='relative flex flex-col justify-end items-end'>
									<div
										ref={privacyButtonRef}
										className='flex items-center justify-between w-full px-4 py-1.5 border border-gray-300 rounded bg-white cursor-pointer hover:bg-gray-50'
										onClick={() =>
											setIsPrivacyDropdownOpen(!isPrivacyDropdownOpen)
										}
									>
										<div className='flex items-center gap-2'>
											{getPrivacyIcon()}
											<span>{getPrivacyText()}</span>
										</div>
										<svg
											className='w-5 h-5 text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M19 9l-7 7-7-7'
											></path>
										</svg>
									</div>

									{isPrivacyDropdownOpen && (
										<div
											ref={privacyDropdownRef}
											className='mt-1 w-[290px] bg-white border space-y-2 py-2 border-gray-200 rounded-lg shadow-lg z-10'
										>
											{/* Private Option */}
											<div
												className='flex items-center justify-between px-4 py-1 cursor-pointer hover:bg-gray-50'
												onClick={() => {
													setPrivacyOption('private');
													setIsPrivacyDropdownOpen(false);
												}}
											>
												<div className='w-full'>
													<div className='flex items-center w-full'>
														{/* <svg
															viewBox='0 0 24 24'
															className={`w-5 h-5 mt-1`}
															fill={
																privacyOption === 'private'
																	? 'oklch(0.704 0.14 182.503)'
																	: 'currentColor'
															}
														>
															<path
																fillRule='evenodd'
																d='M6 8a6 6 0 1 1 12 0v2.15c.283.062.554.152.816.286a4 4 0 0 1 1.748 1.748c.247.485.346 1.002.392 1.564.044.541.044 1.206.044 2.01v.483c0 .805 0 1.47-.044 2.01-.046.563-.145 1.08-.392 1.565a4 4 0 0 1-1.748 1.748c-.485.247-1.002.346-1.564.392-.541.044-1.206.044-2.01.044H8.758c-.805 0-1.47 0-2.01-.044-.563-.046-1.08-.145-1.565-.392a4 4 0 0 1-1.748-1.748c-.247-.485-.346-1.002-.392-1.564C3 17.71 3 17.046 3 16.242v-.483c0-.805 0-1.47.044-2.01.046-.563.145-1.08.392-1.565a4 4 0 0 1 1.748-1.748c.262-.134.533-.224.816-.286zm2 2.002q.356-.003.759-.002h6.482q.403 0 .759.002V8a4 4 0 0 0-8 0zm-1.089 2.036c-.438.035-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.38-.18.819C5 14.361 5 14.943 5 15.8v.4c0 .857 0 1.439.038 1.889.035.438.1.663.18.819a2 2 0 0 0 .874.874c.156.08.38.145.819.18C7.361 20 7.943 20 8.8 20h6.4c.857 0 1.439 0 1.889-.038.438-.035.663-.1.819-.18a2 2 0 0 0 .874-.874c.08-.156.145-.38.18-.819.037-.45.038-1.032.038-1.889v-.4c0-.857 0-1.439-.038-1.889-.035-.438-.1-.663-.18-.819a2 2 0 0 0-.874-.874c-.156-.08-.38-.145-.819-.18C16.639 12 16.057 12 15.2 12H8.8c-.857 0-1.439 0-1.889.038'
															/>
														</svg> */}

														<Lock
															className={`w-5 h-5 ${
																privacyOption === 'private'
																	? 'text-teal-500'
																	: 'text-gray-600'
															}`}
														/>
														<div className='flex items-center justify-between w-full'>
															<span
																className={`font-semibold ml-3 ${
																	privacyOption === 'private'
																		? 'text-teal-500'
																		: 'text-gray-600'
																}`}
															>
																Private
															</span>
															{privacyOption === 'private' && (
																<Check className='w-5 h-5 text-teal-500' />
															)}
														</div>
													</div>
													<div className='text-sm text-gray-500 ml-8'>
														Only owner can view
													</div>
												</div>
											</div>

											{/* Public Option */}
											<div
												className='flex items-center justify-between px-4 py-1 cursor-pointer hover:bg-gray-50'
												onClick={() => {
													setPrivacyOption('public');
													setIsPrivacyDropdownOpen(false);
												}}
											>
												<div className='w-full'>
													<div className='flex items-center w-full'>
														<Unlock
															className={`w-5 h-5 ${
																privacyOption === 'public'
																	? 'text-teal-500'
																	: 'text-gray-600'
															}`}
														/>
														<div className='flex items-center justify-between w-full'>
															<span
																className={`font-semibold ml-3 ${
																	privacyOption === 'public'
																		? 'text-teal-500'
																		: 'text-gray-600'
																}`}
															>
																Public
															</span>
															{privacyOption === 'public' && (
																<Check className='w-5 h-5 text-teal-500' />
															)}
														</div>
													</div>
													<div className='text-sm text-gray-500 ml-8'>
														Anyone can find or view list
													</div>
												</div>
											</div>

											{/* Shareable Option */}
											<div
												className='flex items-center justify-between px-5 py-1 cursor-pointer hover:bg-gray-50'
												onClick={() => {
													setPrivacyOption('shareable');
													setIsPrivacyDropdownOpen(false);
												}}
											>
												<div className='w-full'>
													<div className='flex w-full items-center'>
														<svg
															viewBox='0 0 24 24'
															className={`w-5 h-5 mt-2 ${
																privacyOption === 'shareable'
																	? 'text-teal-500'
																	: 'text-gray-600'
															}`}
															xmlns='http://www.w3.org/2000/svg'
														>
															<path
																fill='none'
																stroke='currentColor'
																strokeWidth='2'
																d='M10 3h-5.1c0 0-4.9 0-4.9 5 0 3.9 3 8 3 8s-1.7-7 1.8-7h5.2v3l6-6-6-6v3z'
															/>
														</svg>

														<div className='flex items-center justify-between w-full'>
															<span
																className={`font-semibold ml-3 ${
																	privacyOption === 'shareable'
																		? 'text-teal-500'
																		: 'text-gray-600'
																}`}
															>
																Shareable
															</span>
															{privacyOption === 'shareable' && (
																<Check className='w-5 h-5 text-teal-500' />
															)}
														</div>
													</div>
													<div className='text-sm text-gray-500 ml-7'>
														Anyone with the link can view
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						<DrawerFooter className='px-5 py-3 bg-accent fixed bottom-0 w-full flex justify-end border-t rounded-b-lg'>
							<button
								type='submit'
								className='px-6 py-2 bg-blue-400 text-white font-semibold rounded-sm hover:bg-blue-500 transition-colors'
							>
								Update
							</button>
						</DrawerFooter>
					</form>
				</DrawerContent>
			</Drawer>
		);
	} else {
		return (
			<div className='fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50'>
				<div
					className={`flex flex-col bg-white rounded-lg w-full max-w-[500px] shadow-lg transition-all duration-300 ${
						isPrivacyDropdownOpen
							? 'max-h-[calc(90vh-90px)]' // More space
							: 'max-h-[calc(90vh-132px)]'
					}`}
				>
					<div className='p-5 relative border-b mb-3'>
						<h2 className='text-2xl text-gray-800'>Create Collection</h2>
						<button
							className='absolute right-5 top-5 text-gray-400 hover:text-gray-600'
							onClick={handleClose}
						>
							<X className='w-5 h-5' />
						</button>
					</div>

					<form onSubmit={handleSubmit}>
						<div className='px-5 pb-5 space-y-3'>
							<div className=''>
								<div className='flex items-start gap-4'>
									{/* Title Section */}
									<div className='flex-1'>
										<div className='mb-3'>
											<label
												className='block text-sm font-semibold text-gray-700'
												htmlFor='title'
											>
												Title
											</label>
											<input
												id='title'
												type='text'
												className='w-full text-sm mt-1 px-3 py-2 border border-gray-300 bg-accent rounded-full focus:outline-none focus:ring-1  focus:ring-teal-500'
												placeholder='Collection Name..'
											/>
										</div>
									</div>

									{/* Emoji Picker Section */}
									<div>
										<label className='block text-sm font-semibold text-gray-700 mb-1'>
											Emoji
										</label>
										<div className='relative'>
											{selectedEmoji ? (
												<div className='w-[38px] h-[38px] bg-gray-50 rounded-full  flex items-center justify-center relative'>
													<span className='text-[38px] caret-transparent'>
														{selectedEmoji}
													</span>
													<button
														type='button'
														onClick={handleRemoveEmoji}
														className='absolute -top-1.5 -right-1.5 bg-white border border-gray-400 rounded-full p-0.5 shadow hover:bg-gray-100'
													>
														<X className='size-2.5 text-gray-900' />
													</button>
												</div>
											) : (
												<button
													type='button'
													onClick={() => setIsEmojiPickerOpen(true)}
													className='w-[38px] h-[38px] bg-gray-50 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100'
												>
													<Plus className='size-5 text-gray-500' />
												</button>
											)}

											{isEmojiPickerOpen && (
												<div className='absolute top-full right-0 mt-1'>
													<EmojiPicker
														open={isEmojiPickerOpen}
														onEmojiClick={handleEmojiClick}
														height={400}
													/>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>

							<div className=''>
								<label
									className='block text-sm font-semibold text-gray-700 mb-1'
									htmlFor='description'
								>
									Description{' '}
									<span className='text-gray-500 font-normal'>(optional)</span>
								</label>
								<textarea
									id='description'
									name='description'
									placeholder='A space for discussing latest tech insights...'
									className='w-full px-4 py-2 border border-gray-300 rounded-sm text-gray-700 bg-accent focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none'
									rows={2}
								/>
							</div>

							<div className=''>
								<label className='block text-sm font-semibold text-gray-700 mb-1'>
									Privacy
								</label>
								<div className='relative flex flex-col justify-end items-end'>
									<div
										ref={privacyButtonRef}
										className='flex items-center justify-between w-full px-4 py-1.5 border border-gray-300 rounded bg-white cursor-pointer hover:bg-gray-50'
										onClick={() =>
											setIsPrivacyDropdownOpen(!isPrivacyDropdownOpen)
										}
									>
										<div className='flex items-center gap-2'>
											{getPrivacyIcon()}
											<span>{getPrivacyText()}</span>
										</div>
										<svg
											className='w-5 h-5 text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M19 9l-7 7-7-7'
											></path>
										</svg>
									</div>

									{isPrivacyDropdownOpen && (
										<div
											ref={privacyDropdownRef}
											className='mt-1 w-[290px] bg-white border space-y-2 py-2 border-gray-200 rounded-lg shadow-lg z-10'
										>
											{/* Private Option */}
											<div
												className='flex items-center justify-between px-4 py-1 cursor-pointer hover:bg-gray-50'
												onClick={() => {
													setPrivacyOption('private');
													setIsPrivacyDropdownOpen(false);
												}}
											>
												<div className='w-full'>
													<div className='flex items-center w-full'>
														{/* <svg
															viewBox='0 0 24 24'
															className={`w-5 h-5 mt-1`}
															fill={
																privacyOption === 'private'
																	? 'oklch(0.704 0.14 182.503)'
																	: 'currentColor'
															}
														>
															<path
																fillRule='evenodd'
																d='M6 8a6 6 0 1 1 12 0v2.15c.283.062.554.152.816.286a4 4 0 0 1 1.748 1.748c.247.485.346 1.002.392 1.564.044.541.044 1.206.044 2.01v.483c0 .805 0 1.47-.044 2.01-.046.563-.145 1.08-.392 1.565a4 4 0 0 1-1.748 1.748c-.485.247-1.002.346-1.564.392-.541.044-1.206.044-2.01.044H8.758c-.805 0-1.47 0-2.01-.044-.563-.046-1.08-.145-1.565-.392a4 4 0 0 1-1.748-1.748c-.247-.485-.346-1.002-.392-1.564C3 17.71 3 17.046 3 16.242v-.483c0-.805 0-1.47.044-2.01.046-.563.145-1.08.392-1.565a4 4 0 0 1 1.748-1.748c.262-.134.533-.224.816-.286zm2 2.002q.356-.003.759-.002h6.482q.403 0 .759.002V8a4 4 0 0 0-8 0zm-1.089 2.036c-.438.035-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.38-.18.819C5 14.361 5 14.943 5 15.8v.4c0 .857 0 1.439.038 1.889.035.438.1.663.18.819a2 2 0 0 0 .874.874c.156.08.38.145.819.18C7.361 20 7.943 20 8.8 20h6.4c.857 0 1.439 0 1.889-.038.438-.035.663-.1.819-.18a2 2 0 0 0 .874-.874c.08-.156.145-.38.18-.819.037-.45.038-1.032.038-1.889v-.4c0-.857 0-1.439-.038-1.889-.035-.438-.1-.663-.18-.819a2 2 0 0 0-.874-.874c-.156-.08-.38-.145-.819-.18C16.639 12 16.057 12 15.2 12H8.8c-.857 0-1.439 0-1.889.038'
															/>
														</svg> */}

														<Lock
															className={`w-5 h-5 ${
																privacyOption === 'private'
																	? 'text-teal-500'
																	: 'text-gray-600'
															}`}
														/>
														<div className='flex items-center justify-between w-full'>
															<span
																className={`font-semibold ml-3 ${
																	privacyOption === 'private'
																		? 'text-teal-500'
																		: 'text-gray-600'
																}`}
															>
																Private
															</span>
															{privacyOption === 'private' && (
																<Check className='w-5 h-5 text-teal-500' />
															)}
														</div>
													</div>
													<div className='text-sm text-gray-500 ml-8'>
														Only owner can view
													</div>
												</div>
											</div>

											{/* Public Option */}
											<div
												className='flex items-center justify-between px-4 py-1 cursor-pointer hover:bg-gray-50'
												onClick={() => {
													setPrivacyOption('public');
													setIsPrivacyDropdownOpen(false);
												}}
											>
												<div className='w-full'>
													<div className='flex items-center w-full'>
														<Unlock
															className={`w-5 h-5 ${
																privacyOption === 'public'
																	? 'text-teal-500'
																	: 'text-gray-600'
															}`}
														/>
														<div className='flex items-center justify-between w-full'>
															<span
																className={`font-semibold ml-3 ${
																	privacyOption === 'public'
																		? 'text-teal-500'
																		: 'text-gray-600'
																}`}
															>
																Public
															</span>
															{privacyOption === 'public' && (
																<Check className='w-5 h-5 text-teal-500' />
															)}
														</div>
													</div>
													<div className='text-sm text-gray-500 ml-8'>
														Anyone can find or view list
													</div>
												</div>
											</div>

											{/* Shareable Option */}
											<div
												className='flex items-center justify-between px-5 py-1 cursor-pointer hover:bg-gray-50'
												onClick={() => {
													setPrivacyOption('shareable');
													setIsPrivacyDropdownOpen(false);
												}}
											>
												<div className='w-full'>
													<div className='flex w-full items-center'>
														<svg
															viewBox='0 0 24 24'
															className={`w-5 h-5 mt-2 ${
																privacyOption === 'shareable'
																	? 'text-teal-500'
																	: 'text-gray-600'
															}`}
															xmlns='http://www.w3.org/2000/svg'
														>
															<path
																fill='none'
																stroke='currentColor'
																strokeWidth='2'
																d='M10 3h-5.1c0 0-4.9 0-4.9 5 0 3.9 3 8 3 8s-1.7-7 1.8-7h5.2v3l6-6-6-6v3z'
															/>
														</svg>

														<div className='flex items-center justify-between w-full'>
															<span
																className={`font-semibold ml-3 ${
																	privacyOption === 'shareable'
																		? 'text-teal-500'
																		: 'text-gray-600'
																}`}
															>
																Shareable
															</span>
															{privacyOption === 'shareable' && (
																<Check className='w-5 h-5 text-teal-500' />
															)}
														</div>
													</div>
													<div className='text-sm text-gray-500 ml-7'>
														Anyone with the link can view
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						<div className='px-5 py-3 bg-accent flex justify-end border-t rounded-b-lg'>
							<button
								type='submit'
								className='px-6 py-2 bg-blue-400 text-white font-semibold rounded-sm hover:bg-blue-500 transition-colors'
							>
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

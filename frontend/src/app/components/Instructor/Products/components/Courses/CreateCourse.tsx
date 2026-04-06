/** @format */

'use client';

import type React from 'react';

import {useState, useRef, useEffect} from 'react';
import {
	Italic,


	Redo,
	Undo,
	Underline,
	X,
} from 'lucide-react';
import {Bold} from 'lucide-react';

import {Button} from '@/app/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';
import {Input} from '@/app/components/ui/input';
import {Label} from '@/app/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/app/components/ui/select';
import {useIsMobile} from '@/hooks/use-mobile';
import { OrderedListSvg, UnorderedListSvg } from '@/app/components/svg';
interface CourseDrawerProps {
	onClose: () => void;
}
export default function CourseDrawer({onClose}: CourseDrawerProps) {
	const [open, setOpen] = useState(true);
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [category, setCategory] = useState('');
	const [charCount, setCharCount] = useState(0);
	const editorRef = useRef<HTMLDivElement>(null);
	const isMobile = useIsMobile();
	// Generate URL from title

	// Generate URL from title
	// Generate URL from title - with random suffix generated only once
	useEffect(() => {
		if (title) {
			// Create slug from title
			const slug = title
				.toLowerCase()
				.replace(/\s+/g, '-')
				.replace(/[^\w-]+/g, '')
				.replace(/--+/g, '-')
				.replace(/^-+/, '')
				.replace(/-+$/, '');

			// Check if we already have a URL with a random suffix
			if (!url || url === '') {
				// First time setting the title - generate random suffix once
				const randomSuffix = Array.from(
					{length: 7},
					() =>
						'abcdefghijklmnopqrstuvwxyz0123456789'[
							Math.floor(Math.random() * 36)
						]
				).join('');

				setUrl(`https://skillhub.com/courses/${slug}-${randomSuffix}`);
			} else {
				// URL already exists, just update the slug part but keep the same random suffix
				const urlParts = url.split('/');
				const lastPart = urlParts[urlParts.length - 1];
				const suffixPart = lastPart.substring(lastPart.lastIndexOf('-') + 1);

				setUrl(`https://skillhub.com/courses/${slug}-${suffixPart}`);
			}
		} else {
			setUrl('');
		}
	}, [title, url]);

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	// Handle title input with character count
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value.length <= 60) {
			setTitle(value);
			setCharCount(value.length);
		}
	};

	// Rich text editor commands
	
const execCommand = (command:string) => {
  // Make sure the editor has focus first
  if (editorRef.current) {
    editorRef.current.focus();
    
    // Small delay to ensure focus is properly set
    setTimeout(() => {
      document.execCommand(command, false);
    }, 10);
  }
};

	// Form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const description = editorRef.current?.innerHTML || '';

		console.log({
			title,
			url,
			description,
			category,
		});

		alert({
			title: 'Success!',
			description: 'Course created successfully',
		});

		setOpen(false);
	};

	if (isMobile) {
		return (
			<Drawer open={open} onOpenChange={onClose}>
				<DrawerContent className=' rounded-t-2xl p-0'>
					<DrawerHeader className='border-b border-[#E5E5E5] px-4 pb-4 pt-0'>
						<DrawerTitle className='text-xl font-bold text-[#262B3D]'>
							New Course
						</DrawerTitle>
						<DrawerClose className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
							<svg
								width='12'
								height='12'
								viewBox='0 0 12 12'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M7.46875 6L10.8438 2.65625C11.0312 2.46875 11.0312 2.125 10.8438 1.9375L10.0625 1.15625C9.875 0.96875 9.53125 0.96875 9.34375 1.15625L6 4.53125L2.625 1.15625C2.4375 0.96875 2.09375 0.96875 1.90625 1.15625L1.125 1.9375C0.9375 2.125 0.9375 2.46875 1.125 2.65625L4.5 6L1.125 9.375C0.9375 9.5625 0.9375 9.90625 1.125 10.0938L1.90625 10.875C2.09375 11.0625 2.4375 11.0625 2.625 10.875L6 7.5L9.34375 10.875C9.53125 11.0625 9.875 11.0625 10.0625 10.875L10.8438 10.0938C11.0312 9.90625 11.0312 9.5625 10.8438 9.375L7.46875 6Z'
									fill='#646464'
								/>
							</svg>
							<span className='sr-only'>Close</span>
						</DrawerClose>
					</DrawerHeader>

					<div className='overflow-auto'>
						<form onSubmit={handleSubmit}>
							<div className='px-4 py-5'>
								<div className='mb-6'>
									<div className='flex items-center justify-between'>
										<Label
											htmlFor='title'
											className='text-sm font-semibold text-[#4F4F4F]'
										>
											Title
										</Label>
										<span className='text-xs text-[#4F4F4F]'>
											{charCount}/60
										</span>
									</div>
									<Input
										id='title'
										value={title}
										onChange={handleTitleChange}
										placeholder='e.g, UX Design Essentials'
										maxLength={60}
										className='mt-2 rounded-md border-[#E5E5E5] px-3 py-3 text-[15px] text-[#4F4F4F] focus-visible:ring-teal-500 focus-visible:ring-1'
										required
									/>
								</div>

								<div className='mb-6'>
									<Label
										htmlFor='url'
										className='text-sm font-semibold text-[#4F4F4F]'
									>
										Course URL
									</Label>
									<Input
										id='url'
										value={url}
										readOnly
										className='mt-2 cursor-not-allowed rounded-md border-[#E5E5E5] bg-[#F8F9FA] px-3 py-3 text-[15px] text-[#4F4F4F] focus-visible:ring-teal-500 focus-visible:ring-1'
									/>
								</div>

								<div className='mb-6'>
								<Label
									htmlFor='description'
									className='text-sm font-semibold text-[#4F4F4F]'
								>
									Description
									<span className='ml-1 text-xs font-normal text-[#A0AEC0]'>
										(optional)
									</span>
								</Label>
								<div className='mt-1 overflow-hidden rounded-md border border-[#E5E5E5]'>
									<div className='flex gap-1 overflow-x-auto bg-[#F8F9FA] p-2 scrollbar-hide'>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											className='h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted'
											onClick={() => execCommand('undo')}
										>
											<Undo className='h-5 w-5' />
										</Button>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											className='h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted'
											onClick={() => execCommand('redo')}
										>
											<Redo className='h-5 w-5' />
										</Button>
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
											onClick={() => execCommand('insertOrderedList')}
										>
											<OrderedListSvg/>
										</Button>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											className='h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted'
											onClick={() => execCommand('insertUnorderedList')}
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

								<div className='mb-6'>
									<Label
										htmlFor='category'
										className='text-sm font-semibold text-[#4F4F4F]'
									>
										Choose a category
									</Label>
									<Select value={category} onValueChange={setCategory} required>
										<SelectTrigger
											id='category'
											className='mt-2 w-full rounded-md border-[#E5E5E5] px-3 py-3 text-[15px] text-[#4F4F4F] focus:ring-[#02C5AF]'
										>
											<SelectValue placeholder='Choose a category' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='development'>Development</SelectItem>
											<SelectItem value='business'>Business</SelectItem>
											<SelectItem value='finance'>
												Finance & Accounting
											</SelectItem>
											<SelectItem value='it'>IT & Software</SelectItem>
											<SelectItem value='office'>
												Office Productivity
											</SelectItem>
											<SelectItem value='personal'>
												Personal Development
											</SelectItem>
											<SelectItem value='design'>Design</SelectItem>
											<SelectItem value='marketing'>Marketing</SelectItem>
											<SelectItem value='lifestyle'>Lifestyle</SelectItem>
											<SelectItem value='photography'>
												Photography & Video
											</SelectItem>
											<SelectItem value='health'>Health & Fitness</SelectItem>
											<SelectItem value='music'>Music</SelectItem>
											<SelectItem value='teaching'>
												Teaching & Academics
											</SelectItem>
											<SelectItem value='unknown'>I don't know yet</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<DrawerFooter className='border-t sticky bottom-0 bg-white border-[#E5E5E5] px-4 py-4'>
								<Button
									type='submit'
									className='w-full rounded-md bg-[#02C5AF] px-4 py-4 text-base font-semibold text-white hover:bg-[#01b29d]'
								>
									Create Course
								</Button>
							</DrawerFooter>
						</form>
					</div>
				</DrawerContent>
			</Drawer>
		);
	} else {
		return (
			<div className='fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto'>
				<div className='bg-white rounded-md w-full max-w-[600px] max-h-[90vh] shadow-xl overflow-hidden my-4'>
					<div className='p-4  relative border-b border-gray-200'>
						<h2 className='text-2xl text-start font-bold text-gray-800 pr-6'>
							Create Course
						</h2>
						<button
							className='absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 transition-colors'
							onClick={onClose}
						>
							<X className='w-4 h-4 text-gray-500' />
						</button>
					</div>

					<div className='p-4 pb-0 overflow-y-auto max-h-[calc(90vh-132px)]'>
						<form onSubmit={handleSubmit} className='space-y-5 relative'>
							<div>
								<div className='flex items-center justify-between'>
									<Label
										htmlFor='title'
										className='text-sm font-semibold text-[#4F4F4F]'
									>
										Title
									</Label>
									<span className='text-xs text-[#4F4F4F]'>{charCount}/60</span>
								</div>
								<Input
									id='title'
									value={title}
									onChange={handleTitleChange}
									placeholder='e.g, UX Design Essentials'
									maxLength={60}
									className='mt-2 rounded-md border-[#E5E5E5] px-3 py-3 text-[15px] text-[#4F4F4F] focus-visible:ring-teal-500 focus-visible:ring-1'
									required
								/>
							</div>

							<div className=''>
								<Label
									htmlFor='url'
									className='text-sm font-semibold text-[#4F4F4F]'
								>
									Course URL
								</Label>
								<Input
									id='url'
									value={url}
									readOnly
									className='mt-2 cursor-not-allowed rounded-md border-[#E5E5E5] bg-[#F8F9FA] px-3 py-3 text-[15px] text-[#4F4F4F] focus-visible:ring-teal-500 focus-visible:ring-1'
								/>
							</div>

							<div className=''>
								<Label
									htmlFor='description'
									className='text-sm font-semibold text-[#4F4F4F]'
								>
									Description
									<span className='ml-1 text-xs font-normal text-[#A0AEC0]'>
										(optional)
									</span>
								</Label>
								<div className='mt-1 overflow-hidden rounded-md border border-[#E5E5E5]'>
									<div className='flex gap-1 overflow-x-auto bg-[#F8F9FA] p-2 scrollbar-hide'>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											className='h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted'
											onClick={() => execCommand('undo')}
										>
											<Undo className='h-5 w-5' />
										</Button>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											className='h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted'
											onClick={() => execCommand('redo')}
										>
											<Redo className='h-5 w-5' />
										</Button>
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
											onClick={() => execCommand('insertOrderedList')}
										>
											<OrderedListSvg/>
										</Button>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											className='h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted'
											onClick={() => execCommand('insertUnorderedList')}
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

							<div className='w-full'>
								<Label
									htmlFor='category'
									className='text-sm font-semibold text-[#4F4F4F]'
								>
									Choose a category
								</Label>
								<Select value={category} onValueChange={setCategory} required>
									<SelectTrigger
										id='category'
										className='mt-2 w-full rounded-md border-[#E5E5E5] px-3 py-3 text-[15px] text-[#4F4F4F] focus:ring-[#02C5AF]'
									>
										<SelectValue placeholder='Choose a category' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='development'>Development</SelectItem>
										<SelectItem value='business'>Business</SelectItem>
										<SelectItem value='finance'>
											Finance & Accounting
										</SelectItem>
										<SelectItem value='it'>IT & Software</SelectItem>
										<SelectItem value='office'>Office Productivity</SelectItem>
										<SelectItem value='personal'>
											Personal Development
										</SelectItem>
										<SelectItem value='design'>Design</SelectItem>
										<SelectItem value='marketing'>Marketing</SelectItem>
										<SelectItem value='lifestyle'>Lifestyle</SelectItem>
										<SelectItem value='photography'>
											Photography & Video
										</SelectItem>
										<SelectItem value='health'>Health & Fitness</SelectItem>
										<SelectItem value='music'>Music</SelectItem>
										<SelectItem value='teaching'>
											Teaching & Academics
										</SelectItem>
										<SelectItem value='unknown'>I don't know yet</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className='sticky bottom-0 left-0 bg-white w-full  border-t py-2 border-gray-200 flex justify-end'>
								<button
									type='submit'
									form='schoolForm'
									className='px-6 py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition-colors'
								>
									Create Course
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

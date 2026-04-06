/** @format */

'use client';

import {useState, useRef, useEffect} from 'react';
import { ExternalLink, Trash2, MoreHorizontal} from 'lucide-react';
import Image, {StaticImageData} from 'next/image';

interface PlaylistItemProps {
	title: string;
	author: string;
	language: string;
	coverImage: string | StaticImageData;
	onGoToPlayer?: () => void;
	onRemoveFromPlaylist?: () => void;
}

export function PlaylistItem({
	title,
	author,
	language,
	coverImage,
	onGoToPlayer,
	onRemoveFromPlaylist,
}: PlaylistItemProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				buttonRef.current &&
				!menuRef.current.contains(event.target as Node) &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='flex items-center py-2 border-b border-gray-100'>
			<div className='flex-shrink-0 mr-3'>
				<Image
					src={coverImage || '/placeholder.svg'}
					alt={title}
					width={48}
					height={48}
					className='rounded-md'
				/>
			</div>
			<div className='flex-grow space-y-1'>
				<h3 className='text-sm font-semibold text-gray-900 hover:text-primary'>
					{title}
				</h3>
				<div className='flex items-center w-full justify-between relative'>
					<p className=' text-xs text-gray-500'>
						{author} • {language}
					</p>
					<button
						ref={buttonRef}
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className='p-1 rounded-full hover:bg-gray-100 focus:outline-none mr-5'
						aria-label='More options'
					>
						<MoreHorizontal size={18} className='text-gray-500' />
					</button>

					{isMenuOpen && (
						<div
							ref={menuRef}
							className='absolute right-0   top-4 z-50 mt-1 w-56 bg-white shadow-lg border border-gray-200'
						>
							<div className='py-1'>
								<button
									onClick={() => {
										onGoToPlayer?.();
										setIsMenuOpen(false);
									}}
									className='flex items-center w-full px-4 py-2 text-sm  hover:bg-gray-50'
								>
									Go to Player Page
									<ExternalLink size={16} className='ml-2' />
								</button>
								<button
									onClick={() => {
										onRemoveFromPlaylist?.();
										setIsMenuOpen(false);
									}}
									className='flex items-center w-full px-4 py-2 text-sm  hover:bg-gray-50'
								>
									Remove from playlist
									<Trash2 size={16} className='ml-2' />
								</button>
							</div>
						</div>
						
					)}
				</div>
			</div>
		</div>
	);
}

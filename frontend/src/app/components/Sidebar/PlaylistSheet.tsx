/** @format */

import Image from 'next/image';

import {PlaylistItem} from './PlaylistItem';
import {Progress} from '../ui/progress';
import {Button} from '../ui/button';
import PlaylistImg from '@/assets/c1.jpg';
import PlaylistItemImg from '@/assets/c3.jpg';
import {Music2} from 'lucide-react';
import { useSidebar } from '../ui/sidebar';

interface PlaylistSheetProps {
	className?: string;
	isOpen: boolean;
}

const playlistItems = [
	{
		id: '1',
		title: 'Think & Grow Rich',
		author: 'Peter Thiel',
		language: 'English',
		coverImage: PlaylistItemImg,
	},
	{
		id: '2',
		title: 'Atomic Habits',
		author: 'Blake Masters',
		language: 'English',
		coverImage: PlaylistItemImg,
	},
	{
		id: '3',
		title: 'The 5 AM Club',
		author: 'Robin Sharma',
		language: 'English',
		coverImage: PlaylistItemImg,
	},
	{
		id: '4',
		title: 'The 5 AM Club',
		author: 'Robin Sharma',
		language: 'English',
		coverImage: PlaylistItemImg,
	},
	{
		id: '5',
		title: 'The 5 AM Club',
		author: 'Robin Sharma',
		language: 'English',
		coverImage: PlaylistItemImg,
	},
	{
		id: '6',
		title: 'The 5 AM Club',
		author: 'Robin Sharma',
		language: 'English',
		coverImage: PlaylistItemImg,
	},
];

const PlaylistSheet = ({className, isOpen}: PlaylistSheetProps) => {
	const {state} = useSidebar()
	if (isOpen) {
		return (
			<div
				className={`fixed z-50 top-[67px] ${state === 'collapsed'? '' : 'sm:left-[16rem] '} backdrop-blur-md bg-black/70 w-full h-full ${className}`}
			>
				<div
					className={`overflow-auto sm:w-[400px] h-[calc(100%-130px)] sm:h-[calc(100%-67px)] bg-white shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out z-10`}
				>
					<section className='flex flex-col gap-2 bg-accent p-3 pb-2 m-5 rounded'>
						<div className='rounded w-25 h-38 overflow-hidden object-cover'>
							<Image
								src={PlaylistImg}
								alt='Playlist image'
								width={100}
								height={150}
								className='object-fit w-full h-full rounded'
							/>
						</div>
						<div>
							<h3 className='font-bold'>
								Think & Grow Rich (The secrets of 40 millionaires' revealed)
							</h3>
							<div className='flex gap-1 items-center'>
								<span>Napoleon Hill</span>{' '}
								<span className='size-1 bg-gray-500 rounded-full'></span>{' '}
								<div className='flex items-center gap-1'>
									<Music2 className='size-4' /> <span>English</span>
								</div>
							</div>
						</div>
						<div className='space-y-4 mb-2'>
							<div className='flex gap-1 items-center'>
								<div>
									<span>Progress: </span>
									<span className='font-semibold'>80%</span>
								</div>{' '}
								<span className='size-1 bg-gray-500 rounded-full'></span>{' '}
								<div>
									<span>Last Activity: </span>
									<span className='font-semibold'>Yesterday</span>
								</div>
							</div>

							<Progress
								value={80}
								className='h-2'
							/>
						</div>
						<Button
							variant={'default'}
							className='bg-background text-foreground hover:text-background rounded text-base'
						>
							Continue
						</Button>
					</section>

					<section className='m-5 space-y-1'>
						<div className='flex items-center justify-between w-full'>
							<h2 className='text-xs font-semibold'>PLAYLIST</h2>
							<button className='text-xs'>Clear all</button>
						</div>

						<hr />
						{playlistItems.map((item) => (
							<PlaylistItem
								key={item.id}
								title={item.title}
								author={item.author}
								language={item.language}
								coverImage={item.coverImage}
								onGoToPlayer={() => true}
								onRemoveFromPlaylist={() => true}
							/>
						))}
					</section>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default PlaylistSheet;

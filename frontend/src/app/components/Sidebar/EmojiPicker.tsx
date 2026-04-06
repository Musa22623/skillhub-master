/** @format */

'use client';

import type React from 'react';

import {useState, useEffect, useRef} from 'react';
import {Search, X, Plus} from 'lucide-react';
import {cn} from '@/lib/utils';

// Emoji categories and data
const emojiCategories = {
	frequent: {
		title: 'Frequently Used',
		emojis: ['🕐', '😊', '🐱', '🍔', '🚗', '⚽', '👕', '🎵'],
	},
	smileys: {
		title: 'Smileys & People',
		emojis: [
			'😀',
			'😃',
			'😄',
			'😁',
			'😆',
			'😅',
			'😂',
			'🤣',
			'😊',
			'😇',
			'🙂',
			'🙃',
			'😉',
			'😌',
			'😍',
			'🥰',
			'😘',
			'😗',
			'😙',
			'😚',
			'😋',
			'😛',
			'😝',
			'😜',
			'🤪',
			'🤨',
			'🧐',
			'🤓',
			'😎',
			'🤩',
			'😏',
			'😒',
			'😞',
			'😔',
			'😟',
			'😕',
			'🙁',
			'☹️',
			'😣',
			'😖',
			'😫',
			'😩',
			'🥺',
			'😢',
			'😭',
			'😤',
			'😠',
			'😡',
			'🤬',
			'🤯',
		],
	},
	nature: {
		title: 'Animals & Nature',
		emojis: [
			'🐱',
			'🐶',
			'🐭',
			'🐹',
			'🐰',
			'🦊',
			'🐻',
			'🐼',
			'🐨',
			'🐯',
			'🦁',
			'🐮',
			'🐷',
			'🐸',
			'🐵',
			'🐔',
			'🐧',
			'🐦',
			'🐤',
			'🦆',
			'🦅',
			'🦉',
			'🦇',
			'🐺',
			'🐗',
			'🐴',
			'🦄',
			'🐝',
			'🐛',
			'🦋',
		],
	},
	food: {
		title: 'Food & Drink',
		emojis: [
			'🍎',
			'🍐',
			'🍊',
			'🍋',
			'🍌',
			'🍉',
			'🍇',
			'🍓',
			'🍈',
			'🍒',
			'🍑',
			'🥭',
			'🍍',
			'🥥',
			'🥝',
			'🍅',
			'🍆',
			'🥑',
			'🥦',
			'🥬',
			'🥒',
			'🌶️',
			'🌽',
			'🥕',
			'🧄',
			'🧅',
			'🥔',
			'🍠',
			'🥐',
			'🥯',
		],
	},
	activities: {
		title: 'Activities',
		emojis: [
			'⚽',
			'🏀',
			'🏈',
			'⚾',
			'🥎',
			'🎾',
			'🏐',
			'🏉',
			'🎱',
			'🏓',
			'🏸',
			'🥅',
			'🏒',
			'🏑',
			'🥍',
			'🏏',
			'🪃',
			'🥊',
			'🥋',
			'🎽',
			'🛹',
			'🛼',
			'🛷',
			'⛸️',
			'🥌',
			'🎿',
			'⛷️',
			'🏂',
			'🪂',
			'🏋️',
		],
	},
	travel: {
		title: 'Travel & Places',
		emojis: [
			'🚗',
			'🚕',
			'🚙',
			'🚌',
			'🚎',
			'🏎️',
			'🚓',
			'🚑',
			'🚒',
			'🚐',
			'🚚',
			'🚛',
			'🚜',
			'🛴',
			'🚲',
			'🛵',
			'🏍️',
			'🛺',
			'🚨',
			'🚔',
			'🚍',
			'🚘',
			'🚖',
			'🚡',
			'🚠',
			'🚟',
			'🚃',
			'🚋',
			'🚞',
			'🚝',
		],
	},
	objects: {
		title: 'Objects',
		emojis: [
			'👕',
			'👚',
			'👖',
			'👔',
			'👗',
			'👙',
			'👘',
			'👠',
			'👡',
			'👢',
			'👞',
			'👟',
			'🥾',
			'🥿',
			'👒',
			'🎩',
			'🧢',
			'⛑️',
			'👑',
			'💍',
			'👓',
			'🕶️',
			'🥽',
			'🌂',
			'☂️',
			'💼',
			'🎒',
			'🧳',
			'🎓',
			'🧶',
		],
	},
	symbols: {
		title: 'Symbols',
		emojis: [
			'❤️',
			'🧡',
			'💛',
			'💚',
			'💙',
			'💜',
			'🖤',
			'🤍',
			'🤎',
			'💔',
			'❣️',
			'💕',
			'💞',
			'💓',
			'💗',
			'💖',
			'💘',
			'💝',
			'💟',
			'☮️',
			'✝️',
			'☪️',
			'🕉️',
			'☸️',
			'✡️',
			'🔯',
			'🕎',
			'☯️',
			'☦️',
			'🛐',
		],
	},
};

type EmojiPickerProps = {
	onEmojiSelect?: (emoji: string) => void;
	className?: string;
	buttonClassName?: string;
	selectedEmoji?: string | null;
};

export function EmojiPicker({
	onEmojiSelect,
	className,
	buttonClassName,
	selectedEmoji: initialEmoji = null,
}: EmojiPickerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedEmoji, setSelectedEmoji] = useState<string | null>(
		initialEmoji
	);
	const [activeCategory, setActiveCategory] =
		useState<keyof typeof emojiCategories>('frequent');
	const pickerRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	// Filter emojis based on search query
	const filterEmojis = (emojis: string[]) => {
		if (!searchQuery) return emojis;
		return emojis.filter((emoji) =>
			emoji.toLowerCase().includes(searchQuery.toLowerCase())
		);
	};

	const handleEmojiSelect = (emoji: string) => {
		setSelectedEmoji(emoji);
		setIsOpen(false);

		// Call the callback if provided
		if (onEmojiSelect) {
			onEmojiSelect(emoji);
		}
	};

	const handleRemoveEmoji = (e: React.MouseEvent) => {
		e.stopPropagation();
		setSelectedEmoji(null);

		// Call the callback with null if provided
		if (onEmojiSelect) {
			onEmojiSelect('');
		}
	};

	// Close picker when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				pickerRef.current &&
				!pickerRef.current.contains(event.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={cn('relative', className)}>
			<button
				ref={buttonRef}
				type='button'
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					'bg-[#F8F9FA] border border-[#E5E5E5] rounded-full cursor-pointer p-2 flex items-center justify-center min-w-[42px] h-[42px] relative',
					buttonClassName
				)}
			>
				{selectedEmoji ? (
					<span className='text-xl relative'>
						{selectedEmoji}
						<span
							className='absolute -top-1.5 -right-1.5 bg-white border border-[#E5E5E5] rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-pointer'
							onClick={handleRemoveEmoji}
						>
							<X className='h-2.5 w-2.5 text-[#646464]' />
						</span>
					</span>
				) : (
					<Plus className='h-6 w-6 text-[#4F4F4F]' />
				)}
			</button>

			{isOpen && (
				<div
					ref={pickerRef}
					className='absolute top-full right-0 mt-1 bg-white border border-[#E5E5E5] rounded-xl p-4 w-[300px] max-h-[400px] overflow-y-auto shadow-md z-50'
				>
					<div className='relative mb-4'>
						<div className='absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]'>
							<Search className='h-4 w-4' />
						</div>
						<input
							type='text'
							placeholder='Search emojis...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full py-2.5 px-10 border border-[#E5E5E5] rounded-lg text-sm bg-[#F8F9FA] text-[#4F4F4F] placeholder-[#A0AEC0] focus:outline-none focus:border-[#02C5AF]'
						/>
						{searchQuery && (
							<button
              type='button'
								className='absolute right-3 top-1/2 -translate-y-1/2 text-[#A0AEC0] hover:text-[#4F4F4F]'
								onClick={() => setSearchQuery('')}
							>
								<X className='h-4 w-4' />
							</button>
						)}
					</div>

					<div className='flex gap-2 mb-3 pb-2 border-b border-[#E5E5E5] overflow-x-auto'>
						{Object.keys(emojiCategories).map((category) => (
							<button
								key={category}
                type='button'
								onClick={() =>
									setActiveCategory(category as keyof typeof emojiCategories)
								}
								className={cn(
									'p-1 rounded min-w-[28px] h-[28px] flex items-center justify-center text-lg',
									activeCategory === category
										? 'bg-[#F2F2F2]'
										: 'hover:bg-[#F2F2F2]'
								)}
							>
								{
									emojiCategories[category as keyof typeof emojiCategories]
										.emojis[0]
								}
							</button>
						))}
					</div>

					<div className='space-y-5'>
						{!searchQuery ? (
							// Show active category when not searching
							<div>
								<h3 className='text-sm text-[#4F4F4F] mb-3 font-semibold'>
									{emojiCategories[activeCategory].title}
								</h3>
								<div className='grid grid-cols-6 gap-2'>
									{emojiCategories[activeCategory].emojis.map(
										(emoji, index) => (
											<button
												key={`${activeCategory}-${index}`}
												onClick={() => handleEmojiSelect(emoji)}
												className='text-2xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F2F2F2] transition-colors'
											>
												{emoji}
											</button>
										)
									)}
								</div>
							</div>
						) : (
							// Show search results across all categories
							Object.keys(emojiCategories).map((category) => {
								const filteredEmojis = filterEmojis(
									emojiCategories[category as keyof typeof emojiCategories]
										.emojis
								);
								if (filteredEmojis.length === 0) return null;

								return (
									<div key={`search-${category}`}>
										<h3 className='text-sm text-[#4F4F4F] mb-3 font-semibold'>
											{
												emojiCategories[
													category as keyof typeof emojiCategories
												].title
											}
										</h3>
										<div className='grid grid-cols-6 gap-2'>
											{filteredEmojis.map((emoji, index) => (
												<button
													key={`search-${category}-${index}`}
													onClick={() => handleEmojiSelect(emoji)}
													className='text-2xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F2F2F2] transition-colors'
												>
													{emoji}
												</button>
											))}
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>
			)}
		</div>
	);
}

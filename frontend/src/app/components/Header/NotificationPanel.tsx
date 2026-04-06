/** @format */

import {useState, useEffect, useRef, useMemo} from 'react';
import Image, {StaticImageData} from 'next/image';
import Link from 'next/link';
import {useIsMobile} from '@/hooks/use-mobile';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';
import img1 from '@/assets/c1.jpg';
import img2 from '@/assets/c2.jpg';
import img3 from '@/assets/c3.jpg';
import img4 from '@/assets/c4.jpg';
interface NotificationsPanelProps {
	isPanelOpen: boolean;
	setIsPanelOpen: (isOpen: boolean) => void;
}

const NotificationsPanel = ({
	isPanelOpen,
	setIsPanelOpen,
}: NotificationsPanelProps) => {
	const panelRef = useRef<HTMLDivElement>(null);
	const [activeTab, setActiveTab] = useState('Student');
	const [searchTerm, setSearchTerm] = useState('');
	const [hideRead, setHideRead] = useState(false);
	const tabsScrollRef = useRef<HTMLDivElement>(null);
	const [showScrollButtons, setShowScrollButtons] = useState({
		left: false,
		right: true,
	});

	const [notifications, setNotifications] = useState([
		{
			id: 1,
			type: 'comment',
			category: 'Comments',
			read: false,
			avatar: 'https://i.ibb.co/dJh6T3K/AVATAR-midtone-ux-instrgram.jpg',
			user: 'Fleur',
			target: 'Dashboard 2.0',
			comment: 'Really love this approach...',
			meta: {date: 'Friday, Dec 23, 2024', timeAgo: '2 hours ago'},
		},
		{
			id: 2,
			type: 'follow',
			category: 'Student',
			read: false,
			avatar:
				'https://i.ibb.co/WsLk5GY/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg',
			user: 'Lily-Rose',
			action: 'followed you',
			meta: {date: 'Friday, Dec 23, 2024', timeAgo: '3 hours ago'},
		},
		{
			id: 3,
			type: 'enrollment',
			category: 'Student',
			read: false,
			avatar: 'https://i.ibb.co/QjGXmRr/AVATAR-laurentfa.png',
			course: {
				title: 'Intro to UX Design',
				instructor: 'Sarah Johnson',
				image: img1,
			},
			meta: {date: 'Friday, Dec 23, 2024', timeAgo: '4 hours ago'},
		},
		{
			id: 4,
			type: 'enrollment',
			category: 'Student',
			read: false,
			avatar: 'https://i.ibb.co/dJh6T3K/AVATAR-midtone-ux-instrgram.jpg',
			course: {
				title: 'Intro to UX Design',
				instructor: 'Sarah Johnson',
				image: img2,
			},
			meta: {date: 'Friday, Dec 23, 2024', timeAgo: '4 hours ago'},
		},
		{
			id: 5,
			type: 'enrollment',
			category: 'Student',
			read: false,
			avatar:
				'https://i.ibb.co/WsLk5GY/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg',
			course: {
				title: 'Intro to UX Design',
				instructor: 'Sarah Johnson',
				image: img3,
			},
			meta: {date: 'Friday, Dec 23, 2024', timeAgo: '4 hours ago'},
		},
		{
			id: 6,
			type: 'enrollment',
			category: 'Student',
			read: false,
			avatar: 'https://i.ibb.co/gLQM1bhc/AVATAR-midtone-ux-instrgram.jpg',
			course: {
				title: 'Intro to UX Design',
				instructor: 'Sarah Johnson',
				image: img4,
			},
			meta: {date: 'Friday, Dec 23, 2024', timeAgo: '4 hours ago'},
		},
		{
			id: 7,
			type: 'enrollment',
			category: 'Student',
			read: false,
			avatar: 'https://i.ibb.co/cF4gPr5/AVATAR-github-com-biowaffeln.png',
			course: {
				title: 'Intro to UX Design',
				instructor: 'Sarah Johnson',
				image: img2,
			},
			meta: {date: 'Friday, Dec 23, 2024', timeAgo: '4 hours ago'},
		},
		{
			id: 8,
			type: 'enrollment',
			category: 'Student',
			read: false,
			avatar: 'https://i.ibb.co/dJh6T3K/AVATAR-midtone-ux-instrgram.jpg',
			course: {
				title: 'Intro to UX Design',
				instructor: 'Sarah Johnson',
				image: img1,
			},
			meta: {date: 'Friday, Dec 23, 2024', timeAgo: '4 hours ago'},
		},
		// Add other notification types
	]);

	const isMobile = useIsMobile();

	const memoizedTabs = useMemo(() => {
		return [
			{
				name: 'Student',
				count: notifications.filter(
					(n) => n.category.toLowerCase() === 'student' && !n.read
				).length,
			},
			{
				name: 'Instructor',
				count: notifications.filter(
					(n) => n.category.toLowerCase() === 'instructor' && !n.read
				).length,
			},
			{
				name: 'Comments',
				count: notifications.filter(
					(n) => n.category.toLowerCase() === 'comments' && !n.read
				).length,
			},
			{
				name: 'System',
				count: notifications.filter(
					(n) => n.category.toLowerCase() === 'system' && !n.read
				).length,
			},
		];
	}, [notifications]);

	// Filter notifications based on active tab, search term, and read status
	const filteredNotifications = notifications.filter((notification) => {
		// Basic searchable content
		const baseContent = [
			notification.user || '',
			notification.target || '',
			notification.comment || '',
			notification.course?.title || '',
			notification.course?.instructor || '',
		].join(' ');

		// Extra content based on notification type
		let extraContent = '';
		switch (notification.type) {
			case 'comment':
				extraContent = `${notification.user} commented in ${
					notification.target
				} ${notification.comment || ''}`;
				break;
			case 'follow':
				extraContent = `${notification.user} followed you`;
				break;
			case 'enrollment':
				extraContent = `You were enrolled into ${
					notification.course?.title || ''
				} by ${notification.course?.instructor || ''}`;
				break;
			default:
				extraContent = '';
		}

		const searchContent = `${baseContent} ${extraContent}`.toLowerCase();

		// Split search term into words and check if all words are present
		const searchWords = searchTerm
			.toLowerCase()
			.split(/\s+/)
			.filter((word) => word.length > 0);

		return (
			notification.category === activeTab &&
			searchWords.every((word) => searchContent.includes(word)) &&
			(!hideRead || !notification.read)
		);
	});

	const checkScrollPosition = () => {
		if (tabsScrollRef.current) {
			const {scrollLeft, scrollWidth, clientWidth} = tabsScrollRef.current;
			setShowScrollButtons({
				left: scrollLeft > 0,
				right: scrollLeft < scrollWidth - clientWidth,
			});
		}
	};

	// Initialize and add scroll event listener
	useEffect(() => {
		const scrollContainer = tabsScrollRef.current;
		checkScrollPosition(); // Initial check

		const handleResize = () => {
			checkScrollPosition();
		};

		scrollContainer?.addEventListener('scroll', checkScrollPosition);
		window.addEventListener('resize', handleResize);

		return () => {
			scrollContainer?.removeEventListener('scroll', checkScrollPosition);
			window.removeEventListener('resize', handleResize);
		};
	}, [memoizedTabs]); // Re-check when tabs change

		// Handle outside click to close the panel
		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
					setIsPanelOpen(false);
				}
			};
	
			if (isPanelOpen) {
				document.addEventListener('mousedown', handleClickOutside);
			}
	
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [isPanelOpen, setIsPanelOpen]);


	const scrollTabs = (direction: 'left' | 'right') => {
		if (tabsScrollRef.current) {
			const scrollAmount = 200; // Adjust as needed
			tabsScrollRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			});
		}
	};

	// Mark notification as read
	const markAsRead = (id: number) => {
		setNotifications(
			notifications.map((n) => (n.id === id ? {...n, read: true} : n))
		);
	};

	// Dismiss notification
	const dismissNotification = (id: number) => {
		setNotifications(notifications.filter((n) => n.id !== id));
	};

	const handleClose = () => {
		setIsPanelOpen(false);
	};

	if (isMobile) {
		return (
			<>
				<Drawer open={isPanelOpen} onOpenChange={setIsPanelOpen}>
					<DrawerContent className='h-full  !max-h-[100vh]'>
						<DrawerTitle className='hidden'>Notifications</DrawerTitle>
						<DrawerHeader className=''>
							<div className='border-b border-gray-300'>
								<div className='flex justify-between items-center pb-5'>
									<h1 className='text-xl font-semibold text-gray-800'>
										Notifications
									</h1>
									<div className='flex items-center gap-4 h-6'>
										<label className='flex items-center gap-3 text-sm font-semibold text-gray-600'>
											Hide Read
											<div className='relative w-9 h-5'>
												<input
													type='checkbox'
													className='opacity-0 w-0 h-0'
													checked={hideRead}
													onChange={(e) => setHideRead(e.target.checked)}
												/>
												<span
													className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 ${
														hideRead ? 'bg-teal-500' : 'bg-gray-300'
													} rounded-full transition-colors duration-300`}
												>
													<span
														className={`absolute h-4 w-4 bg-white rounded-full left-0.5 bottom-0.5 transition-transform duration-300 ${
															hideRead ? 'transform translate-x-4' : ''
														}`}
													></span>
												</span>
											</div>
										</label>
										<div className='p-2 rounded-md hover:bg-gray-100 cursor-pointer  flex items-center justify-center'>
											<svg
												className='w-6 h-6'
												strokeLinejoin='round'
												strokeLinecap='round'
												strokeWidth='2'
												stroke='currentColor'
												fill='none'
												viewBox='0 0 24 24'
											>
												<path d='M3.5 5.5l1.5 1.5l2.5 -2.5'></path>
												<path d='M3.5 11.5l1.5 1.5l2.5 -2.5'></path>
												<path d='M3.5 17.5l1.5 1.5l2.5 -2.5'></path>
												<path d='M11 6l9 0'></path>
												<path d='M11 12l9 0'></path>
												<path d='M11 18l9 0'></path>
											</svg>
										</div>
									</div>
								</div>

								<div className='relative flex items-center overflow-hidden '>
									<button
										className={`absolute left-1 top-0 z-10 p-0 m-0 w-7 h-7  flex items-center justify-center text-gray-600 hover:text-gray-800 bg-white bg-opacity-90 ${
											showScrollButtons.left ? 'flex' : 'hidden'
										}`}
										onClick={() => scrollTabs('left')}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='28'
											height='28'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										>
											<path d='M15 18l-6-6 6-6'></path>
										</svg>
									</button>
									<div
										className='flex gap-2 overflow-x-scroll no-scrollbar  scroll-smooth  pb-4'
										ref={tabsScrollRef}
									>
										{memoizedTabs.map((tab) => (
											<button
												key={tab.name}
												className={`px-2.5 py-2 rounded-full text-sm font-semibold no-scrollbar flex items-center gap-1.5 whitespace-nowrap transition-all ${
													activeTab === tab.name
														? 'bg-[var(--teal-color)] text-white'
														: 'text-gray-600 hover:bg-gray-200'
												}`}
												onClick={() => setActiveTab(tab.name)}
											>
												{tab.name}
												<span
													className={`${
														activeTab === tab.name
															? 'bg-[rgba(255,255,255,0.2)] text-white'
															: 'bg-gray-100 text-gray-600'
													} px-2 py-0.5 rounded-full text-xs font-semibold`}
												>
													{tab.count}
												</span>
											</button>
										))}
									</div>
									<button
										className={`absolute right-1 top-0 z-10 p-0 m-0 w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-800 bg-white bg-opacity-90 ${
											showScrollButtons.right ? 'flex' : 'hidden'
										}`}
										onClick={() => scrollTabs('right')}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='28'
											height='28'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										>
											<path d='M9 6l6 6-6 6'></path>
										</svg>
									</button>
								</div>
							</div>
						</DrawerHeader>
						<div className='relative px-4 pb-4'>
							<input
								type='text'
								className='w-full py-3 px-10 rounded-lg border-2 border-transparent bg-gray-100 text-sm text-gray-600 focus:outline-none focus:border-teal-500 focus:bg-white transition-all'
								placeholder='Filter messages'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<svg
								className='absolute left-8 top-6 -translate-y-1/2 w-4 h-4 text-gray-400'
								viewBox='1 1 60 60'
							>
								<path d='M27.765 42.244c-8.614 0-15.622-7.008-15.622-15.622S19.151 11 27.765 11s15.622 7.008 15.622 15.622-7.007 15.622-15.622 15.622zm0-28.398c-7.045 0-12.775 5.73-12.775 12.775s5.73 12.775 12.775 12.775 12.775-5.73 12.775-12.775-5.73-12.775-12.775-12.775z'></path>
								<path d='M34.869 39.146l4.014-3.738 9.286 9.114a3.164 3.164 0 01-.07 4.562l-.071.066a3.163 3.163 0 01-4.561-.257l-8.598-9.747zM27.77 34.173c-2.882 0-5.412-.876-7.656-2.526a1.002 1.002 0 01-.35-.81c.008-.461.445-.969 1.02-.959.284.005.493.153.713.308 1.837 1.302 3.832 1.971 6.275 1.971 1.875 0 4.492-.476 6.314-2.118a.98.98 0 01.638-.261.92.92 0 01.686.241c.222.209.33.527.336.735a1.02 1.02 0 01-.318.775c-1.333 1.237-4.262 2.644-7.658 2.644z'></path>
							</svg>
							{searchTerm && (
								<button
									className='absolute right-10 top-6 -translate-y-1/2 p-1 rounded-full hover:bg-gray-300 transition-colors'
									onClick={() => setSearchTerm('')}
								>
									<svg fill='none' viewBox='0 0 12 12' width='12' height='12'>
										<path
											fill='currentColor'
											d='M7.46875 6L10.8438 2.65625C11.0312 2.46875 11.0312 2.125 10.8438 1.9375L10.0625 1.15625C9.875 0.96875 9.53125 0.96875 9.34375 1.15625L6 4.53125L2.625 1.15625C2.4375 0.96875 2.09375 0.96875 1.90625 1.15625L1.125 1.9375C0.9375 2.125 0.9375 2.46875 1.125 2.65625L4.5 6L1.125 9.375C0.9375 9.5625 0.9375 9.90625 1.125 10.0938L1.90625 10.875C2.09375 11.0625 2.4375 11.0625 2.625 10.875L6 7.5L9.34375 10.875C9.53125 11.0625 9.875 11.0625 10.0625 10.875L10.8438 10.0938C11.0312 9.90625 11.0312 9.5625 10.8438 9.375L7.46875 6Z'
										></path>
									</svg>
								</button>
							)}
						</div>

						{/* Notifications */}
						<div className='flex-1 overflow-y-auto px-4'>
							{filteredNotifications.map((notification) => (
								<div
									key={notification.id}
									className='flex gap-4 py-4 border-b border-gray-300 relative group'
								>
									<div className='w-10 h-10 rounded-full overflow-hidden flex-shrink-0'>
										<Image
											src={notification.avatar}
											alt='User'
											width={40}
											height={40}
											className='object-cover w-full h-full'
										/>
									</div>
									<div className='flex-1 min-w-0'>
										<div className='text-sm leading-6 mb-1'>
											<NotificationRenderer notification={notification} />
										</div>
										<div className='flex justify-between text-xs text-gray-500'>
											<span>{notification.meta.date}</span>
											<span>{notification.meta.timeAgo}</span>
										</div>
									</div>
									<div className='absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
										{!notification.read && (
											<div className='w-2 h-2 rounded-full bg-blue-500'></div>
										)}
										<button
											className='p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors'
											onClick={() => markAsRead(notification.id)}
										>
											<svg
												viewBox='0 0 256 256'
												fill='currentColor'
												height='16'
												width='16'
											>
												<path d='M149.61,85.71l-89.6,88a8,8,0,0,1-11.22,0L10.39,136a8,8,0,1,1,11.22-11.41L54.4,156.79l84-82.5a8,8,0,1,1,11.22,11.42Zm96.1-11.32a8,8,0,0,0-11.32-.1l-84,82.5-18.83-18.5a8,8,0,0,0-11.21,11.42l24.43,24a8,8,0,0,0,11.22,0l89.6-88A8,8,0,0,0,245.71,74.39Z'></path>
											</svg>
										</button>
										<button
											className='p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors'
											onClick={() => dismissNotification(notification.id)}
										>
											<svg
												fill='none'
												viewBox='0 0 12 12'
												width='12'
												height='12'
											>
												<path
													fill='currentColor'
													d='M7.46875 6L10.8438 2.65625C11.0312 2.46875 11.0312 2.125 10.8438 1.9375L10.0625 1.15625C9.875 0.96875 9.53125 0.96875 9.34375 1.15625L6 4.53125L2.625 1.15625C2.4375 0.96875 2.09375 0.96875 1.90625 1.15625L1.125 1.9375C0.9375 2.125 0.9375 2.46875 1.125 2.65625L4.5 6L1.125 9.375C0.9375 9.5625 0.9375 9.90625 1.125 10.0938L1.90625 10.875C2.09375 11.0625 2.4375 11.0625 2.625 10.875L6 7.5L9.34375 10.875C9.53125 11.0625 9.875 11.0625 10.0625 10.875L10.8438 10.0938C11.0312 9.90625 11.0312 9.5625 10.8438 9.375L7.46875 6Z'
												></path>
											</svg>
										</button>
									</div>
								</div>
							))}
						</div>
					</DrawerContent>
				</Drawer>
			</>
		);
	}

	return (
		<div
			onMouseEnter={() => {
				document.body.style.overflow = 'hidden';
			}}
			onMouseLeave={() => {
				document.body.style.overflow = '';
			}}
			ref={panelRef} 
			className={`fixed top-[65px] right-0 w-[var(--panel-width)] h-[calc(100%-67px)] bg-white shadow-lg flex flex-col transform ${
				isPanelOpen ? 'translate-x-0' : 'translate-x-full'
			} transition-transform duration-300 ease-in-out z-10`}
		>
			{/* Header  */}
			<div className='border-b border-gray-300'>
				<div className='flex justify-between items-center p-6 pb-5'>
					<h1 className='text-xl font-semibold text-gray-800'>Notifications</h1>
					<div className='flex items-center gap-4 h-6'>
						<label className='flex items-center gap-3 text-sm font-semibold text-gray-600'>
							Hide Read
							<div className='relative w-9 h-5'>
								<input
									type='checkbox'
									className='opacity-0 w-0 h-0'
									checked={hideRead}
									onChange={(e) => setHideRead(e.target.checked)}
								/>
								<span
									className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 ${
										hideRead ? 'bg-teal-500' : 'bg-gray-300'
									} rounded-full transition-colors duration-300`}
								>
									<span
										className={`absolute h-4 w-4 bg-white rounded-full left-0.5 bottom-0.5 transition-transform duration-300 ${
											hideRead ? 'transform translate-x-4' : ''
										}`}
									></span>
								</span>
							</div>
						</label>
						<div className='p-2 rounded-md hover:bg-gray-100 cursor-pointer  flex items-center justify-center'>
							<svg
								className='w-6 h-6'
								strokeLinejoin='round'
								strokeLinecap='round'
								strokeWidth='2'
								stroke='currentColor'
								fill='none'
								viewBox='0 0 24 24'
							>
								<path d='M3.5 5.5l1.5 1.5l2.5 -2.5'></path>
								<path d='M3.5 11.5l1.5 1.5l2.5 -2.5'></path>
								<path d='M3.5 17.5l1.5 1.5l2.5 -2.5'></path>
								<path d='M11 6l9 0'></path>
								<path d='M11 12l9 0'></path>
								<path d='M11 18l9 0'></path>
							</svg>
						</div>
						<div className='p-2 rounded-md hover:bg-gray-100 cursor-pointer  flex items-center justify-center'>
							<svg
								className='w-6 h-6'
								strokeLinejoin='round'
								strokeLinecap='round'
								strokeWidth='2'
								stroke='currentColor'
								fill='none'
								viewBox='0 0 24 24'
							>
								<path d='M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z'></path>
								<path d='M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0'></path>
							</svg>
						</div>
						<button
							onClick={handleClose}
							className='p-2 rounded-md hover:bg-gray-100 cursor-pointer  flex items-center justify-center'
						>
							<svg className='w-5 h-5' fill='none' viewBox='0 0 15 15'>
								<path
									clipRule='evenodd'
									fillRule='evenodd'
									fill='currentColor'
									d='M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z'
								></path>
							</svg>
						</button>
					</div>
				</div>

				<div className='relative flex items-center overflow-hidden '>
					<button
						className={`absolute left-1 top-0 z-10 p-0 m-0 w-7 h-7  flex items-center justify-center text-gray-600 hover:text-gray-800 bg-white bg-opacity-90 ${
							showScrollButtons.left ? 'flex' : 'hidden'
						}`}
						onClick={() => scrollTabs('left')}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='28'
							height='28'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='M15 18l-6-6 6-6'></path>
						</svg>
					</button>
					<div
						className='flex gap-2 overflow-x-scroll no-scrollbar  scroll-smooth px-6 pb-4'
						ref={tabsScrollRef}
					>
						{memoizedTabs.map((tab) => (
							<button
								key={tab.name}
								className={`px-2.5 py-2 rounded-full text-sm font-semibold no-scrollbar flex items-center gap-1.5 whitespace-nowrap transition-all ${
									activeTab === tab.name
										? 'bg-[var(--teal-color)] text-white'
										: 'text-gray-600 hover:bg-gray-200'
								}`}
								onClick={() => setActiveTab(tab.name)}
							>
								{tab.name}
								<span
									className={`${
										activeTab === tab.name
											? 'bg-[rgba(255,255,255,0.2)] text-white'
											: 'bg-gray-100 text-gray-600'
									} px-2 py-0.5 rounded-full text-xs font-semibold`}
								>
									{tab.count}
								</span>
							</button>
						))}
					</div>
					<button
						className={`absolute right-1 top-0 z-10 p-0 m-0 w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-800 bg-white bg-opacity-90 ${
							showScrollButtons.right ? 'flex' : 'hidden'
						}`}
						onClick={() => scrollTabs('right')}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='28'
							height='28'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='M9 6l6 6-6 6'></path>
						</svg>
					</button>
				</div>
			</div>

			{/* Search  */}
			<div className='relative px-6 py-4'>
				<input
					type='text'
					className='w-full py-3 px-10 rounded-lg border-2 border-transparent bg-gray-100 text-sm text-gray-600 focus:outline-none focus:border-teal-500 focus:bg-white transition-all'
					placeholder='Filter messages'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<svg
					className='absolute left-10 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400'
					viewBox='1 1 60 60'
				>
					<path d='M27.765 42.244c-8.614 0-15.622-7.008-15.622-15.622S19.151 11 27.765 11s15.622 7.008 15.622 15.622-7.007 15.622-15.622 15.622zm0-28.398c-7.045 0-12.775 5.73-12.775 12.775s5.73 12.775 12.775 12.775 12.775-5.73 12.775-12.775-5.73-12.775-12.775-12.775z'></path>
					<path d='M34.869 39.146l4.014-3.738 9.286 9.114a3.164 3.164 0 01-.07 4.562l-.071.066a3.163 3.163 0 01-4.561-.257l-8.598-9.747zM27.77 34.173c-2.882 0-5.412-.876-7.656-2.526a1.002 1.002 0 01-.35-.81c.008-.461.445-.969 1.02-.959.284.005.493.153.713.308 1.837 1.302 3.832 1.971 6.275 1.971 1.875 0 4.492-.476 6.314-2.118a.98.98 0 01.638-.261.92.92 0 01.686.241c.222.209.33.527.336.735a1.02 1.02 0 01-.318.775c-1.333 1.237-4.262 2.644-7.658 2.644z'></path>
				</svg>
				{searchTerm && (
					<button
						className='absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-300 transition-colors'
						onClick={() => setSearchTerm('')}
					>
						<svg fill='none' viewBox='0 0 12 12' width='12' height='12'>
							<path
								fill='currentColor'
								d='M7.46875 6L10.8438 2.65625C11.0312 2.46875 11.0312 2.125 10.8438 1.9375L10.0625 1.15625C9.875 0.96875 9.53125 0.96875 9.34375 1.15625L6 4.53125L2.625 1.15625C2.4375 0.96875 2.09375 0.96875 1.90625 1.15625L1.125 1.9375C0.9375 2.125 0.9375 2.46875 1.125 2.65625L4.5 6L1.125 9.375C0.9375 9.5625 0.9375 9.90625 1.125 10.0938L1.90625 10.875C2.09375 11.0625 2.4375 11.0625 2.625 10.875L6 7.5L9.34375 10.875C9.53125 11.0625 9.875 11.0625 10.0625 10.875L10.8438 10.0938C11.0312 9.90625 11.0312 9.5625 10.8438 9.375L7.46875 6Z'
							></path>
						</svg>
					</button>
				)}
			</div>

			{/* Notifications */}
			<div className='flex-1 overflow-y-auto no-scrollbar px-6'>
				{filteredNotifications.map((notification) => (
					<div
						key={notification.id}
						className='flex gap-4 py-4 border-b border-gray-300 relative group'
					>
						<div className='w-10 h-10 rounded-full overflow-hidden flex-shrink-0'>
							<Image
								src={notification.avatar}
								alt='User'
								width={40}
								height={40}
								className='object-cover w-full h-full'
							/>
						</div>
						<div className='flex-1 min-w-0'>
							<div className='text-sm leading-6 mb-1 relative'>
								<NotificationRenderer notification={notification} />
								<div className='absolute top-0.5 right-1 flex items-center gap-2'>
									<div
										className={` flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${
											!notification.read ? 'right-5' : 'right-1'
										}`}
									>
										<button
											className='p-px rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-600 transition-colors'
											onClick={() => markAsRead(notification.id)}
										>
											<svg
												viewBox='0 0 256 256'
												fill='currentColor'
												height='18'
												width='18'
											>
												<path d='M149.61,85.71l-89.6,88a8,8,0,0,1-11.22,0L10.39,136a8,8,0,1,1,11.22-11.41L54.4,156.79l84-82.5a8,8,0,1,1,11.22,11.42Zm96.1-11.32a8,8,0,0,0-11.32-.1l-84,82.5-18.83-18.5a8,8,0,0,0-11.21,11.42l24.43,24a8,8,0,0,0,11.22,0l89.6-88A8,8,0,0,0,245.71,74.39Z'></path>
											</svg>
										</button>
										<button
											className='p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-600 transition-colors'
											onClick={() => dismissNotification(notification.id)}
										>
											<svg
												fill='none'
												viewBox='0 0 12 12'
												width='12'
												height='12'
											>
												<path
													fill='currentColor'
													d='M7.46875 6L10.8438 2.65625C11.0312 2.46875 11.0312 2.125 10.8438 1.9375L10.0625 1.15625C9.875 0.96875 9.53125 0.96875 9.34375 1.15625L6 4.53125L2.625 1.15625C2.4375 0.96875 2.09375 0.96875 1.90625 1.15625L1.125 1.9375C0.9375 2.125 0.9375 2.46875 1.125 2.65625L4.5 6L1.125 9.375C0.9375 9.5625 0.9375 9.90625 1.125 10.0938L1.90625 10.875C2.09375 11.0625 2.4375 11.0625 2.625 10.875L6 7.5L9.34375 10.875C9.53125 11.0625 9.875 11.0625 10.0625 10.875L10.8438 10.0938C11.0312 9.90625 11.0312 9.5625 10.8438 9.375L7.46875 6Z'
												></path>
											</svg>
										</button>
									</div>
									{!notification.read && (
										<div className='w-2 h-2 rounded-full bg-blue-500'></div>
									)}
								</div>
							</div>
							<div className='flex justify-between text-xs text-gray-500'>
								<span>{notification.meta.date}</span>
								<span>{notification.meta.timeAgo}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

interface Notification {
	id: number;
	type: string;
	category: string;
	read: boolean;
	avatar: string;
	user?: string;
	target?: string;
	comment?: string;
	course?: {
		title: string;
		instructor: string;
		image: string | StaticImageData;
	};
	meta: {
		date: string;
		timeAgo: string;
	};
}

const NotificationRenderer = ({notification}: {notification: Notification}) => {
	switch (notification.type) {
		case 'comment':
			return (
				<div className='max-w-[80%]'>
					<span className='font-semibold text-gray-800'>
						{notification.user}
					</span>{' '}
					commented in{' '}
					<span className='font-semibold text-gray-800'>
						{notification.target}
					</span>
					{notification.comment && (
						<div className='bg-gray-100 p-3 rounded-lg my-2 text-sm text-gray-600'>
							{notification.comment}
						</div>
					)}
				</div>
			);

		case 'follow':
			return (
				<div className='max-w-[80%]'>
					<span className='font-semibold text-gray-800 '>
						{notification.user}
					</span>{' '}
					followed you
				</div>
			);

		case 'enrollment':
			return (
				<>
					<div className='max-w-[80%]'>
						<span className='font-semibold text-gray-800'>You</span>{' '}
						<span className='text-gray-800'>were enrolled into </span>
						<Link href='#' className='text-blue-500 underline font-semibold'>
							{notification.course?.title}
						</Link>
					</div>
					<div className='flex items-center gap-3 bg-gray-100 p-3 rounded-lg my-2'>
						<Image
							src={notification.course?.image || '/default-image.jpg'}
							alt='Course'
							width={48}
							height={48}
							className='object-cover rounded'
						/>
						<div>
							<div className='font-semibold text-gray-800'>
								{notification.course?.title}
							</div>
							<div className='text-xs text-gray-500'>
								by {notification.course?.instructor}
							</div>
						</div>
					</div>
				</>
			);

		// Add cases for other notification types
		default:
			return <div>Unknown notification type</div>;
	}
};

export default NotificationsPanel;

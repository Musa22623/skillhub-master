/** @format */
'use client';
import type React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
	Activity,
	ArrowRight,
	Bell,
	BookOpen,
	Bookmark,
	Clock,
	CreditCard,
	Headphones,
	LogOut,
	type LucideIcon,
	Settings,
	Shield,
	User,
	Users,
} from 'lucide-react';
import ProfileImg from '@/../public/img/person.jpeg';
import {useState} from 'react';
import ContactFormPopup from '../../Header/ContactPopup/ContactFormPopup';
import NotificationsPanel from '../../Header/NotificationPanel';

export default function ProfileTab() {
	const [openSupportForm, setOpenSupportForm] = useState(false);
	const [openNotificationForm, setOpenNotificationForm] = useState(false);

	const handleNotificationClick = (): void => {
		setOpenNotificationForm((prev) => !prev);
	};

	const handleSupportClick = (): void => {
		setOpenSupportForm((prev) => !prev);
	};
	return (
		<div className=' w-full bg-white overflow-auto rounded-5xl shadow-lg mb-17'>
			{/* Header */}

			<div className='p-6 text-center bg-white border-b border-gray-100'>
				<div>
					{' '}
					<Image
						src={ProfileImg}
						alt='User Avatar'
						width={80}
						height={80}
						className='mx-auto mb-3 rounded-full border-2 border-gray-100'
					/>
					<h1 className='text-xl font-semibold text-gray-900 mb-1'>
						Steve Harbra
					</h1>
					<p className='text-sm text-gray-600 mb-3'>steve.harbra@example.com</p>
					<div className='inline-block px-3 py-1.5 bg-gray-100 rounded-xl text-xs text-gray-600 mb-4'>
						Professional until April 30, 2024
					</div>
				</div>
				<button className='bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors'>
					Edit Profile
				</button>
			</div>

			{/* Menu Sections */}
			<div className='py-4'>
				<h2 className='px-5 text-base font-semibold text-gray-900 mb-2'>
					General
				</h2>

				<MenuItem icon={User} label='Preferences' href='/account/preferences' />
				<MenuItem
					icon={Bell}
					label='Notifications'
					href='#'
					handleClick={handleNotificationClick}
				/>
				<MenuItem icon={Settings} label='Settings' href='#' />

				<div className='h-2 bg-gray-100 my-2'></div>

				<h2 className='px-5 text-base font-semibold text-gray-900 mb-2'>
					Account & Security
				</h2>

				<MenuItem
					icon={User}
					label='Account Details'
					href='/account/account-detail'
				/>
				<MenuItem
					icon={Shield}
					label='Sign In & Security'
					href='/account/signin-security'
				/>

				<div className='h-2 bg-gray-100 my-2'></div>

				<h2 className='px-5 text-base font-semibold text-gray-900 mb-2'>
					Billing & Support
				</h2>

				<MenuItem icon={CreditCard} label='Billing' href='/account/billing' />
				<MenuItem
					icon={Headphones}
					label='Support'
					href='#'
					handleClick={handleSupportClick}
				/>

				<div className='h-2 bg-gray-100 my-2'></div>

				<h2 className='px-5 text-base font-semibold text-gray-900 mb-2'>
					Additional Features
				</h2>

				<MenuItem
					icon={BookOpen}
					label='My Learning'
					href='/student/my-learning'
				/>
				<MenuItem
					icon={Activity}
					label='Learner Report'
					href='/student/learner-report'
				/>
				<MenuItem
					icon={Bookmark}
					label='Bookmarks'
					href='/student/studentbookmark'
				/>
				<MenuItem icon={Clock} label='Listen History' href='#' />
				<MenuItem icon={Users} label='Team' href='/account/team' />

				<div className='h-2 bg-gray-100 my-2'></div>

				<MenuItem icon={LogOut} label='Logout' href='#' />
			</div>

			{/* Footer */}
			<div className='p-5 bg-gray-50 border-t border-gray-100'>
				<div className='flex items-center justify-between mb-4'>
					<span className='text-xs font-semibold text-gray-600'>Download</span>
					<div className='flex gap-3'>
						<Link
							href='#'
							className='flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800'
						>
							<svg className='w-3.5 h-3.5' viewBox='0 0 384 512'>
								<path
									fill='currentColor'
									d='M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z'
								/>
							</svg>
							iOS
						</Link>
						<Link
							href='#'
							className='flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800'
						>
							<svg className='w-3.5 h-3.5' viewBox='0 0 576 512'>
								<path
									fill='currentColor'
									d='M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55'
								/>
							</svg>
							Android
						</Link>
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<span className='text-xs font-semibold text-gray-600'>Connect</span>
					<div className='flex gap-3'>
						<SocialLink href='#'>
							<svg className='w-4 h-4' viewBox='0 0 24 24'>
								<path
									fill='currentColor'
									d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
								/>
							</svg>
						</SocialLink>
						<SocialLink href='#'>
							<svg className='w-4 h-4' viewBox='0 0 24 24'>
								<path
									fill='currentColor'
									d='M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z'
								/>
							</svg>
						</SocialLink>
						<SocialLink href='#'>
							<svg className='w-4 h-4' viewBox='0 0 24 24'>
								<path
									fill='currentColor'
									d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
								/>
							</svg>
						</SocialLink>
						<SocialLink href='#'>
							<svg className='w-4 h-4' viewBox='0 0 24 24'>
								<path
									fill='currentColor'
									d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z'
								/>
							</svg>
						</SocialLink>
					</div>
				</div>
			</div>

			<ContactFormPopup
				isOpen={openSupportForm}
				setIsOpen={setOpenSupportForm}
			/>
			<NotificationsPanel
				isPanelOpen={openNotificationForm}
				setIsPanelOpen={setOpenNotificationForm}
			/>
		</div>
	);
}

interface MenuItemProps {
	icon: LucideIcon;
	label: string;
	href: string;
	handleClick?: () => void;
}

function MenuItem({icon: Icon, label, href, handleClick}: MenuItemProps) {
	const handleClickWrapper = (e: React.MouseEvent) => {
		if (handleClick) {
			e.preventDefault(); // Only prevent default if we have a click handler
			handleClick();
		}
		// Otherwise, let Next.js handle the navigation normally
	};
	return (
		<Link
			href={href}
			className='flex items-center px-5 py-3 text-gray-800 hover:bg-gray-50 transition-colors'
			onClick={handleClickWrapper}
		>
			<Icon className='w-5 h-5 text-gray-600 mr-3' />
			<span className='text-sm flex-1'>{label}</span>
			<ArrowRight className='w-4 h-4 text-gray-400' />
		</Link>
	);
}

interface SocialLinkProps {
	href: string;
	children: React.ReactNode;
}

function SocialLink({href, children}: SocialLinkProps) {
	return (
		<Link
			href={href}
			className='w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors'
		>
			{children}
		</Link>
	);
}

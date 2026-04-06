/** @format */
import Link from 'next/link';
import {useEffect, useRef} from 'react';

interface AvatarTooltipProps {
	setShowContactForm: (prop: boolean) => void;
	closeMenu: () => void;
}

const AvatarTooltip = ({closeMenu, setShowContactForm}: AvatarTooltipProps) => {
	const handleSupportClick = () => {
		setShowContactForm(true);
		closeMenu();
	};

	const tooltipRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				tooltipRef.current &&
				!tooltipRef.current.contains(event.target as Node)
			) {
				closeMenu();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [closeMenu]);

	return (
		<div ref={tooltipRef}  className="w-[280px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] font-sans overflow-hidden absolute top-[60px] right-[20px] animate-tooltipFade before:content-[''] before:absolute before:top-[-8px] before:right-[20px] before:w-4 before:h-4 before:bg-white before:rotate-45 before:shadow-[-2px_-2px_5px_rgba(0,0,0,0.04)]">
			{/* Top Section */}
			<div className='p-4'>
				<h3 className='text-base font-semibold text-gray-900 m-0 mb-1'>
					Daniel Lopez
				</h3>
				<p className='text-sm text-gray-600 m-0 mb-3'>daniellopez@gmail.com</p>
				<div className='text-xs text-gray-600 bg-gray-100 py-1.5 px-3 rounded-md inline-block'>
					Professional until Apr 30, 2024
				</div>
			</div>

			{/* Menu Section */}
			<div className='border-t border-gray-200 py-2'>
				{/* Preferences */}
				<Link
					href='/account/preferences'
					className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all duration-200 relative overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gray-200 after:transition-all after:duration-200 hover:after:w-full"
					onClick={closeMenu}
				>
					<svg
						fill='none'
						viewBox='0 0 24 24'
						className='w-6 h-6 min-w-[24px] mr-3 text-gray-600 group-hover:text-gray-800'
					>
						<path
							fill='currentColor'
							d='M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7ZM19.0277 15.6255C18.6859 15.5646 18.1941 15.6534 17.682 16.1829C17.4936 16.3777 17.2342 16.4877 16.9632 16.4877C16.6922 16.4877 16.4328 16.3777 16.2444 16.1829C15.7322 15.6534 15.2405 15.5646 14.8987 15.6255C14.5381 15.6897 14.2179 15.9384 14.0623 16.3275C13.8048 16.9713 13.9014 18.662 16.9632 20.4617C20.0249 18.662 20.1216 16.9713 19.864 16.3275C19.7084 15.9384 19.3882 15.6897 19.0277 15.6255ZM21.721 15.5847C22.5748 17.7191 21.2654 20.429 17.437 22.4892C17.1412 22.6484 16.7852 22.6484 16.4893 22.4892C12.6609 20.4291 11.3516 17.7191 12.2053 15.5847C12.6117 14.5689 13.4917 13.8446 14.5481 13.6565C15.3567 13.5125 16.2032 13.6915 16.9632 14.1924C17.7232 13.6915 18.5697 13.5125 19.3783 13.6565C20.4347 13.8446 21.3147 14.5689 21.721 15.5847ZM9.92597 14.2049C10.1345 14.7163 9.889 15.2999 9.3776 15.5084C7.06131 16.453 5.5 18.5813 5.5 20.9999C5.5 21.5522 5.05228 21.9999 4.5 21.9999C3.94772 21.9999 3.5 21.5522 3.5 20.9999C3.5 17.6777 5.641 14.8723 8.6224 13.6565C9.1338 13.448 9.71743 13.6935 9.92597 14.2049Z'
							clipRule='evenodd'
							fillRule='evenodd'
						/>
					</svg>
					<span className='text-sm font-normal leading-snug'>Preferences</span>
				</Link>

				{/* Account Details */}
				<Link
					href='/account/account-detail'
					className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all duration-200 relative overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gray-200 after:transition-all after:duration-200 hover:after:w-full"
					onClick={closeMenu}
				>
					<svg
						viewBox='0 0 24 24'
						className='w-6 h-6 min-w-[24px] mr-3 text-gray-600 group-hover:text-gray-800'
					>
						<path
							fill='currentColor'
							d='M14 12.5C14 13.6046 13.1046 14.5 12 14.5C10.8954 14.5 10 13.6046 10 12.5C10 11.3954 10.8954 10.5 12 10.5C13.1046 10.5 14 11.3954 14 12.5Z'
						/>
						<path
							fill='currentColor'
							d='M12 17.25C11.7265 17.25 11.3186 17.3871 10.6823 17.9811C10.2786 18.3579 9.64578 18.3361 9.26894 17.9323C8.89211 17.5286 8.91393 16.8958 9.31768 16.5189C10.1099 15.7795 10.9878 15.25 12 15.25C13.0122 15.25 13.8901 15.7795 14.6823 16.5189C15.0861 16.8958 15.1079 17.5286 14.7311 17.9323C14.3542 18.3361 13.7214 18.3579 13.3177 17.9811C12.6814 17.3871 12.2735 17.25 12 17.25Z'
							clipRule='evenodd'
							fillRule='evenodd'
						/>
						<path
							fill='currentColor'
							d='M4 5C4 3.34315 5.34315 2 7 2H17C18.6569 2 20 3.34315 20 5V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V5ZM7 4C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V5C18 4.44772 17.5523 4 17 4H7Z'
							clipRule='evenodd'
							fillRule='evenodd'
						/>
						<path
							fill='currentColor'
							d='M9 7C9 6.44772 9.44772 6 10 6H14C14.5523 6 15 6.44772 15 7C15 7.55228 14.5523 8 14 8H10C9.44772 8 9 7.55228 9 7Z'
							clipRule='evenodd'
							fillRule='evenodd'
						/>
					</svg>
					<span className='text-sm font-normal leading-snug'>
						Account Details
					</span>
				</Link>

				{/* Billing */}
				<Link
					href='/account/billing'
					className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all duration-200 relative overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gray-200 after:transition-all after:duration-200 hover:after:w-full"
					onClick={closeMenu}
				>
					<svg
						fill='none'
						viewBox='0 0 24 24'
						className='w-6 h-6 min-w-[24px] mr-3 text-gray-600 group-hover:text-gray-800'
					>
						<path
							fill='currentColor'
							d='M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM12 20.5C7.30781 20.5 3.5 16.6922 3.5 12C3.5 7.30781 7.30781 3.5 12 3.5C16.6922 3.5 20.5 7.30781 20.5 12C20.5 16.6922 16.6922 20.5 12 20.5Z'
						/>
						<path
							fill='currentColor'
							d='M12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7Z'
						/>
						<path
							fill='currentColor'
							d='M8 15.5C7.44772 15.5 7 15.9477 7 16.5C7 17.0523 7.44772 17.5 8 17.5H16C16.5523 17.5 17 17.0523 17 16.5C17 15.9477 16.5523 15.5 16 15.5H8Z'
						/>
					</svg>
					<span className='text-sm font-normal leading-snug'>Billing</span>
				</Link>

				{/* Sign In & Security */}
				<Link
					href='/account/signin-security'
					className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all duration-200 relative overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gray-200 after:transition-all after:duration-200 hover:after:w-full"
					onClick={closeMenu}
				>
					<svg
						viewBox='0 0 24 24'
						className='w-6 h-6 min-w-[24px] mr-3 text-gray-600 group-hover:text-gray-800'
					>
						<path
							fill='currentColor'
							d='M12 2C9.23858 2 7 4.23858 7 7V9C5.89543 9 5 9.89543 5 11V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V11C19 9.89543 18.1046 9 17 9V7C17 4.23858 14.7614 2 12 2ZM9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7V9H9V7Z'
						/>
						<circle cx='12' cy='15' r='2' fill='white' />
					</svg>
					<span className='text-sm font-normal leading-snug'>
						Sign In & Security
					</span>
				</Link>

				{/* Support */}
				<button
					onClick={handleSupportClick}
					className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all duration-200 relative overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gray-200 after:transition-all after:duration-200 hover:after:w-full w-full"
				>
					<svg
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						fill='none'
						className='w-6 h-6 min-w-[24px] mr-3 text-gray-600 group-hover:text-gray-800'
					>
						<path
							d='M9.984 9A2.248 2.248 0 0 1 12 7.75a2.25 2.25 0 0 1 1.579 3.853c-.5.493-1.108 1.025-1.402 1.65M12 16.25v.01m0 2.99a7.25 7.25 0 1 1 0-14.5 7.25 7.25 0 0 1 0 14.5Z'
							strokeLinejoin='round'
							strokeLinecap='round'
						/>
					</svg>
					<span className='text-sm font-normal leading-snug'>Support</span>
				</button>

				{/* Request New Content */}
				<Link
					href='#'
					className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all duration-200 relative overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gray-200 after:transition-all after:duration-200 hover:after:w-full"
					onClick={closeMenu}
				>
					<svg
						viewBox='0 0 24 24'
						width='24'
						height='24'
						stroke='currentColor'
						strokeWidth='2'
						fill='none'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='w-6 h-6 min-w-[24px] mr-3 text-gray-600 group-hover:text-gray-800'
					>
						<path d='M4 4h6v6h-6z'></path>
						<path d='M14 4h6v6h-6z'></path>
						<path d='M4 14h6v6h-6z'></path>
						<path d='M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'></path>
					</svg>
					<span className='text-sm font-normal leading-snug'>
						Request New Content
					</span>
				</Link>

				{/* Team */}
				<Link
					href='/account/team'
					className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all duration-200 relative overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gray-200 after:transition-all after:duration-200 hover:after:w-full"
					onClick={closeMenu}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 512 512'
						className='w-6 h-6 min-w-[24px] mr-3 text-gray-600 group-hover:text-gray-800'
					>
						<path
							fill='currentColor'
							d='M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208-93.31 208-208 208zm0-384c-97 0-176 79-176 176s79 176 176 176 176-78.95 176-176S353.05 80 256 80z'
						/>
						<path
							fill='currentColor'
							d='M323.67 292c-17.4 0-34.21-7.72-47.34-21.73a83.76 83.76 0 01-22-51.32c-1.47-20.7 4.88-39.75 17.88-53.62S303.38 144 323.67 144c20.14 0 38.37 7.62 51.33 21.46s19.47 33 18 53.51a84 84 0 01-22 51.3C357.86 284.28 341.06 292 323.67 292zm55.81-74zm-215.66 77.36c-29.76 0-55.93-27.51-58.33-61.33-1.23-17.32 4.15-33.33 15.17-45.08s26.22-18 43.15-18 32.12 6.44 43.07 18.14 16.5 27.82 15.25 45c-2.44 33.77-28.6 61.27-58.31 61.27zm256.55 59.92c-1.59-4.7-5.46-9.71-13.22-14.46-23.46-14.33-52.32-21.91-83.48-21.91-30.57 0-60.23 7.9-83.53 22.25-26.25 16.17-43.89 39.75-51 68.18-1.68 6.69-4.13 19.14-1.51 26.11a192.18 192.18 0 00232.75-80.17zm-256.74 46.09c7.07-28.21 22.12-51.73 45.47-70.75a8 8 0 00-2.59-13.77c-12-3.83-25.7-5.88-42.69-5.88-23.82 0-49.11 6.45-68.14 18.17-5.4 3.33-10.7 4.61-14.78 5.75a192.84 192.84 0 0077.78 86.64l1.79-.14a102.82 102.82 0 013.16-20.02z'
						/>
					</svg>
					<span className='text-sm font-normal leading-snug'>Team</span>
				</Link>

				{/* Highlighters */}
				<Link
					href='#'
					className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all duration-200 relative overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gray-200 after:transition-all after:duration-200 hover:after:w-full"
					onClick={closeMenu}
				>
					<svg
						strokeWidth='1.5'
						stroke='currentColor'
						fill='none'
						viewBox='0 0 24 24'
						className='w-6 h-6 min-w-[24px] mr-3 text-gray-600 group-hover:text-gray-800'
					>
						<path
							d='M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z'
							strokeLinejoin='round'
							strokeLinecap='round'
						/>
						<path d='M16 7h4' strokeLinejoin='round' strokeLinecap='round' />
						<path
							d='M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3'
							strokeLinejoin='round'
							strokeLinecap='round'
						/>
					</svg>
					<span className='text-sm font-normal leading-snug'>Highlighters</span>
				</Link>
			</div>

			{/* Logout Section */}
			<div className='border-t border-gray-200 py-2'>
				<a
					href='#'
					className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all duration-200 relative overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gray-200 after:transition-all after:duration-200 hover:after:w-full"
				>
					<svg
						viewBox='0 0 24 24'
						className='w-6 h-6 min-w-[24px] mr-3 text-gray-600 group-hover:text-gray-800'
					>
						<path
							fill='currentColor'
							d='M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z'
						/>
					</svg>
					<span className='text-sm font-normal leading-snug'>Logout</span>
				</a>
			</div>

			{/* Footer Section */}
			<div className='bg-gray-50 p-3 border-t border-gray-200'>
				{/* Download Row */}
				<div className='flex items-center justify-between mb-3'>
					<span className='text-xs text-gray-600 font-semibold'>Download</span>
					<div className='flex gap-4 items-center'>
						<Link
							href='#'
							className='flex items-center gap-1 text-gray-600 text-xs no-underline hover:text-gray-800 transition-colors duration-200'
							onClick={closeMenu}
						>
							<svg viewBox='0 0 384 512' className='w-3.5 h-3.5'>
								<path
									fill='currentColor'
									d='M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z'
								/>
							</svg>
							iOS
						</Link>
						<Link
							href='#'
							className='flex items-center gap-1 text-gray-600 text-xs no-underline hover:text-gray-800 transition-colors duration-200'
							onClick={closeMenu}
						>
							<svg viewBox='0 0 576 512' className='w-3.5 h-3.5'>
								<path
									fill='currentColor'
									d='M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55'
								/>
							</svg>
							Android
						</Link>
					</div>
				</div>

				{/* Connect Row */}
				<div className='flex items-center justify-between'>
					<span className='text-xs text-gray-600 font-semibold'>Connect</span>
					<div className='flex gap-3 items-center'>
						{/* X (Twitter) */}
						<Link
							href='#'
							className='text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200'
							onClick={closeMenu}
						>
							<svg viewBox='0 0 24 24' className='w-4 h-4'>
								<path
									fill='currentColor'
									d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
								/>
							</svg>
						</Link>
						{/* Discord */}

						<Link
							href='#'
							className='text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200'
							onClick={closeMenu}
						>
							<svg viewBox='0 0 24 24' width='16' height='16'>
								<path
									fill='currentColor'
									d='M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z'
								/>
							</svg>
						</Link>
						{/* <!-- Facebook --> */}
						<Link
							href='#'
							className='text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200'
							onClick={closeMenu}
						>
							<svg viewBox='0 0 24 24' width='16' height='16'>
								<path
									fill='currentColor'
									d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
								/>
							</svg>
						</Link>
						{/* <!-- Telegram --> */}
						<Link
							href='#'
							className='text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200'
							onClick={closeMenu}
						>
							<svg viewBox='0 0 24 24' width='16' height='16'>
								<path
									fill='currentColor'
									d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z'
								/>
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AvatarTooltip;

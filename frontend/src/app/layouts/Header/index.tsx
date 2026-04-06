/** @format */

import * as React from 'react';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from '@/app/components/ui/navigation-menu';
import {
	SidebarMenuSvg,
	CommunitySvg,
	SearchColoredSVG,
	CourseSvg,
	ChevronsUpDownSvg,
	VideoSvg,
	InstructorsSVG,
	ArrowSvg,
	CheckSVG,
	MenuLogSvg,
	NotificationSvg,
	CartSvg,
	DarkModeSvg,
	EllipsisVerticalSvg,
	XSvg,
} from '@/app/components/svg';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import FilterAndSort from '@/app/components/Header/FilterSort';
import {useSidebar} from '@/app/components/ui/sidebar';
import {Button} from '@/app/components/ui/button';
import {useTheme} from 'next-themes';
import SearchSuggestionCard from '@/app/components/Header/SearchSuggestionCard';
import NotificationsPanel from '@/app/components/Header/NotificationPanel';
import AvatarTooltip from '@/app/components/Header/AvatarTooltip';
import ContactFormPopup from '@/app/components/Header/ContactPopup/ContactFormPopup';
import {useNotification} from '@/context/notification/useNotification';
import ApplyToTechPopup from '@/app/components/Header/ApplyToTechPopup';

import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
} from '@/app/components/ui/dialog';
import {LoginForm} from '@/app/components/login-form';
import {JoinForm} from '@/app/components/join-form';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

const Layersvg = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='18'
		height='18'
		viewBox='0 0 24 24'
		fill='none'
		stroke='#636363'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<path d='M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z' />
		<path d='M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12' />
		<path d='M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17' />
	</svg>
);
const options = [
	{id: 'all', label: 'All', icon: Layersvg},
	{id: 'courses', label: 'Courses', icon: CourseSvg},
	{id: 'sessions', label: 'Sessions', icon: VideoSvg},
	{id: 'communities', label: 'Communities', icon: CommunitySvg},
	{id: 'instructors', label: 'Instructors', icon: InstructorsSVG},
];

// when user logout

const isAuthenticated = false;
export function Header() {
	const router = useRouter();
	const [selected, setSelected] = React.useState(options[0]);
	const [searchValue, setSearchValue] = React.useState('');
	const [showFilter, setShowFilter] = React.useState(false);
	const [showSuggestions, setShowSuggestions] = React.useState(false);
	const [showAvatarTooltip, setShowAvatarTooltip] = React.useState(false);
	const searchContainerRef = React.useRef<HTMLLIElement>(null);
	const searchInputRef = React.useRef<HTMLInputElement>(null);
	const [showContactForm, setShowContactForm] = React.useState(false);

	const {showNotification, setShowNotification} = useNotification();
	const [showApplyToTechPopup, setShowApplyToTechPopup] = React.useState(false);
	const {setTheme} = useTheme();

	const {toggleSidebar} = useSidebar();

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchContainerRef.current &&
				!searchContainerRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleClear = () => {
		setSearchValue('');
		setShowSuggestions(true);
		if (searchInputRef.current) searchInputRef.current.focus();
	};

	const handleSearchSubmit = () => {
		if (searchValue.trim()) {
			// Close suggestions
			setShowSuggestions(false);
			// Navigate to search page with query parameters
			router.push(
				`/search-result?q=${encodeURIComponent(searchValue)}&type=${
					selected.id
				}`
			);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearchSubmit();
		}
	};
	return (
		<header className={`min-h-16 py-2 flex justify-between items-center sm:justify-end bg-background `}>
			<Button
				size={'icon'}
				variant={'ghost'}
				onClick={() => toggleSidebar()}
				className='sm:hidden'
			>
				<SidebarMenuSvg />
			</Button>
			<div className=''>
				<NavigationMenu className='max-sm:py-1'>
					<NavigationMenuList className='gap-6'>
						<NavigationMenuItem
							className='max-sm:hidden max-w-[648px] xl:w-[648px] border-1 rounded-md border-black bg-blue-950 '
							ref={searchContainerRef}
						>
							<div className='  flex justify-between items-center rounded-md'>
								<div className='bg-accent  flex justify-between items-center w-95/100 rounded-md pl-3'>
									<div className='flex w-full items-center gap-2 text-sm'>
										<SearchColoredSVG />
										<input
											type='text'
											name=''
											id=''
											placeholder='Search for books, podcasts, skills..'
											className='flex-1 text-[13px] outline-none border-none mr-3 placeholder:font-semibold'
											value={searchValue}
											onChange={handleSearch}
											onFocus={() => setShowSuggestions(true)}
											onKeyDown={handleKeyDown}
											ref={searchInputRef}
										/>
									</div>
									{showSuggestions && (
										<SearchSuggestionCard
											searchValue={searchValue}
											handleSearch={(value: string) =>
												handleSearch({
													target: {value},
												} as React.ChangeEvent<HTMLInputElement>)
											}
											showSuggestions={showSuggestions}
											setShowSuggestions={setShowSuggestions}
											setSearchValue={setSearchValue}
										/>
									)}

									<div className='flex items-center gap-2'>
										{searchValue && (
											<div onClick={handleClear} className='cursor-pointer'>
												<XSvg className='size-5 text-white bg-gray-400 rounded-full p-1' />
											</div>
										)}

										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<button className='flex bg-white dark:bg-accent rounded-sm py-3 px-2 items-center gap-1 text-sm outline-none border-none active:border-none active:outline-none'>
													<selected.icon className='size-5 fill-[#636363]' />
													{selected.label}
													<ChevronsUpDownSvg className='size-5' />
												</button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className='shadow-none rounded-t-none mt-1.5  min-w-50  mr-10 '>
												{options.map((option, index) => (
													<div key={option.id}>
														<DropdownMenuLabel
															className='flex items-center justify-between cursor-pointer'
															onClick={() => setSelected(option)}
														>
															<div className='flex gap-2 items-center font-normal'>
																<option.icon className='size-5 fill-gray-700' />
																<span className=''>{option.label}</span>
															</div>
															{selected.id === option.id && <CheckSVG />}
														</DropdownMenuLabel>
														{index < options.length - 1 && (
															<DropdownMenuSeparator className='opacity-50' />
														)}
													</div>
												))}
											</DropdownMenuContent>
										</DropdownMenu>
									</div>

									{/* dropdown for courses */}
								</div>
								<div
									onClick={handleSearchSubmit}
									className='px-3 text-white cursor-pointer'
								>
									<ArrowSvg fill='white' />
								</div>
							</div>
						</NavigationMenuItem>
						{/* TODO: change hidden class to emply this class attached only testing purpose */}
						<NavigationMenuItem className=' max-sm:hidden'>
							<div
								className='cursor-pointer rounded-full border p-2.5 dark:border-foreground'
								onClick={() => setShowFilter(!showFilter)}
							>
								<MenuLogSvg className='size-5' />
							</div>
						</NavigationMenuItem>
						{isAuthenticated && (
							<>
								<NavigationMenuItem className=''>
									<button
										onClick={() => setShowNotification(true)}
										className='dark:border-foreground border p-2.5 rounded-full hidden sm:block relative'
									>
										<NotificationSvg className='size-5 fill-black dark:fill-white' />

										<div className='absolute top-2.5 right-2.5  size-2.5 bg-red-500 rounded-full'></div>
									</button>
								</NavigationMenuItem>
								{/* TODO: change hidden class to emply this class attached only testing purpose */}

								<NavigationMenuItem className=''>
									<Link href={'/account/checkout'}>
										<button className='border dark:border-foreground p-2.5 rounded-full'>
											<CartSvg className='size-5' />
											<span
												className='absolute top-0 right-0 w-4 h-4 font-bold text-white rounded-full flex items-center justify-center'
												style={{
													fontSize: '9px',
													background: 'rgb(95, 192, 237)',
												}}
											>
												4
											</span>
										</button>
									</Link>
								</NavigationMenuItem>
							</>
						)}
						{/* TODO: change isAuth to isNotAuth it is only testing purpose */}
						{!isAuthenticated && (
							<>
								<NavigationMenuItem>
									<Dialog>
										<DialogTitle className='hidden'>Login</DialogTitle>
										<DialogTrigger asChild>
											<button className='border bg-accent py-2 px-4 rounded-full text-sm'>
												Login
											</button>
										</DialogTrigger>
										<DialogContent className='h-screen w-screen max-w-full p-2  sm:max-w-full top-1/2 left-1/2 rounded-none  bg-accent'>
											<section className='m-auto max-sm:w-full max-w-lg'>
												<LoginForm />
											</section>
										</DialogContent>
									</Dialog>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Dialog>
										<DialogTitle className='hidden'>Join</DialogTitle>
										<DialogTrigger asChild>
											<button className='border text-white bg-black py-2 px-4 rounded-full text-sm'>
												Join
											</button>
										</DialogTrigger>
										<DialogContent className='h-screen w-screen max-w-full p-2 sm:max-w-full top-1/2 left-1/2 rounded-none  bg-accent'>
											<section className='m-auto max-sm:w-full max-w-lg'>
												<JoinForm />
											</section>
										</DialogContent>
									</Dialog>
								</NavigationMenuItem>
							</>
						)}

						{isAuthenticated && (
							<NavigationMenuItem className='hidden sm:block'>
								<button
									onClick={() => setShowApplyToTechPopup(true)}
									className='border text-background bg-foreground py-2 px-6 rounded-full  text-nowrap'
								>
									+ Apply to Teach
								</button>
								{showApplyToTechPopup && (
									<ApplyToTechPopup isOpen={showApplyToTechPopup} onClose={setShowApplyToTechPopup} />
								)}
							</NavigationMenuItem>
						)}

						{/* TODO: change hidden class to emply this class attached only testing purpose */}

						<NavigationMenuItem className=''>
							<button
								className='border dark:border-foreground p-2.5 rounded-full'
								onClick={() =>
									setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
								}
								disabled={true} // temporary disable dark mode button
							>
								<DarkModeSvg className='fill-background size-5' />
							</button>
						</NavigationMenuItem>
						{isAuthenticated && (
							<>
								<NavigationMenuItem>
									<button
										onClick={() => setShowAvatarTooltip((prev) => !prev)}
										className=' dark:border-foreground rounded-full p-2.5 border bg-backgorund text-sm'
									>
										AZ
									</button>
								</NavigationMenuItem>

								<NavigationMenuItem
									className='block sm:hidden self-center
'
								>
									<button className='flex'>
										<EllipsisVerticalSvg className='size-8' />
									</button>
								</NavigationMenuItem>
							</>
						)}
					</NavigationMenuList>
				</NavigationMenu>

				{showAvatarTooltip && (
					<AvatarTooltip
						closeMenu={() => setShowAvatarTooltip(false)}
						setShowContactForm={setShowContactForm}
					/>
				)}
				{showFilter && <FilterAndSort />}
				{showContactForm && (
					<ContactFormPopup
						isOpen={showContactForm}
						setIsOpen={setShowContactForm}
					/>
				)}

				{
					<NotificationsPanel
						isPanelOpen={showNotification}
						setIsPanelOpen={setShowNotification}
					/>
				}
			</div>
		</header>
	);
}

export default Header;

/** @format */

'use client';

import * as React from 'react';
import {
	BookmarkSvg,
	CalendarSvg,
	CollapseSvg,
	CollectionSvg,
	// Dashboard1Svg,
	Dashboard1SvgNew,
	ExploreSvg,

	LearningSvg,
	MarketingSvg,
	NotificationSvg,
	PlayListSvg,
	ProductSvg,
	ReportSvg,
	SalesHistorySvg,
	SchoolSvg,
	SettingSvg,
	TeamSvg,
} from '@/app/components/svg';

import {NavMain} from '@/app/components/nav-main';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
	useSidebar,
} from '@/app/components/ui/sidebar';
import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import SemiLogo from '@/assets/semi-logo-transparent.png';
import {Button} from './ui/button';
import CreateCollectionPopup from './Sidebar/CreateCollectionPopup';
import {SidebarBottomMenu} from './sidebar-bottom-menu';
import {useNotification} from '@/context/notification/useNotification';
import {usePlaylist} from '@/context/playlist/usePlaylist';
import CreateSchoolForm from './School/CreateSchool';
// This is sample data.

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
	const [isAddSchoolPopupOpen, setIsAddSchoolPopupOpen] = React.useState(false);
	const {setShowNotification} = useNotification();
	const {showPlaylist, setShowPlaylist} = usePlaylist();
	const [isAddCollectionPopupOpen, setIsAddCollectionPopupOpen] =
		React.useState(false);
	const {state, toggleSidebar, setOpenMobile} = useSidebar();
	const [openSubMenu, setOpenSubMenu] = React.useState<string | null>(null);

	function handleSchoolAddClick() {
		setIsAddSchoolPopupOpen(true);
	}

	function handleCollectionAddClick() {
		setIsAddCollectionPopupOpen(true);
	}

	const handleNotificationDrawer = React.useCallback(() => {
		setShowNotification(true);
		setOpenMobile(false);
	}, [setShowNotification, setOpenMobile]);

	const handlePlaylistSheet = React.useCallback(() => {
		setShowPlaylist(!showPlaylist);
		setOpenMobile(false);
	}, [setShowPlaylist, setOpenMobile, showPlaylist]);

	const data = React.useMemo(
		() => ({
			navMain: [
				{
					icon: Dashboard1SvgNew,
					title: 'Dashboard',
					url: '/instructor/dashboard',
				},
				{
					icon: ProductSvg,
					title: 'My Products',
					url: '/instructor/my-products',
					subMenu: [
						{
							title: 'Schools',
							url: '/instructor/my-products?type=school',
						},
						{
							title: 'Courses',
							url: '/instructor/my-products?type=course',
						},
						{
							title: 'Sessions',
							url: '/instructor/my-products?type=session',
						},
						{
							title: 'Communities',
							url: '/instructor/my-products?type=community',
						},
						{
							title: 'Bundles',
							url: '/instructor/my-products?type=bundle',
						},
						{
							title: 'Subscriptions',
							url: '/instructor/my-products?type=subscription',
						},
					],
				},
				{
					icon: SalesHistorySvg,
					title: 'Sales History',
					url: '/instructor/sales-history',
				},
				{
					icon: MarketingSvg,
					title: 'Marketing',
					url: '/instructor/marketing',
				},
			],
			learning: [
				{
					menuKey: 'learn_dashboard',
					icon: Dashboard1SvgNew,
					title: 'Dashboard',
					url: '/student/dashboard',
				},
				{
					menuKey: 'learn_explore',
					icon: ExploreSvg,
					title: 'Explore',
					url: '/student/explore',
				},
				{
					menuKey: 'learn_my_learning',
					icon: LearningSvg,
					title: 'My Learning',
					url: '/student/my-learning',
				},
				{
					menuKey: 'learn_learner_report',
					icon: ReportSvg,
					title: 'Learner Report',
					url: '/student/learner-report',
				},
				{
					menuKey: 'learn_school',
					icon: SchoolSvg,
					title: 'School',
					url: '/student/school',
					add: true,
					handleFunc: handleSchoolAddClick,
					subMenu: [
						{
							title: 'school A',
							url: '/instructor/products',
							icon: SchoolSvg,
						},
						{
							title: 'school B',
							url: '/instructor/products',
							icon: SchoolSvg,
						},
						{
							title: 'school C',
							url: '/instructor/products',
							icon: SchoolSvg,
						},
					],
				},
				{
					menuKey: 'learn_calendar',
					icon: CalendarSvg,
					title: 'Calendar',
					url: '/student/calender',
				},
				{
					menuKey: 'learn_bookmarks',
					icon: BookmarkSvg,
					title: 'Bookmarks',
					url: '/student/studentbookmark',
				},
				{
					menuKey: 'learn_collections',
					icon: CollectionSvg,
					title: 'Collections',
					url: '/student/collection',
					add: true,
					handleFunc: handleCollectionAddClick,
					subMenu: [
						{
							title: 'collection A',
							url: '/student/collection',
							icon: SchoolSvg,
						},
						{
							title: 'Collection B',
							url: '/student/collection',
							icon: SchoolSvg,
						},
						{
							title: 'collection C',
							url: '/student/collection',
							icon: SchoolSvg,
						},
					],
				},
			],

			bottom: [
				{
					icon: PlayListSvg,
					title: 'PlayList',
					handleFunc: handlePlaylistSheet,
					url: '#',
				},
				{
					icon: NotificationSvg,
					title: 'Notifications',
					handleFunc: handleNotificationDrawer,
					url: '#',
				},
				{
					icon: TeamSvg,
					title: 'Team',
					url: '/account/team',
				},
				{
					icon: SettingSvg,
					title: 'Settings',
					url: '#',
				},
			],
		}),
		[handleNotificationDrawer, handlePlaylistSheet]
	);

	return (
		<>
			<Sidebar
				collapsible='icon'
				{...props}
				style={{'--sidebar': 'var(--background)'} as React.CSSProperties}
			>
				<SidebarHeader
					className={`border-b h-16 py-0 justify-center ${
						state === 'collapsed' ? 'px-0' : 'px-3.5'
					}`}
				>
					<div
						className={`flex items-center ${
							state === 'collapsed' ? 'justify-center' : 'justify-between'
						}`}
					>
						<div className='max-w-30  flex justify-between items-center'>
							<Image
								src={state !== 'collapsed' ? Logo : SemiLogo}
								className='cursor-pointer '
								alt='logo'
								width={32}
								height={32}
								priority={true}
								style={{width: 'auto', height: 'auto'}}
							/>
						</div>
						<div>
							{state !== 'collapsed' && (
								<Button
									className='self-center hover:border rounded'
									variant={'ghost'}
									onClick={() => toggleSidebar()}
								>
									<CollapseSvg className=' size-4 fill-foreground' />
								</Button>
							)}
						</div>
					</div>
				</SidebarHeader>
				<SidebarContent className='pt-[5px]'>
					<NavMain items={data.navMain} label='CREATE' openSubMenu={openSubMenu} setOpenSubMenu={setOpenSubMenu}/>
					<NavMain items={data.learning} label='LEARN' openSubMenu={openSubMenu} setOpenSubMenu={setOpenSubMenu}/>
				</SidebarContent>
				<SidebarFooter className='p-0 gap-0 opacity-60'>
					{state === 'collapsed' && (
						<Button
							className='self-center rotate-180 hidden sm:block mb-2'
							variant={'ghost'}
							size={'sm'}
							onClick={() => toggleSidebar()}
						>
							<CollapseSvg className='size-4 fill-foreground' />
						</Button>
					)}
					<hr />
					<SidebarBottomMenu items={data.bottom} />
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>

			{isAddSchoolPopupOpen && (
				<CreateSchoolForm
					onClose={() => setIsAddSchoolPopupOpen(false)}
					// onSubmit={(formData: FormData) => {
					// 	// Handle form submission
					// 	console.log(formData);
					// }}
				/>
			)}

			{isAddCollectionPopupOpen && (
				<CreateCollectionPopup
					onClose={() => setIsAddCollectionPopupOpen(false)}
				/>
			)}
		</>
	);
}

/** @format */

'use client';
import {AppSidebar} from '@/app/components/app-sidebar';
import {SidebarInset, SidebarProvider} from '@/app/components/ui/sidebar';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import Header from './layouts/Header';
import ProductHeader from '@/app/components/Instructor/Products/layouts/ProductHeader';
import MobileFooter from './layouts/MobileFooter';
import dynamic from 'next/dynamic';
import {NotificationProvider} from '@/context/notification/NotificationContext';
import {PlaylistProvider} from '@/context/playlist/PlaylistContext';
import {ProductProvider} from '@/context/product/ProductContext';
import PlaylistSheet from './components/Sidebar/PlaylistSheet';
import {usePlaylist} from '@/context/playlist/usePlaylist';
import {ProfileProvider} from '@/context/profile/ProfileContext';
import {usePathname} from 'next/navigation'; // 👈 import usePathname hook
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const ThemeProvider = dynamic(() => import('./components/theme-provider'), {
	ssr: false,
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname(); // 👈 get current page path

	return (
		<html lang='en' className='no-scrollbar'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased `}
			>
				<ToastContainer />
				<ThemeProvider
					attribute='class'
					defaultTheme='light'
					enableSystem
					disableTransitionOnChange
				>
					<NotificationProvider>
						<ProfileProvider>
							<PlaylistProvider>
								<SidebarProvider
									style={{'--sidebar-width': '16rem'} as React.CSSProperties}
								>
									<ProductProvider>
										<AppSidebar />
										<SidebarInset>
											<div className='sticky top-0 z-10 bg-background border-b sm:px-5 xl:px-8'>
												{/* Main Header */}
												{pathname !== '/instructor/my-products' ? (
													<div>
														<div className='block sm:hidden'>
															<Header />
														</div>
														<div className='hidden sm:block'>
															<Header />
														</div>
													</div>
												) : (
													<div>
														<div className='hidden sm:block'>
															<Header />
														</div>
														<div className='block sm:hidden'>
															<ProductHeader />
														</div>
													</div>
												)}
											</div>

											<main className='bg-accent h-full'>
												<div className='max-w-7xl m-auto p-2 sm:p-5'>
													{children}
												</div>
												<InnerLayoutForPlaylist />
											</main>

											<MobileFooter />
										</SidebarInset>
									</ProductProvider>
								</SidebarProvider>
							</PlaylistProvider>
						</ProfileProvider>
					</NotificationProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

const InnerLayoutForPlaylist = () => {
	const {showPlaylist} = usePlaylist();
	return <PlaylistSheet isOpen={showPlaylist} />;
};

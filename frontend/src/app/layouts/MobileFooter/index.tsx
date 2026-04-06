/** @format */

import {
	CalendarSvg,
	ExploreSvg,
	HomeFilledSvg,
	ProfileSvg,
	SchoolSvg,
} from '@/app/components/svg';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

const MobileFooter = () => {
	const pathname = usePathname();
	return (
		<div className='hidden max-sm:block bg-[#142e53] h-[65px]  text-white py-3 fixed bottom-0 left-0 w-full'>
			<div className='flex items-center justify-evenly'>
				<Link href={'/instructor/dashboard'}>
					<div className='flex flex-col items-center cursor-pointer'>
						<HomeFilledSvg
							className={`${
								pathname === '/instructor/dashboard'
									? 'fill-[#02C5AF]'
									: 'fill-white'
							}`}
						/>
						<span
							className={`${
								pathname === '/instructor/dashboard'
									? 'text-[#02C5AF]'
									: 'text-white'
							} text-[12px]  mt-1`}
						>
							Dashboard
						</span>
					</div>
				</Link>

				<Link href={'/student/explore'}>
					{' '}
					<div className='flex flex-col items-center cursor-pointer'>
						<ExploreSvg
							className={`size-4 ${
								pathname === '/student/explore'
									? 'fill-[#02C5AF]'
									: 'fill-white'
							}`}
						/>
						<span
							className={`${
								pathname === '/student/explore'
									? 'text-[#02C5AF]'
									: 'text-white'
							} text-[12px]  mt-1`}
						>
							Explorer
						</span>
					</div>
				</Link>
				<Link href={'/student/school'}>
					{' '}
					<div className='flex flex-col items-center cursor-pointer'>
						<SchoolSvg
							className={`size-4 ${
								pathname === '/student/school' ? 'fill-[#02C5AF]' : 'fill-white'
							}`}
						/>
						<span
							className={`${
								pathname === '/student/school' ? 'text-[#02C5AF]' : 'text-white'
							} text-[12px]  mt-1`}
						>
							Schools
						</span>
					</div>
				</Link>
				<Link href={'/student/calender'}>
					<div className='flex flex-col items-center cursor-pointer'>
						<CalendarSvg
							className={`size-4 ${
								pathname === '/student/calender'
									? 'fill-[#02C5AF]'
									: 'fill-white'
							}`}
						/>
						<span
							className={`${
								pathname === '/student/calender'
									? 'text-[#02C5AF]'
									: 'text-white'
							} text-[12px]  mt-1`}
						>
							Calendar
						</span>
					</div>
				</Link>

				<Link href={'/account/profile'}>
					<div className='flex flex-col items-center cursor-pointer'>
						<ProfileSvg
							className={`size-4 ${
								pathname === '/account/profile'
									? 'fill-[#02C5AF]'
									: 'fill-white'
							}`}
						/>
						<span
							className={`${
								pathname === '/account/profile'
									? 'text-[#02C5AF]'
									: 'text-white'
							} text-[12px]  mt-1`}
						>
							Me
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default MobileFooter;

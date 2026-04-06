/** @format */

import {useState} from 'react';
import dayjs from 'dayjs';
import {ChevronLeft, ChevronRight} from 'lucide-react'; // For arrow icons
import {useIsMobile} from '@/hooks/use-mobile';

const CalendarPopup = () => {
	const [currentDate, setCurrentDate] = useState(dayjs());

	const handlePrevMonth = () =>
		setCurrentDate(currentDate.subtract(1, 'month'));
	const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

	const startOfMonth = currentDate.startOf('month');
	const endOfMonth = currentDate.endOf('month');
	const daysInMonth = endOfMonth.date();
	const startDay = startOfMonth.day();

	const days = Array.from({length: startDay + daysInMonth}, (_, i) =>
		i >= startDay ? i - startDay + 1 : null
	);
	const generateCalendarDays = () => {
		const daysInMonth = 31;
		const firstDayOffset = 2; // Month starts on Tuesday
		const days = [];

		// Add empty cells for days before the start of the month
		for (let i = 0; i < firstDayOffset; i++) {
			days.push(<div key={`empty-${i}`} className='aspect-square' />);
		}

		// Generate calendar days
		for (let day = 1; day <= daysInMonth; day++) {
			const hasEvent = [3, 8, 12, 22, 27].includes(day);
			const isActive = day === 16;

			days.push(
				<div
					key={day}
					className={`aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer
            ${isActive ? 'bg-[#13AFF0] text-white font-semibold' : ''}
            ${
							hasEvent && !isActive
								? 'bg-[rgba(19,196,204,0.1)] text-[#13C4CC] font-semibold'
								: ''
						}
            ${!hasEvent && !isActive ? 'text-[#4F4F4F] hover:bg-gray-100' : ''}
          `}
				>
					{day}
				</div>
			);
		}

		return days;
	};

	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<section className='bg-white '>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-base font-semibold text-[#262B3D]'>
						October 2024
					</h2>
					<div className='flex gap-2'>
						<button className='w-7 h-7 border border-[#e2e8f0] rounded-lg bg-white text-[#4F4F4F] flex items-center justify-center'>
							<ChevronLeft className='w-4 h-4' />
						</button>
						<button className='w-7 h-7 border border-[#e2e8f0] rounded-lg bg-white text-[#4F4F4F] flex items-center justify-center'>
							<ChevronRight className='w-4 h-4' />
						</button>
					</div>
				</div>
				<div className='grid grid-cols-7 text-center mb-2'>
					<span className='text-xs text-[#4F4F4F] p-1'>S</span>
					<span className='text-xs text-[#4F4F4F] p-1'>M</span>
					<span className='text-xs text-[#4F4F4F] p-1'>T</span>
					<span className='text-xs text-[#4F4F4F] p-1'>W</span>
					<span className='text-xs text-[#4F4F4F] p-1'>T</span>
					<span className='text-xs text-[#4F4F4F] p-1'>F</span>
					<span className='text-xs text-[#4F4F4F] p-1'>S</span>
				</div>
				<div className='grid grid-cols-7 gap-1'>{generateCalendarDays()}</div>
			</section>
		);
	} else {
		return (
			<>
				<div className='flex justify-between items-center text-lg font-semibold text-[#142E53] mb-4'>
					<span>{currentDate.format('MMMM YYYY')}</span>
					<div className='flex gap-2'>
						<button
							onClick={handlePrevMonth}
							className='p-2 bg-white border rounded-md hover:bg-gray-100'
						>
							<ChevronLeft size={18} />
						</button>
						<button
							onClick={handleNextMonth}
							className='p-2 bg-white border rounded-md hover:bg-gray-100'
						>
							<ChevronRight size={18} />
						</button>
					</div>
				</div>

				{/* Days of the Week */}
				<div className='grid grid-cols-7 text-sm font-semibold text-gray-500 mb-2'>
					{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
						<div key={day} className='text-center'>
							{day}
						</div>
					))}
				</div>

				{/* Calendar Dates */}
				<div className='grid grid-cols-7 text-gray-800 text-sm'>
					{days.map((day, i) => (
						<div
							key={i}
							className={`text-center p-2 ${
								day ? 'cursor-pointer hover:bg-gray-100 rounded-md' : ''
							}`}
						>
							{day || ''}
						</div>
					))}
				</div>
			</>
		);
	}
};

export default CalendarPopup;

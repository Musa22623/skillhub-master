/** @format */

'use client';
import {CheckSVG, RemainderCalendarSvg} from '@/app/components/svg/';
import {useIsMobile} from '@/hooks/use-mobile';
import { useState } from 'react';
import TimeDrawer from './components/TimeDrawer';

export default function StudyReminders() {
	const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeDay, setActiveDay] = useState<keyof typeof reminders | null>(null)
  const [reminders, setReminders] = useState({
    M: { active: true, time: "7:15 PM" },
    T: { active: false, time: "" },
    W: { active: true, time: "3:30 PM" },
    Th: { active: false, time: "" },
    F: { active: true, time: "2:00 PM" },
    S: { active: false, time: "" },
    Su: { active: true, time: "7:15 PM" },
  })

  // Open drawer for a specific day
  const openDrawer = (day: keyof typeof reminders) => {
    setActiveDay(day)
    setIsDrawerOpen(true)
  }

  // Close drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false)
    setActiveDay(null)
  }

  // Save reminder time
  const saveReminder = (time: string, amPm: string) => {
    if (activeDay) {
      setReminders((prev) => ({
        ...prev,
        [activeDay]: { active: true, time: `${time} ${amPm}` },
      }))
      closeDrawer()
    }
  }

  // Remove reminder
  const removeReminder = () => {
    if (activeDay) {
      setReminders((prev) => ({
        ...prev,
        [activeDay]: { active: false, time: "" },
      }))
      closeDrawer()
    }
  }
	const reminder = [
		{day: 'Mon', time: '7:15 PM', active: true},
		{day: 'Tue', time: '', active: false},
		{day: 'Wed', time: '3:30 PM', active: true},
		{day: 'Thu', time: '', active: false},
		{day: 'Fri', time: '2:00 PM', active: true},
		{day: 'Sat', time: '', active: false},
		{day: 'Sun', time: '7:15 PM', active: true},
	];

	if (isMobile) {
		return (
			<section className='bg-white rounded-xl p-4 shadow-sm mb-4'>
				<div className='mb-4'>
					<h2 className='text-xl font-semibold'>Study Reminders</h2>
					<p className='text-sm text-gray-500'>
						Set your weekly study schedule
					</p>
				</div>

				<div className='flex justify-between px-2'>
					{Object.entries(reminders).map(([day, {active, time}]) => (
						<div key={day} className='flex flex-col items-center gap-1'>
							<div
								className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs relative cursor-pointer
                  ${
										active
											? 'font-semibold border-teal-500'
											: 'text-gray-500 border-gray-200'
									}`}
								onClick={() => openDrawer(day as keyof typeof reminders)}
							>
								{day}
								{active && (
									<div className='absolute -top-0.5 -right-0.5 w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center'>
										<svg
											className='w-2.5 h-2.5 text-white'
											viewBox='0 0 24 24'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M5 13l4 4L19 7'
												stroke='currentColor'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</div>
								)}
							</div>
							<span className='text-[11px] text-gray-500 h-4'>
								{active ? time : ''}
							</span>
						</div>
					))}
				</div>

        <TimeDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onSave={saveReminder}
        onRemove={removeReminder}
        initialTime={activeDay && reminders[activeDay].active ? reminders[activeDay].time.split(" ")[0] : "07:15"}
        initialAmPm={activeDay && reminders[activeDay].active ? reminders[activeDay].time.split(" ")[1] : "PM"}
      />
			</section>
		);
	} else {
		return (
			<div className='flex gap-12 items-start bg-white rounded-lg p-6 shadow-md'>
				{/* Header */}
				<div className='flex-[0_0_30%] pr-6 border-r border-gray-300'>
					<div className='flex items-center gap-3'>
						<RemainderCalendarSvg className='w-6 h-6 text-gray-700' />
						<h2 className='text-lg font-semibold text-gray-800'>
							Study Reminders
						</h2>
					</div>
					<p className='text-sm text-gray-600 mt-2'>
						Next reminder on{' '}
						<span className='font-semibold'>Sunday 7:15 PM</span>
					</p>
				</div>

				{/* Reminder Days */}
				<div className='grid grid-cols-7 gap-9'>
					{reminder.map((reminder) => (
						<div key={reminder.day} className='flex flex-col items-center px-4'>
							<div
								className={`relative flex items-center justify-center w-14 h-14 rounded-full border border-gray-300 text-sm font-semibold cursor-pointer transition-all duration-200 ${
									reminder.active
										? 'font-bold text-gray-800 bg-gray-100'
										: 'text-gray-500'
								}`}
							>
								{reminder.day}
								{reminder.active && (
									<div className='absolute top-0 right-0 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center'>
										<CheckSVG />
									</div>
								)}
							</div>
							<span className='text-xs text-gray-600 font-semibold mt-1'>
								{reminder.time || ''}
							</span>
						</div>
					))}
				</div>
			</div>
		);
	}
}

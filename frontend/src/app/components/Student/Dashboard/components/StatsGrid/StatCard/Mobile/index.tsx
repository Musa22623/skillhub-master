/** @format */

'use client';

import type React from 'react';

import {useState} from 'react';
import {
	FileText,
	GraduationCap,
	Star,
	Award,
	RefreshCw,
	MessageSquare,
	FileCheck,
	DollarSign,
	ChevronDown,
} from 'lucide-react';

export default function DashboardStats() {
	return (
		<div className='flex flex-1 flex-col gap-3 px-2'>
			<StatCard
				icon={<FileText />}
				name='In Progress'
				value='18'
				percentage='+12.5%'
				isPositive={true}
				comparison='Compared to last month'
				footerIcon={<FileText className='size-4'/>}
				footerText='105 Total'
				iconBgColor='bg-[#D7E9FF]'
				iconColor='text-[#2E90FA]'
			/>

			<StatCard
				icon={<GraduationCap />}
				name='Completed'
				value='37'
				percentage='+28.0%'
				isPositive={true}
				comparison='Compared to last month'
				footerIcon={<GraduationCap className='size-4'/>}
				footerText='55 Total'
				iconBgColor='bg-[#E5FEF0]'
				iconColor='text-[#12B76A]'
			/>

			<StatCard
				icon={<Star />}
				name='Reviews Left'
				value='35'
				percentage='-26.7%'
				isPositive={false}
				comparison='Compared to last month'
				footerIcon={<Star className='size-4'/>}
				footerText='75 Total'
				iconBgColor='bg-[#E9E3FF]'
				iconColor='text-[#9E77ED]'
			/>

			<StatCard
				icon={<Award />}
				name='Badges'
				value='3'
				percentage='+15.0%'
				isPositive={true}
				comparison='This Past Month'
				footerIcon={<Award className='size-4'/>}
				footerText='15 Total'
				iconBgColor='bg-[#FFF3D7]'
				iconColor='text-[#F79009]'
			/>

			<StatCard
				icon={<RefreshCw />}
				name='Min Watched'
				value='1,897'
				percentage='+33.3%'
				isPositive={true}
				comparison='Compared to last month'
				footerIcon={<RefreshCw className='size-4'/>}
				footerText='8,895 Total'
				iconBgColor='bg-[#FFE4E8]'
				iconColor='text-[#F04438]'
			/>

			<StatCard
				icon={<MessageSquare />}
				name='Comments'
				value='67'
				percentage='+33.3%'
				isPositive={true}
				comparison='Compared to last month'
				footerIcon={<MessageSquare className='size-4'/>}
				footerText='1,595 Total'
				iconBgColor='bg-[#FFE4D5]'
				iconColor='text-[#FF692E]'
			/>

			<StatCard
				icon={<FileCheck />}
				name='Certificates'
				value='5'
				percentage='0%'
				isPositive={null}
				comparison='This Past Month'
				footerIcon={<FileCheck className='size-4'/>}
				footerText='24 Total'
				iconBgColor='bg-[#F3F3F3]'
				iconColor='text-[#344054]'
			/>

			<StatCard
				icon={<DollarSign />}
				name='Spent'
				value='$407'
				percentage='+37.0%'
				isPositive={true}
				comparison='This Past Month'
				footerIcon={<DollarSign className='size-4'/>}
				footerText='$1,370 Total'
				iconBgColor='bg-[#EFF8FF]'
				iconColor='text-[#2E90FA]'
			/>
		</div>
	);
}

interface StatCardProps {
	icon: React.ReactNode;
	name: string;
	value: string;
	percentage: string;
	isPositive: boolean | null;
	comparison: string;
	footerIcon: React.ReactNode;
	footerText: string;
	iconBgColor: string;
	iconColor: string;
}

function StatCard({
	icon,
	name,
	value,
	percentage,
	isPositive,
	comparison,
	footerIcon,
	footerText,
	iconBgColor,
	iconColor,
}: StatCardProps) {
	const [expanded, setExpanded] = useState(false);

	const getPercentageClass = () => {
		if (isPositive === true) return 'bg-[rgba(2,197,175,0.1)] text-[#02C5AF]';
		if (isPositive === false) return 'bg-[rgba(255,76,81,0.1)] text-[#FF4C51]';
		return 'bg-[rgba(128,128,128,0.1)] text-gray-500';
	};

	return (
		<div
			className={`flex-1 bg-white rounded-xl p-4 relative shadow-sm border border-gray-100/50 ${
				expanded ? 'pb-4' : 'pb-2'
			}`}
		>
			<div className='flex items-center gap-3 mb-3 w-full'>
				<div
					className={`flex-shrink-0 rounded-lg w-10 h-10 flex items-center justify-center ${iconBgColor}`}
				>
					<div className={`w-5 h-5 ${iconColor}`}>{icon}</div>
				</div>
				<div className='text-[#262B3D] text-sm font-semibold flex-1'>
					{name}
				</div>
				<button
					className='w-8 h-8 rounded-md bg-[#F1F3F6] flex items-center justify-center transition-colors hover:bg-gray-200 flex-shrink-0'
					onClick={() => setExpanded(!expanded)}
				>
					<ChevronDown
						className={`w-4 h-4 transition-transform ${
							expanded ? 'rotate-180' : ''
						}`}
					/>
				</button>
			</div>

			<div className='pl-[52px]'>
				<div className='text-[#142E53] text-2xl font-bold mb-1 flex items-center gap-3'>
					{value}
					<span
						className={`text-sm py-1 px-3 rounded-full font-semibold ${getPercentageClass()}`}
					>
						{percentage}
					</span>
				</div>
				<div
					className={`text-[#3B6E91] text-xs opacity-70 mb-4 ${
						expanded ? 'block' : 'hidden'
					}`}
				>
					{comparison}
				</div>
			</div>

			<div
				className={`mt-4 bg-black/[0.03] -mx-4 -mb-2 py-3 px-4 rounded-b-xl border-t border-gray-200/80 ${
					expanded ? 'block' : 'hidden'
				}`}
			>
				<div className='inline-flex items-center gap-2 py-1.5 px-3.5 bg-white rounded-full text-gray-600 font-semibold text-sm shadow-sm'>
					<div className='w-4 h-4 text-[#13C4CC]'>{footerIcon}</div>
					<span>{footerText}</span>
				</div>
			</div>
		</div>
	);
}
